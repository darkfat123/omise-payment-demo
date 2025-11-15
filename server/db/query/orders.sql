-- name: CreateOrder :one
INSERT INTO orders (customer_id, total_amount, status)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetOrderByID :one
SELECT * FROM orders
WHERE id = $1 LIMIT 1;

-- name: ListOrdersByCustomer :many
SELECT * FROM orders
WHERE customer_id = $1
ORDER BY created_at DESC;

-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = $2, updated_at = now()
WHERE id = $1;
