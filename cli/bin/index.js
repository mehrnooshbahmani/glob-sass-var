#! /usr/bin/env node
const shell = require("shelljs");
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

shell.echo("I need your paths that you declare global variables, how many paths do you have?");
let gotPathsCount = false;
let pathsCount;
let paths = [];
let counter = 0;
let webpackConfig;
const babelConfig=`{
  "presets": ["@babel/preset-env",["@babel/preset-react",  {"runtime": "automatic"}]],
  "plugins": [
    "syntax-decorators",
    ["transform-decorators-legacy", {
      "legacy": true
    }],
    ["transform-class-properties", {
      "spec": true
    }]
  ]
}`

rl.on('line', (cmd)=> {
    const convertToNumber=Math.floor(Number(cmd))
    if (!gotPathsCount){
        if (isNaN(convertToNumber) || convertToNumber <= 0 )
            console.log('please insert a positive number')
        else {
            gotPathsCount = true;
            pathsCount = convertToNumber
            console.log("Insert your absolute paths by Enter to separate");
        } 
    }
    else {
        if (counter < pathsCount){
            paths.push(cmd)
            counter++;
             if (counter === pathsCount)
                 rl.close();
        }
       }

});

rl.on('close',()=>{
    webpackConfig=`const path =require('path');
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
            { test: /\\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
            },
            {test: /\\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [${paths.map((path)=>{
        return `path.resolve(__dirname)/+${path}`
    })}]
                        }
                    }
                ],
            },
            {
                test: /\\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {    test: /\\.(svg|png|jpeg|jpg|gif)$/,
                loader: "file-loader",
            },
        ]
    }
}
`
    if (fs.existsSync('webpack.config.ts')){
        const webpack_content=fs.readFileSync('webpack.config.ts',{ encoding: 'utf8' })
        fs.truncateSync('webpack.config.ts',0);
        fs.appendFileSync('webpack.config.ts',`${webpackConfig}\n /* ${webpack_content} */`,{ encoding: 'utf8' })
    }
    else {
        fs.writeFileSync( 'webpack.config.ts',`${webpackConfig}\n` ,{ encoding: 'utf8' })
    }

    if (fs.existsSync('.babelrc')){
        const app_babel=fs.readFileSync('.babelrc',{ encoding: 'utf8' })
        fs.truncateSync('.babelrc',0);
        fs.appendFileSync('.babelrc',`${babelConfig}\n /* ${app_babel} */`,{ encoding: 'utf8' })
    }
    else {
        fs.writeFileSync( '.babelrc',`${babelConfig}\n` ,{ encoding: 'utf8' })
    }
})




