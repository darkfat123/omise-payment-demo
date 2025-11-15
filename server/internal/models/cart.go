package models

type CartItem struct {
	ProductID int `json:"id"`
	Quantity  int `json:"quantity"`
}

type Cart struct {
	Items []CartItem `json:"items"`
}
