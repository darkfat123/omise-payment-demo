-- name: CreateProduct :one
INSERT INTO product (name, description, price, category_id, quantity, rating, image)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: ListProducts :many
SELECT * FROM product
WHERE is_active = true
ORDER BY id;

-- name: GetProductByID :one
SELECT * FROM product
WHERE id = $1 LIMIT 1;

-- name: UpdateProductStock :exec
UPDATE product
SET quantity = quantity - $2, updated_at = now()
WHERE id = $1 AND quantity >= $2;
