package handler

import (
	"log"
	"net/http"
	"server/internal/models"
	"server/internal/service"

	"github.com/gin-gonic/gin"
)

type PaymentHandler struct {
	service *service.PaymentService
}

func NewPaymentHandler(s *service.PaymentService) *PaymentHandler {
	return &PaymentHandler{service: s}
}

func (h *PaymentHandler) CheckPaymentStatus(c *gin.Context) {
	chargeID := c.Param("chargeId")
	status, err := h.service.GetChargeStatus(
		c.Request.Context(),
		chargeID,
	)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	log.Printf("CheckPaymentStatus response: status=%s\n", status.Status)
	c.JSON(200, gin.H{"status": status.Status})
}

func (h *PaymentHandler) CreatePromptPayPayment(c *gin.Context) {
	var cart models.Cart
	if err := c.BindJSON(&cart); err != nil {
		log.Println("Invalid cart:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid cart"})
		return
	}

	log.Printf("CreatePromptPayPayment request: %+v\n", cart)

	uri, chargeId, err := h.service.CreatePromptPayPayment(
		c.Request.Context(),
		cart,
	)
	if err != nil {
		log.Println("CreatePromptPayPayment error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Printf("CreatePromptPayPayment success: charge_id=%s\n", chargeId)

	c.JSON(http.StatusOK, gin.H{"charge_id": chargeId, "download_uri": uri})
}

func (h *PaymentHandler) CreateCardPayment(c *gin.Context) {
	var req models.CardPaymentRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	log.Printf("CreateCardPayment request: %+v\n", req)

	ch, err := h.service.CreateChargeWithCard(c.Request.Context(), req.Card, models.Cart{
		Items: req.Items,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"charge_id": ch.ID,
		"status":    ch.Status,
	})
}

func (h *PaymentHandler) MarkChargeAsFailed(c *gin.Context) {
	var req struct {
		ChargeID string `json:"charge_id"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	if err := h.service.MarkChargeAsFailed(req.ChargeID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "cancelled"})
}
