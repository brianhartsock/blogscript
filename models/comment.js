
goog.provide('blog.models.Comment');

goog.require('blog.NotEmptySpecification');
goog.require('blog.models.Model');
goog.require('goog.date.UtcDateTime');

/**
 * @param {string} name
 * @param {string} email
 * @param {string} webpage
 * @param {string} content
 * @constructor
 * @extends {blog.models.Model}
 */
blog.models.Comment = function(name, email, webpage, content){
  /**
   * @type {string}
   * @private
   */
  this.name = name || "";

  /**
   * @type {string}
   * @private
   */
  this.email = email || "";

  /**
   * @type {string}
   * @private
   */
  this.webpage = webpage || "";

  /**
   * @type {string}
   * @private
   */
  this.content = content || "";
  this.date_posted = null;
}
goog.inherits(blog.models.Comment, blog.models.Model);

blog.models.Comment.prototype.validations_ = {
  name: new blog.NotEmptySpecification(),
  content: new blog.NotEmptySpecification()
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
 * @return {boolean} Whether or not the comment has been posted
 */
blog.models.Comment.prototype.isPosted = function(){
  return this.date_posted != null;
}

