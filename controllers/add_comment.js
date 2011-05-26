goog.provide('blog.controllers.AddComment');

goog.require('goog.ui.Component');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');
goog.require('blog.views.Comment');

/**
 * @param {blog.models.Post} post Post to render coment list for
 * @constructor
 * @extends {goog.ui.Component}
 */
blog.controllers.AddComment = function(post){
  goog.base(this);

  /**
   * @type {blog.models.Post} 
   * @private
   */
  this.post_ = post;
}
goog.inherits(blog.controllers.AddComment, goog.ui.Component);

/**
 * @override
 */
blog.controllers.AddComment.prototype.createDom = function(){
  var html = blog.views.Comment.add();
  this.element_ = goog.dom.htmlToDocumentFragment(html);
}

/**
 * @param {goog.events.Event} e Event fired.
 * @private
 */
blog.controllers.AddComment.prototype.onSubmit_ = function(e){
  e.preventDefault();
  this.submit();
}

/**
 * @private
 */
blog.controllers.AddComment.prototype.clearForm_ = function(){
  var form = this.getElement();
  for(var i=0;i<form.elements.length;i++){
    if(form.elements[i].type != "submit"){
      form.elements[i].value = "";
    }
  }
}

blog.controllers.AddComment.prototype.submit = function(){
  var form = this.getElement();
  var comment = new blog.models.Comment(
      form.name.value, 
      form.email.value, 
      form.webpage.value, 
      form.content.value);

  this.post_.addComment(comment);
  this.clearForm_();
}

/**
 * @override
 */
blog.controllers.AddComment.prototype.enterDocument = function(){
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var form = this.getElement();

  handler.listen(form, goog.events.EventType.SUBMIT, this.onSubmit_);
}
