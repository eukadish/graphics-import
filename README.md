# Graphics Import

> Utility functions for rendering with WebGL.

## Summary

In a WebGL context, putting together the shader programs and manually specifying the buffer data are both tedious processes that require many steps and are difficult to debug. The files contained in this module abstract away those tasks making it easier to draw objects and shade them.

## Setup

The dependencies are [gl-matrix](https://github.com/toji/gl-matrix) matrix and vector javascript library, along with the [qunit](http://qunitjs.com) unit testing framework. To run the tests navigate to the *runner.html* file in the tests directory with your browser. To avoid downloading these packages manually, the command

    bower install

will fetch the required libraries and place them into the *components* folder at the root directory. The [bower](http://bower.io) command requires [node.js](http://nodejs.org) to be installed.

    npm install bower

will download the package.

## Viewing

To checkout the example after all the dependencies have been successfully downloaded, open the contents of the example folder or just look at the [demo](http://eugenekadish.github.io/graphics-import).

## Documentation

__objectImport(__*path*__)__

> Reads in the obj file specified at *path*. An array of arrays is returned, which are the vertex, textures, and normals in a format that can be passed to the buffers and rendered directly. Each of the respective buffers are indexed as *vertices*, *textures*, and *normals*.
 
__shaderImport(__*paths*__,__ *gl*__)__

> Takes as parameters a two element array, which contains the relative paths of the vertex and fragment shaders as well as the WebGL context object. A shader program is returned if all the steps of compiling and linking succeeded.

## Usage

With all the tests passing and a working example; move on to include the two source files that come with this module.

```html
<script src="path/to/object-import.js"></script>
<script src="path/to/shader-import.js"></script>
```

Here is a small snippet from the example using this package.

```javascript
var scene = document.getElemetById('scene');
  . . .
var gl = scene.getContext("webgl");
```

```javascript
var bufferData = objectImport("data/cube.obj");
  . . .
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData["vertices"]), gl.STATIC_DRAW);
```

```javascript
var shaderProgram = shaderImport(["shaders/vertex.glsl", "shaders/fragment.glsl"], gl);
  . . .
gl.useProgram(shaderProgram);
```
