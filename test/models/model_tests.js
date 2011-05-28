goog.require('goog.testing.jsunit');
goog.require('blog.NotEmptySpecification');
goog.require('blog.models.Model');


function setUp(){
  TestModel = function(){
    this.test_ = "";
  }
  goog.inherits(TestModel, blog.models.Model);

  TestModel.prototype.validations_ = {
    test_: new blog.NotEmptySpecification()
  }
  
  NoValidations = function(){
    this.test_ = "";
  }
  goog.inherits(NoValidations, blog.models.Model);
}

function test_non_empty_property_is_valid(){
  var obj = new TestModel();
  obj.test_ = "valid";
  assertTrue(obj.validate());
}

function test_empty_property_is_invalid){
  var obj = new TestModel();
  assertFalse(obj.validate());
}

function test_no_validations_is_valid(){
  var obj = new NoValidations();
  assertTrue(obj.validate());
}
