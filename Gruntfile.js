module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                options: {
                    banner: '/*! Portfolio - Sarath S Nair */',
                },
                files: {
                    'build/assets/js/app.min.js': [
                        'websrc/assets/js/jquery.min.js',
                        'websrc/assets/js/jquery.nicescroll.min.js',
                        'websrc/assets/js/skel.min.js',
                        'websrc/assets/js/wow.min.js',
                        'websrc/assets/js/util.js',
                        'websrc/assets/js/main.js'
                    ],
                }
            }
        },
        copy: {
            build: {
                cwd: 'websrc',
                src: ['assets/files/**', 'assets/fonts/**'],
                dest: 'build',
                expand: true
            },
        },
        clean: {
            build: {
                src: ['build', 'assets', 'index.html']
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true
                },
                files: {
                    'build/index.html': 'websrc/index.html',
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/assets/css/style.min.css': ['websrc/assets/css/**/*.css']
                }
            }
        },
        concat: {
            cssImport: {
                options: {
                    process: function (src, filepath) {
                        return "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,600italic|Roboto+Slab:400,700);" + src.replace('@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,600italic|Roboto+Slab:400,700);', '');
                    }
                },
                files: {
                    'build/assets/css/style.min.css': ['build/assets/css/style.min.css']
                }
            }

        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'websrc/assets/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/assets/images'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('build', ['clean', 'copy','imagemin', 'htmlmin', 'cssmin', 'concat:cssImport', 'uglify']);
};