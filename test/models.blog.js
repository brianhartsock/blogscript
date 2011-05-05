goog.require('goog.testing.jsunit');
goog.require('blog.models.Blog');
goog.require('blog.models.Comment');


function test_can_set_body(){

  var b = new blog.models.Blog();

  b.setBody("test");

  assertEquals("Body not saved", "test", b.getBody());
}

function test_can_set_title(){
  var b = new blog.models.Blog();

  b.setHeader('test');

  assertEquals('header saved', 'test', b.getHeader());
}

function test_can_add_comment(){
  var b = new blog.models.Blog();
  var c = new blog.models.Comment("asdf");

  b.addComment(c);

  assertContains(c, b.getComments());
}
