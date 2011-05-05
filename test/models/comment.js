goog.require('goog.testing.jsunit');
goog.require('blog.models.Comment');

function test_has_date_posted(){
  var comment = new blog.models.Comment();

  assertEquals(comment.date_posted, null);
}

function test_is_not_posted(){
  var comment = new blog.models.Comment();

  assertFalse(comment.isPosted());

}


