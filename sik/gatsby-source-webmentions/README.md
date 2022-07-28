## Description
A Gatsby Plugin to source Webmentions from webmention.io

### Dependencies

Although it is not required but if you want to optimize the images returned from the plugin you must install:

`gatsby-plugin-image`

### Learning Resources

For a detailed tutorial on how to use this plugin refer to:
[How to Use Webmentions with Gatsby.js – A Beginner's Guide](https://www.freecodecamp.org/news/how-to-use-webmentions-with-gatsby-beginners-guide/)

## How to install
To install this plugin, run the following command

`npm install gatsby-source-webmentions`

## Available options
DOMAIN: (required) the domain name you used to sign in to webmention.io
TOKEN: (required) The token is gotten from your webmention.io dashboard
perPage: Number of Webmentions you want to fetch per page, this is completely optional

## When do I use this plugin?

Thid plugin comes in handy when you want to easily display webmentions data on your site. The plugin also allows you to optimize the images returned from the webmention.io API.

## Examples of usage
to use this plugin add it to the list of plugins array in your `gatsby-config.js` file

```
{ 
  resolve: "gatsby-source-webmentions",
  options: {
    DOMAIN: "example.com", // without https and any slashes
    TOKEN: process.env.WEBMENTIONS_TOKEN, // token from webmention.io
    perPage: 100, // optional
  },
```




