package internal

import (
	"server/internal/handler"
	"server/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	v1 := r.Group("/api/v1", middleware.AuthMiddleware())
	{
		v1.GET("/products", handler.GetProducts)
		v1.GET("/products/:id", handler.GetProductByID)
	}

	return r
}
