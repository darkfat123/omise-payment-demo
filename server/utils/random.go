package utils

import (
	"github.com/google/uuid"
)

func RandomUUID() string {
	id := uuid.New()
	return id.String()
}
