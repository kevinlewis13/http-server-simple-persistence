'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({

    jshint: {
      dev: {
        src: ['Gruntfile.js', 'routes/**/*.js', 'tests/**/*.js']
      },
      options: {
        jshint: true
      }
    },

    simplemocha: {
      dev: {
        src: ['tests/**/*.js']
      }
    }
  });

  grunt.registerTask('linter', ['jshint:dev']);
  grunt.registerTask('tester', ['simplemocha:dev']);

};
