module.exports = function (grunt) {
    grunt.initConfig({
        nodemon: {
            all: {
                script: 'server.js',
                option: {
                    watchedExtensions: ['js']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['nodemon']);       
};