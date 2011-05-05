
goog.provide('blog.models.Comment');

goog.require('goog.date.UtcDateTime');

blog.models.Comment = function(_content){
  this.content = _content;
  this.date_posted = null;
}

blog.models.Comment.prototype.isPosted = function(){
  return this.date_posted != null;
}

