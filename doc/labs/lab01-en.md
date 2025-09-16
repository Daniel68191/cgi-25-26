# Practical lesson 1 - Setting up the development environment and introductory examples

In the Computer Graphics and Interfaces lessons, we will use the WebGL API to develop our programmes and projects. Although our applications, because they run in a browser, do not require much help in terms of IDE - for example, it is not necessary to compile our programmes - using an IDE has other advantages.

The chosen IDE is Microsoft Visual Studio Code, which has versions for MacOS, Windows, and Linux. This IDE is extensible, making it possible to install a series of extensions to meet a wide range of needs. In our case, we will need the following extensions for now:

- Live server - a web server with support for live reloading of static and dynamic pages
- WebGL GLSL Editor - support for syntax highlighting in shaders
-
To open the extensions panel, press **CTRL**+**SHIFT**+**X** (Windows and Linux) or  **CMD**+**Shift**+**X** (Mac), search for the extension by typing its name, and select the ‘Install’ option.

**Hint**: Visual Studio Code shortcuts for [Mac](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf_), [Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf_) and [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf).

## Repository for CGI

During the semester, we will adopt a rigid structure for our folders. The adopted structure is exemplified below:

```.

├── doc
│   ├── labs
│   │   └── lab01.md
│   └── prjs
├── README.md
└── src
    ├── labs
    │   └── ex01
    │       ├── app.js
    │       ├── index.html
    │       └── shaders
    │           ├── shader.frag
    │           └── shader.vert
    ├── libs
    │   ├── dat.gui.min.js
    │   ├── dat.gui.module.js
    │   ├── dat.gui.module.js.map
    │   ├── MV.js
    │   ├── objects
    │   │   ├── ...
    │   │   └── ...
    │   ├── stack.js
    │   ├── three.module.js
    │   └── utils.js
    └── prjs
        ├── prj1
        ├── prj2
        └── prj3
```

The following stands out in this structure:

- A ```doc``` folder where all the practical class scripts and project statements will be stored.
- A ```src``` folder where all the source code will be stored.

Inside the ```src``` folder, the structure is as follows: 
- A ```libs``` folder where the files corresponding to the libraries used are stored
- A ```labs``` folder to store the folders with the code related to the exercises to be solved in practical classes.
- An ```exNN``` folder, inside the ```labs``` folder, for each proposed exercise. This folder will contain all the files necessary to solve the respective exercise, except for the libraries mentioned above. The contents of these folders should not be edited by students, as they will be updated in the repository by the teaching team (for example, to provide solutions).
- A ```my-exNN``` folder that should be initialised with a full copy of the ```exNN``` folder to start solving the exercise. It is in this folder that each student/group should write their code.
- A folder named ```projects``` to store the solutions to the projects for assessment.

For each exercise, we will also follow the following convention to organise the respective files (see ```ex01``` above):

- A file named ```index.html``` with the HTML code corresponding to the structure of our application
A file named ```app.js``` with the main code of the application
- A shaders folder to store all the shaders used by the application (the extensions for these shaders will be .vert and .frag for vertex and fragment shaders, respectively.
- If there are more JavaScript files needed, other than those in the library, they can be placed at the same level as the main file, or organised in a folder named js.

To do the initial setup of our folders, we will start by cloning the official course repository. This repository will be updated throughout the semester, so you will need to update your local copies frequently.

1. Choose a location in the file system to store all CGI code
2. Clone [this repository](https://gitlab.com/CGI-Code/cgi-25-26) to that location
3. Open Visual Studio Code and choose the ‘Open Folder’ option to open the entire CGI file tree

Translated with DeepL.com (free version)