goog.require('goog.testing.jsunit');
goog.require('blog.NotEmptySpecification');

function test_is_satisified(){
  var spec = new blog.NotEmptySpecification();
  assertTrue(spec.isSatisfiedBy("test"));
}

function test_is_not_satisfied_with_empty_string(){
  var spec = new blog.NotEmptySpecification();
  assertFalse(spec.isSatisfiedBy(""));
}

function test_not_empty_specification_is_not_satisfied_with_whitespace_string(){
  var spec = new blog.NotEmptySpecification();
  assertFalse(spec.isSatisfiedBy("  "));
}

function test_is_not_satisified_with_non_string(){
  var spec = new blog.NotEmptySpecification();
  assertFalse(spec.isSatisfiedBy([]));
}
