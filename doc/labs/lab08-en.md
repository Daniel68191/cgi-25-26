# Practical Lesson 8 - Perspective Projection

## Introduction

![Perspective Projection](./assets/perspective.jpg)

Perspective projection, with the field of view centred on the Z axis (in the camera reference frame), can be defined using the following parameters:

- fovy - angle representing the vertical field of view
aspect - the ratio between the width and height of the field of view
- near - distance (in front of the camera) at which the front clipping plane is located
- far - distance (in front of the camera) at which the rear clipping plane is located

The [MV.js](../../src/libs/MV.js) library provides the function:

[perspective(fovy, aspect, near, far)](../../src/libs/MV.js#L506)

which returns the projection matrix. This matrix transforms the specified view volume into the canonical clip space [-1,1]x[-1,1]x[-1,1].

In this series of exercises, the aim is to develop an application that allows the user to control the camera parameters (position and orientation) and the perspective projection (mentioned above).

The scene consists of a sphere and a cube without any modelling transformation applied to them. The sphere can be viewed in wireframe or with a filled surface, while the cube is always viewed in wireframe. The colour should be a solid colour or the RGB mapping of the normals.

## ex24

Build the interface that will allow you to control the projection parameters, as well as the viewing options, using the [dat.gui] library. The library is located in the [CGI repository](../../src/libs/dat.gui.module.js), but we recommend consulting the [official repository](https://github.com/dataarts/dat.gui).

The interface should look similar to this:

![Interface ex24](./assets/interface-ex-perspective.png)

The application should already allow you to view objects, even though the camera is still fixed. Use the following initial values:

- eye = (0,0,5)
- at = (0,0,0)
- up=(0,1,0)
- fovy = 45
- aspect (determined by the aspect ratio of the browser window)
- near = 0.1
- far = 20

Note that `far` must always be greater than `near`. The parameters `fovy`, `near` and `far` can be manipulated directly in the controllers provided by the interface. The value of `aspect` must always be locked and must be equal to the aspect ratio of the browser window.

The parameters `eye`, `at` and `up` should not be manipulated in the interface, although their values can be viewed there.

The interface should allow the user to choose the display mode (wireframe/filled) and whether the shader will draw objects with a solid colour or with normal mapping for colour.

Use the code available in [ex24-step0](../../src/labs/ex24-step0) as a starting point.

## ex25

Make your application reactive to changes in the `near`, `far`, and `fovy` parameters. The latter can also be controlled using the "wheel" event on the canvas. The interface should show the fovy value always updated, even if it is changed through the "wheel" event, instead of directly manipulating the slider on the graphical interface.

Make the application react to the display options (wireframe/filled) and the use of normals in the colour of the primitives.

Here are two examples of different moments of use of the application:

![Wireframe view](./assets/interfacePerspectiva2.png)

![Preview with fill](./assets/interfacePerspectiva3.png)

In the first example, the sphere is drawn in wireframe mode and the rear clipping plane is clipping the objects, while in the second example it is the front clipping plane that is clipping the objects, with the sphere drawn in fill mode.

## ex26

The application should now allow the user to manipulate the `eye` and `at` parameters as follows:

In the "wheel" event, if a modifier key (e.g. CTRL) is being pressed, then the value of `eye` should move closer to/further away from `at`, depending on whether the "wheel" event reports that the wheel has moved in one direction or the other.
In the "wheel" event, if another modifier key is being pressed (e.g. ALT), then both `eye` and `at` should move forward (relative to the camera) or backward, depending on the direction given by the "wheel" event. The distance between `eye` and `at` remains unchanged.

Do you notice any difference between the two previous approaches?

## ex27

Modify your application so that when you click on the canvas and drag the mouse, the camera can rotate, keeping the focus on the same point, according to the movement you make with the mouse.

Here is a short video demonstrating the application. The sections of the video with a red background correspond to the moments when this feature was used.

[![Demo](./assets/Video_demo_perspective.png)](https://youtu.be/0cwCKLq_Uy0)