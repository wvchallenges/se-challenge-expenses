package main

import (
	"net/http"
)

func helloWorld(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("Hello, world!"))
}

func main() {
	http.HandleFunc("/", helloWorld)
	http.ListenAndServe(":9001", nil)
}
