goog.require('goog.testing.jsunit');
goog.require('blog.models.Comment');
goog.require('blog.views.Comment');


function test_can_load_comment(){
  var c = new blog.models.Comment("help");

  var html = blog.views.Comment.details({comment: c});

  assertContains("help", html);
}
