module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "bootstrap.min.css": [
        "stylesheets/bootstrap.min.css"
    ],
    "font-awesome.min.css": [
        "stylesheets/font-awesome.min.css"
    ],
    "fonts/": "fonts/",
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
