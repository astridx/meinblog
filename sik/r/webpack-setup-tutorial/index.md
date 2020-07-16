---
date: '2019-06-15T13:51:46+02:00'
title: 'How to set up a Webpack project [Tutorial]'
description: 'A Webpack setup tutorial that walks you through your first JavaScript application set up with Webpack. Bonus: You will add Babel to enable advanced JavaScript features ...'
categories: ['JavaScript', 'Tooling', 'Webpack']
keywords: ['webpack setup', 'webpack tutorial', 'webpack babel']
hashtags: ['#100DaysOfCode', '#JavaScript', '#Webpack']
banner: './images/banner.jpg'
author: ''
contribute: ''
---

<Sponsorship />

<LinkCollection
label="This tutorial is part 2 of 3 in this series."
links={[
{
prefix: "Part 1:",
label: "How to set up a modern JavaScript project",
url: "/javascript-project-setup-tutorial/",
},
{
prefix: "Part 3",
label: "How to set up Webpack with Babel",
url: "/webpack-babel-setup-tutorial/",
},
]}
/>

Webpack is a JavaScript bundler for your web application. In the past, you had to link JavaScript files manually in HTML files. Nowadays, Webpack takes care about it. In this tutorial, I want to walk you through a minimal Webpack setup for a JavaScript + HTML application. Afterward, you should be able to extend Webpacks features, advance your JavaScript application, or structure the HTML of your website yourself.

# Project File/Folder Structure

We will start with creating a distribution folder. The folder will be used to serve your application from a local or remote web server later on. Serving the app makes it possible to view it in the browser or to host it on an external hosting server which makes it accessible for everyone via [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). After all, the distribution folder will be everything you need to publish your web application. To get you started, create the distribution folder and a HTML file as entry point to your application from your project's root directory on the command line:

```javascript
mkdir dist
cd dist
touch index.html
```

The naming of the folder is up to you. Often you will find it named as _dist_, _public_, or _build_. Also you can give the HTML file a name yourself. However, calling it _index.html_ is a widely used naming convention again. So you may want to keep it this way for now. As next step, give the created _dist/index.html_ file the following content:

```javascript
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
  </body>
</html>
```

The file contains all the HTML to display your website in a browser. No JavaScript is involved yet. In order to get you started with JavaScript, put the following logging in a _src/index.js_ file:

```javascript
console.log('Hello Webpack Project.')
```

As for now, you should have a _dist/_ and _src/_ folder for your project:

```javascript
;-dist / --index.html - src / --index.js - package.json
```

You may wonder: Why don't we put all files into one folder? That's because in the next steps we will make sure that all JavaScript source code files from the _src/_ folder will get bundled into a single JavaScript file which will be placed automatically into the _dist/_ folder. By keeping this separation of folders, you can be sure that everything you need to take your application to production on a web server sits in the _dist/_ folder and everything to implement your application sits in the _src/_ folder.

Now, the most straightforward approach to link JavaScript to your HTML file would be the following way:

```javascript{10}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="../src/index.js"></script>
  </body>
</html>
```

However, this may become a tedious task over time, because you have to keep track of what JavaScript you link to your HTML file. That's why we are using Webpack to generate **one JavaScript bundle** from all our source code in the _src/_ folder, which will be automatically put into your _dist/_ folder afterward. Then, it can be used in our entry point HTML file the following way:

```javascript{10}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

Therefore, we will need to set up Webpack to bundle our source code for us. Let's get into Webpack.

# Webpack Setup

You will use [Webpack](https://github.com/webpack/webpack) to bundle your JavaScript source code, but also to add advanced features to _build_ your project with further build steps later on. Moreover, you will use the [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) to serve your project in a local environment with a local web server for development purposes. Last but not least, you need the [Webpack CLI](https://github.com/webpack/webpack-cli) as well. Let's install all three dependencies as libraries (node packages) by using npm for your project. From your project's root directory, type the following command to install all libraries as development dependencies:

```javascript
npm install --save-dev webpack webpack-dev-server webpack-cli
```

_Note: Development dependencies (short: dev dependencies, indicated with `--save-dev`) are not bundled in your production code later on. This way, you keep the bundle for your production code lightweight. For instance, if you want to test your source code later on, you can do this in your local development mode with all the testing libraries installed as dev dependencies, but later on these libraries will not be included in the actual application for production. Only the dependencies for running the source code are needed as production ready dependencies. They can be installed without the `--save-dev` flag._

As a side effect, you should find a _node_modules/_ folder with all your third party dependencies. Usually you don't need to worry about them in there. Also the dependencies will be listed in the _package.json_ file. Check it yourself to see the dependencies with their version numbers. By now, your folder structure should look like the following:

```javascript
;-dist / --index.html - src / --index.js - node_modules / -package.json
```

In your _package.json_ file, change the start script to the following script for using the Webpack Dev Server:

```javascript{4}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

You can run your _npm start_ script on the command line again, however, this time you have Webpack as local web server to serve your files in development mode. Navigate to your _dist/index.html_ file to see its output in the browser. You may also see in the developer tools of your browser that our _bundle.js_ cannot be found. That's because we didn't tell Webpack yet to generate it for us. Next, let's see how we can bundle our source code files from the _src/_ folder into the _dist/_ folder with Webpack. Therefore, add the following addition to your npm start script in your _package.json_ file:

```javascript{4}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

The script defines that you want to use the Webpack Dev Server with a configuration file called _webpack.config.js_. Let’s create the required _webpack.config.js_ file in your project's root directory:

```javascript
touch webpack.config.js
```

Your folder structure should look like the following now:

```javascript
;-dist
--index.html - node_modules - src
--index.js - package.json - webpack.config.js
```

Finish the Webpack setup by providing the following configuration for the new _webpack.config.js_ file:

```javascript
module.exports = {
  // 1
  entry: './src/index.js',
  // 2
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  // 3
  devServer: {
    contentBase: './dist',
  },
}
```

The Webpack configuration file gives the following instructions:

- (1) Use the _src/index.js_ file as entry point to bundle it. If the _src/index.js_ file imports other JavaScript files, bundle them as well.
- (2) The bundled source code files shall result in a _bundle.js_ file in the _/dist_ folder.
- (3) The _/dist_ folder will be used to serve our application to the browser.

After all, you should be able to start the Webpack Dev Server again. Before, make sure that your _dist/index.html_ includes the generated _bundle.js_ file as already shown previously:

```javascript{10}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

After starting the application with `npm start`, open the [application in your browser](http://localhost:8080/). Note: The URL for the browser should be visible on the command line too. Once you opened your application in the browser, you should be able to see the output of your _dist/index.html_ file and the logging from your _src/index.js_ file. If more JavaScript source code files get imported from the _src/index.js_ file, they will be bundled in the _bundle.js_ by Webpack as well.

### Exercises:

- Confirm your [source code for the last section](https://github.com/rwieruch/minimal-webpack-setup)
- Add a button element to your _dist/index.html_ file
- Add a click handler for this new button in your _src/index.js_ file

<LinkCollection
label="This tutorial is part 2 of 3 in this series."
links={[
{
prefix: "Part 1:",
label: "How to set up a modern JavaScript project",
url: "/javascript-project-setup-tutorial/",
},
{
prefix: "Part 3",
label: "How to set up Webpack with Babel",
url: "/webpack-babel-setup-tutorial/",
},
]}
/>
