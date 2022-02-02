package routes

import (
	// "../controllers"
	"github.com/anthony-magana/todo/server/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
}
