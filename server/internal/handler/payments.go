package handler

import (
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

	c.JSON(200, gin.H{"status": status.Status})
}

func (h *PaymentHandler) CreatePromptPayPayment(c *gin.Context) {
	var cart models.Cart
	if err := c.BindJSON(&cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid cart"})
		return
	}

	uri, chargeId, err := h.service.CreatePromptPayPayment(c.Request.Context(), cart)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"charge_id": chargeId, "download_uri": uri})
}
