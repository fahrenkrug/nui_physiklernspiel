<template>
  <v-container>
    <div id="matterElement"></div>
  </v-container>
</template>

<script>
import {
  Engine,
  Render,
  Runner,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Body,
  Vector
} from "matter-js";

export default {
  name: "Level1",
  data() {
    return {
      engine: null,
      render: null,
      runner: null
    };
  },
  computed: {
    world() {
      return this.engine.world;
    }
  },
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      this.setupEngine();
      this.setupWorld();
      this.setupMouse();
    },
    setupEngine() {
      this.engine = Engine.create();
      this.render = Render.create({
        engine: this.engine,
        element: document.getElementById("matterElement"),
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true
      });
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupWorld() {
      const group = Body.nextGroup(true);

      const stack = Composites.stack(250, 255, 1, 6, 0, 0, (x, y) =>
        Bodies.rectangle(x, y, 30, 30)
      );

      const catapult = Bodies.rectangle(400, 520, 320, 20, {
        collisionFilter: { group }
      });

      World.add(this.world, [
        stack,
        catapult,
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
        Bodies.rectangle(250, 555, 20, 50, { isStatic: true }),
        Bodies.rectangle(400, 535, 20, 80, {
          isStatic: true,
          collisionFilter: { group: group }
        }),
        Bodies.circle(560, 100, 50, { density: 0.005 }),
        Constraint.create({
          bodyA: catapult,
          pointB: Vector.clone(catapult.position),
          stiffness: 1,
          length: 0
        })
      ]);
    },
    setupMouse() {
      const mouse = Mouse.create(this.render.canvas);
      const mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

      World.add(this.world, mouseConstraint);
      this.render.mouse = mouse;
      Render.lookAt(this.render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
      });
    }
  }
};
</script>

<style scoped></style>
