-- name: CreatePayment :one
INSERT INTO payments (order_id, amount, method, status, transaction_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdatePaymentStatus :exec
UPDATE payments
SET status = $2, updated_at = now()
WHERE id = $1;

-- name: GetPaymentByOrder :one
SELECT * FROM payments
WHERE order_id = $1 LIMIT 1;
