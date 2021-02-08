<template>
  <v-container>
    <div id="matterJsElement"></div>
  </v-container>
</template>

<script>
import { Touch } from "@/utils/Touch";
import { Body, Bodies, Engine, Mouse, Render, Runner, World } from "matter-js";
import { TouchConstraint } from "@/utils/TouchConstraints";
import { resizeMixin } from "@/mixins/resizeMixin";
export default {
  name: "Level1",
  mixins: [resizeMixin],
  mounted() {
    this.setup();
  },
  data() {
    return {
      engine: null,
      render: null,
      runner: null,
      bodies: []
    };
  },
  computed: {
    world() {
      return this.engine.world;
    },
    staticBodyRenderStyle() {
      return {
        fillStyle: "gray"
      };
    },
    ballRenderStyle() {
      return {
        fillStyle: "#833",
        strokeStyle: "#aa2",
        lineWidth: 2
      };
    }
  },
  methods: {
    setup() {
      this.setupEngine();
      this.setupWorld();
      this.setupTouches();
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
      this.engine.world.gravity.y = 0;
      this.engine.world.gravity.x = 0;
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupWorld() {
      World.add(this.world, [
        Bodies.rectangle(400, 680, 800, 60, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(250, 645, 20, 50, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(400, 625, 20, 80, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        })
      ]);
    },
    setupTouches() {
      const lookAtBounds = {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
      };
      const touches = Touch.create(this.render.canvas, lookAtBounds);
      this.render.mouse = Mouse.create(this.render.canvas);
      Render.lookAt(this.render, lookAtBounds);
      Touch.setScale(touches, {
        x:
          (this.render.bounds.max.x - this.render.bounds.min.x) /
          this.render.canvas.width,
        y:
          (this.render.bounds.max.y - this.render.bounds.min.y) /
          this.render.canvas.height
      });

      Touch.setOffset(touches, this.render.bounds.min);
      TouchConstraint.create(this.engine, {
        touches,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        },
        onTouchesStart: touches => {
          for (let index = 0; index < touches.activeTouches; index++) {
            const { x, y } = touches.positions[index];
            const circle = Bodies.circle(x, y, 40, {
              mass: 200,
              render: this.ballRenderStyle
            });
            this.bodies.push(circle);
            World.add(this.world, circle);
          }
        },
        onTouchesMove: touches => {
          for (let index = 0; index < touches.activeTouches; index++) {
            const position = touches.positions[index];
            const circle = this.bodies[index];
            if (!circle) {
              return;
            }
            Body.setPosition(circle, position);
          }
        },
        onTouchesEnd: () => {
          this.bodies.forEach(body => {
            World.remove(this.world, body);
          });
          this.bodies = [];
        }
      });
    }
  }
};
</script>

<style scoped></style>
