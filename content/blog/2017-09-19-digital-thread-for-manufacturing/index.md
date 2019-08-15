---
title: "Digital Thread for Manufacturing"
date: "2017-09-19"
---

In the Summer of 2016, I was employed by STEPTools to work on the [Digital Thread for Manufacturing](http://www.steptools.com/sln/thread/). Our solution for monitoring machine tool processes remotely in real time [was a winner of the 2016 MTConnect Student Challenge](https://devpost.com/software/nc-js), sponsored by the Dept. of Defense. I presented this technology at the International Manufacturing Technology Show ([IMTS](http://www.imts.com)) in Chicago last Fall.

Our test setup of the simulation was an Okuma OSP-P300 on a LAN with the NC.js server. The Okuma feeds the MTConnect data to the server which then parses and uses it to drive the simulation. MTConnect’s “PathPosition” tag is used to drive the position of the tool during runtime, while the GCode block numbers allow us to determine the active working step and display toolpaths relevant to the current operation. We also use MTConnect to determine the feedrate of the tool. In the future we plan to compare it to the expected feedrate values for error analysis. The backend uses Node.js and the frontend uses React.js in order to parse the MTConnect and STEP data that is attached to the live server.

I created the solution for emitting, receiving, parsing, and interpreting the MTConnect information from the machine tool, as well as the code to drive the 3D simulation from the data received.

Seeing the activity of a machining tool in real time allows for levels of oversight not otherwise possible. NC.js enables supervision of an operation and confidence that tolerances are being met, without needing to be physically present for the machining of a part. Various tools can be used in the simulation in order to see if there will be any problems with a different size tool. A tool of the wrong size can be caught before machining begins by using the simulation environment to change what tool is being used on the machine. Because NC.js is designed to be web based it is possible for a part to be monitored anywhere in the world. The software could be used in a commercial setting to prove the effectiveness of newly developed tools or optimized toolpaths. The largest possible benefit is in the potential automation of machining. Automatically ensuring tolerances are being met could eliminate the need for human oversight.

![inrtusj-2](images/inrtusj-2.png)
