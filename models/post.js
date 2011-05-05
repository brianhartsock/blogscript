
goog.provide('blog.models.Post');

goog.require('blog.models.Comment');

blog.models.Post = function(){
  this.comments = [];
  this.body = '';
  this.header = ''
}

blog.models.Post.prototype.setBody = function(content){
  this.body = content;
}

blog.models.Post.prototype.getBody = function(){
  return this.body;
}

blog.models.Post.prototype.setHeader = function(content){
  this.header = content;
}

blog.models.Post.prototype.getHeader = function(){
  return this.header;
}

blog.models.Post.prototype.addComment = function(c){
  this.comments.push(c);
}

blog.models.Post.prototype.getComments = function(){
  return this.comments;
}

