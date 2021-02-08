import {
  Body,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World
} from "matter-js";

export const catapultLevelMixin = {
  mounted() {
    this.setup();
  },
  beforeUpdate() {
    Body.setMass(this.circle, this.mass);
  },
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
    },
    staticBodyRenderStyle() {
      return {
        fillStyle: "gray"
      };
    },
    jumpingBoxRenderStyle() {
      return {
        fillStyle: "green"
      };
    },
    ballRenderStyle() {
      return {
        fillStyle: "#833",
        strokeStyle: "#aa2",
        lineWidth: 2
      };
    },
    catapultRenderStyle() {
      return {
        fillStyle: "#22D",
        strokeStyle: "#225",
        lineWidth: 2
      };
    },
    targetRenderStyle() {
      return {
        fillStyle: "#282",
        strokeStyle: "#2F2",
        lineWidth: 2
      };
    }
  },
  methods: {
    setup() {
      this.setupEngine();
      this.setupWorld();
      this.setupMouse();
      this.listenForCollisionEvents();
      this.registerResizeEvent();
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
          height: window.screen.availHeight * 0.95,
          wireframes: false
        }
      });
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupMouse() {
      const mouse = Mouse.create(this.render.canvas);
      const mouseConstraint = MouseConstraint.create(this.engine, {
        mouse,
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
    }
  }
};
