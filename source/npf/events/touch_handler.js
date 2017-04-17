goog.provide('npf.events.TouchHandler');
goog.provide('npf.events.TouchHandler.DragEvent');
goog.provide('npf.events.TouchHandler.EventType');
goog.provide('npf.events.TouchHandler.ReleaseEvent');
goog.provide('npf.events.TouchHandler.SwipeEvent');
goog.provide('npf.events.TouchHandler.TapEvent');
goog.provide('npf.events.TouchHandler.TransformEvent');

goog.require('goog.dom');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.math.Coordinate');
goog.require('goog.object');
goog.require('goog.style');
goog.require('npf.events');
goog.require('npf.events.EventType');
goog.require('npf.generator');
goog.require('npf.userAgent.events');


/**
 * Hammer.JS, version 0.6.1, https://github.com/EightMedia/hammer.js
 */

/**
 * @param {Node} element
 * @constructor
 * @struct
 * @extends {goog.events.EventTarget}
 */
npf.events.TouchHandler = function(element) {
  npf.events.TouchHandler.base(this, 'constructor');

  /**
   * Holds the exact angle that has been moved.
   * @private {number}
   */
  this.angle_ = 0;

  /**
   * @type {boolean}
   */
  this.cssHacks = true;

  /**
   * @private {goog.math.Coordinate}
   */
  this.centerPos_ = null;

  /**
   * Holds the diraction that has been moved.
   * @private {?npf.events.TouchHandler.Direction}
   */
  this.direction_ = null;

  /**
   * Holds the distance that has been moved.
   * @private {number}
   */
  this.distance_ = 0;

  /**
   * @private {goog.dom.DomHelper}
   */
  this.domHelper_ = goog.dom.getDomHelper(element);

  /**
   * @type {boolean}
   */
  this.dragEnabled = true;

  /**
   * @type {boolean}
   */
  this.dragHorizontal = true;

  /**
   * Minimum distance before the drag event starts, in pixels.
   * @type {number}
   */
  this.dragMinDistance = 20;

  /**
   * @type {boolean}
   */
  this.dragVertical = true;

  /**
   * @type {Node}
   */
  this.element = element;

  /**
   * @private {Event}
   */
  this.endEvent_ = null;

  /**
   * How many fingers are on the screen.
   * @private {number}
   */
  this.fingers_ = 0;

  /**
   * @private {boolean}
   */
  this.first_ = false;

  /**
   * @private {?npf.events.TouchHandler.Gesture}
   */
  this.gesture_ = null;

  /**
   * @type {boolean}
   */
  this.holdEnabled = true;

  /**
   * @type {number}
   */
  this.holdTimeout = 500;

  /**
   * @type {?number}
   */
  this.holdTimer_ = null;

  /**
   * Keep track of the mouse status.
   * @private {boolean}
   */
  this.mousedown_ = false;

  /**
   * @private {Event}
   */
  this.moveEvent_ = null;

  /**
   * @private {Array.<!goog.math.Coordinate>}
   */
  this.movePos_ = null;

  /**
   * @private {goog.math.Coordinate}
   */
  this.offset_ = null;

  /**
   * @private {?npf.events.TouchHandler.Gesture}
   */
  this.prevGesture_ = null;

  /**
   * @private {?number}
   */
  this.prevTapEndTime_ = null;

  /**
   * @private {Array.<!goog.math.Coordinate>}
   */
  this.prevTapPos_ = [new goog.math.Coordinate(0, 0)];

  /**
   * @type {boolean}
   */
  this.preventDefault = false;

  /**
   * In degrees.
   * @type {number}
   */
  this.rotationTreshold = 15;

  /**
   * @type {number}
   */
  this.scaleTreshold = 0.1;

  /**
   * @private {Event}
   */
  this.startEvent_ = null;

  /**
   * @private {Array.<!goog.math.Coordinate>}
   */
  this.startPos_ = null;

  /**
   * @type {boolean}
   */
  this.swipeEnabled = true;

  /**
   * In pixels.
   * @type {number}
   */
  this.swipeMinDistance = 20;

  /**
   * In ms.
   * @type {number}
   */
  this.swipeTime = 200;

  /**
   * @type {boolean}
   */
  this.tapDouble = true;

  /**
   * @type {boolean}
   */
  this.tapEnabled = true;

  /**
   * @type {number}
   */
  this.tapDoubleDistance = 20;

  /**
   * @type {number}
   */
  this.tapMaxDistance = 10;

  /**
   * @type {number}
   */
  this.tapMaxInterval = 300;

  /**
   * @private {?number}
   */
  this.touchStartTime_ = null;

  /**
   * Pinch zoom and rotation.
   * @type {boolean}
   */
  this.transformEnabled = true;

  if (this.cssHacks && this.element instanceof Element) {
    goog.style.setStyle(this.element, {
      "userSelect": "none",
      "touchCallout": "none",
      "userDrag": "none",
      "tapHighlightColor": "rgba(0,0,0,0)"
    });
  }

  var handler = new goog.events.EventHandler(this);
  this.registerDisposable(handler);

  var EventType = goog.events.EventType;

  if (npf.userAgent.events.isTouchEventSupported()) {
    // bind events for touch devices
    // except for windows phone 7.5, it doesnt support touch events..!
    handler.
      listen(this.element, EventType.TOUCHSTART, this.onStart_).
      listen(this.element, EventType.TOUCHMOVE, this.onProgress_).
      listen(this.element, EventType.TOUCHEND, this.onEnd_).
      listen(this.element, EventType.TOUCHCANCEL, this.onEnd_);
  } else {
    // for non-touch
    handler.
      listen(this.element, EventType.MOUSEDOWN, this.onStart_).
      listen(this.element, EventType.MOUSEMOVE, this.onProgress_).
      listen(this.element, EventType.MOUSEOUT, this.onMouseOut_).
      listen(this.element, EventType.MOUSEUP, this.onEnd_);
  }
};
goog.inherits(npf.events.TouchHandler, goog.events.EventTarget);


/**
 * @enum {string}
 */
npf.events.TouchHandler.Direction = {
  DOWN: npf.generator.getUniqueId('down'),
  LEFT: npf.generator.getUniqueId('left'),
  RIGHT: npf.generator.getUniqueId('right'),
  UP: npf.generator.getUniqueId('up')
};

/**
 * @enum {string}
 */
npf.events.TouchHandler.EventType = {

  /**
   * npf.events.TouchHandler.TapEvent
   */
  DOUBLETAP: npf.events.EventType.DOUBLETAP,

  /**
   * npf.events.TouchHandler.DragEvent
   */
  DRAG: npf.events.EventType.DRAG,

  /**
   * npf.events.TouchHandler.DragEvent
   */
  DRAGEND: npf.events.EventType.DRAGEND,

  /**
   * npf.events.TouchHandler.DragEvent
   */
  DRAGSTART: npf.events.EventType.DRAGSTART,

  /**
   * npf.events.TouchHandler.TapEvent
   */
  HOLD: npf.events.EventType.HOLD,

  /**
   * npf.events.TouchHandler.ReleaseEvent
   */
  RELEASE: npf.events.EventType.RELEASE,

  /**
   * npf.events.TouchHandler.SwipeEvent
   */
  SWIPE: npf.events.EventType.SWIPE,

  /**
   * npf.events.TouchHandler.TapEvent
   */
  TAP: npf.events.EventType.TAP,

  /**
   * npf.events.TouchHandler.TransformEvent
   */
  TRANSFORM: npf.events.EventType.TRANSFORM,

  /**
   * npf.events.TouchHandler.TransformEvent
   */
  TRANSFORMEND: npf.events.EventType.TRANSFORMEND,

  /**
   * npf.events.TouchHandler.TransformEvent
   */
  TRANSFORMSTART: npf.events.EventType.TRANSFORMSTART
};

/**
 * @enum {string}
 */
npf.events.TouchHandler.Gesture = {
  DRAG: npf.generator.getUniqueId('drag'),
  DOUBLETAP: npf.generator.getUniqueId('doubletap'),
  HOLD: npf.generator.getUniqueId('hold'),
  SWIPE: npf.generator.getUniqueId('swipe'),
  TAP: npf.generator.getUniqueId('tap'),
  TRANSFORM: npf.generator.getUniqueId('transform')
};

/**
 * Calculate the angle between two points.
 * @param {goog.math.Coordinate} pos1
 * @param {goog.math.Coordinate} pos2
 * @return {number}
 */
npf.events.TouchHandler.getAngle = function(pos1, pos2) {
  return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
};

/**
 * Angle to direction define.
 * @param {number} angle
 * @return {npf.events.TouchHandler.Direction?} direction
 */
npf.events.TouchHandler.getDirectionFromAngle = function(angle) {
  var Direction = npf.events.TouchHandler.Direction;
  var directions = goog.object.create(
    Direction.DOWN, angle >= 45 && angle < 135, // 90
    Direction.LEFT, angle >= 135 || angle <= -135, // 180
    Direction.UP, angle < -45 && angle > -135, // 270
    Direction.RIGHT, angle >= -45 && angle <= 45 // 0
  );

  return /** @type {npf.events.TouchHandler.Direction?} */ (
    goog.object.findKey(directions, function(value) {
      return /** @type {boolean} */ (value);
    }) || null);
};

/**
 * Returns count of fingers in the event.
 * When no fingers are detected, one finger is returned (mouse pointer).
 * @param {!Event} nativeEvent
 * @return {number}
 */
npf.events.TouchHandler.getFingerCount = function(nativeEvent) {
  // there is a bug on android (until v4?) that touches is always 1,
  // so no multitouch is supported, e.g. no, zoom and rotation...
  return nativeEvent['touches'] ? nativeEvent['touches'].length : 1;
};

/**
 * Get the x and y positions from the event object.
 * @param {!Event} nativeEvent
 * @return {!Array.<!goog.math.Coordinate>}
 */
npf.events.TouchHandler.getPositionFromEvent = function(nativeEvent) {
  /** @type {!Array.<goog.math.Coordinate>} */
  var pos = [];

  if (npf.userAgent.events.isTouchEventSupported()) {
    var touches = nativeEvent['touches'].length > 0 ?
      nativeEvent['touches'] : nativeEvent['changedTouches'];

    for (var t = 0; t < touches.length; t++) {
      pos.push(new goog.math.Coordinate(touches[t].pageX, touches[t].pageY));
    }
  } else {
    // no touches, use the event pageX and pageY
    pos.push(new goog.math.Coordinate(nativeEvent.pageX, nativeEvent.pageY));
  }

  return pos;
};


/** @inheritDoc */
npf.events.TouchHandler.prototype.disposeInternal = function() {
  npf.events.TouchHandler.base(this, 'disposeInternal');

  this.centerPos_ = null;
  this.element = null;
  this.endEvent_ = null;
  this.domHelper_ = null;
  this.moveEvent_ = null;
  this.movePos_ = null;
  this.prevTapPos_ = null;
  this.offset_ = null;
  this.startEvent_ = null;
  this.startPos_ = null;
};

/**
 * @return {goog.dom.DomHelper}
 */
npf.events.TouchHandler.prototype.getDomHelper = function() {
  return this.domHelper_;
};

/**
 * Cancel event.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.cancelEvent_ = function(nativeEvent) {
  if (nativeEvent.preventDefault) {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
  } else {
    nativeEvent.returnValue = false;
    nativeEvent.cancelBubble = true;
  }
};

/**
 * Reset the internal vars to the start values.
 * @private
 */
npf.events.TouchHandler.prototype.reset_ = function() {
  this.first_ = false;
  this.fingers_ = 0;
  this.distance_ = 0;
  this.angle_ = 0;
  this.gesture_ = null;
  this.movePos_ = null;
};

/**
 * Hold gesture.
 * Fired on touchstart.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.gesturesHold_ = function(nativeEvent) {
  // only when one finger is on the screen
  if (this.holdEnabled) {
    this.gesture_ = npf.events.TouchHandler.Gesture.HOLD;
    clearTimeout(this.holdTimer_);

    this.holdTimer_ = goog.Timer.callOnce(function() {
      if (this.gesture_ == npf.events.TouchHandler.Gesture.HOLD) {
        this.dispatchEvent(new npf.events.TouchHandler.TapEvent(
          nativeEvent, npf.events.TouchHandler.EventType.HOLD,
          /** @type {!Array} */ (this.startPos_)));
      }
    }, this.holdTimeout, this);
  }
};

/**
 * Swipe gesture.
 * Fired on touchend.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.gesturesSwipe_ = function(nativeEvent) {
  if (!this.movePos_) {
    return;
  }

  // get the distance we moved

  /** @type {number} */
  var distanceX = this.movePos_[0].x - this.startPos_[0].x;
  /** @type {number} */
  var distanceY = this.movePos_[0].y - this.startPos_[0].y;
  this.distance_ = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // compare the kind of gesture by time

  /** @type {number} */
  var now = new Date().getTime();
  /** @type {number} */
  var touchTime = now - this.touchStartTime_;

  if (
    this.swipeEnabled &&
    this.swipeTime > touchTime &&
    this.distance_ > this.swipeMinDistance
  ) {
    // calculate the angle
    this.angle_ = npf.events.TouchHandler.getAngle(
      this.startPos_[0], this.movePos_[0]);
    this.direction_ =
      npf.events.TouchHandler.getDirectionFromAngle(this.angle_);
    this.gesture_ = npf.events.TouchHandler.Gesture.SWIPE;

    /** @type {number} */
    var x = this.movePos_[0].x - this.offset_.x;
    /** @type {number} */
    var y = this.movePos_[0].y - this.offset_.y;

    this.dispatchEvent(new npf.events.TouchHandler.SwipeEvent(
      nativeEvent, this.angle_,
      /** @type {npf.events.TouchHandler.Direction} */ (this.direction_),
      this.distance_, distanceX, distanceY,
      new goog.math.Coordinate(x, y)
    ));
  }
};

/**
 * Drag gesture
 * Fired on mousemove
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.dragGestures_ = function(nativeEvent) {
  // get the distance we moved

  /** @type {number} */
  var distanceX = this.movePos_[0].x - this.startPos_[0].x;
  /** @type {number} */
  var distanceY = this.movePos_[0].y - this.startPos_[0].y;

  this.distance_ = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // drag
  // minimal movement required
  if (
    this.dragEnabled &&
    this.distance_ > this.dragMinDistance ||
    npf.events.TouchHandler.Gesture.DRAG == this.gesture_
  ) {
    // calculate the angle
    this.angle_ = npf.events.TouchHandler.getAngle(
      this.startPos_[0], this.movePos_[0]);
    this.direction_ = npf.events.TouchHandler.getDirectionFromAngle(
      this.angle_);

    // check the movement and stop if we go in the wrong direction
    var isVertical = npf.events.TouchHandler.Direction.UP == this.direction_ ||
      npf.events.TouchHandler.Direction.DOWN == this.direction_;

    if (
      (
        (isVertical && !this.dragVertical) ||
        (!isVertical && !this.dragHorizontal)
      ) &&
      this.distance_ > this.dragMinDistance
    ) {
      return;
    }

    this.gesture_ = npf.events.TouchHandler.Gesture.DRAG;

    /** @type {number} */
    var x = this.movePos_[0].x - this.offset_.x;
    /** @type {number} */
    var y = this.movePos_[0].y - this.offset_.y;
    var position = new goog.math.Coordinate(x, y);

    // on the first time trigger the start event
    if (this.first_) {
      this.dispatchEvent(new npf.events.TouchHandler.DragEvent(
        nativeEvent, npf.events.TouchHandler.EventType.DRAGSTART,
        this.angle_,
        /** @type {npf.events.TouchHandler.Direction} */ (this.direction_),
        this.distance_, distanceX, distanceY, position
      ));
      this.first_ = false;
    }

    this.dispatchEvent(new npf.events.TouchHandler.DragEvent(
      nativeEvent, npf.events.TouchHandler.EventType.DRAG,
      this.angle_,
      /** @type {npf.events.TouchHandler.Direction} */ (this.direction_),
      this.distance_, distanceX, distanceY, position
    ));
    this.cancelEvent_(nativeEvent);
  }
};

/**
 * Hold gesture.
 * Fired on touchstart.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.holdGestures_ = function(nativeEvent) {
  // only when one finger is on the screen
  if (this.holdEnabled) {
    this.gesture_ = npf.events.TouchHandler.Gesture.HOLD;
    clearTimeout(this.holdTimer_);

    var self = this;

    this.holdTimer_ = setTimeout(function() {
      if (
        !self.isDisposed() &&
        npf.events.TouchHandler.Gesture.HOLD == self.gesture_
      ) {
        self.dispatchEvent(new npf.events.TouchHandler.TapEvent(
          nativeEvent, npf.events.TouchHandler.EventType.HOLD,
          /** @type {!Array<!goog.math.Coordinate>} */ (self.startPos_)));
      }
    }, this.holdTimeout);
  }
};

/**
 * Swipe gesture.
 * Fired on touchend.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.swipeGestures_ = function(nativeEvent) {
  if (!this.movePos_) {
    return;
  }

  // get the distance we moved

  /** @type {number} */
  var distanceX = this.movePos_[0].x - this.startPos_[0].x;
  /** @type {number} */
  var distanceY = this.movePos_[0].y - this.startPos_[0].y;
  this.distance_ = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // compare the kind of gesture by time

  /** @type {number} */
  var now = new Date().getTime();
  /** @type {number} */
  var touchTime = now - this.touchStartTime_;

  if (
    this.swipeEnabled &&
    this.swipeTime > touchTime &&
    this.distance_ > this.swipeMinDistance
  ) {
    // calculate the angle
    this.angle_ = npf.events.TouchHandler.getAngle(
      this.startPos_[0], this.movePos_[0]);
    this.direction_ = npf.events.TouchHandler.getDirectionFromAngle(
      this.angle_);
    this.gesture_ = npf.events.TouchHandler.Gesture.SWIPE;

    /** @type {number} */
    var x = this.movePos_[0].x - this.offset_.x;
    /** @type {number} */
    var y = this.movePos_[0].y - this.offset_.y;

    this.dispatchEvent(new npf.events.TouchHandler.SwipeEvent(
      nativeEvent, this.angle_,
      /** @type {npf.events.TouchHandler.Direction} */ (this.direction_),
      this.distance_, distanceX, distanceY,
      new goog.math.Coordinate(x, y)
    ));
  }
};

/**
 * Tap and double tap gesture.
 * Fired on touchend.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.tapGestures_ = function(nativeEvent) {
  // compare the kind of gesture by time

  /** @type {number} */
  var now = goog.now();
  /** @type {number} */
  var touchTime = now - this.touchStartTime_;

  // dont fire when hold is fired
  if (this.holdEnabled && !(this.holdEnabled && this.holdTimeout > touchTime)) {
    return;
  }

  /** @type {boolean} */
  var isDoubleTap = false;

  if (
    this.prevTapPos_ &&
    this.tapDouble &&
    npf.events.TouchHandler.Gesture.TAP == this.prevGesture_ &&
    this.touchStartTime_ - this.prevTapEndTime_ < this.tapMaxInterval
  ) {
    // when previous event was tap and the tap was maxInterval ms ago

    /** @type {number} */
    var prevTapX = Math.abs(this.prevTapPos_[0].x - this.startPos_[0].x);
    /** @type {number} */
    var prevTapY = Math.abs(this.prevTapPos_[0].y - this.startPos_[0].y);

    isDoubleTap = !!this.prevTapPos_ && !!this.startPos_ &&
      Math.max(prevTapX, prevTapY) < this.tapDoubleDistance;
  }

  if (isDoubleTap) {
    this.gesture_ = npf.events.TouchHandler.Gesture.DOUBLETAP;
    this.prevTapEndTime_ = null;

    this.dispatchEvent(new npf.events.TouchHandler.TapEvent(
      nativeEvent, npf.events.TouchHandler.EventType.DOUBLETAP,
      /** @type {!Array<!goog.math.Coordinate>} */ (this.startPos_)
    ));
    this.cancelEvent_(nativeEvent);
  } else {
    // single tap is single touch

    /** @type {number} */
    var xDistance = this.movePos_ ?
      Math.abs(this.movePos_[0].x - this.startPos_[0].x) : 0;
    /** @type {number} */
    var yDistance = this.movePos_ ?
      Math.abs(this.movePos_[0].y - this.startPos_[0].y) : 0;

    this.distance_ = Math.max(xDistance, yDistance);

    if (this.distance_ < this.tapMaxDistance) {
      this.gesture_ = npf.events.TouchHandler.Gesture.TAP;
      this.prevTapEndTime_ = now;
      this.prevTapPos_ = this.startPos_;

      if (this.tapEnabled) {
        this.dispatchEvent(new npf.events.TouchHandler.TapEvent(
          nativeEvent, npf.events.TouchHandler.EventType.TAP,
          /** @type {!Array<!goog.math.Coordinate>} */ (this.startPos_)));
        this.cancelEvent_(nativeEvent);
      }
    }
  }
};

/**
 * Transform gesture.
 * Fired on touchmove.
 * @param {!Event} nativeEvent
 * @private
 */
npf.events.TouchHandler.prototype.transformGestures_ = function(nativeEvent) {
  if (
    !this.transformEnabled ||
    npf.events.TouchHandler.Gesture.DRAG == this.gesture_ ||
    2 != npf.events.TouchHandler.getFingerCount(nativeEvent)
  ) {
    return false;
  }

  /** @type {number} */
  var rotation = this.calculateRotation_(this.startPos_, this.movePos_);
  /** @type {number} */
  var scale = this.calculateScale_(this.startPos_, this.movePos_);

  if (
    npf.events.TouchHandler.Gesture.TRANSFORM != this.gesture_ &&
    Math.abs(1 - scale) <= this.scaleTreshold &&
    Math.abs(rotation) <= this.rotationTreshold
  ) {
    return false;
  }

  this.gesture_ = npf.events.TouchHandler.Gesture.TRANSFORM;

  /** @type {number} */
  var x = (this.movePos_[0].x + this.movePos_[1].x) / 2 - this.offset_.x;
  /** @type {number} */
  var y = (this.movePos_[0].y + this.movePos_[1].y) / 2 - this.offset_.y;

  this.centerPos_ = new goog.math.Coordinate(x, y);

  if (this.first_) {
    this.dispatchEvent(new npf.events.TouchHandler.TransformEvent(
      nativeEvent, npf.events.TouchHandler.EventType.TRANSFORMSTART,
      this.centerPos_, rotation, scale
    ));
    this.first_ = false;
  }

  this.dispatchEvent(new npf.events.TouchHandler.TransformEvent(
    nativeEvent, npf.events.TouchHandler.EventType.TRANSFORM,
    this.centerPos_, rotation, scale
  ));
  this.cancelEvent_(nativeEvent);

  return true;
};

/**
 * Calculate the rotation degrees between two fingers.
 * @param {Array.<goog.math.Coordinate>} starts
 * @param {Array.<goog.math.Coordinate>} moves
 * @return {number}
 * @private
 */
npf.events.TouchHandler.prototype.calculateRotation_ = function(starts, moves) {
  if (2 != starts.length || 2 != moves.length) {
    return 0;
  }

  /** @type {number} */
  var startX = starts[0].x - starts[1].x;
  /** @type {number} */
  var startY = starts[0].y - starts[1].y;
  /** @type {number} */
  var moveX = moves[0].x - moves[1].x;
  /** @type {number} */
  var moveY = moves[0].y - moves[1].y;

  return 180 / Math.PI * (
    Math.atan2(moveY, moveX) - Math.atan2(startY, startX));
};

/**
 * Calculate the scale size between two fingers.
 * @param {Array.<goog.math.Coordinate>} starts
 * @param {Array.<goog.math.Coordinate>} moves
 * @return {number}
 * @private
 */
npf.events.TouchHandler.prototype.calculateScale_ = function(starts, moves) {
  if (2 != starts.length || 2 != moves.length) {
    return 0;
  }

  /** @type {number} */
  var startX = starts[0].x - starts[1].x;
  /** @type {number} */
  var startY = starts[0].y - starts[1].y;
  /** @type {number} */
  var moveX = moves[0].x - moves[1].x;
  /** @type {number} */
  var moveY = moves[0].y - moves[1].y;
  /** @type {number} */
  var startDistance = Math.sqrt(startX * startX + startY * startY);
  /** @type {number} */
  var endDistance = Math.sqrt((moveX * moveX) + (moveY * moveY));

  return endDistance / startDistance;
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.events.TouchHandler.prototype.onStart_ = function(evt) {
  var nativeEvent = /** @type {!Event} */ (evt.getBrowserEvent());

  this.startPos_ = npf.events.TouchHandler.getPositionFromEvent(nativeEvent);
  this.movePos_ = null;
  this.touchStartTime_ = goog.now();
  this.fingers_ = npf.events.TouchHandler.getFingerCount(nativeEvent);
  this.first_ = true;
  this.startEvent_ = nativeEvent;

  // borrowed from jquery offset
  // https://github.com/jquery/jquery/blob/master/src/offset.js

  var box = this.element.getBoundingClientRect();
  /** @type {Element} */
  var bodyElement = this.domHelper_.getDocument().body;
  /** @type {!Window} */
  var win = this.domHelper_.getWindow();
  /** @type {number} */
  var clientTop = this.element.clientTop  || bodyElement.clientTop  || 0;
  /** @type {number} */
  var clientLeft = this.element.clientLeft || bodyElement.clientLeft || 0;
  /** @type {number} */
  var scrollTop = win.pageYOffset || this.element.scrollTop ||
    bodyElement.scrollTop;
  /** @type {number} */
  var scrollLeft = win.pageXOffset || this.element.scrollLeft ||
    bodyElement.scrollLeft;
  /** @type {number} */
  var x = box.left + scrollLeft - clientLeft;
  /** @type {number} */
  var y = box.top + scrollTop - clientTop;

  this.offset_ = new goog.math.Coordinate(x, y);
  this.mousedown_ = true;

  // hold gesture
  this.holdGestures_(nativeEvent);

  if (this.preventDefault) {
    this.cancelEvent_(nativeEvent);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.events.TouchHandler.prototype.onProgress_ = function(evt) {
  if (!this.mousedown_) {
    return false;
  }

  var nativeEvent = /** @type {!Event} */ (evt.getBrowserEvent());

  this.moveEvent_ = nativeEvent;
  this.movePos_ = npf.events.TouchHandler.getPositionFromEvent(nativeEvent);

  if (!this.transformGestures_(nativeEvent)) {
    this.dragGestures_(nativeEvent);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.events.TouchHandler.prototype.onMouseOut_ = function(evt) {
  if (!npf.events.isMouseEventWithinElement(evt, this.element)) {
    this.onEnd_(evt);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.events.TouchHandler.prototype.onEnd_ = function(evt) {
  var nativeEvent = /** @type {!Event} */ (evt.getBrowserEvent());

  if (
    !this.mousedown_ ||
    (
      npf.events.TouchHandler.Gesture.TRANSFORM != this.gesture_ &&
      nativeEvent['touches'] &&
      nativeEvent['touches'].length
    )
  ) {
    return false;
  }

  this.mousedown_ = false;
  this.endEvent_ = nativeEvent;

  var dragging = this.gesture_ == npf.events.TouchHandler.Gesture.DRAG;

  // swipe gesture
  this.swipeGestures_(nativeEvent);

  if (dragging) {
    this.dispatchEvent(new npf.events.TouchHandler.DragEvent(
      nativeEvent, npf.events.TouchHandler.EventType.DRAGEND,
      this.angle_,
      /** @type {npf.events.TouchHandler.Direction} */ (this.direction_),
      this.distance_
    ));
  } else if (
    this.gesture_ == npf.events.TouchHandler.Gesture.TRANSFORM &&
    this.centerPos_
  ) {
    this.dispatchEvent(new npf.events.TouchHandler.TransformEvent(
      nativeEvent, npf.events.TouchHandler.EventType.TRANSFORMEND,
      this.centerPos_,
      this.calculateRotation_(this.startPos_, this.movePos_),
      this.calculateScale_(this.startPos_, this.movePos_)
    ));
  } else {
    this.tapGestures_(nativeEvent);
  }

  this.prevGesture_ = this.gesture_;
  this.dispatchEvent(new npf.events.TouchHandler.ReleaseEvent(
    nativeEvent,
    /** @type {npf.events.TouchHandler.Gesture} */ (this.gesture_)
  ));
  this.reset_();
};


/**
 * @param {!Event} nativeEvent
 * @param {npf.events.TouchHandler.EventType} type
 * @constructor
 * @extends {goog.events.BrowserEvent}
 */
npf.events.TouchHandler.Event = function(nativeEvent, type) {
  npf.events.TouchHandler.Event.base(this, 'constructor', nativeEvent);

  this.type = type;

  /**
   * @type {!Array.<!goog.math.Coordinate>}
   */
  this.touches = npf.events.TouchHandler.getPositionFromEvent(nativeEvent);
};
goog.inherits(npf.events.TouchHandler.Event, goog.events.BrowserEvent);


/**
 * @param {!Event} nativeEvent
 * @param {npf.events.TouchHandler.EventType} type
 * @param {number} angle
 * @param {npf.events.TouchHandler.Direction} direction
 * @param {number} distance
 * @param {number=} opt_distanceX
 * @param {number=} opt_distanceY
 * @param {goog.math.Coordinate=} opt_position
 * @constructor
 * @extends {npf.events.TouchHandler.Event}
 */
npf.events.TouchHandler.DragEvent = function(nativeEvent, type, angle,
    direction, distance, opt_distanceX, opt_distanceY, opt_position) {
  npf.events.TouchHandler.DragEvent.base(
    this, 'constructor', nativeEvent, type);

  /**
   * @type {number}
   */
  this.angle = angle;

  /**
   * @type {npf.events.TouchHandler.Direction}
   */
  this.direction = direction;

  /**
   * @type {number}
   */
  this.distance = distance;

  /**
   * @type {number}
   */
  this.distanceX = opt_distanceX || 0;

  /**
   * @type {number}
   */
  this.distanceY = opt_distanceY || 0;

  /**
   * @type {goog.math.Coordinate}
   */
  this.position = opt_position || null;
};
goog.inherits(npf.events.TouchHandler.DragEvent, npf.events.TouchHandler.Event);


/**
 * @param {!Event} nativeEvent
 * @param {npf.events.TouchHandler.Gesture} gesture
 * @constructor
 * @extends {npf.events.TouchHandler.Event}
 */
npf.events.TouchHandler.ReleaseEvent = function(nativeEvent, gesture) {
  npf.events.TouchHandler.ReleaseEvent.base(this, 'constructor', nativeEvent,
    npf.events.TouchHandler.EventType.RELEASE);

  /**
   * @type {npf.events.TouchHandler.Gesture}
   */
  this.gesture = gesture;
};
goog.inherits(
  npf.events.TouchHandler.ReleaseEvent, npf.events.TouchHandler.Event);


/**
 * @param {!Event} nativeEvent
 * @param {number} angle
 * @param {npf.events.TouchHandler.Direction} direction
 * @param {number} distance
 * @param {number} distanceX
 * @param {number} distanceY
 * @param {!goog.math.Coordinate} position
 * @constructor
 * @extends {npf.events.TouchHandler.Event}
 */
npf.events.TouchHandler.SwipeEvent = function(nativeEvent, angle, direction,
    distance, distanceX, distanceY, position) {
  npf.events.TouchHandler.SwipeEvent.base(
    this, 'constructor', nativeEvent, npf.events.TouchHandler.EventType.SWIPE);

  /**
   * @type {number}
   */
  this.angle = angle;

  /**
   * @type {npf.events.TouchHandler.Direction}
   */
  this.direction = direction;

  /**
   * @type {number}
   */
  this.distance = distance;

  /**
   * @type {number}
   */
  this.distanceX = distanceX;

  /**
   * @type {number}
   */
  this.distanceY = distanceY;

  /**
   * @type {!goog.math.Coordinate}
   */
  this.position = position;
};
goog.inherits(
  npf.events.TouchHandler.SwipeEvent, npf.events.TouchHandler.Event);


/**
 * @param {!Event} nativeEvent
 * @param {npf.events.TouchHandler.EventType} type
 * @param {!Array.<!goog.math.Coordinate>} position
 * @constructor
 * @extends {npf.events.TouchHandler.Event}
 */
npf.events.TouchHandler.TapEvent = function(nativeEvent, type, position) {
  npf.events.TouchHandler.TapEvent.base(this, 'constructor', nativeEvent, type);

  /**
   * @type {!Array.<!goog.math.Coordinate>}
   */
  this.position = position;
};
goog.inherits(npf.events.TouchHandler.TapEvent, npf.events.TouchHandler.Event);


/**
 * @param {!Event} nativeEvent
 * @param {npf.events.TouchHandler.EventType} type
 * @param {!goog.math.Coordinate} position
 * @param {number} rotation
 * @param {number} scale
 * @constructor
 * @extends {npf.events.TouchHandler.Event}
 */
npf.events.TouchHandler.TransformEvent = function(nativeEvent, type, position,
    rotation, scale) {
  npf.events.TouchHandler.TransformEvent.base(
    this, 'constructor', nativeEvent, type);

  /**
   * @type {!goog.math.Coordinate}
   */
  this.position = position;

  /**
   * @type {number}
   */
  this.rotation = rotation;

  /**
   * @type {number}
   */
  this.scale = scale;
};
goog.inherits(
  npf.events.TouchHandler.TransformEvent, npf.events.TouchHandler.Event);
