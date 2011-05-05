goog.require('goog.testing.jsunit');
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
