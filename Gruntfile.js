module.exports = function(grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// 清除目录
		clean : {
			all : [ 'dist/**', 'dist/*.*' ]
		},

		copy : {
			src : {
				files : [ {
					expand : true,
					cwd : '',
					src : [ '*.html' ],
					dest : 'dist'
				} ]
			}
		},

		// 文件合并
		concat : {
			options : {
				separator : ';',
				stripBanners : true
			}
		},

		// 压缩JS
		/*
		 * uglify: { prod: { options: { mangle: { except: ['require', 'exports',
		 * 'module', 'window'] }, compress: { global_defs: { PROD: true },
		 * dead_code: true, pure_funcs: [ "console.log", "console.info" ] } },
		 * 
		 * files: [{ expand: true, cwd: 'dist/html', src: ['js/*.js'], dest:
		 * 'dist/html' }] } },
		 */

		// 压缩CSS
		/*
		 * cssmin: { prod: { options: { report: 'gzip' }, files: [ { expand:
		 * true, cwd: 'dist/html', src: ['css/*.css'], dest: 'dist/html' } ] } },
		 */

		// Reads HTML for usemin blocks to enable smart builds that
		// automatically
		// concat, minify and revision files. Creates configurations in memory
		// so
		// additional tasks can operate on them
		useminPrepare : {
			options : {
				dest : 'dist'
			},
			html : 'demo.html'
		},

		// 处理html中css、js 引入合并问题
		usemin : {
			html : 'dist/*.html'
		},

		// 压缩HTML
		htmlmin : {
			options : {
				removeComments : true,
				removeCommentsFromCDATA : true,
				collapseWhitespace : true,
				collapseBooleanAttributes : true,
				removeAttributeQuotes : true,
				removeRedundantAttributes : true,
				useShortDoctype : true,
				removeEmptyAttributes : true,
				removeOptionalTags : true
			},
			html : {
				files : [ {
					expand : true,
					cwd : 'dist',
					src : [ '*.html' ],
					dest : 'dist'
				} ]
			}
		}

	});

	grunt.registerTask('prod', [ 'copy', // 复制文件
	'useminPrepare', 'concat', // 合并文件
	// 'imagemin', //图片压缩
	//'cssmin', // CSS压缩
	'uglify', // JS压缩
	'usemin', // HTML处理
	'htmlmin' // HTML压缩
	]);

	grunt.registerTask('publish', [ 'clean', 'prod' ]);
};