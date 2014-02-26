Random-Rule-Game
================

###Environment Setup Steps:

1.Install [Go](http://golang.org/) for server dev.

2.Run the following to setup Go cross compilation (used to create linux executables on a mac).
```
$ cd $(go env GOROOT)/src
$ git clone git://github.com/davecheney/golang-crosscompile.git
$ source golang-crosscompile/crosscompile.bash
$ go-crosscompile-build-all
```

3.Serverside testing setup assumes you have [python](http://www.python.org/) installed.

4.Run the following to install [nvm](https://github.com/creationix/nvm) and [Node.js](http://nodejs.org/).
```
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh
$ nvm install 0.10.26
```

5.The automated dev enviroment uses [autoenv](https://github.com/kennethreitz/autoenv) so install it with the following commands. 
```
$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> ~/.profile
```

6.Clone this repo to your project directory.
```
$ cd path/to/your/project
$ git clone https://github.com/Inspiravetion/Random-Rule-Game.git
```
