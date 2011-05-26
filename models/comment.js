
goog.provide('blog.models.Comment');

goog.require('goog.date.UtcDateTime');

/**
 * @constructor
 */
blog.models.Comment = function(_name, _email, _webpage, _content){
  this.name = _name || "";
  this.email = _email || "";
  this.webpage = _webpage || "";
  this.content = _content;
  this.date_posted = null;
}

/**
 * @return {string} Name of comment poster
 */
blog.models.Comment.prototype.getName = function(){
  return this.name;
}

/**
 * @return {string} Email of comment poster
 */
blog.models.Comment.prototype.getEmail = function(){
  return this.email;
}

/**
 * @return {string} Webpage of comment poster
 */
blog.models.Comment.prototype.getWebpage = function(){
  return this.webpage;
}

/**
 * @return {string} Content of comment
 */
blog.models.Comment.prototype.getContent = function(){
  return this.content;
}
/**
 * @param {goog.date.DateTime} dt
 */
blog.models.Comment.prototype.post = function(dt){
  this.date_posted = dt;
}

/**
 */
blog.models.Comment.prototype.isPosted = function(){
  return this.date_posted != null;
}

