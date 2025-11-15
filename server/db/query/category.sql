-- name: CreateCategory :one
INSERT INTO category (name, description)
VALUES ($1, $2)
RETURNING *;

-- name: ListCategories :many
SELECT * FROM category
ORDER BY id;

-- name: GetCategoryByID :one
SELECT * FROM category
WHERE id = $1 LIMIT 1;
