function objectImport(path){

  var objectReader = new XMLHttpRequest();
 
  var file, line;

  var vertices = [];
  var textures = [];
  var normals  = [];
  var indices  = [];

  var bufferData = [];

  bufferData.vertices = [];
  bufferData.textures = [];
  bufferData.normals  = [];

  objectReader.open('GET', path, false);

  // Load the object file synchronously.
  objectReader.onload = function(){

    if(objectReader.readyState == 4){
      if(objectReader.status == 200){

        // Empty arrays are filtered out. They are returned
        // for every blank line in the file.
        file = objectReader.responseText
                           .split('\n')
                           .filter(function(item){
                             return item != [];
                           });
      } else {
        console.log(' Their was an error loading the object file. \n');
      }
    }
  };

  objectReader.send();

  file.forEach(function(line){

    line = line.split(' ')
               .filter(function(item){
                 return item !== '';
               });

    if(line[0] === 'v'){
      line[1] = parseFloat(line[1]);
      line[2] = parseFloat(line[2]);
      line[3] = parseFloat(line[3]);
      vertices.push(line.slice(1).concat([1.0]));
    } else if(line[0] === 'vt'){
      line[1] = parseFloat(line[1]);
      line[2] = parseFloat(line[2]);
      textures.push(line.slice(1));
    } else if(line[0] === 'vn'){
      line[1] = parseFloat(line[1]);
      line[2] = parseFloat(line[2]);
      line[3] = parseFloat(line[3]);
      normals.push(line.slice(1));
    } else if(line[0] === 'f'){

      for(var i = 1; i < line.length; i++){
        indices = indices.concat(line[i].split('/'));
      }
    }
  });

  // Format the data as an indexed array.
  for(var k = 0; k < indices.length; k = k + 3){

    bufferData.vertices = bufferData.vertices.concat(vertices[indices[k] - 1]);

    if(textures.length > 0){
      bufferData.textures = bufferData.textures.concat(textures[indices[k + 1] - 1]);
    }

    if(normals.length > 0){
      bufferData.normals  = bufferData.normals.concat(normals[indices[k + 2] - 1]);
    }
  }

  return bufferData;
}

function shaderImport(paths, gl){

  var shaderReader = new XMLHttpRequest();

  var sources = [];
  var shaders = [];

  /**
   * Synchronously loads source data from shader files.
   * 
   * @param {Number} i Index of a shader file path to read in.
   */
  function shaderLoader(i){
    shaderReader.onload = function(){

      if(shaderReader.readyState == 4){
        if(shaderReader.status == 200){
          sources[i] = shaderReader.responseText;
        } else {
          console.log(' Their was an error loading the vertex shader. \n');
        }
      }
    };
  }

  for(var i = 0; paths[i]; i++){

    shaderReader.open('GET', paths[i], false);
    shaderLoader(i);
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
