package controllers

import (
	"strconv"

	"github.com/anthony-magana/todo/server/database"
	"github.com/anthony-magana/todo/server/models"
	"github.com/gofiber/fiber/v2"
)

// create a new todo function from the current user
func CreateTodo(c *fiber.Ctx) error {
	var data map[string]string
	// parse the body of the request
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if UserId != 0 {
		todo := models.Todo{
			UserID:      UserId,
			Title:       data["title"],
			Description: data["description"],
			Completed:   false,
		}

		// create the todo
		database.DB.Create(&todo)
		// return the todo
		return c.JSON(fiber.Map{
			"message": "Success",
			"todos":   todo,
		})
	}
	return c.JSON(fiber.Map{
		"message": "You are not logged in",
	})
}

// deletes todo from the database from user
func DeleteTodo(c *fiber.Ctx) error {
	// get the post id from the url
	id := c.Params("id")
	// convert the id to a uint
	todoID, e := strconv.ParseUint(id, 10, 64)
	if e != nil {
		return e
	}

	// get the todo from the database
	var todo models.Todo
	database.DB.First(&todo, todoID)
	// delete the todo if the user_id matches
	if todo.UserID == UserId {
		database.DB.Delete(&todo)
		return c.JSON(fiber.Map{
			"message": "Success",
		})
	}
	return c.JSON(fiber.Map{
		"message": "unsuccessful, you are not the owner of this todo",
	})
}

// updates todo from database of user
func UpdateTodo(c *fiber.Ctx) error {
	var data map[string]string
	// parse the body of the request
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// get the id from the url
	id := c.Params("id")

	// convert the id to a uint
	todoID, er := strconv.ParseUint(id, 10, 64)
	if er != nil {
		return er
	}

	// comvert data["completed"] to a bool
	completed, e := strconv.ParseBool(data["completed"])
	if e != nil {
		return e
	}

	// get the todo from the database
	var todo models.Todo
	database.DB.First(&todo, todoID)

	if UserId == todo.UserID {
		// update the todo
		database.DB.Model(&todo).Update("completed", completed)
		// return the status message
		return c.JSON(fiber.Map{
			"message": "Success",
		})
	}
	// return the todo
	return c.JSON(fiber.Map{
		"message": "unsuccessful, you are not the owner of this todo",
	})
}
