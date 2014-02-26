TEST_DIRS = $(wildcard ./src/rrg/*)

all:
	go build ./Server.go

everything:
	go build -a ./Server.go

linux: 
	GOOS="linux" GOARCH="amd64" go build -o prod/Server-linux-amd64 ./Server.go

test:
	go test -v $(TEST_DIRS)
