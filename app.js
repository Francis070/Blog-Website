//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;


const homeStartingContent = "\"We Share\" is an intimate and private personal blog website created by an individual who wishes to document their thoughts, experiences, and reflections in a more secluded setting. It serves as a digital space for self-expression and introspection, where the writer can freely share their innermost thoughts without the intention of reaching a wide audience.";
const aboutContent = "\"We Share\" is an intimate and private personal blog website created by an individual who wishes to document their thoughts, experiences, and reflections in a more secluded setting. It serves as a digital space for self-expression and introspection, where the writer can freely share their innermost thoughts without the intention of reaching a wide audience.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const postBody1 = "Experiencing nature is like immersing oneself in a world of awe and wonder. The gentle rustle of leaves, the vibrant hues of flowers, and the invigorating scent of fresh air all create a sensory symphony that nourishes the soul. Walking through a dense forest, every step seems to carry away the worries of the world, replaced by a profound sense of peace and tranquility. The towering trees stand as guardians, offering shade and shelter while whispering ancient stories of resilience and growth."
const postBody2 = "Music has a remarkable ability to refresh and uplift my mood, like a gentle breeze sweeping away the cobwebs of the mind. It has an uncanny power to transport me to different realms, evoking a cascade of emotions and memories. When I press play and let the melodies wash over me, a wave of energy surges through my veins. The rhythm entwines with my heartbeat, setting a vibrant tempo that resonates with my very essence. In each note, I find solace, inspiration, and an escape from the mundane."


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [{title: "Experience with Nature", postBody: postBody1}, {title:"Music helps a lot", postBody: postBody2}];

app.get("/", function(req, res){
  res.render("home", {allPosts:posts});
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
  res.render("contact");
});

app.post("/contact", function(req, res){
  res.render("contact_final");
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
