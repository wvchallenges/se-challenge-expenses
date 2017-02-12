var fs = require('fs'),
    ini = require('ini');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var code = null;
    var envConfig = null;
    try {
        code = fs.readFileSync('envconfig.js', 'utf-8');
        eval(code); // jshint ignore:line
    } catch(e) {
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            src: 'src',
            dist: 'dist'
        },
        env: envConfig || {},

        htmlhint: {
            all: {
                options: {
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'attr-value-not-empty': false,
                    'attr-no-duplication': true,
                    'doctype-first': false,
                    'tag-pair': true,
                    'tag-self-close': false,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true
                },
                src: ['<%= project.src %>/**/*.html']
            }
        },

        jshint: {
            options: {
                'eqnull': true
            },
            all: {
                src: ['Gruntfile.js', '<%= project.src %>/app/**/*.js']
            }
        },

        clean: {
            index: ['<%= project.dist %>/index.html'],
            js: ['<%= project.dist %>/app/bundle.js'],
            html: ['<%= project.dist %>/app/components/**/*.html'],
            css: ['<%= project.dist %>/styles/**'],
            main: ['<%= project.dist %>/**'],
            assets: ['<%= project.dist %>/images/**']
        },

        concat: {
            main: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= project.dist %>/app/bundle.js': [
                        'envconfig.js',
                        '<%= project.src %>/app/**/*.js'
                    ]
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/',
                    src: ['app/components/**/*.html'],
                    dest: '<%= project.dist %>'
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/',
                    src: ['images/**'],
                    dest: '<%= project.dist %>'
                }]
            },
            dependencies: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: ['**'],
                    dest: '<%= project.dist %>/vendors'
                }]
            }
        },

        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: '<%= project.dist %>/styles/main.css.map'
                },
                files: {
                    '<%= project.dist %>/styles/main.css': '<%= project.src %>/styles/main.less'
                }
            }
        },

        htmlbuild: {
            main: {
                src: '<%= project.src %>/index.html',
                dest: '<%= project.dist %>/index.html',
                options: {
                    beautify: true,
                    relative: true,
                    data: {
                        junctionUrl: '<%= env.junctionUrl %>'
                    }
                }
            }
        },

        connect: {
            options: {
                port: 3000,
                hostname: '*',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%= connect.options.port %>',
                    base: ['<%= project.dist %>']
                }
            }
        },

        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            index: {
                files: ['<%= project.src %>/index.html'],
                tasks: ['htmlhint', 'clean:index', 'htmlbuild']
            },
            scripts: {
                files: ['<%= project.src %>/app/**/*.js'],
                tasks: ['jshint', 'clean:js', 'concat:main'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%= project.src %>/app/components/**/*.html'],
                tasks: ['htmlhint', 'clean:html', 'copy:html']
            },
            less: {
                files: ['<%= project.src %>/app/components/**/*.less', '<%= project.src %>/styles/**'],
                tasks: ['less']
            },
            assets: {
                files: ['<%= project.src %>/images/*'],
                tasks: ['clean:assets', 'copy:assets']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.all.src', filepath);
    });

    grunt.registerTask('envconfig', function(file, jenkinsBuild, buildTime) {
        console.log(file);
        var props = ini.parse(fs.readFileSync(file, 'utf-8'));
        var package = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        console.log(props);
        var uploaderProps = props.uploader;
        var commonProps = props.common;
        var config = {
            envName: commonProps['env.name'],
            version: package.version,
            uploaderUrl: '//' + uploaderProps['uploader.host'] + ':' + uploaderProps['uploader.port'] + '/' + uploaderProps['uploader.contextPath']
        };
        var txt = 'var envConfig = ' + JSON.stringify(config, null, '    ') + ';';
        fs.writeFileSync('envconfig.js', txt);
    });

    grunt.registerTask('test', ['htmlhint', 'jshint']);
    grunt.registerTask('build', ['test', 'clean:main', 'concat:main', 'copy', 'less', 'htmlbuild:main']);
    grunt.registerTask('serve', ['build', 'connect:livereload', 'watch']);
};
