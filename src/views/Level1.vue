<template>
  <v-container>
    <div id="matterElement"></div>
    <v-slider max="2000" min="1" v-model="mass" />
  </v-container>
</template>

<script>
import {
  Engine,
  Render,
  Runner,
  Constraint,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Body,
  Vector,
  Events
} from "matter-js";
import SweetAlert from "sweetalert2";

export default {
  name: "Level1",
  data() {
    return {
      engine: null,
      render: null,
      runner: null,
      target: null,
      jumpingBox: null,
      circle: null,
      collisionReject: null,
      mass: 1
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
  beforeUpdate() {
    Body.setMass(this.circle, this.mass);
  },
  methods: {
    setup() {
      this.setupEngine();
      this.setupWorld();
      this.setupMouse();
      this.listenForCollisionEvents();
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

      this.jumpingBox = Bodies.rectangle(255, 355, 30, 30);

      const catapult = Bodies.rectangle(400, 520, 320, 20, {
        collisionFilter: { group }
      });

      this.circle = Bodies.circle(700, 500, 20, { mass: 200 });
      this.target = Bodies.rectangle(400, 200, 80, 14, { isStatic: true });
      World.add(this.world, [
        this.jumpingBox,
        catapult,
        this.target,
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
        Bodies.rectangle(250, 555, 20, 50, { isStatic: true }),
        Bodies.rectangle(400, 535, 20, 80, {
          isStatic: true,
          collisionFilter: { group: group }
        }),
        this.circle,
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
    },
    listenForCollisionEvents() {
      Events.on(this.engine, "collisionStart", async ({ pairs }) => {
        const goalPair = pairs.find(this.isGoalPair);
        if (!goalPair) {
          return;
        }
        try {
          await this.waitIfCollisionStays();
          await this.onGoalCollision();
        } catch (e) {
          console.log(e);
        }
      });
    },
    isGoalPair(pair) {
      return (
        (pair.bodyA === this.jumpingBox && pair.bodyB === this.target) ||
        (pair.bodyB === this.jumpingBox && pair.bodyA === this.target)
      );
    },
    waitIfCollisionStays() {
      return new Promise((resolve, reject) => {
        this.collisionReject = reject;
        setTimeout(() => {
          Events.off(this.engine, "collisionEnd", this.onCollisionEnd);
          resolve();
        }, 2000);
        Events.on(this.engine, "collisionEnd", this.onCollisionEnd);
      });
    },
    onCollisionEnd({ pairs }) {
      const goalPair = pairs.find(this.isGoalPair);
      if (!goalPair) {
        return;
      }
      this.collisionReject(new Error("Collision was just temporary."));
    },
    async onGoalCollision() {
      await this.$store.dispatch("level/didAchieveLevel", { number: 1 });
      const { isConfirmed } = await SweetAlert.fire({
        title: "Sehr gut!",
        icon: "success",
        confirmButtonText: "Zum nächsten Level",
        cancelButtonText: "Abbrechen",
        showCancelButton: true
      });
      if (isConfirmed) {
        await this.$router.push("/levels/2");
      }
    }
  }
};
</script>

<style scoped></style>
