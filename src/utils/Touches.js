/**
 * The `Matter.Touches` module contains methods for creating and manipulating mouse inputs.
 *
 * @class Touches
 */

let Touches = {};

module.exports = Touches;

import { Common } from "matter-js";

(function() {
  /**
   * Creates a mouse input.
   * @method create
   * @param {HTMLElement} element
   * @return {mouse} A new mouse
   */
  Touches.create = function(element) {
    let touches = {};

    let numberOfTouches = [];

    if (!element) {
      Common.log(
        "Touches.create: element was undefined, defaulting to document.body",
        "warn"
      );
    }

    touches.element = element || document.body;
    touches.absolute = { x: 0, y: 0 };
    touches.position = { x: 0, y: 0 };
    touches.mousedownPosition = { x: 0, y: 0 };
    touches.mouseupPosition = { x: 0, y: 0 };
    touches.offset = { x: 0, y: 0 };
    touches.scale = { x: 1, y: 1 };
    touches.wheelDelta = 0;
    touches.button = -1;
    touches.pixelRatio = touches.element.getAttribute("data-pixel-ratio") || 1;

    touches.sourceEvents = {
      mousemove: null,
      mousedown: null,
      mouseup: null,
      mousewheel: null
    };

    touches.mousemove = function(event) {
      let position = Touches._getRelativeMousePosition(
          event,
          touches.element,
          touches.pixelRatio
        ),
        touches = event.changedTouches;

      if (touches) {
        touches.button = 0;
        event.preventDefault();
      }

      touches.absolute.x = position.x;
      touches.absolute.y = position.y;
      touches.position.x =
        touches.absolute.x * touches.scale.x + touches.offset.x;
      touches.position.y =
        touches.absolute.y * touches.scale.y + touches.offset.y;
      touches.sourceEvents.mousemove = event;
    };

    touches.mousedown = function(event) {
      let position = Touches._getRelativeMousePosition(
          event,
          touches.element,
          touches.pixelRatio
        ),
        touches = event.changedTouches;

      if (touches) {
        touches.button = 0;
        event.preventDefault();
      } else {
        touches.button = event.button;
      }

      touches.absolute.x = position.x;
      touches.absolute.y = position.y;
      touches.position.x =
        touches.absolute.x * touches.scale.x + touches.offset.x;
      touches.position.y =
        touches.absolute.y * touches.scale.y + touches.offset.y;
      touches.mousedownPosition.x = touches.position.x;
      touches.mousedownPosition.y = touches.position.y;
      touches.sourceEvents.mousedown = event;
    };

    touches.mouseup = function(event) {
      let position = Touches._getRelativeMousePosition(
          event,
          touches.element,
          touches.pixelRatio
        ),
        touches = event.changedTouches;

      if (touches) {
        event.preventDefault();
      }

      touches.button = -1;
      touches.absolute.x = position.x;
      touches.absolute.y = position.y;
      touches.position.x =
        touches.absolute.x * touches.scale.x + touches.offset.x;
      touches.position.y =
        touches.absolute.y * touches.scale.y + touches.offset.y;
      touches.mouseupPosition.x = touches.position.x;
      touches.mouseupPosition.y = touches.position.y;
      touches.sourceEvents.mouseup = event;
    };

    touches.mousewheel = function(event) {
      touches.wheelDelta = Math.max(
        -1,
        Math.min(1, event.wheelDelta || -event.detail)
      );
      event.preventDefault();
    };

    Touches.setElement(touches, touches.element);

    return touches;
  };

  /**
   * Sets the element the touches is bound to (and relative to).
   * @method setElement
   * @param {touches} touches
   * @param {HTMLElement} element
   */
  Touches.setElement = function(touches, element) {
    touches.element = element;

    element.addEventListener("mousemove", touches.mousemove);
    element.addEventListener("mousedown", touches.mousedown);
    element.addEventListener("mouseup", touches.mouseup);

    element.addEventListener("mousewheel", touches.mousewheel);
    element.addEventListener("DOMMouseScroll", touches.mousewheel);

    element.addEventListener("touchmove", touches.mousemove);
    element.addEventListener("touchstart", touches.mousedown);
    element.addEventListener("touchend", touches.mouseup);
  };

  /**
   * Clears all captured source events.
   * @method clearSourceEvents
   * @param {mouse} touches
   */
  Touches.clearSourceEvents = function(touches) {
    touches.sourceEvents.mousemove = null;
    touches.sourceEvents.mousedown = null;
    touches.sourceEvents.mouseup = null;
    touches.sourceEvents.mousewheel = null;
    touches.wheelDelta = 0;
  };

  /**
   * Sets the touches position offset.
   * @method setOffset
   * @param {touches} touches
   * @param {vector} offset
   */
  Touches.setOffset = function(touches, offset) {
    touches.offset.x = offset.x;
    touches.offset.y = offset.y;
    touches.position.x =
      touches.absolute.x * touches.scale.x + touches.offset.x;
    touches.position.y =
      touches.absolute.y * touches.scale.y + touches.offset.y;
  };

  /**
   * Sets the touches position scale.
   * @method setScale
   * @param {touches} touches
   * @param {vector} scale
   */
  Touches.setScale = function(touches, scale) {
    touches.scale.x = scale.x;
    touches.scale.y = scale.y;
    touches.position.x =
      touches.absolute.x * touches.scale.x + touches.offset.x;
    touches.position.y =
      touches.absolute.y * touches.scale.y + touches.offset.y;
  };

  /**
   * Gets the mouse position relative to an element given a screen pixel ratio.
   * @method _getRelativeMousePosition
   * @private
   * @param {} event
   * @param {} element
   * @param {number} pixelRatio
   * @return {}
   */
  Touches._getRelativeMousePosition = function(event, element, pixelRatio) {
    var elementBounds = element.getBoundingClientRect(),
      rootNode =
        document.documentElement || document.body.parentNode || document.body,
      scrollX =
        window.pageXOffset !== undefined
          ? window.pageXOffset
          : rootNode.scrollLeft,
      scrollY =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : rootNode.scrollTop,
      touches = event.changedTouches,
      x,
      y;

    if (touches) {
      x = touches[0].pageX - elementBounds.left - scrollX;
      y = touches[0].pageY - elementBounds.top - scrollY;
    } else {
      x = event.pageX - elementBounds.left - scrollX;
      y = event.pageY - elementBounds.top - scrollY;
    }

    return {
      x:
        x /
        ((element.clientWidth / (element.width || element.clientWidth)) *
          pixelRatio),
      y:
        y /
        ((element.clientHeight / (element.height || element.clientHeight)) *
          pixelRatio)
    };
  };
})();
