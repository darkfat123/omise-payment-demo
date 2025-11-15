package service

import (
	"context"
	"encoding/json"
	"errors"
	"server/db/sqlc"
	"server/internal/models"

	"github.com/omise/omise-go"
	"github.com/omise/omise-go/operations"
)

var ErrInvalidSource = errors.New("invalid source structure")

// PaymentService handles payment operations
type PaymentService struct {
	client         *omise.Client
	productQueries *sqlc.Queries // Add this to get product prices
}

func NewPaymentService(client *omise.Client, productQueries *sqlc.Queries) *PaymentService {
	return &PaymentService{
		client:         client,
		productQueries: productQueries,
	}
}

// CreatePromptPayPayment creates a PromptPay payment and returns download_uri
func (s *PaymentService) CreatePromptPayPayment(ctx context.Context, cart models.Cart) (string, error) {
	// 1️⃣ Create PromptPay source

	var totalAmount int64
	for _, item := range cart.Items {
		p, err := s.productQueries.GetProductByID(ctx, int32(item.ProductID))
		if err != nil {
			return "", err
		}
		priceFloat, err := p.Price.Float64Value()
		if err != nil {
			return "", err
		}
		totalAmount += int64(item.Quantity) * int64(priceFloat.Float64*100) // Convert THB to satang
	}

	src := &omise.Source{}
	createSrc := &operations.CreateSource{
		Type:     "promptpay",
		Amount:   totalAmount, // use cart total amount
		Currency: "thb",
	}

	if err := s.client.Do(src, createSrc); err != nil {
		return "", err
	}

	// 2️⃣ Create charge
	ch := &omise.Charge{}
	createCh := &operations.CreateCharge{
		Amount:   src.Amount,
		Currency: src.Currency,
		Source:   src.ID,
	}

	if err := s.client.Do(ch, createCh); err != nil {
		return "", err
	}

	// 3️⃣ Extract download_uri safely
	b, err := json.Marshal(ch.Source)
	if err != nil {
		return "", err
	}

	var m map[string]interface{}
	if err := json.Unmarshal(b, &m); err != nil {
		return "", err
	}

	scannable, ok := m["scannable_code"].(map[string]interface{})
	if !ok {
		return "", ErrInvalidSource
	}

	imageObj, ok := scannable["image"].(map[string]interface{})
	if !ok {
		return "", ErrInvalidSource
	}

	downloadURI, ok := imageObj["download_uri"].(string)
	if !ok {
		return "", ErrInvalidSource
	}

	return downloadURI, nil
}
