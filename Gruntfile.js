module.exports = function (grunt) {
    //Configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['server/**/*.ts'],
                dest: 'server/js/',
                options: {
                    module: 'commonjs', //or amd
                    target: 'es5', //or es3
                    base_path: 'server',
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
            options: {
                banner: '/* typescript-app-template <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
            },
            all: {
                files: [
                  { expand: true, cwd: 'server/js/', src: ['**/*.js'], dest: 'server/js/', ext: '.min.js' }
                ]
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
    grunt.registerTask('default', ['typescript', 'qunit', 'uglify', 'htmlmin', 'copy']);
};