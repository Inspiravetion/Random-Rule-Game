Random-Rule-Game
================

###Gotchas:

1.Need to install [Go](http://golang.org/) for server dev.

2.Go cross compilation used to create linux executables on a mac.
```
$ cd $(go env GOROOT)/src
$ git clone git://github.com/davecheney/golang-crosscompile.git
$ source golang-crosscompile/crosscompile.bash
$ go-crosscompile-build-all
```

3.[Node.js](http://nodejs.org/)  and [nvm](https://github.com/creationix/nvm) are used for client side builds
```
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh
$ nvm install 0.10.26
```

4.The automated dev enviroment uses [autoenv](https://github.com/kennethreitz/autoenv) so installing that is a must. 
```
$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> ~/.profile
```
