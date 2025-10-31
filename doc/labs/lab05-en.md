# Practical Lesson 5 - Hierarchical Modeling

## Introduction

![solar system](./assets/solarsystem-2xl.png)

The solar system is essentially empty space. If we modeled it to scale, the celestial bodies that compose it would be too small and too far apart for the scene to be viewed as a whole. As an alternative, we propose changing the dimensions as follows:

- All celestial bodies are enlarged by a factor (e.g., 10).
- All orbits (except for the Moon's orbit around the Earth) are reduced by a factor (e.g., 60).
The constants used in the simulation can be found (almost all of them) [here](http://www.exploratorium.edu/ronh/solar_system/).

The application should allow the animation of the Sun and the modeled planets, allowing the user to speed up, slow down, and even stop the evolution of time.

## Preparation

Use the files available in the repository to start the exercise. Examine the constants relating to the dimensions and durations of the orbits and days of each celestial body.


Start by drawing the scene graph corresponding to the Sun (on paper), including its rotation. Use a `time` variable in your graph to represent the simulation time (in days).

# ex18 - Sun

Write a function `Sun()` in your program containing the code resulting from the translation of your graph from the previous step. Call the function you just wrote from your `render()` function.

## ex19 - Sun, Mercury, and Venus

Add the planets Mercury and Venus to your graph (on paper), including their rotations around their own axes and their translational movements around the Sun. For simplicity, let's assume that the axes of rotation of all planets are aligned with the Y-axis of the world.

Add to your code the functions that draw (at the origin) each of the planets in question: Mercury and Venus. Then call the new functions, as well as the previous function (`Sun()`) from your `render()` function.

## ex20 - Earth and Moon

Build a new scene graph, referring only to the Earth-Moon pair, including the Earth's rotational movement (which should have its axis aligned with Y and be centered at the origin) as well as the Moon's translational movement around the Earth.

Build two functions, `Earth()` and `Moon()`, as well as a function `EarthAndMoon()` that uses them and allows you to view the whole set.

## ex21 - View from the Sun to the Moon

Add the Earth-Moon pair subgraph to your solar system graph. 

Incorporate everything into your program.

**Note**: Don't forget to set appropriate limits for the viewing volume as you increase the scope of your solar system. You will probably have to modify the radius of the lunar orbit so that it is drawn without colliding with the Earth.

## ex22 - Complete Solar System

Add the remaining planets of the solar system. See what happens if you model the system to scale.

## ex23 - Modeling a robot arm

![robot arm](./assets/robotarm-2xl.png)

Build the scene graph corresponding to a robot arm, similar to the one in the figure. It is up to you to define the measurements of each element, as well as the appropriate variations (limits) of the graph parameters that give the model its degrees of freedom.

Write the program that implements the scene graph, giving the user the necessary control to manipulate the model (parameter variation). Don't worry about lighting.