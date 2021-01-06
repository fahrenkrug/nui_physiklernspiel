<template>
  <v-container>
    <level-navigation />
    <div id="matterJsElement"></div>
    <v-row>
      <v-col cols="4">Farbenspiel: </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Body
} from "matter-js";
import LevelNavigation from "@/components/LevelNavigation";

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
      collisionReject: null
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
      this.engine.world.gravity.y = 0;
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupWorld() {
      this.circle = Bodies.circle(700, 500, 40, {
        mass: 200,
        render,
        collisionFilter: {
          category: this.circleCategory
        }
      });
      World.add(this.world, [
        // falling blocks

        Bodies.rectangle(-200, 100, 100, 100, {
          render: {
            fillStyle: "red"
          }
        }),
        Bodies.rectangle(0, 100, 100, 100, {
          render: {
            fillStyle: "blue"
          }
        }),
        Bodies.rectangle(200, 100, 100, 100, {
          render: {
            fillStyle: "green"
          }
        }),
        Bodies.rectangle(400, 100, 100, 100, {
          render: {
            fillStyle: "yellow"
          }
        }),
        Bodies.rectangle(-200, 500, 100, 100, {
          render: {
            fillStyle: "white"
          }
        }),
        Bodies.rectangle(0, 500, 100, 100, {
          render: {
            fillStyle: "black"
          }
        }),
        Bodies.rectangle(200, 500, 100, 100, {
          render: {
            fillStyle: "purple"
          }
        }),
        Bodies.rectangle(400, 500, 100, 100, {
          render: {
            fillStyle: "yellow"
          }
        }),
        Bodies.rectangle(600, 100, 100, 100, {
          render: {
            fillStyle: "blue"
          }
        }),
        Bodies.rectangle(600, 500, 100, 100, {
          render: {
            fillStyle: "red"
          }
        }),
        // walls
        Bodies.rectangle(220, 600, 1600, 50, { isStatic: true })
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
      
    } 
  }
};
</script>

<style scoped></style>
