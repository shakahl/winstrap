module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                outputStyle: 'nested',
                sourceMap: true,
                precision: 5
            },
            dist: {
                files: {
                    'dist/css/app.css': 'src/scss/app.scss'
                }
            }
        },

        // Copy doc files
        copy: {
            doc: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: 'app.js',
                        dest: 'dist/js/'
                    }
                ]
            }
        },

        // Build the main HTML file of the style guide
        assemble: {
            options: {
                partials: ['src/doc/partials/**/*.hbs'],
                layout: ['src/doc/layouts/default.hbs'],
                flatten: true,

                // Set the version number
                version: '<%= pkg.version %>',

                // Name of the project
                name: '<%= pkg.name %>',
            },
            pages: {
                src: ['src/doc/*.hbs'],
                dest: './dist/'
            }
        },

        watch: {
            sass: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass']
            },

            doc: {
                files: ['src/doc/**/*', 'src/js/*.js'],
                tasks: ['assemble', 'copy:doc']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                src: [
                    'dist/*.html',
                    'dist/css/*.css',
                    'dist/fonts/*.{eot,ttf,woff}',
                    'dist/images/**',
                    'dist/js/*.js',
                    'external/**',
                    'src/**',
                    'Gruntfile.js',
                    'package.json'
                ]
            }
        }

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'assemble', 'copy']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('zip', ['compress']);
}