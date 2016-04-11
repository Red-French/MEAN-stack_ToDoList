var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/app',  // tells webpack where the app source code lives
    entry: {  // Define the entry, the first file webpack should load; this is akin to the 'main' file in package.json
        app: './app.js',  // this file holds 'require' statements of all AngularJS script files (controllers, directives, services, etc.)
        vendor: ['angular']  // note there are 2 properties here (app and vendor). Read about 'code splitting' on the webpack website
    },
    output: {  // The output definition. This is where the bundle will go when webpack is done
        path: __dirname + '/public/scripts', // This indicates to place todo.bundle.js into the public/scripts folder
        filename: 'todo.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};
