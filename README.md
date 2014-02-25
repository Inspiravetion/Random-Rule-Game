Random-Rule-Game
================

###Gotchas:

1.[Go](http://golang.org/) build is only for mac at the moment...easy fix though

2.[Node.js](http://nodejs.org/)  and [nvm](https://github.com/creationix/nvm) are used for client side builds
```
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh
$ nvm install 0.10.26
```

3.The automated dev enviroment uses [autoenv](https://github.com/kennethreitz/autoenv) so installing that is a must. 
```
$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> ~/.profile
```
