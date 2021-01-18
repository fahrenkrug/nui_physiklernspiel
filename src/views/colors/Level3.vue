<template>
  <v-container>
    <level-navigation />
    <div id="matterJsElement"></div>
    <v-row>
      <v-col cols="20"
        >Farbenspiel: Berühre zwei Quadrate und färbe die transparenten Quadrate
        so in der gewünschten Farbe. Mit dem transparenten Quadrat entfärbst du sie wieder.</v-col
      >
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
  //Body,
  Bodies,
  Events
} from "matter-js";
import LevelNavigation from "@/components/LevelNavigation";
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
      rectangleCategory: 0x0002,
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
          background: "dimgrey",
          wireframes: false
        }
      });
      this.engine.world.gravity.y = 0;
      Render.run(this.render);
      this.runner = Runner.create();
      Runner.run(this.runner, this.engine);
    },
    setupWorld() {
      //const group = Body.nextGroup(true);
      //const group2 = Body.nextGroup(true);
      World.add(this.world, [
        // falling blocks
        Bodies.rectangle(200, 100, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "azure",
            lineWidth: 0.5
          }
        }),
        Bodies.rectangle(-400, 100, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "yellow"
          }
        }),
        Bodies.rectangle(820, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "saddlebrown"
          }
        }),
        Bodies.rectangle(-400, 300, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "black"
          }
        }),
        Bodies.rectangle(820, 100, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "blue"
          }
        }),
        Bodies.rectangle(820, 300, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "red"
          }
        }),
        Bodies.rectangle(-400, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          isStatic: true,
          inertia: Infinity,
          render: {
            fillStyle: "white"
          }
        }),
        Bodies.rectangle(0, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          //isSensor: true,
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "azure",
            lineWidth: 0.5
          }
        }),
        Bodies.rectangle(200, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          //isSensor: true,
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "azure",
            lineWidth: 0.5
          }
        }),

        Bodies.rectangle(400, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          //isSensor: true,
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "azure",
            lineWidth: 0.5
          }
        }),
        // walls
        Bodies.rectangle(220, 600, 1600, 50, {
          collisionFilter: {
            //group: group2
          },
          render: {
            fillStyle: "azure"
          },
          isStatic: true
        }),
        Bodies.rectangle(-550, 100, 50, 1000, {
          collisionFilter: {
            //group: group2
          },
          render: {
            fillStyle: "azure"
          },
          isStatic: true
        }),
        Bodies.rectangle(970, 100, 50, 1000, {
          collisionFilter: {
            //group: group2
          },
          render: {
            fillStyle: "azure"
          },
          isStatic: true
        }),
        Bodies.rectangle(220, 0, 1600, 50, {
          collisionFilter: {
            //group: group2
          },
          render: {
            fillStyle: "azure"
          },
          isStatic: true
        })
      ]);
    },
    setupMouse() {
      var mouse = Mouse.create(this.render.canvas),
        mouseConstraint = MouseConstraint.create(this.engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });
      World.add(this.world, mouseConstraint);

      // keep the mouse in sync with rendering
      this.render.mouse = mouse;

      // fit the render viewport to the scene
      Render.lookAt(this.render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
      });
    },

    listenForCollisionEvents() {
      Events.on(this.engine, "collisionStart", function(event) {
        var pairs = event.pairs;
        let a = pairs[0].bodyA;
        let b = pairs[0].bodyB;
        let c1 = a.render.fillStyle;
        let c2 = b.render.fillStyle;
        console.log(c1);
        console.log(c2);
        if (c1 == "red" && c2 == "transparent") {
          b.render.fillStyle = "red";
        }
        if (c1 == "black" && c2 == "transparent") {
          b.render.fillStyle = "black";
        }
        if (c1 == "blue" && c2 == "transparent") {
          b.render.fillStyle = "blue";
        }
        if (c1 == "saddlebrown" && c2 == "transparent") {
          b.render.fillStyle = "saddlebrown";
        }
        //hier klappt was nicht
        if (c1 == "yellow" && c2 == "transparent") {
          b.render.fillStyle = "yellow";
        }
        if (c2 == "yellow" && c1 == "transparent") {
          b.render.fillStyle = "yellow";
          //a.render.fillStyle = "yellow";
        }
        if (c1 == "white" && c2 == "transparent") {
          b.render.fillStyle = "white";
        }
        if (c1 == "transparent") {
          b.render.fillStyle = "transparent";
        }
        if (c1 == "blue" && c2 == "yellow") {
          b.render.fillStyle = "green";
        }
        if (c1 == "blue" && c2 == "red") {
          b.render.fillStyle = "purple";
        }
        if (c1 == "yellow" && c2 == "red") {
          b.render.fillStyle = "orange";
        }
        if (c2 == "black" && c1 == "red") {
          b.render.fillStyle = "darkred";
        }
        if (c2 == "black" && c1 == "blue") {
          b.render.fillStyle = "darkblue";
        }
        if (c2 == "black" && c1 == "yellow") {
          b.render.fillStyle = "olive";
        }

        if (c2 == "white" && c1 == "red") {
          b.render.fillStyle = "lightcoral";
        }
        if (c2 == "white" && c1 == "blue") {
          b.render.fillStyle = "cornflowerblue";
        }
        if (c2 == "white" && c1 == "yellow") {
          b.render.fillStyle = "lightyellow";
        }
        if (c2 == "saddlebrown" && c1 == "white") {
          b.render.fillStyle = "peru";
        }
        if (c2 == "saddlebrown" && c1 == "black") {
          b.render.fillStyle = "sienna";
        }

        if (c1 == "yellow" && c2 == "blue") {
          b.render.fillStyle = "green";
        }
        if (c1 == "red" && c2 == "blue") {
          b.render.fillStyle = "purple";
        }
        if (c1 == "red" && c2 == "yellow") {
          b.render.fillStyle = "orange";
        }
        if (c2 == "azure") {
          b.render.fillStyle = "azure";
        }
        if (c2 == "azure") {
          b.render.fillStyle = "azure";
        }
        if (c2 == "red" && c1 == "black") {
          b.render.fillStyle = "darkred";
        }
        if (c2 == "red" && c1 == "white") {
          b.render.fillStyle = "lightcoral";
        }
        if (c2 == "blue" && c1 == "black") {
          b.render.fillStyle = "navy";
        }
        if (c2 == "blue" && c1 == "white") {
          b.render.fillStyle = "cornflowerblue";
        }
        if (c2 == "yellow" && c1 == "black") {
          b.render.fillStyle = "olive";
        }
        if (c2 == "yellow" && c1 == "white") {
          b.render.fillStyle = "olive";
        }
      });
    }
  }
};
</script>

<style scoped></style>
