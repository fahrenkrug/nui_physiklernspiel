<template>
<div>
    <v-container :fluid="true">
        <level-navigation />
        <div id="matterJsElement"></div>
        <v-row>
      <v-col cols="20"
        >Farbenspiel: Berühre zwei Quadrate und färbe die transparenten Quadrate
        so in der Farbe in der ihre Umrandungen sind. Mit dem transparenten
        Quadrat entfärbst du sie wieder.</v-col
      >
    </v-row>
    </v-container>
</div>
</template>

<script>
var success = 0;
var success1 = 0;
var success2 = 0;
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
import SweetAlert from "sweetalert2";
import {
    resizeMixin
} from "@/mixins/resizeMixin";
import { GAME_IDENTIFIER } from "@/store/modules/game";
import LevelNavigation from "@/components/LevelNavigation";
export default {
  name: "Level1",
  mixins: [resizeMixin],
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
      this.test();
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
          id: "301",
          render: {
            fillStyle: "transparent",
            strokeStyle: "orange",
            lineWidth: 8
          }
        }),
        Bodies.rectangle(200, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          id: "302",
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "purple",
            lineWidth: 8
          }
        }),

        Bodies.rectangle(400, 500, 100, 100, {
          collisionFilter: {
            //group: group
          },
          id: "303",
          inertia: Infinity,
          render: {
            fillStyle: "transparent",
            strokeStyle: "green",
            lineWidth: 8
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
                Bodies.rectangle(220, -200, 1600, 50, {
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
    async test() {
      Events.on(this.engine, "collisionStart", async event => {
        var pairs = event.pairs;
        let a = pairs[0].bodyA;
        let b = pairs[0].bodyB;

        if (
          (a.id == "301" && a.render.fillStyle == "orange") ||
          (b.id == "301" && b.render.fillStyle == "orange")
        ) {
          success = 1;
        }
        if (
          (a.id == "302" && a.render.fillStyle == "purple") ||
          (b.id == "302" && b.render.fillStyle == "purple")
        ) {
          success1 = 1;
        }
        if (
          (a.id == "303" && a.render.fillStyle == "green") ||
          (b.id == "303" && b.render.fillStyle == "green")
        ) {
          success2 = 1;
        }
        if (success == 1 && success1 == 1 && success2 == 1) {
          const { isConfirmed } = await SweetAlert.fire({
            title: "Sehr gut!",
            icon: "success",
            confirmButtonText: "Zum nächsten Level",
            cancelButtonText: "Abbrechen",
            showCancelButton: true
          });
          await this.$store.dispatch("level/didAchieveLevel", {
            number: 1,
            gameIdentifier: GAME_IDENTIFIER.COLORS
          });
          if (isConfirmed) {
            await this.$router.push("/games/colors/levels/2");
          }
        }
      });
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
                min: {
                    x: -550,
                    y: 0
                },
                max: {
                    x: 970,
                    y: 400
                }
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

<style scoped>
@media (min-width: 1200px){
    .container{
        max-width: 80%;
    }
}
</style>
