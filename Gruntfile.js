module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      build: {
        options: {
          paths: ["lib/less/bootstrap"],
          yuicompress: true
        },
        files: {
          "build/css/Window.css": "src/less/Window.less",
          "build/css/WindowManager.css": "src/less/WindowManager.less"
        }
      }
    },
    bower: {
      install: {
        options: {
          layout: 'byType',
          cleanBowerDir: true
        }
      }
    },
    clean: {
      dist: ["dist"],
      build: ["build"],
      libs: ["bower_components", "lib"],
      demo: ["demo"]
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'dist', src: ['**/*'], dest: 'demo/'},
          {expand: true, cwd: 'src/demo/', src: ['*'], dest: 'demo/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 3030,
          base: 'demo',
          keepalive: true
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/bootstrap-window.css': ['build/css/Window.css', 'build/css/WindowManager.css']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower-task');


  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['concat', 'less', 'cssmin', 'uglify']);

  grunt.registerTask('default', ['bower', 'jshint', 'build']);

  grunt.registerTask('demo', ['default', 'copy', 'connect']);

};