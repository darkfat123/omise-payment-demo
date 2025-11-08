package db

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Category    string  `json:"category"`
	Quantity    int     `json:"quantity"`
	Rating      float64 `json:"rating"`
	Image       string  `json:"image"`
}

var Products []Product

func init() {
	file, err := os.Open("MOCK_DATA.json")
	if err != nil {
		fmt.Println("Cannot open MOCK_DATA.json:", err)
		return
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&Products)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	log.Printf("✅ Loaded %d products from MOCK_DATA.json\n", len(Products))
}
