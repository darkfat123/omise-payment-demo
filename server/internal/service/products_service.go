package service

import (
	"context"
	"server/db/sqlc"
)

type ProductService struct {
	queries *sqlc.Queries
}

func NewProductService(q *sqlc.Queries) *ProductService {
	return &ProductService{queries: q}
}

func (s *ProductService) GetProducts(ctx context.Context) ([]sqlc.Product, error) {
	return s.queries.ListProducts(ctx)
}

func (s *ProductService) GetProductByID(ctx context.Context, id int32) (*sqlc.Product, error) {
	product, err := s.queries.GetProductByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return &product, nil
}
