# Global Sass Variables

You can add global sass variables in next js project easily, however in a project which is build with CRA, this is not possible. "glob-sass-var" runs with webpack-dev-server, so you can add your sass variables in custom webpack config and use it as global.

<div align="center">
    <img src="https://s27.picofile.com/file/8460212176/sassLogo.png" width="250" height="250">
<br>
<br>

[![npm License](https://img.shields.io/badge/npm-6.14.16-purple.svg)](https://www.npmjs.com/)
[![node License](https://img.shields.io/badge/node-14.19.0-yellow.svg)](https://nodejs.org/)
[![webpack License](https://img.shields.io/badge/webpack-5.75.0-blue.svg)](https://webpack.js.org/)
[![typscript License](https://img.shields.io/badge/typescript-4.9.4-green.svg)](https://webpack.js.org/)
[![typscript License](https://img.shields.io/badge/sass-1.58.3-red.svg)](https://sass-lang.com//)
</div>

## Installation

1.Install the latest version of the package from npm

```bash
npm i glob-sass-var
```
2.Update the existing calls to react-scripts in the scripts section of your package.json to use the webpack

```bash
"scripts": {
-  "start": "react-scripts start"
+  "start": "webpack-dev-server"
-  "build": "react-scripts build"
+  "build": "webpack -w"
+  "glob-config": "glob-sass-var-cli"
}
```
3.Add this line to tsconfig.json

```bash
  "compilerOptions":
  {...
    "outDir": "./dist/",
    ...}
```

4.Run this command in terminal
```bash
   npm run glob-config
```
5.Add the number of your paths and their absolute addresses whenever you were asked. Don't worry if you enter wrong info, you can change it later in webpack.config.ts as an array
```bash
          {...
              {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [path.resolve(__dirname)+"/your absolute path",
                            ...
                            ]
                        }
                    }
                ],
            },
          }
```
6.If you have babelrc and webpack config from before, "glob-sass-var" will keep your config as a comment, inorder to customize your own config, you can uncomment yours and add them again
## 🚀 About Me
I'm a front end developer...

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mehrnoosh-bahmani-9a3290132/)