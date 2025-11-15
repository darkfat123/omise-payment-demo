package handler

import (
	"net/http"
	"server/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ProductHandler wraps the ProductService
type ProductHandler struct {
	service *service.ProductService
}

// NewProductHandler creates a new ProductHandler with injected service
func NewProductHandler(s *service.ProductService) *ProductHandler {
	return &ProductHandler{service: s}
}

// GetProducts returns all products
func (h *ProductHandler) GetProducts(c *gin.Context) {
	products, err := h.service.GetProducts(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

// GetProductByID returns a single product by its ID
func (h *ProductHandler) GetProductByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product id"})
		return
	}

	product, err := h.service.GetProductByID(c.Request.Context(), int32(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	c.JSON(http.StatusOK, product)
}
