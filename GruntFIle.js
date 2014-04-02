/*global module:true*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['*.js']
		},
		uglify: {
			options: {
				compress: true,
				mangle: true,
				preserveComments: 'some',
				report: 'gzip'
			},
			build: {
				src: 'jquery.scroll-intention.js',
				dest: 'build/jquery.scroll-intention.min.js'
			}
		}
	});
	
	// Load the plugin that provides the 'uglify' task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

};
