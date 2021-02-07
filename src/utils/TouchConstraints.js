import {
  // Composite,
  Detector,
  // Constraint,
  Vertices,
  Sleeping,
  // Mouse,
  // Events,
  // Common,
  Bounds
  // World
} from "matter-js";

/* const canCollide = (body, mouse, mouseConstraint) =>
  Bounds.contains(body.bounds, mouse.position) &&
  Detector.canCollide(
    body.collisionFilter,
    mouseConstraint.collisionFilter
  )*/

export class TouchConstraint {
  static create = function(engine, options) {
    let { touches } = options;

    if (!touches) {
      throw new Error("Please Provide touches property in options.");
    }

    touches.observers.push({
      touchStart: (event, touches) => {
        options.onTouchesStart(touches);
        /* for (let index = 0; index < 5; index++) {
          const position = touches.positions[index];
          let constraint = Constraint.create({
            label: "Touch Constraint",
            pointA: position,
            pointB: { x: 0, y: 0 },
            length: 0.01,
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
              strokeStyle: "#90EE90",
              lineWidth: 3
            },
            id: touches.constraints.length + 1
          });

          let defaults = {
            type: "touchConstraint",
            touches,
            element: null,
            body: null,
            constraint,
            collisionFilter: {
              category: 0x0001,
              mask: 0xffffffff,
              group: 0
            }
          };
          let touchConstraint = Common.extend(defaults, options);
          Events.on(engine, "beforeUpdate", function() {
            let allBodies = Composite.allBodies(engine.world);
            TouchConstraint.update(touchConstraint, allBodies, touches);
            // TouchConstraint._triggerEvents(mouseConstraint);
          });
          touches.constraints.push(touchConstraint);
          World.add(engine.world, touchConstraint);
        } */
      },
      touchMove: (event, touches) => {
        // let allBodies = Composite.allBodies(engine.world);
        // for (let index = 0; index < touches.activeTouches; index++) {
        /* const position = touches.positions[index];
          const body = TouchConstraint.findHittedBody(
            allBodies,
            position,
            options
          ); */
        options.onTouchesMove(touches);
        // }
        // console.log("move in constraints");
        // console.log(event.changedTouches);
        // console.log("MOOVE");
        // console.log(touches);
      },
      touchEnd: (event, touches) => {
        options.onTouchesEnd(touches);
        console.log("END");
        console.log(touches);
        // console.log(event.changedTouches);
        // console.log("start in constraints");
        // console.log(event.name);
      }
    });

    return touches;

    /*
    touches.touchList.forEach(touch => {});
    // let occupiedBodies = new Set();

    let mouseConstraint = Common.extend(defaults, options);

    Events.on(engine, "beforeUpdate", function() {
      let allBodies = Composite.allBodies(engine.world);
      TouchConstraint.update(mouseConstraint, allBodies);
      TouchConstraint._triggerEvents(mouseConstraint);
    });

    return mouseConstraint; */
  };

  static findHittedBody(bodies, position) {
    return (
      bodies
        // .filter(body =>
        //   Detector.canCollide(body.collisionFilter, options.collisionFilter)
        // )
        .find(body => {
          if (!Bounds.contains(body.bounds, position)) {
            return false;
          }
          console.log("FOUND BODY");
          console.log(body);
          const hittedBodyPart = body.parts.find(part =>
            Vertices.contains(part.vertices, position)
          );
          if (!hittedBodyPart) {
            return false;
          }
          console.log("FOUND PART");
          return true;
        })
    );
  }

  static update = function(touchConstraint, bodies, position) {
    // console.log(touchConstraint);
    let { constraint } = touchConstraint;
    // console.log("constraint update right here mister");

    /*if (mouse.button !== 0) {
      constraint.bodyB = touchConstraint.body = null;
      constraint.pointB = null;

      if (!body) {
        return;
      }
      Events.trigger(mouseConstraint, "enddrag", {
        mouse,
        body
      });
      return;
    }*/
    if (constraint.bodyB) {
      Sleeping.set(constraint.bodyB, false);
      constraint.pointA = position;
      return;
    }
    bodies
      .filter(body =>
        Detector.canCollide(
          body.collisionFilter,
          touchConstraint.collisionFilter
        )
      )
      .forEach(body => {
        // console.log(body.bounds);
        // console.log(position);
        // console.log(
        //   `xes: pos ${position.x} min: ${body.bounds.min.x} max: ${body.bounds.max.x}`
        // );
        // console.log(
        //   `Yes: pos ${position.y} min: ${body.bounds.min.y} max: ${body.bounds.max.y}`
        // );
        if (!Bounds.contains(body.bounds, position)) {
          return;
        }
        console.log("FOUND BODY");
        console.log(body);
        body.parts.forEach(part => {
          if (!Vertices.contains(part.vertices, position)) {
            return;
          }
          constraint.pointA = position;
          constraint.bodyB = touchConstraint.body = body;
          constraint.pointB = {
            x: position.x - body.position.x,
            y: position.y - body.position.y
          };
          constraint.angleB = body.angle;

          Sleeping.set(body, false);
          // Events.trigger(touchConstraint, "startdrag", {
          //   mouse,
          //   body
          // });
        });
      });
  };

  /*static _triggerEvents = function(mouseConstraint) {
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
  }; */
}
