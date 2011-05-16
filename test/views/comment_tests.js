goog.require('goog.testing.jsunit');
goog.require('blog.models.Comment');
goog.require('blog.views.Comment');


function test_can_load_comment(){
  var c = new blog.models.Comment("name", "email", "webpage", "help");

  var html = blog.views.Comment.details({comment: c});

  assertContains("help", html);
}

function test_can_load_add_comment(){
  var html = blog.views.Comment.add();
}
