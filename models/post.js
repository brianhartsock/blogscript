
goog.provide('blog.models.Post');
goog.provide('blog.models.Post.EventType');
goog.provide('blog.models.CommentAdded');

goog.require('blog.models.Model');
goog.require('blog.models.Comment');
goog.require('goog.events');
goog.require('goog.events.Event');

/**
 * @param {Object.<string,*>=} obj Object to load into 
 * @constructor
 * @extends {blog.models.Model}
 */
blog.models.Post = function(obj){
  goog.base(this);

  /**
   * @type {string}
   * @private
   */
  this.id_ = "" + Math.floor(Math.random() * 100);

  /**
   * @type {Array.<blog.models.Comment>}
   * @private
   */
  this.comments_ = [];

  /**
   * @type {string}
   * @private
   */
  this.body_ = '';

  /**
   * @type {string}
   * @private
   */
  this.header_ = '';

  //This has to be last because it sets all the properties
  goog.base(this, obj);
}
goog.inherits(blog.models.Post, blog.models.Model);

blog.models.Model.hasMany(blog.models.Post, blog.models.Comment, 'comments_');

/**
 * @enum {string}
 */
blog.models.Post.EventType = {
  COMMENT_ADDED: goog.events.getUniqueId('comment_added')
}

/**
 * @return {string}
 */
blog.models.Post.prototype.getId = function(){
  return this.id_;
}

/**
 * @param {string} content The content to set.
 */
blog.models.Post.prototype.setBody = function(content){
  this.body_ = content;
}

/**
 * @return {string} Body of the post
 */
blog.models.Post.prototype.getBody = function(){
  return this.body_;
}

/**
 * @param {string} content Header of the post
 */
blog.models.Post.prototype.setHeader = function(content){
  this.header_ = content;
}

/**
 * @return {string} Header of the post.
 */
blog.models.Post.prototype.getHeader = function(){
  return this.header_;
}

/**
 * @param {blog.models.Comment} c Comment to add to the blog post
 */
blog.models.Post.prototype.addComment = function(c){
  c.date_posted = new goog.date.UtcDateTime();

  this.comments_.push(c);

  this.dispatchEvent(new blog.models.CommentAdded(this, c));
}

/**
 * @return {Array.<blog.models.Comment>} Array of comments
 */
blog.models.Post.prototype.getComments = function(){
  return this.comments_;
}

/**
 * @param {blog.models.Post} post
 * @param {blog.models.Comment} comment
 * @constructor
 * @extends {goog.events.Event}
 */
blog.models.CommentAdded = function(post, comment){
  goog.events.Event.call(this, blog.models.Post.EventType.COMMENT_ADDED, post);

  /**
   * @type {blog.models.Comment}
   */
  this.comment_ = comment;
}
goog.inherits(blog.models.CommentAdded, goog.events.Event);

/**
 * @returns {blog.models.Comment} 
 */
blog.models.CommentAdded.prototype.getComment = function(){
  return this.comment_;
}
