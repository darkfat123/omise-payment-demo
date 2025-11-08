package service

import (
	"server/db"
)

type Product = db.Product

func GetProducts() []Product {
	return db.Products
}

func GetProductByID(id int) *Product {
	for _, a := range db.Products {
		if a.ID == id {
			return &a
		}
	}
	return nil
}
