import { Common } from "matter-js";
export class Touches {
  static create(element) {
    let touches = {};

    // let numberOfTouches = [];

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
      console.log("move");
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
      console.log("mousedonw");
      let position = Touches._getRelativeMousePosition(
          event,
          touches.element,
          touches.pixelRatio
        ),
        touches = event.changedTouches;

      console.log("changed");
      console.log(event.changedTouches);

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

    return Touches.setElement(touches, touches.element);
  }

  static setElement(touches, element) {
    touches.element = element;

    element.addEventListener("mousemove", touches.mousemove);
    element.addEventListener("mousedown", touches.mousedown);
    element.addEventListener("mouseup", touches.mouseup);

    element.addEventListener("mousewheel", touches.mousewheel);
    element.addEventListener("DOMMouseScroll", touches.mousewheel);

    element.addEventListener("touchmove", touches.mousemove);
    element.addEventListener("touchstart", touches.mousedown);
    element.addEventListener("touchend", touches.mouseup);
    return touches;
  }

  static clearSourceEvents = function(touches) {
    touches.sourceEvents.mousemove = null;
    touches.sourceEvents.mousedown = null;
    touches.sourceEvents.mouseup = null;
    touches.sourceEvents.mousewheel = null;
    touches.wheelDelta = 0;
  };

  static setOffset = function(touches, offset) {
    touches.offset.x = offset.x;
    touches.offset.y = offset.y;
    touches.position.x =
      touches.absolute.x * touches.scale.x + touches.offset.x;
    touches.position.y =
      touches.absolute.y * touches.scale.y + touches.offset.y;
  };

  static setScale = function(touches, scale) {
    touches.scale.x = scale.x;
    touches.scale.y = scale.y;
    touches.position.x =
      touches.absolute.x * touches.scale.x + touches.offset.x;
    touches.position.y =
      touches.absolute.y * touches.scale.y + touches.offset.y;
  };

  static _getRelativeMousePosition = function(event, element, pixelRatio) {
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
}
