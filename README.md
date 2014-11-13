# Graphics Import

In a WebGL context, putting together the shader programs and manually specifying the buffer data are both tedious processes that require many steps and are difficult to debug. The files contained in this module abstract away those tasks making it easier to draw objects and shade them.

## Setup

The dependencies are the [gl-matrix](https://github.com/toj/igl-matrix), matrix and vector javascript library, along with the [qunit](http://qunitjs.com), unit testing framework. To avoid downloading these packages manually, the command

    bower install

will fetch the required libraries and place them into the *components* folder at the root directory. To get [bower](http://bower.io), [node.js](http://nodejs.org) has to be installed. Then run

    npm install -g bower

to download the package. For the [Grunt](http://gruntjs.com/getting-started) tasks, [grunt-cli](https://github.com/gruntjs/grunt-cli) has to be installed.

    npm install -g grunt-cli

Also, make sure to download all the npm packages.

    npm install

## Viewing

Running this application locally can be done with a Grunt task.

    grunt connect

To check how the template is rendering, navigate to the index file in the root directory with any browser that has WebGL support. Alternatively, check out the [project site](http://eugenekadish.github.io/scene-template) to compare the widget. The tests can be run in the browser as well, by opening *runner.html* in *tests*.


## Documentation

__objectImport(__*path*__)__

> Reads in the obj file specified at *path*. An object with arrays containing the vertices, textures, and normals is returned in a format that can be passed to the buffers and rendered directly. Each of the respective buffers are referenced as *vertices*, *textures*, and *normals*.
 
__shaderImport(__*paths*__,__ *gl*__)__

> Takes as parameters a two element array, which contains the relative paths of the vertex and fragment shaders as well as the WebGL context object. A shader program is returned if all the steps of compiling and linking succeeded.

## Usage

With all the tests passing and a working example; move on to include the functions in this module either from *source* or *distribution*. Here is a small snippet from the example using this package.

```javascript
var gl = scene.getContext('webgl');
var scene = document.getElemetById('scene');
```

```javascript
var bufferData = objectImport('data/cube.obj');
  . . .
gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(bufferData.vertices),
                                            gl.STATIC_DRAW);
```

```javascript
var shaderProgram = shaderImport(['shaders/vertex.glsl',
                                    'shaders/fragment.glsl'], gl);
  . . .
gl.useProgram(shaderProgram);
```
