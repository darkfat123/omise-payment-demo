-- name: CreateCustomer :one
INSERT INTO customer (first_name, last_name, email, password_hash)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetCustomerByID :one
SELECT * FROM customer
WHERE id = $1 LIMIT 1;

-- name: GetCustomerByEmail :one
SELECT * FROM customer
WHERE email = $1 LIMIT 1;

-- name: ListCustomers :many
SELECT * FROM customer
ORDER BY id;

-- name: UpdateCustomerActive :exec
UPDATE customer
SET is_active = $2, updated_at = now()
WHERE id = $1;
