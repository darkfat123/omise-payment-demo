package utils

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/shopspring/decimal"
)

func NumericToDecimal(n pgtype.Numeric) (decimal.Decimal, error) {
	if !n.Valid || n.NaN {
		return decimal.Zero, fmt.Errorf("invalid numeric")
	}

	return decimal.NewFromBigInt(n.Int, n.Exp), nil
}
