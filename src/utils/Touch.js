export class Touch {
  static create(element, lookAtBounds) {
    // let numberOfTouches = [];

    if (!element) {
      throw new Error("Please provide an element.");
    }
    let touches = {
      element,
      touchList: [],
      constraints: [],
      observers: [],
      absolutes: {
        0: { x: 0, y: 0 },
        1: { x: 0, y: 0 },
        2: { x: 0, y: 0 },
        3: { x: 0, y: 0 },
        4: { x: 0, y: 0 }
      },
      positions: {
        0: { x: 0, y: 0 },
        1: { x: 0, y: 0 },
        2: { x: 0, y: 0 },
        3: { x: 0, y: 0 },
        4: { x: 0, y: 0 }
      },
      // mousedownPosition: { x: 0, y: 0 },
      // mouseupPosition: { x: 0, y: 0 },
      offsets: {
        0: { x: 0, y: 0 },
        1: { x: 0, y: 0 },
        2: { x: 0, y: 0 },
        3: { x: 0, y: 0 },
        4: { x: 0, y: 0 }
      },
      scales: {
        0: { x: 1, y: 1 },
        1: { x: 1, y: 1 },
        2: { x: 1, y: 1 },
        3: { x: 1, y: 1 },
        4: { x: 1, y: 1 }
      },
      pixelRatio: element.getAttribute("data-pixel-ratio") || 1,
      sourceEvents: {
        mousemove: null,
        mousedown: null,
        mouseup: null,
        mousewheel: null
      },
      activeTouches: 0,
      touchStart: event => {
        touches.activeTouches = event.changedTouches.length;
        const positions = Touch._getRelativeTouchPositions(
          event,
          element,
          touches.pixelRatio,
          lookAtBounds
        );
        positions.forEach((position, index) => {
          touches.absolutes[index].x = position.x;
          touches.absolutes[index].y = position.y;
          touches.positions[index].x =
            touches.absolutes[index].x * touches.scales[index].x +
            touches.offsets[index].x;
          touches.positions[index].y =
            touches.absolutes[index].y * touches.scales[index].y +
            touches.offsets[index].y;
        });
        touches.observers.forEach(observer =>
          observer.touchStart(event, touches)
        );
      },
      touchMove: event => {
        touches.activeTouches = event.changedTouches.length;
        const positions = Touch._getRelativeTouchPositions(
          event,
          element,
          touches.pixelRatio,
          lookAtBounds
        );
        positions.forEach((position, index) => {
          touches.absolutes[index].x = position.x;
          touches.absolutes[index].y = position.y;
          touches.positions[index].x =
            touches.absolutes[index].x * touches.scales[index].x +
            touches.offsets[index].x;
          touches.positions[index].y =
            touches.absolutes[index].y * touches.scales[index].y +
            touches.offsets[index].y;
        });
        touches.observers.forEach(observer =>
          observer.touchMove(event, touches)
        );
      },
      touchEnd: event => {
        touches.activeTouches = event.changedTouches.length;
        const positions = Touch._getRelativeTouchPositions(
          event,
          element,
          touches.pixelRatio,
          lookAtBounds
        );
        positions.forEach((position, index) => {
          touches.absolutes[index].x = position.x;
          touches.absolutes[index].y = position.y;
          touches.positions[index].x =
            touches.absolutes[index].x * touches.scales[index].x +
            touches.offsets[index].x;
          touches.positions[index].y =
            touches.absolutes[index].y * touches.scales[index].y +
            touches.offsets[index].y;
        });
        touches.observers.forEach(observer =>
          observer.touchEnd(event, touches)
        );
      }
    };

    /*
    touches.mousemove = function(event) {
      console.log("move");
      let position = Touch._getRelativeMousePosition(
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
      let position = Touch._getRelativeMousePosition(
          event,
          touches.element,
          touches.pixelRatio
        ),
        touches = event.changedTouches;

      console.log("changed");
      console.log(event.changedTouches);

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
      let position = Touch._getRelativeMousePosition(
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
    };*/

    return Touch.setElement(touches, element);
  }

  static setElement(touches, element) {
    touches.element = element;
    element.addEventListener("touchmove", touches.touchMove);
    element.addEventListener("touchstart", touches.touchStart);
    element.addEventListener("touchend", touches.touchEnd);
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
    for (let index = 0; index < 5; index++) {
      touches.offsets[index].x = offset.x;
      touches.offsets[index].y = offset.y;
      touches.positions[index].x =
        touches.absolutes[index].x * touches.scales[index].x +
        touches.offsets[index].x;
      touches.positions[index].y =
        touches.absolutes[index].y * touches.scales[index].y +
        touches.offsets[index].y;
    }
  };

  static setScale = function(touches, scale) {
    for (let index = 0; index < 5; index++) {
      touches.scales[index].x = scale.x;
      touches.scales[index].y = scale.y;
      touches.positions[index].x =
        touches.absolutes[index].x * touches.scales[index].x +
        touches.offsets[index].x;
      touches.positions[index].y =
        touches.absolutes[index].y * touches.scales[index].y +
        touches.offsets[index].y;
    }
  };

  static _getRelativeTouchPositions = function(event, element, pixelRatio) {
    let elementBounds = element.getBoundingClientRect();
    let rootNode =
      document.documentElement || document.body.parentNode || document.body;
    let scrollX =
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : rootNode.scrollLeft;
    let scrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : rootNode.scrollTop;
    let touches = event.changedTouches;
    if (!touches) {
      throw new Error("No touches.");
    }
    const positions = [];
    for (let index = 0; index < touches.length; index++) {
      const { pageX, pageY } = touches[index];
      let x = pageX - elementBounds.left - scrollX;
      let y = pageY - elementBounds.top - scrollY;
      positions.push({
        x:
          x /
          ((element.clientWidth / (element.width || element.clientWidth)) *
            pixelRatio),
        y:
          y /
          ((element.clientHeight / (element.height || element.clientHeight)) *
            pixelRatio)
      });
    }
    return positions;

    /*
    if (touches) {
    } else {
      x = event.pageX - elementBounds.left - scrollX;
      y = event.pageY - elementBounds.top - scrollY;
    }

    const pixelRatioX =
      Math.abs(lookAtBounds.min.x) +
      Math.abs(lookAtBounds.max.x) / element.width;
    const pixelRatioY =
      Math.abs(lookAtBounds.min.y) +
      Math.abs(lookAtBounds.max.y) / element.height;
    console.log(event);
    console.log(element);
    console.log("--------------");
    console.log(element.getBoundingClientRect());

    x *= pixelRatioX;
    y *= pixelRatioY;
    return {
      x,
      y
    };*/
  };
}
