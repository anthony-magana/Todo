package usecases

import "github.com/anthony-magana/todo/server/entities"

type TodosRepository interface {
	GetAllTodos() ([]entities.Todo, error)
}