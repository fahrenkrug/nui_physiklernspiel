import {
  Composite,
  Detector,
  Constraint,
  Vertices,
  Sleeping,
  Mouse,
  Events,
  Common,
  Bounds
} from "matter-js";

/* const canCollide = (body, mouse, mouseConstraint) =>
  Bounds.contains(body.bounds, mouse.position) &&
  Detector.canCollide(
    body.collisionFilter,
    mouseConstraint.collisionFilter
  )*/

export class TouchConstraint {
  static create = function(engine, options) {
    console.log("create");
    let mouse =
      (engine ? engine.mouse : null) || (options ? options.mouse : null);

    if (!mouse) {
      console.log("no mouse");
      if (engine && engine.render && engine.render.canvas) {
        mouse = Mouse.create(engine.render.canvas);
      } else if (options && options.element) {
        mouse = Mouse.create(options.element);
      } else {
        mouse = Mouse.create();
        Common.warn(
          "TouchConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected"
        );
      }
    }

    let constraint = Constraint.create({
      label: "Mouse Constraint",
      pointA: mouse.position,
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1,
      render: {
        strokeStyle: "#90EE90",
        lineWidth: 3
      }
    });

    let defaults = {
      type: "mouseConstraint",
      mouse: mouse,
      element: null,
      body: null,
      constraint: constraint,
      collisionFilter: {
        category: 0x0001,
        mask: 0xffffffff,
        group: 0
      }
    };

    // let occupiedBodies = new Set();

    let mouseConstraint = Common.extend(defaults, options);

    Events.on(engine, "beforeUpdate", function() {
      let allBodies = Composite.allBodies(engine.world);
      TouchConstraint.update(mouseConstraint, allBodies);
      TouchConstraint._triggerEvents(mouseConstraint);
    });

    return mouseConstraint;
  };

  static update = function(mouseConstraint, bodies) {
    let { mouse, constraint, body } = mouseConstraint;

    if (mouse.button !== 0) {
      constraint.bodyB = mouseConstraint.body = null;
      constraint.pointB = null;

      if (!body) {
        return;
      }
      Events.trigger(mouseConstraint, "enddrag", {
        mouse,
        body
      });
      return;
    }
    if (constraint.bodyB) {
      Sleeping.set(constraint.bodyB, false);
      constraint.pointA = mouse.position;
      return;
    }
    bodies.forEach(body => {
      if (
        !Bounds.contains(body.bounds, mouse.position) ||
        !Detector.canCollide(
          body.collisionFilter,
          mouseConstraint.collisionFilter
        )
      ) {
        return;
      }
      body.parts.forEach(part => {
        if (!Vertices.contains(part.vertices, mouse.position)) {
          return;
        }
        constraint.pointA = mouse.position;
        constraint.bodyB = mouseConstraint.body = body;
        constraint.pointB = {
          x: mouse.position.x - body.position.x,
          y: mouse.position.y - body.position.y
        };
        constraint.angleB = body.angle;

        Sleeping.set(body, false);
        Events.trigger(mouseConstraint, "startdrag", {
          mouse,
          body
        });
      });
    });
  };

  static _triggerEvents = function(mouseConstraint) {
    let mouse = mouseConstraint.mouse,
      mouseEvents = mouse.sourceEvents;

    if (mouseEvents.mousemove)
      Events.trigger(mouseConstraint, "mousemove", { mouse });

    if (mouseEvents.mousedown)
      Events.trigger(mouseConstraint, "mousedown", { mouse });

    if (mouseEvents.mouseup)
      Events.trigger(mouseConstraint, "mouseup", { mouse });

    // reset the mouse state ready for the next step
    Mouse.clearSourceEvents(mouse);
  };
}
