uniform mat4 projection;
uniform mat4 modelview; 

attribute vec4 vertex;
attribute vec4 color;

varying vec4 c;

void main(){
  c = color;
  gl_Position = projection * modelview * vertex;
}
