const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports={
    entry: './src/index.tsx',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname,'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [HTMLWebpackPluginConfig],
    mode: "development",
    devServer: {
        static:{
            directory: path.join(__dirname,'dist'),
        },
    },
    module: {
        rules: [
            { test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
            },
            {test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [path.resolve(__dirname)+"/src/styles/_custom-variables.scss"
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {    test: /\.(svg|png|jpeg|jpg|gif)$/,
                loader: "file-loader",
            },
        ]
    }
}
