package internal

import (
	"server/config"
	"server/internal/handler"
	"server/internal/middleware"
	"server/internal/service"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Initialize Gin
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Services
	productService := service.NewProductService(config.Queries)
	paymentService := service.NewPaymentService(config.GetOmiseClient(), config.Queries)

	// Handlers
	productHandler := handler.NewProductHandler(productService)
	paymentHandler := handler.NewPaymentHandler(paymentService)

	// API v1
	v1 := r.Group("/api/v1")
	{
		// Product routes (public)
		v1.GET("/products", productHandler.GetProducts)
		v1.GET("/products/:id", productHandler.GetProductByID)

		// Payment routes (protected)
		pay := v1.Group("/pay")
		pay.Use(middleware.AuthMiddleware())
		pay.GET("/status/:chargeId", paymentHandler.CheckPaymentStatus)
		pay.POST("/promptpay", paymentHandler.CreatePromptPayPayment)
		pay.POST("/card", paymentHandler.CreateCardPayment)

	}

	return r
}
