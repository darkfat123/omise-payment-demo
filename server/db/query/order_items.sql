-- name: AddOrderItem :one
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListOrderItems :many
SELECT oi.*, p.name, p.image 
FROM order_items oi
JOIN product p ON oi.product_id = p.id
WHERE oi.order_id = $1;
