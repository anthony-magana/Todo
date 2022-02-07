package main

import (
	// "./database"
	// "./routes"
	"os"

	"github.com/anthony-magana/todo/server/database"
	"github.com/anthony-magana/todo/server/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}
