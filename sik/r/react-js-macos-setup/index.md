---
title: "How to setup React.js on MacOS"
description: "A concise step by step guide on how to setup React.js on MacOS. In a few steps, you will install Visual Studio Code, Node.js, NPM, Git, Prettier and create-react-app for building React applications with Mac OS ..."
date: "2018-02-20T13:50:46+02:00"
categories: ["React", "VS Code", "Web Development"]
keywords: ["react macos setup", "react mac os", "how to install react", "install react"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this article, you will find a concise step by step guide on how to install React on MacOS. It follows the philosophy of having one IDE to manage most of your web development tasks. That's how you can focus on your task at hand as a developer. However, if you like to compose your development environment with lightweight tools rather than with an full-blown IDE, checkout [my personal recommendations for such a setup](/developer-setup). Nevertheless, if you just want to find a way for getting started with React on Mac OS quickly, follow the guide below.

# Node.js and NPM on MacOS

Since you are going to use JavaScript for your React development on MacOS, there is no way around Node.js and NPM. Node.js is a JavaScript runtime which makes it possible to run JavaScript outside of the browser. The underlying node package manager (NPM) is used to install frameworks and libraries, such as React.js, to your project on the command line. They are called node packages. You will see later on how this works out on the command line for MacOS users installing libraries for React.

In order to install and manage Node.js on your MacOS machine, you can install it from their official website. However, I encourage you to checkout [nvm](https://github.com/creationix/nvm). It's a node version manager that allows you to manage multiple node versions, to upgrade and downgrade node versions and to be flexible in choosing a node version for your project at hand. You can find the installation instructions in the GitHub repository. Installing node will install npm (node package manager) as well. The node package manager is used to install libraries/frameworks (node packages), such as React, on the command line to your project.

# Visual Studio Code for React on MacOS

There are plenty of editors and IDEs out there to develop web applications. Depending on your personal, project or company requirements, you can choose from a range of lightweight editors to full-blown IDEs. Visual Studio Code is a solution in between. Many developers, operating on MacOS but also Windows, enjoy using it. That's why my recommendation would be Visual Studio Code to start developing React applications on MacOS. The installation on a MacOS machine is simple: Navigate to the official [Visual Studio Code](https://code.visualstudio.com/) website and download the recent version of VS Code. Afterward, install it and check if everything is working when you open it. That's it for the installation of an editor/IDE on your machine.

If you want to use another editor/IDE, it is up to you. But keep in mind that a couple of the following steps are building up on top of Visual Studio Code. However, it should be possible to substitute these steps for your own editor/IDE.

# Node and NPM for React

If you are just getting started with web development, you should create a dedicated folder on your machine to manage all your web development projects. It's up to you to divide the folder into subfolders. For instance, there could be a folder for React applications and another one for plain Node.js applications. Once you have your folder for your projects, open this folder in Visual Studio Code.

In Visual Studio Code you should be able to open a tab which is called "Terminal" at the bottom. That's your integrated command line in Visual Studio Code to install node packages with NPM or to start/test your project. It's up to you to use the integrated terminal or another command line interface (e.g. the built-in command line or something like [iterm2](https://www.iterm2.com/)) for your MacOS machine.

Now, you should check whether the Node.js installation for MacOS was successful. On the command line, type the following commands. They should output the versions for Node.js and NPM.

```javascript
node --version
npm --version
```

# create-react-app for React on MacOS

Now you can install your first node package with npm on the command line. You will install it globally with a -g flag. Because of installing it globally, you will always have access to it on the command line. Later on, when you install a node package for your project without the -g flag, you will only have access to the node package (node module) in your project. Now, on the command line (in Visual Studio Code), type the following command to install [create-react-app](https://github.com/facebook/create-react-app):

```javascript
npm install -g create-react-app
```

[create-react-app](https://github.com/facebook/create-react-app) allows you to bootstrap React applications with zero-configuration. There is no need to get involved too early in toolings with [Webpack and Babel](https://github.com/rwieruch/minimal-react-webpack-babel-setup). If you are going to read "The Road to React", you will use create-react-app as well. It's the simplest approach to learn React without worrying about all the tooling around it. You can bootstrap your first React.js application with npx (which comes via npm) on MacOS with create-react-app by passing the name of your application to it on the command line:

```javascript
npx create-react-app my-app
```

Afterward, you can navigate into the project on the command line and start it with npm:

```javascript
cd my-app
npm start
```

The command line should give you an output where you can find the application in the browser. The default should be localhost:8080. If you are only using Safari on your MacOS machine, I can recommend you to install Chrome as well to access the developer environment and the React Developer Tools which are available as Chrome extension.

If you just want to learn React now, you could start to read [The Road to learn React](/the-road-to-learn-react/). It's a pragmatic book which guides you step by step through building a React application from scratch. Along the way, you will transition from JavaScript ES5 to JavaScript ES6 and you will lots of exercises to improve your React skills.

# Git for Visual Studio Code and MacOS

At some point, you might want to share your projects on GitHub or collaborate with other people via the git version control. If you want to use GitHub as your platform of choice, you should create an account via [their official website](https://github.com/). GitHub is a social platform where you can follow other people ([you could have your first social interaction with me](https://github.com/rwieruch)), like (star) their projects or collaborate on open source projects with other people.

In order to have git available on the command line and in Visual Studio Code, you need to install it. You can find all the instructions on the official [git website](https://git-scm.com/). However, I recommend it via Homebrew. If you want to follow this recommendation, checkout [the Homebrew and Git/Github sections over here](/developer-setup). After installing it, you should have it available on the command line.

```javascript
git --version
```

If it doesn't show up in Visual Studio Code, you may have to restart the application. Afterward, you should see that Visual Studio Code already comes with a git integration as well. It's convenient to use git from this integration, but you can also use it from the command line now. That's it for the git installation and the account creation on GitHub. Furthermore, you can check out [this essential guide on how to use git and GitHub](/git-essential-commands/).

<Divider />

That's everything you need for a React development setup in MacOS. I hope you have everything to get started in React on your machine. Let me know what other tools you are using on MacOS in the comments below. Otherwise, if you are curios about the tools that I am using on my machine, head over to [my personal development setup guide](/developer-setup).

<LinkCollection label="This tutorial is part 1 of 2 in this series." links={[{ prefix: "Part 2:", label: "How to use Prettier in VS Code", url: "/how-to-use-prettier-vscode" }]} />

<ReadMore label="How to set up React with Webpack and Babel" link="/minimal-react-webpack-babel-setup" />
