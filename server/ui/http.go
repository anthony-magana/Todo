package ui

import "net/http"

type HTTPServer struct {}

func NewHTTP() *HTTPServer {
	return &HTTPServer{}
}

func (HTTPServer) UseService(s Service) {

}

func (HTTPServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
}