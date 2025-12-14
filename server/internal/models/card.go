package models

type CardInfo struct {
	Number          string `json:"number"`
	Name            string `json:"name"`
	ExpirationMonth string `json:"expiration_month"`
	ExpirationYear  string `json:"expiration_year"`
	SecurityCode    string `json:"security_code"`
}

type CardPaymentRequest struct {
	Card  CardInfo   `json:"card"`
	Items []CartItem `json:"items"`
}
