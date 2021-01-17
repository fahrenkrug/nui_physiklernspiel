<template>
  <v-container>
    <level-navigation />
    <div id="matterJsElement"></div>
    <v-row>
      <v-col cols="4">Masse: {{ mass }}</v-col>
      <v-col>
        <v-slider :max="maxMass" :min="minMass" v-model="mass" class="slider" />
      </v-col>
    </v-row>
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
import LevelNavigation from "@/components/LevelNavigation";
import { GAME_IDENTIFIER } from "@/store/modules/game";

const render = {
  fillStyle: "#000",
  strokeStyle: "#fff",
  lineWidth: 3
};

export default {
  name: "Level2",
  components: { LevelNavigation },
  data() {
    return {
      engine: null,
      render: null,
      runner: null,
      target: null,
      jumpingBox: null,
      circle: null,
      circleCategory: 0x0002,
      collisionReject: null,
      mass: 0.1
    };
  },
  computed: {
    world() {
      return this.engine.world;
    },
    maxMass() {
      return 4000;
    },
    minMass() {
      return 1;
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
        element: document.getElementById("matterJsElement"),
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true,
        options: {
          width: window.screen.availWidth - 20,
          height: window.screen.availHeight - 310,
          wireframes: false
        }
      });
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupWorld() {
      const group = Body.nextGroup(true);

      this.jumpingBox = Bodies.rectangle(255, 355, 30, 30, { render });

      const catapult = Bodies.rectangle(400, 520, 320, 20, {
        collisionFilter: { group },
        render
      });

      this.circle = Bodies.circle(700, 500, 40, {
        mass: 200,
        render,
        collisionFilter: {
          category: this.circleCategory
        }
      });
      this.target = Bodies.rectangle(440, 200, 40, 14, {
        isStatic: true,
        render
      });
      World.add(this.world, [
        this.jumpingBox,
        catapult,
        this.target,
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render }),
        Bodies.rectangle(250, 555, 20, 50, { isStatic: true, render }),
        Bodies.rectangle(400, 535, 20, 80, {
          isStatic: true,
          collisionFilter: { group },
          render
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
        },
        collisionFilter: {
          mask: this.circleCategory
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
      await this.$store.dispatch("level/didAchieveLevel", {
        number: 2,
        gameIdentifier: GAME_IDENTIFIER.CATAPULT
      });
      const { isConfirmed } = await SweetAlert.fire({
        title: "Sehr gut!",
        icon: "success",
        confirmButtonText: "Zum nächsten Level",
        cancelButtonText: "Abbrechen",
        showCancelButton: true
      });
      if (isConfirmed) {
        await this.$router.push("/games/catapult/levels/3");
      }
    }
  }
};
</script>

<style scoped></style>
