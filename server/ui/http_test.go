package ui_test

import (
	"testing"
	"fmt"
	"net/http/httptest"
	"github.com/anthony-magana/todo/server/entities"
	"github.com/anthony-magana/todo/server/ui"
	"encoding/json"
)

type MockService struct {
	err error
	todos []entities.Todo
}

func (s MockService) GetAllTodos() ([]entities.Todo, error) {
	if s.err != nil {
		return nil, s.err
	}
	return s.todos, nil
}

func TestHTPP(t *testing.T) {
	type Test struct {
		name string

		service *MockService
		inputMethod string
		inputURL string

		expectedStatus int
		expectedTodos []entities.Todo
	}

	tests := []Test{
		{
			name: "random error gives 500 status and no todos",
			service: &MockService{err: fmt.Errorf("random error")},
			inputMethod: "GET",
			inputURL: "http://localhost:1080/",
			expectedStatus: 500,
			expectedTodos: []entities.Todo{},
		},
	}

	for _, test := range tests {

		t.Run(test.name, func(t *testing.T) {

			w := httptest.NewRecorder()
			r := httptest.NewRequest(test.inputMethod, test.inputURL, nil)

			server := ui.NewHTTP()

			server.UseService(test.service)

			server.ServeHTTP(w, r)

			var body []entities.Todo
			json.NewDecoder(w.Result().Body).Decode(&body)

			if w.Result().StatusCode != test.expectedStatus {
				t.Fatalf("Expected status code %v, got %v", test.expectedStatus, w.Result().StatusCode)
			}

			if len(body) != len(test.expectedTodos) {
				t.Fatalf("Expected todos to be %v, got %v", test.expectedTodos, body)
			}
		})
	}
}