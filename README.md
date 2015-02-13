# chili-classroom-server

This is an implementation of a (web-based) classroom server for the "Tessellated Battleship" game (a game about fractions, geometry and coordinate systems). It is implemented using [Meteor](https://www.meteor.com/), and it is loosely based on the example of [the meteor classroom](https://github.com/lprisan/meteor-classroom) initial implementation by Luis P. Prieto.

# Features
The current prototype concentrates on having a **reactive visualization** of the classroom/devices state:

http://localhost:3000/visualization

...and exposing a **REST API** for such a state, in the form:

http://localhost:3000/api/classrooms - exposes the global classroom state objects (JSON), including devices (lamps) in the classroom

http://localhost:3000/api/devices - exposes the device state objects (JSON), including tags present in the device camera

# Installation

1. Clone this repository, typically with `git clone <url>`
2. Install meteor, meteorite and the needed packages
```
sudo apt-get install npm curl nodejs-legacy
curl https://install.meteor.com/ | sh
sudo -H npm install -g meteorite
mrt add iron-router http-publish collection-api
```


# Usage
From the command line within the project root folder, run:

```
meteor
```
