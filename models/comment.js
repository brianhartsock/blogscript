
goog.provide('blog.models.Comment');

goog.require('goog.date.UtcDateTime');

blog.models.Comment = function(_name, _email, _webpage, _content){
  this.name = _name || "";
  this.email = _email || "";
  this.webpage = _webpage || "";
  this.content = _content;
  this.date_posted = null;
}

blog.models.Comment.prototype.isPosted = function(){
  return this.date_posted != null;
}

