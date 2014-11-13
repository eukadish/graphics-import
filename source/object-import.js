/**
 * Opens an object file, reads the data, and formats it so that it can be passed to
 * buffers for rendering.
 *
 * @param  {String} path The relative path of the obj file.
 * @return {Array}       An array of arrays, each of which is either the vertices, textures, 
 *                       or normals corresponding to the triangles making the object.
 */
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
