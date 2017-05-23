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
            html: {
                cwd: 'websrc',
                src: ['assets/files/**', 'assets/fonts/**','index.html'],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
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
                    'build/assets/css/style.min.css': [
                        'websrc/assets/css/font-awesome.min.css',
                        'websrc/assets/css/main.css',
                        'websrc/assets/css/custom.css',
                        'websrc/assets/css/highlight.css',
                        'websrc/assets/css/animate.css'
                    ]
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
            },
            js: {
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
        },
        watch: {
            scripts: {
                files: ['websrc/**'],
                tasks: ['copy:html', 'cssmin', 'concat:cssImport', 'concat:js'],
                options: {
                    spawn: false
                },
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'copy:html', 'imagemin', 'cssmin', 'concat:cssImport', 'concat:js', 'watch']);
    grunt.registerTask('build-prod', ['clean', 'copy:build', 'imagemin', 'htmlmin', 'cssmin', 'concat:cssImport', 'uglify']);
};