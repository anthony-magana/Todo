package routes

import (
	// "../controllers"
	"github.com/anthony-magana/todo/server/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Post("/api/todos/create", controllers.CreateTodo)
	app.Delete("/api/todos/delete/:id", controllers.DeleteTodo)
	app.Put("/api/todos/update/:id", controllers.UpdateTodo)
}
