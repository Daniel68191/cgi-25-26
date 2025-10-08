# Practical Lesson 4 - Instantiation of Primitives

## Introduction

In this session, we will develop a small application that allows you to view a scene defined by the instantiation of primitive objects, to which a specific instantiation transformation will be associated.

The user can add to the scene, whose structure is linear (a simple list of objects), an object chosen from a set of available primitive objects.

The skeleton of the application is provided and can be obtained from the [repository](https://gitlab.com/CGI-Code/cgi-25-26) that we have been using.

If you notice, when the application is launched, we only see a cube, which does not change because the application interface is not currently doing anything useful.

Read the application code [app.js](../../src/labs/ex12-step0/app.js) and identify where the object is drawn. You will notice that the function used to draw the primitive object is part of one of the JavaScript modules provided with the example. Take a look at the files [libs/objects/cube.js](../../src/libs/objects/cube.js) and [libs/objects/sphere.js](../../src/libs/objects/sphere.js). Note the functions that are exported by the modules, what they do, and where they are being called in the [app.js](../../src/labs/ex12-step0/app.js) script.

The right side of the interface is organized as follows:

- Top: a list containing the name of each of the objects that make up the scene displayed on the left side of the window
- A section where you can add new primitive objects or delete an object from the scene
- A section showing the properties of the selected (active) object

## ex12 - Adding objects to the scene

Modify the given application so that we can add a cube or a sphere to the list of objects in the scene by pressing the appropriate button. The name of the object to be added to the list can be generated automatically, but it should be unique for each instance. Refer to the documentation for HTMLSelectElement objects, paying particular attention to the add() method.

To do this, you will need to make the following changes:

- Program the event handlers for the “Add Cube” and “Add Sphere” buttons. For each of these buttons, you must record in your application (using one or more arrays) that you have another instance of a primitive object. For now, it will suffice to record which of the primitives was created, but later this will have to be changed.
- Modify the function that redraws the canvas to go through the information stored in the instance vector and draw the corresponding object. Note that to draw an object, the vertex shader provided expects to be given a 4x4 matrix (u_ctm) representing the current transformation matrix for that instance. This matrix corresponds to the product of three matrices:


    `mProjection * mView * mModel`. 

    The first two matrices are already initialized and do not need to be changed. The last matrix corresponds to the modeling transformation of the instance being drawn. To begin with, you can assume that it is the identity matrix. In the next exercise, this will be modified.

## ex13 - Editing the transformation of the last object inserted

In exercise ex12, we reached a point where we can add cubes and spheres to our scene, but we can only distinguish a maximum of two objects—a cube and a sphere—even if we have created several of each type.

What is happening is that the various cubes that may have been created cannot be distinguished from each other, and the same is true for the various spheres that may have been created.

To solve this problem, we will associate each instance with a geometric instantiation transformation that will allow us to scale, orient, and position the objects in the scene and thus distinguish the various instances.

For now, we will only make the interface available to affect the last instance created. Thus, if the scene is empty, the respective interface elements should be inactive. When an instance is added, any change in these interface elements should produce a change in the specific mModel transformation of that instance, so that when the scene is drawn, we can see the object with the respective transformation applied.

The mModel matrix of the instance being manipulated corresponds to the following composition:

    mModel = T(px, py, pz) Rz(rz) Ry(ry) Rx(rx) S(sx, sy, sz)

The values of the parameters of these transformations are those present in the interface.

To solve this exercise, you must:

- Program the “change” events of the interface elements and update the mModel matrix of the last instance.
- Add the respective mModel transformation to the instance vector.

## ex14 - Removing instances

Program the “Remove” button event to remove the instance selected in the list. When you delete that instance, the previous one should become selected.

## ex15 - Editing the transformation of any object in the scene

Modify the application so that you can select any instance from the list and then edit the modeling transformation of that instance.

To perform this task, you first need to retrieve the parameters and place them in the interface boxes. This is impossible if you have only saved the mModel matrix for each instance. Think of a solution and implement it.

## ex16 - Order of application of transformations
Try changing the order of application of the transformations, testing the following (in this order of application):

- 1st Rotations, 2nd Scale, 3rd Translation
- 1st Rotation, 2nd Translation, 3rd Scale
- 1st Translation, 2nd Scale, 3rd Rotations
- 1st Translation, 2nd Rotations, 3rd Scale

## ex17 - Additional primitives

Add the following primitives to your application:

- cylinder
- torus
- pyramid

Don't forget to add the corresponding buttons.