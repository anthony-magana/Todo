package models

type Todo struct {
	UserID      uint   `json:"user_id"`
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}
