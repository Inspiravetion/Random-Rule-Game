all:
	go build ./src/RRG/Server.go

linux: 
	GOOS="linux" GOARCH="amd64" go build -o prod/Server-linux-amd64 ./src/RRG/Server.go

test:
	cd ./src/RRG; GOPATH=$(shell python -c "import os,sys; print os.path.realpath(sys.argv[1])" $PWD/..); ../../bin/goconvey