
goog.provide('blog.models.Post');

goog.require('blog.models.Comment');

/**
 * @constructor
 */
blog.models.Post = function(){
  this.comments = [];
  this.body = '';
  this.header = ''
}

/**
 * @param {string} content The content
 */
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

/**
 * @param {number} c Comment to add to the blog post
 */
blog.models.Post.prototype.addComment = function(c){
  c.date_posted = new goog.date.UtcDateTime();

  this.comments.push(c);
}

blog.models.Post.prototype.getComments = function(){
  return this.comments;
}

