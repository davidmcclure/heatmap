

var _ = require('lodash');


/**
 * A group of avatars on the heatmap.
 *
 * @param {Heatmap} heatmap A Heatmap instance.
 */
var AvatarGroups = function(heatmap) {

  this.heatmap = heatmap;
  this.groups = {};

  this._bindResizeEvent();

};


/**
 * When the containers are resized, re-render the heatmap avatars.
 */
AvatarGroups.prototype._bindResizeEvent = function() {
  this.heatmap.on('updateSize', _.bind(this.updateSize, this));
};


/**
 * Add a new span group to the heatmap.
 *
 * @param {String} name A name for the group. Later on, this can be used to
 * identify the group if it needs to be changed or removed.
 *
 * @param {String} selector A CSS selector that matches elements in the
 * source text should be represented in the heatmap group.
 */
AvatarGroups.prototype.addGroup = function(name, selector) {

  this.groups[name] = {
    selector: selector,
    elements: []
  };

  this._injectAvatars(name);
  this._renderAvatars(name);

};


/**
 * Re-render all groups to match the current container sizes.
 */
AvatarGroups.prototype.updateSize = function() {

  // Render the groups.
  _.each(this._getGroupNames(), _.bind(function(name) {
    this._renderAvatars(name);
  }, this));

};


/**
 * Get an array of all the group names.
 *
 * @return {Array}
 */
AvatarGroups.prototype._getGroupNames = function() {
  return _.keys(this.groups);
};


/**
 * Inject the avatars.
 * @abstract
 */
AvatarGroups.prototype._injectAvatars = function() {
  // NO-OP
};


/**
 * Position the avatars.
 * @abstract
 */
AvatarGroups.prototype._renderAvatars = function() {
  // NO-OP
};


module.exports = AvatarGroups;
