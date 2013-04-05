goog.provide('npf.events.ResizeHandler');
goog.provide('npf.events.ResizeHandler.EventType');

goog.require('goog.dom');
goog.require('goog.dom.FontSizeMonitor');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');


/**
 * Event handler for goog.events.EventType.RESIZE and
 * goog.dom.FontSizeMonitor.EventType.CHANGE.
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.events.EventTarget}
 */
npf.events.ResizeHandler = function(opt_domHelper) {
  goog.base(this);

  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();

  this.eventHandler_ = new goog.events.EventHandler(this);
  this.registerDisposable(this.eventHandler_);

  this.fontSizeMonitor_ = new goog.dom.FontSizeMonitor(this.domHelper_);
  this.registerDisposable(this.fontSizeMonitor_);

  this.eventHandler_
    .listen(this.domHelper_.getWindow(), goog.events.EventType.RESIZE, this)
    .listen(this.fontSizeMonitor_, goog.dom.FontSizeMonitor.EventType.CHANGE,
      this);
};
goog.inherits(npf.events.ResizeHandler, goog.events.EventTarget);


/**
 * @enum {string}
 */
npf.events.ResizeHandler.EventType = {
  RESIZE: goog.events.getUniqueId('resize')
};

/**
 * @type {goog.dom.DomHelper}
 * @private
 */
npf.events.ResizeHandler.prototype.domHelper_;

/**
 * @type {goog.dom.FontSizeMonitor}
 * @private
 */
npf.events.ResizeHandler.prototype.fontSizeMonitor_;

/**
 * @type {goog.events.EventHandler}
 * @private
 */
npf.events.ResizeHandler.prototype.eventHandler_;


/** @inheritDoc */
npf.events.ResizeHandler.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  this.domHelper_ = null;
  this.fontSizeMonitor_ = null;
  this.eventHandler_ = null;
};

/**
 * @param {goog.events.Event} evt
 */
npf.events.ResizeHandler.prototype.handleEvent = function(evt) {
  this.dispatchEvent(npf.events.ResizeHandler.EventType.RESIZE);
};
