package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"server/config"
	"server/db/sqlc"
	"server/internal/models"
	"strconv"
	"time"

	"github.com/omise/omise-go"
	"github.com/omise/omise-go/operations"
)

var ErrInvalidSource = errors.New("invalid source structure")

type PaymentService struct {
	client         *omise.Client
	productQueries *sqlc.Queries
}

func NewPaymentService(client *omise.Client, productQueries *sqlc.Queries) *PaymentService {
	return &PaymentService{
		client:         client,
		productQueries: productQueries,
	}
}

func (s *PaymentService) GetChargeStatus(ctx context.Context, chargeID string) (*omise.Charge, error) {
	ch := &omise.Charge{}
	err := s.client.Do(ch, &operations.RetrieveCharge{
		ChargeID: chargeID,
	})
	return ch, err
}

func (s *PaymentService) CreatePromptPayPayment(ctx context.Context, cart models.Cart) (string, string, error) {
	var totalAmount int64
	for _, item := range cart.Items {
		p, err := s.productQueries.GetProductByID(ctx, int32(item.ProductID))
		if err != nil {
			return "", "", err
		}
		priceFloat, err := p.Price.Float64Value()
		if err != nil {
			return "", "", err
		}
		totalAmount += int64(item.Quantity) * int64(priceFloat.Float64*100)
	}

	src := &omise.Source{}
	createSrc := &operations.CreateSource{
		Type:     "promptpay",
		Amount:   totalAmount,
		Currency: "thb",
	}

	if err := s.client.Do(src, createSrc); err != nil {
		return "", "", err
	}

	ch := &omise.Charge{}
	createCh := &operations.CreateCharge{
		Amount:   src.Amount,
		Currency: src.Currency,
		Source:   src.ID,
	}

	if err := s.client.Do(ch, createCh); err != nil {
		return "", "", err
	}

	b, err := json.Marshal(ch.Source)
	if err != nil {
		return "", "", err
	}

	var m map[string]interface{}
	if err := json.Unmarshal(b, &m); err != nil {
		return "", "", err
	}

	scannable, ok := m["scannable_code"].(map[string]interface{})
	if !ok {
		return "", "", ErrInvalidSource
	}

	imageObj, ok := scannable["image"].(map[string]interface{})
	if !ok {
		return "", "", ErrInvalidSource
	}

	downloadURI, ok := imageObj["download_uri"].(string)
	if !ok {
		return "", "", ErrInvalidSource
	}

	return downloadURI, ch.ID, nil
}

func (s *PaymentService) CreateChargeWithCard(ctx context.Context, card models.CardInfo, cart models.Cart) (*omise.Charge, error) {
	var totalAmount int64
	for _, item := range cart.Items {
		p, err := s.productQueries.GetProductByID(ctx, int32(item.ProductID))
		if err != nil {
			return nil, err
		}
		priceFloat, err := p.Price.Float64Value()
		if err != nil {
			return nil, err
		}
		totalAmount += int64(item.Quantity) * int64(priceFloat.Float64*100)
	}

	expMonthInt, err := strconv.Atoi(card.ExpirationMonth)
	if err != nil {
		return nil, err
	}
	expYear, err := strconv.Atoi(card.ExpirationYear)
	if err != nil {
		return nil, err
	}

	token := &omise.Token{}
	createToken := &operations.CreateToken{
		Name:            card.Name,
		Number:          card.Number,
		ExpirationMonth: time.Month(expMonthInt),
		ExpirationYear:  expYear,
		SecurityCode:    card.SecurityCode,
	}

	if err := s.client.Do(token, createToken); err != nil {
		return nil, err
	}

	ch := &omise.Charge{}
	createCh := &operations.CreateCharge{
		Amount:   totalAmount,
		Currency: "thb",
		Card:     token.ID,
	}

	if err := s.client.Do(ch, createCh); err != nil {
		return nil, err
	}

	return ch, nil
}

func (s *PaymentService) MarkChargeAsFailed(chargeID string) error {
	url := fmt.Sprintf("https://api.omise.co/charges/%s/mark_as_failed", chargeID)

	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		return err
	}

	req.SetBasicAuth(config.OMISE_SECRET_KEY, "")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to mark charge as failed: %s", string(body))
	}

	return nil
}
