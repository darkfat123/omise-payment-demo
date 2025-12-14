package config

import (
	"context"
	"log"
	"os"
	"server/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/omise/omise-go"
)

var (
	ALLOWED_ORIGIN   string
	PORT             string
	OMISE_PUBLIC_KEY string
	OMISE_SECRET_KEY string
	OMISE_CHARGE_URL string
	DATABASE_URL     string
)

func InitConstants() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system environment")
	} else {
		log.Println(".env file loaded successfully")
	}

	ALLOWED_ORIGIN = os.Getenv("ALLOWED_ORIGIN")
	PORT = os.Getenv("PORT")
	OMISE_PUBLIC_KEY = os.Getenv("OMISE_PUBLIC_KEY")
	OMISE_SECRET_KEY = os.Getenv("OMISE_SECRET_KEY")
	OMISE_CHARGE_URL = os.Getenv("OMISE_CHARGE_URL")
	DATABASE_URL = os.Getenv("DATABASE_URL")
}

var DB *pgxpool.Pool
var Queries *sqlc.Queries

func InitDB() {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, DATABASE_URL)
	if err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	DB = pool
	Queries = sqlc.New(pool)

	log.Println("Database connected.")
}

func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}

var omiseClient *omise.Client

func InitOmise() {
	client, err := omise.NewClient(OMISE_PUBLIC_KEY, OMISE_SECRET_KEY)
	if err != nil {
		log.Fatal("failed to init Omise client:", err)
	}
	omiseClient = client
}

func GetOmiseClient() *omise.Client {
	if omiseClient == nil {
		log.Fatal("Omise client not initialized")
	}
	return omiseClient
}
