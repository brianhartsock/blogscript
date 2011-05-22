
goog.provide('blog.models.Post');
goog.provide('blog.models.Post.EventType');
goog.provide('blog.models.CommentAdded');

goog.require('blog.models.Comment');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventHandler'); //To get rid of warnings
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
blog.models.Post = function(){
  goog.base(this);

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
  this.header_ = ''
}
goog.inherits(blog.models.Post, goog.events.EventTarget);

/**
 * @enum {string}
 */
blog.models.Post.EventType = {
  COMMENT_ADDED: goog.events.getUniqueId('comment_added')
}

/**
 * @param {string} content The content
 */
blog.models.Post.prototype.setBody = function(content){
  this.body_ = content;
}

blog.models.Post.prototype.getBody = function(){
  return this.body_;
}

blog.models.Post.prototype.setHeader = function(content){
  this.header_ = content;
}

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
