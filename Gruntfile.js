module.exports = function (grunt) {

    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: [
                    'src/util.calculateArea.js'
                ],
                dest: 'build/util.calculateArea.js'
            }
        },
        uglify: {
            build: {
                src: 'build/util.calculateArea.js',
                dest: 'build/util.calculateArea.min.js'
            }
        },
        watch: {
            files: 'src/*.js',
            tasks: 'default'
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};