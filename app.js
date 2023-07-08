//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/", function(req, res){
  res.render("home", {homeContent:homeStartingContent, allPosts:posts});
});

app.get("/posts/:blog", function(req, res){
  let parameter = _.lowerCase(req.params.blog);
  let title, postBody;

  let chk = false;
  for(let i = 0; i < posts.length; i++){
    let storedTitle = _.lowerCase(posts[i].title);
    console.log(storedTitle, parameter)
    if(storedTitle == parameter ){
      title = posts[i].title;
      postBody = posts[i].postBody;
      chk = true;
      break;
    }
  }
  if(chk == false){
    title = "No Match Found!";
    postBody = "";
  }

  // console.log(parameter);

  res.render("post", {title:title, body:postBody});

  // res.render("home", {homeContent:homeStartingContent, allPosts:posts});
});

app.get("/about", function(req, res){
  res.render("about", {aboutSection:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent:contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  let post ={
    title : req.body.title,
    postBody: req.body.postContent 
  };

  posts.push(post);

  res.redirect("/");
});

app.listen(PORT, function() {
  console.log("Server started on port ${PORT}");
});
