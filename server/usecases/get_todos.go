package usecases

import "github.com/anthony-magana/todo/server/entities"

func GetTodos(repo TodosRepository) ([]entities.Todo, error) {
	todos, err := repo.GetAllTodos()

	if err != nil {
		return nil, ErrInternal
	}
	return todos, nil
}
