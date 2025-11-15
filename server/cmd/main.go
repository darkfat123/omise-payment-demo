package main

import (
	"log"
	"server/config"
	"server/internal"
)

func main() {
	config.InitConstants()
	config.InitOmise()
	config.InitDB()
	defer config.CloseDB()

	r := internal.SetupRouter()
	log.Printf("Server running at :%s\n", config.PORT)
	r.Run(":" + config.PORT)
}
