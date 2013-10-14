module.exports = function (grunt) {
    //Configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['server/**/*.ts'],
                dest: '.',
                options: {
                    module: 'commonjs', //or amd
                    target: 'es5', //or es3
                    sourcemap: true,
                    fullSourceMapPath: true,
                    declaration: true
                }
            }
        },
        qunit: {
            all: ['tests/index.html']
        },
        uglify: {
            all: {
                files: {
                    'server/public/js/main.min.js': ['server/public/js/app/**/*.js']
                }
            }
        },
        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                  // Index HTML
                            { expand: true, cwd: 'server/views', src: ['*.html'], dest: 'server/views' }
                ]
            }
        },
        copy: {
            all: {
                files: [
                  // Copy CSS files
                  { expand: true, cwd: 'public/css/', src: ['*.css'], dest: 'public/css/' },
                  // Copy Images
                  { expand: true, cwd: 'public/img/', src: ['**'], dest: 'public/img/' }
                ]
            }
        },
        watch: {
            typescript: {
                files: ['server/**/*.ts'],
                tasks: ['typescript', 'qunit', 'uglify'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['server/views/*.html'],
                tasks: ['htmlmin'],
                options: {
                    nospawn: true
                }
            },
            css: {
                files: ['public/css/*.css'],
                tasks: ['copy'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    //Dependencies.
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');

    //Tasks.
    grunt.registerTask('default', ['typescript', 'qunit', 'uglify', 'htmlmin']);
    grunt.registerTask('dev', ['typescript', 'qunit', 'uglify']);
};