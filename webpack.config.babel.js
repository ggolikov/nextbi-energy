import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
module.exports = {
    entry: './demo/js/app.js',
    output: {
        path: path.join(__dirname, './demo/js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: [
            'node_modules'
        ]
    },
    devtool: "cheap-inline-module-source-map",
    module: {
        rules: [{
                test: /\.jsx?$/,
                    use: [{
                        loader: "babel-loader"
                    }],
                    exclude: /node_modules/
                }, {
                    test: /\.(scss|sass|css)$/i,
                    use: [{
                        loader: "css-loader|style-loader"
                    }],
                    exclude: /node_modules/
                },  {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/,
                    use: [{
                        loader: "file-loader?name=/[name].[ext]"
                    }],
                    exclude: /node_modules/
                }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/L.Plugin.css', to: './demo/css/L.Plugin.css' }
        ])
    ]
};
