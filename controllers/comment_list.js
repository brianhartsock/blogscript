goog.provide('blog.controllers.CommentList');

goog.require('goog.ui.Component');
goog.require('blog.models.Post');
goog.require('blog.models.Post.EventType');
goog.require('blog.models.Comment');
goog.require('blog.views.Comment');

/**
 * @param {blog.models.Post} post Post to render coment list for
 * @constructor
 * @extends {goog.ui.Component}
 */
blog.controllers.CommentList = function(post){
  goog.base(this);

  /**
   * @type {blog.models.Post} 
   * @private
   */
  this.post_ = post;
}
goog.inherits(blog.controllers.CommentList, goog.ui.Component);

/**
 * @override
 */
blog.controllers.CommentList.prototype.createDom = function(){
  var html = blog.views.Comment.comment_list({comments: this.post_.getComments()});

  this.element_ = goog.dom.createElement('div');
  this.element_.innerHTML = html;
}

/**
 * @param {blog.models.CommentAdded} e CommentAdded event.
 * @private
 */
blog.controllers.CommentList.prototype.onCommentAdded_ = function(e){
  var comment_html = blog.views.Comment.details({comment: e.getComment()});

  this.element_.innerHTML += comment_html;
}

blog.controllers.CommentList.prototype.enterDocument = function(){
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.post_, blog.models.Post.EventType.COMMENT_ADDED, this.onCommentAdded_);
}
