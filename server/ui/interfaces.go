package ui

import "github.com/anthony-magana/todo/server/entities"

type Service interface {
	GetAllTodos() ([]entities.Todo, error)
}