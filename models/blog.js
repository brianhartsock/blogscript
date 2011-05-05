
goog.provide('blog.models.Blog');

goog.require('blog.models.Comment');

blog.models.Blog = function(){
  this.comments = [];
  this.body = '';
  this.header = ''
}

blog.models.Blog.prototype.setBody = function(content){
  this.body = content;
}

blog.models.Blog.prototype.getBody = function(){
  return this.body;
}

blog.models.Blog.prototype.setHeader = function(content){
  this.header = content;
}

blog.models.Blog.prototype.getHeader = function(){
  return this.header;
}

blog.models.Blog.prototype.addComment = function(c){
  this.comments.push(c);
}

blog.models.Blog.prototype.getComments = function(){
  return this.comments;
}

