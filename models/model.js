
goog.provide('blog.models.Model');
goog.provide('blog.models.Model.EventType');

goog.require('goog.object');
goog.require('goog.events');
goog.require('goog.events.EventTarget');

/**
 * @param {Object.<string,*>=} obj Object to load
 * @extends {goog.events.EventTarget}
 * @constructor
 */
blog.models.Model = function(obj){
  if(obj){
    this.fromObj_(obj);
  }
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

blog.models.Model.prototype.associations_ = {
}

/**
 * @param {Object} parentType Parent model to map children to
 * @param {Object} childType Child model to map children to
 * @param {string} propertyName Name of property being mapped
 */
blog.models.Model.hasMany = function(parentType, childType, propertyName){
  parentType.prototype.associations_[propertyName] = childType;
}

/**
 * @param {Object.<string, *>} obj Object to load into model
 * @protected
 */
blog.models.Model.prototype.fromObj_ = function(obj){
  goog.object.forEach(
      obj, 
      function(value, key){
        if(this.associations_[key] && value instanceof Array){
          var tmp = [];
          for(var i=0;i<value.length;i++){
            tmp.push(new this.associations_[key](value[i]));
          }
          this[key] = tmp;
        }
        else{
          this[key] = value;
        }
      },
      this);
}
