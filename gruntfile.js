module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/js/*.js',
        dest: 'scripts.min.js'
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          preserveComments: 'all'
        },
        src: 'src/js/*.js',
        dest: 'scripts.min.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['index.html']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['src/css/*.scss'],
        tasks: ['sass:dev']
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'style.css' : 'src/css/style.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'style.css' : 'src/css/style.scss'
        }
      }
    },


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); //grunt watch
  grunt.loadNpmTasks('grunt-sass');
  //runs with grunt
  grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
  grunt.registerTask('build', ['uglify:build', 'sass:build']);


};
