# chili-classroom-server

This is an implementation of a (web-based) classroom server for the "Tessellated Battleship" game (a game about fractions, geometry and coordinate systems). It is implemented using [Meteor](https://www.meteor.com/), and it is loosely based on the example of [the meteor classroom](https://github.com/lprisan/meteor-classroom) initial implementation by [Luis P. Prieto](https://github.com/lprisan).

# Features
The current prototype concentrates on having a **reactive visualization** of the classroom-level activity (a collaborative variant of [the battleship board game](http://en.wikipedia.org/wiki/Battleship_%28game%29)).

http://localhost:3000/

...and exposing a **REST API** for such a state, in the form:

http://localhost:3000/api/classrooms - exposes the global classroom state objects (JSON), including devices (lamps) in the classroom

http://localhost:3000/api/devices - exposes the device state objects (JSON), including tags present in the device camera

# Installation

1. Clone this repository, typically with `git clone <url>`
2. Install meteor
```
curl https://install.meteor.com/ | sh
```


# Usage
From the command line within the project root folder, run:

```
meteor
```
