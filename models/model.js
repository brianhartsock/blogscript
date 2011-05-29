
goog.provide('blog.models.Model');
goog.provide('blog.models.Model.EventType');

goog.require('goog.object');
goog.require('goog.events');
goog.require('goog.events.EventTarget');

/**
 * @extends {goog.events.EventTarget}
 * @constructor
 */
blog.models.Model = function(){

}
goog.inherits(blog.models.Model, goog.events.EventTarget);

/**
 * @type {Object}
 * @protected
 */
blog.models.Model.prototype.validations_ = {};


/**
 * @returns {boolean} True or false depending on validation
 */
blog.models.Model.prototype.validate = function(){
  return goog.object.every(this.validations_, function(value, key){
      return value.isSatisfiedBy(this[key])
      }, this);
}

/**
 * @protected
 */
blog.models.Model.prototype.propertyChanged_ = function(){
  this.dispatchEvent(blog.models.Model.EventType.MODEL_CHANGED);
}

blog.models.Model.EventType = {
  MODEL_CHANGED: goog.events.getUniqueId('model_changed')
}
