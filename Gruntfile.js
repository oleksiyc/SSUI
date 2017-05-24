module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.build %> | © <%= pkg.developer %> (<%= pkg.developerWebsite %>) */'
            },
            config: {
                src: ['src/splayer/_config.js'],
                dest: 'dist/sconfig.js',
            },
            splayer: {
                src: ['src/splayer/helpers.js', 'src/splayer/_playerLib.js', 'src/splayer/play.js', 'src/splayer/pause.js', 'src/splayer/playlist.js', 'src/splayer/next.js', 'src/splayer/prev.js', 'src/splayer/time.js', 'src/splayer/slider.js', 'src/splayer/loop.js', 'src/splayer/star.js', 'src/splayer/download.js', 'src/splayer/share.js', 'src/splayer/search.js', 'src/splayer/_id3Lib.js', 'src/splayer/import.js', 'src/splayer/storage.js'],
                dest: 'dist/splayer.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.build %> | © <%= pkg.developer %> (<%= pkg.developerWebsite %>) */'
            },
            config: {
                src: ['dist/sconfig.js'],
                dest: 'dist/sconfig.min.js'
            },
            splayer: {
                src: ['dist/splayer.js'],
                dest: 'dist/splayer.min.js'
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

};