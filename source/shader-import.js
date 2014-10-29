/**
 * Opens the files containing a vertex and a fragment shader. Creates the
 * shader program, and does error checking for compiling and linking.
 *
 * @param  {Array}                 paths An array of two strings that are the relative paths of the 
 *                                       vertex and fragment shaders.
 *         {WebGLRenderingContext} gl    The WebGL API.
 * @return {WebGLProgram}                Shader program that can be attached to the WebGL context.
 */
function shaderImport(paths, gl){

  var shaderReader = new XMLHttpRequest();

  var sources = [];
  var shaders = [];

  for(var i = 0; paths[i]; i++){
 
    shaderReader.open('GET', paths[i], false);

    shaderReader.onload = function(){
    
      if(shaderReader.readyState == 4){
        if(shaderReader.status == 200){
          sources[i] = shaderReader.responseText;
        } else {
          console.log(' Their was an error loading the vertex shader. \n');
        }
      }
    };

    shaderReader.send();
  }

  shaders[0] = gl.createShader(gl.VERTEX_SHADER);
  shaders[1] = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(shaders[0], sources[0]);
  gl.compileShader(shaders[0]);

  gl.shaderSource(shaders[1], sources[1]);
  gl.compileShader(shaders[1]);

  // Check to see that the shaders compiled.
  for(var j = 0; j < shaders.length; j++){
    var shader = shaders[j];
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      alert(gl.getShaderInfoLog(shader));
    }
  }

  var shaderProgram = gl.createProgram();
      
  gl.attachShader(shaderProgram, shaders[0]);
  gl.attachShader(shaderProgram, shaders[1]);
  gl.linkProgram(shaderProgram);

  // Check to see if the program linked.
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    alert(' The shaders could not be initialized.');
  }

  return shaderProgram;
}
