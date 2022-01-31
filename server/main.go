package main

import (
	// "./database"
	// "./routes"
	"github.com/anthony-magana/todo/server/database"
	"github.com/anthony-magana/todo/server/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {

	database.Connect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":5000")
}
