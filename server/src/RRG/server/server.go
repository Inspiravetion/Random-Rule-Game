package server

import (
	"github.com/codegangsta/martini"
)

func Start() {

	m := martini.Classic()

	m.Get("/", func() string {
		return "Hello world!"
	})

	m.Get("/BadaBing", func() string {
		return "BadaBoom"
	})

	m.Get("/Styled", func() string {
		return "<div style='color:red'> I should be red </div>"
	})

	m.Run()

}
