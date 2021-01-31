<template>
  <div class="level">
    <v-container>
      <level-navigation />
      <div id="matterJsElement"></div>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col>
          <v-btn @click="addMarble()">Add Marble</v-btn>
        </v-col>
      </v-row>
       <v-row>
      <v-col cols="20"
        >Positioniere die bunten Balken so, dass wenn der Flummi aus dem oberen Korb fällt, dieser in den Korb unten links springt. Füge den Flummi durch Klick auf den Button "Flummi hinzufügen" hinzu.</v-col
      >
    </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  Engine,
  Render,
  Runner,
  //Constraint,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  //Composite,
  Body,
  //Vector,
  Events
} from "matter-js";
import SweetAlert from "sweetalert2";
import LevelNavigation from "@/components/LevelNavigation";
//import { GAME_IDENTIFIER } from "@/store/modules/game";
//import Keypress from "vue-keypress";
//import func from "../../vue-temp/vue-editor-bridge";

const render = {
  fillStyle: "#000",
  strokeStyle: "rgb(49,51,53)",
  lineWidth: 3
};

export default {
  name: "Level4",
  components: { LevelNavigation },
  data() {
    return {
      engine: null,
      render: null,
      runner: null,
      bucket: null,
      marbles: [],
      marble: null,
      obstacles: [],
      walls: [],
      mass: 0.1,
      body: null,
      mouseConstraint: null,
      mouse: null,
      mode: 0,
      bodySelected: null,
      compositeSelected: null,
      draggables: [],
      balkCategory: 0x0002
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

  beforeUpdate() {},
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
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(50, 200);
      const g = randomBetween(50, 200);
      const b = randomBetween(50, 200);

      var cols = 8;
      var rows = 3;
      var radius = 20;
      var width = window.screen.availWidth - 20;

      //add obstacles
      var spacing = width / cols;
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols + 1; i++) {
          var x = i * spacing;
          if (j % 2 == 0) {
            x += spacing / 2;
          }
          var y = spacing + j * spacing;

          if (
            !(y > window.screen.availHeight - 390) &&
            !(x > window.screen.availWidth - 50 || x < 20)
          ) {
            var o = Bodies.circle(x, y, radius, {
              restitution: 1,
              friction: 0,
              isStatic: true,
              render: {
                fillStyle: "white"
              }
            });
            this.obstacles.push(o);
            World.add(this.world, o);
          }
        }
      }

      this.bucket = Bodies.rectangle(
        window.screen.availWidth - 140,
        window.screen.availHeight - 310 - 20,
        150,
        9,
        {
          isStatic: true,
          render: {
            fillStyle: "rgb(" + r + "," + g + "," + b + ")"
          }
        }
      );

      //balks
      let d = Bodies.rectangle(500, 600, 200, 20, {
        isStatic: true,
        restitution: 1,
        friction: 0,
        label: "draggable",
        id: "300",
        render: {
          fillStyle:
            "rgb(" +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            ")"
        },
        collisionFilter: {
          category: this.balkCategory
        }
      });
      Body.rotate(d, 0.65);
      this.draggables.push(d);

      d = Bodies.rectangle(300, 550, 300, 20, {
        isStatic: true,
        label: "draggable",
        id: "301",
        render: {
          fillStyle:
            "rgb(" +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            ")"
        },
        collisionFilter: {
          category: this.balkCategory
        }
      });
      Body.rotate(d, 0.65);
      this.draggables.push(d);

      d = Bodies.rectangle(700, 600, 300, 20, {
        isStatic: true,
        label: "draggable",
        id: "302",
        render: {
          fillStyle:
            "rgb(" +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            ")"
        },
        collisionFilter: {
          category: this.balkCategory
        }
      });
      this.draggables.push(d);

      d = Bodies.rectangle(150, 600, 200, 20, {
        isStatic: true,
        label: "draggable",
        id: "303",
        render: {
          fillStyle:
            "rgb(" +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            "," +
            randomBetween(50, 200) +
            ")"
        },
        collisionFilter: {
          category: this.balkCategory
        }
      });

      this.draggables.push(d);

      World.add(this.world, this.draggables);

      render.fillStyle = "rgb(49,51,53)";
      World.add(this.world, [
        //walls
        Bodies.rectangle(
          (window.screen.availWidth - 20) / 2,
          8,
          window.screen.availWidth - 20,
          10,
          { isStatic: true, render }
        ),
        Bodies.rectangle(
          (window.screen.availWidth - 20) / 2,
          window.screen.availHeight - 310 - 8,
          window.screen.availWidth - 20,
          10,
          { isStatic: true, render }
        ),
        Bodies.rectangle(
          7,
          (window.screen.availHeight - 310) / 2,
          10,
          window.screen.availHeight - 310,
          { isStatic: true, render }
        ),
        Bodies.rectangle(
          window.screen.availWidth - 20 - 7,
          (window.screen.availHeight - 310) / 2,
          10,
          window.screen.availHeight - 310,
          { isStatic: true, render }
        ),

        //top bucket
        Bodies.rectangle(100, 50, 10, 70, { isStatic: true, render }),
        Bodies.rectangle(200, 50, 10, 70, { isStatic: true, render }),

        //bottom bucket
        Bodies.rectangle(
          window.screen.availWidth - 20 - 50,
          window.screen.availHeight - 310 - 50,
          10,
          70,
          {
            isStatic: true,
            render: {
              fillStyle: "rgb(" + r + "," + g + "," + b + ")"
            }
          }
        ),
        Bodies.rectangle(
          window.screen.availWidth - 20 - 200,
          window.screen.availHeight - 310 - 50,
          10,
          70,
          {
            isStatic: true,
            render: {
              fillStyle: "rgb(" + r + "," + g + "," + b + ")"
            }
          }
        ),
        this.bucket
      ]);
    },
    setupMouse() {
      this.mouse = Mouse.create(this.render.canvas);
      render.mouse = this.mouse;
      this.mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: this.mouse,
        collisionFilter: {
          mask: this.balkCategory
        }
      });
      World.add(this.world, this.mouseConstraint);

      //var draggablesArray = this.draggables;
      var constraint = this.mouseConstraint;

      Events.on(this.mouseConstraint, "mousedown", function(event) {
        console.log(event);

        let element;

        let x = render.mouse.position.x;
        let y = render.mouse.position.y;

        if (!render.mouse.position.x) {
          return;
        }

        if (constraint.body == this.marble) {
          return;
        }

        if (
          constraint.body != null &&
          (constraint.body.id == "300" ||
            constraint.body.id == "301" ||
            constraint.body.id == "302" ||
            constraint.body.id == "303")
        ) {
          element = constraint.body;
          this.bodySelected = element;

          Body.setPosition(element, {
            x: x,
            y: y
          });

          this.bodySelected = element;
        }
      });

      Events.on(this.mouseConstraint, "mousemove", function(event) {
        if (this.bodySelected == null) {
          return;
        }

        if (this.bodySelected == this.marble) {
          return;
        }

        console.log(event);

        let element = this.bodySelected;

        let x = render.mouse.position.x;
        let y = render.mouse.position.y;

        Body.setPosition(element, {
          x: x,
          y: y
        });
      });

      Events.on(this.mouseConstraint, "mouseup", function(event) {
        console.log(event);
        this.bodySelected = null;
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
        (pair.bodyA === this.bucket && pair.bodyB === this.marble) ||
        (pair.bodyB === this.bucket && pair.bodyA === this.marble)
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
      await this.$store.dispatch("level/didAchieveLevel", { number: 3 });
      const { isConfirmed } = await SweetAlert.fire({
        title: "Sehr gut!",
        icon: "success",
        confirmButtonText: "Zum nächsten Level",
        cancelButtonText: "Abbrechen",
        showCancelButton: true
      });
      if (isConfirmed) {
        return;
      }
    },

    addMarble() {
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(50, 200);
      const g = randomBetween(50, 200);
      const b = randomBetween(50, 200);

      this.marble = Bodies.circle(150, 100, 25, {
        frictionAir: 0,
        friction: 0,
        frictionStatic: 1,
        inertia: Infinity,
        restitution: 0.9,
        render: {
          fillStyle: "rgb(" + r + "," + g + "," + b + ")"
        }
      });

      World.add(this.world, this.marble);

      this.bucket.render.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    }
  }
};
</script>

<style scoped></style>
