module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        'ftp-deploy': {
            main: {
                auth: {
                    host: 'freakzero.com',
                    port: 21,
                    authKey: 'frk0'
                },
                
                src: 'src',
                dest: 'www/home/projects/sublime',
                exclusions: ['build/**/Thumbs.db']
            }
        }    
    });

    // Plugins      
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.registerTask('deploy', ['ftp-deploy']);

};