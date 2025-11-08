package handler

import (
	"net/http"
	"server/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, service.GetProducts())
}
func GetProductByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid product id"})
		return
	}
	product := service.GetProductByID(id)
	if product == nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, product)
}
