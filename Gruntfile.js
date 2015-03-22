module.exports = function (grunt) {

	// PROJECT CONFIGURATION
	// ---------------------
	grunt.initConfig({
		// JSHINT
		// ------
		jshint: {
			options: {
				debug: true
			},
			dev: [
				'Gruntfile.js',
				'animated-text.js'
			]
		},
		// UGLIFY
		// ------
		uglify: {
			// OPTIONS
			options: {
				mangle: false
			},
			dist: {
				files: {
					'animated-text.min.js': 'animated-text.js'
				}
			}
		},
		// LESS
		// ----
		less: {
			// PRODUCTION
			dev: {
				options: {
					cleancss: true
				},
				files: {
					"animated-text.css": "src/less/animated-text.less"
				}
			}
		},
		// AUTOPREFIXER
		// ------------
		autoprefixer: {
			dist: {
				src: 'animated-text.css'
			}
		},
		// CSSMIN
		// ------
		cssmin: {
			dist: {
				files: {
					'animated-text.min.css': 'animated-text.css'
				}
			}
		}
	});


	// LOAD GRUNT PLUGINS
	// ------------------
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');


	// DEFAULT TASK(S)
	// ---------------
	grunt.registerTask('default', [
		'jshint:dev',
		'uglify:dist',
		'less:dev',
		'autoprefixer:dist',
		'cssmin:dist'
	]);
};