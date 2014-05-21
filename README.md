# Graphics Import
> Utility functions for rendering with webGL.

## What's this for?

In a webGL context, putting together the shader programs and manually specifying the buffer data are both tedious processes that require many steps and are difficult to debug. The files contained in this module abstract away those tasks making it easier to draw objects and shade them.

## Set Up

To run the tests navigate to the *runner.html* file in the tests directory with your browser. Just make sure to run

    bower install

beforehand for *qunit* to download. If all tests are passing you can move on to include the two files, *object-import.js* and *shader-import.js*, that contain the functions *objectImport* and *shaderImport*.

```html
<script src="path/to/object-import.js"> </script>
<script src="path/to/shader-import.js"> </script>
```

Now you can use the functions *shaderImport* and *objectImport* in the webGL context.

## Usage

The code snippets are in the *scripts.js* file of the example.

```javascript
    var bufferObject = objectImport("data/cube.obj");
      . . . 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData["vertices"]), gl.STATIC_DRAW);
```

```javascript
   var gl = document.getElementById("scene").getContext("webgl");
     . . . 
   var shaderProgram = shaderImport(["shaders/vertex.glsl", "shaders/fragment.glsl"], gl);
     . . . 
   gl.useProgram(shaderProgram);

```

objectImport* sets up an array of arrays, which are the vertex, textures, and normals in a format that can be passed to the buffers and rendered directly. Each of the respective buffers are indexed as *vertices*, *textures*, and *normals*. *shaderImport* takes as parameters the paths to the vertex and fragment shaders as well as the webGL context object. It returns the object that represents the shader program if all the steps of compiling and linking succeeded.
