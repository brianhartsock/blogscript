goog.require('goog.testing.jsunit');
goog.require('goog.date.UtcDateTime');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');


function test_can_set_body(){

  var b = new blog.models.Post();

  b.setBody("test");

  assertEquals("Body not saved", "test", b.getBody());
}

function test_can_set_title(){
  var b = new blog.models.Post();

  b.setHeader('test');

  assertEquals('header saved', 'test', b.getHeader());
}

function test_can_add_comment(){
  var b = new blog.models.Post();
  var c = new blog.models.Comment("asdf");

  b.addComment(c);

  assertContains(c, b.getComments());
}

function test_date_posted_set_when_adding(){
  var b = new blog.models.Post();
  var comment = new blog.models.Comment("asdf");

  var dt = new goog.date.UtcDateTime();
  b.addComment(comment);

  assert(dt <= comment.date_posted);
}

function test_isPosted_returns_true_after_adding_comment(){
  var b = new blog.models.Post();
  var comment = new blog.models.Comment("asdf");

  var dt = new goog.date.UtcDateTime();
  b.addComment(comment);

  assertTrue(comment.isPosted());
}
