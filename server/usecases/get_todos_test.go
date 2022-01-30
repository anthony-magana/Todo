package usecases_test

import (
	"testing"
	"fmt"
	"github.com/anthony-magana/todo/server/entities"
	"github.com/anthony-magana/todo/server/usecases"
)

var dummyTodos = []entities.Todo{
	{
		Title: "Todo 1",
		Description: "Description 1",
		Completed: true,
	},
	{
		Title: "Todo 2",
		Description: "Description 2",
		Completed: true,
	},
	{
		Title: "Todo 3",
		Description: "Description 3",
		Completed: true,
	},
}


type badTodosRepo struct {}

func (badTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	return nil, fmt.Errorf("Panic, something went wrong")
}

type mockTodosRepo struct {}

func (mockTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	return dummyTodos, nil
}

func TestGetTodos(t *testing.T) {

	// Test
	t.Run("Should return ErrInternal when TodosRepository returns error", func(t *testing.T) {
		repo := new(badTodosRepo)

		todos, err := usecases.GetTodos(repo)

		if err != usecases.ErrInternal {
			t.Fatalf("Expected ErrInternal, got %v", err)
		}
		if todos != nil {
			t.Fatalf("Expected todos to be nil, got %v", todos)
		}
	})
	t.Run("Returns todos from TodosRepository", func(t *testing.T) {
		repo := new(mockTodosRepo)

		todos, err := usecases.GetTodos(repo)

		if err != nil {
			t.Fatalf("Expected no error, got %v", err)
		}
		if todos == nil {
			t.Fatalf("Expected todos to be not nil, got %v", todos)
		}
		if len(todos) != len(dummyTodos) {
			t.Fatalf("Expected todos to have %d elements, got %d", len(dummyTodos), len(todos))
		}
	})
}