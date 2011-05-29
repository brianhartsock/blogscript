goog.require('goog.testing.jsunit');
goog.require('blog.NotEmptySpecification');
goog.require('blog.models.Model');
goog.require('goog.json.Serializer');

function setUp(){

  ModelWithComplexSubTypes = function(obj){
    this.subtypes_ = [];

    goog.base(this, obj);
  }
  goog.inherits(ModelWithComplexSubTypes, blog.models.Model);

  Subtype = function(obj){
    this.property1_ = undefined;

    goog.base(this, obj);
  }
  goog.inherits(Subtype, blog.models.Model);
  blog.models.Model.hasMany(ModelWithComplexSubTypes, Subtype, "subtypes_");

  Subtype.prototype.verify = function(){
    return "verified";
  }

  ModelWithSimpleProperties = function(obj){
    this.property1_ = undefined;
    this.property2_ = undefined;

    goog.base(this, obj);
  }
  goog.inherits(ModelWithSimpleProperties, blog.models.Model);

  ModelWithSimpleProperties.prototype.setupProperties = function(){
    this.property1_ = 'test';
    this.property2_ = 1;
  }

  TestModel = function(){
    this.test_ = "";
  }
  goog.inherits(TestModel, blog.models.Model);

  TestModel.prototype.validations_ = {
    test_: new blog.NotEmptySpecification()
  }
  TestModel.prototype.changeSomething = function(){
    this.propertyChanged_();
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

function test_empty_property_is_invalid(){
  var obj = new TestModel();
  assertFalse(obj.validate());
}

function test_no_validations_is_valid(){
  var obj = new NoValidations();
  assertTrue(obj.validate());
}

function test_change_model_emits_event(){
  var obj = new TestModel();
  var has_been_called = false;

  obj.addEventListener(blog.models.Model.EventType.MODEL_CHANGED, function(){
        has_been_called = true;
      });
  obj.changeSomething();

  assert(has_been_called);
}

function test_fromObj_translates_simple_properties(){
  var expectedObj = new ModelWithSimpleProperties();
  expectedObj.setupProperties();
  var jsonObj = convertToJsonAndBackAgain(expectedObj);

  var actualObj = new ModelWithSimpleProperties(jsonObj);
  assertEquals(expectedObj.property1_, actualObj.property1_);
  assertEquals(expectedObj.property2_, actualObj.property2_);
}

function test_fromObj_translates_complex_subtypes(){
  var o = new ModelWithComplexSubTypes();
  var s = new Subtype();
  s.property1_ = "test";
  o.subtypes_.push(s);

  var jsonObj = convertToJsonAndBackAgain(o);
  var a = new ModelWithComplexSubTypes(jsonObj);
 
  assertEquals(o.subtypes_[0].property1_, a.subtypes_[0].property1_);
  assertEquals("verified", a.subtypes_[0].verify());
}

function convertToJsonAndBackAgain(obj){
  return goog.json.unsafeParse(goog.json.serialize(obj));
}
