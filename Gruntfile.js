module.exports = function(grunt) {
 
  // Configure the tasks.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: {
          options: {
            block: true,
            line: true
          }
        }
      },
      dist: {
        src: ['source/**/*.js'],
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'distribution/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
 
    jshint: {
      uses_defaults: ['Gruntfile.js', 'source/object-import.js', 'tests/*.js']
    },             

    connect: {
      server : {
        options: {
          hostname: 'localhost',
          keepalive: true
        }
      }
    }
  });
  
  // Load the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Register the tasks.
  grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
};
