package main

import (
	"log"
	"os"
	"server/internal"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system environment")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatalln("No PORT found in environment")
	}

	r := internal.SetupRouter()
	log.Printf("Server running at :%s\n", port)
	r.Run(":" + port)
}
