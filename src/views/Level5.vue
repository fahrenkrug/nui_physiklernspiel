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
    Events,
    Composites
} from "matter-js";
import SweetAlert from "sweetalert2";
import LevelNavigation from "@/components/LevelNavigation";

export default {
    name: "Level5",
    components: {
        LevelNavigation
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
            mass: 0.1,
            mouseConstraint: null,
            ball: null,
            sling: null,
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
        Body.setMass(this.ball, this.mass);
    },
    methods: {
        setup() {
            this.setupEngine();
            this.setupWorld();
            this.setupMouse();
            this.slingShot();
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
            // add bodies
            var ground = Bodies.rectangle(395, 600, 815, 50, {
                isStatic: true
            });

            const pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function (x, y) {
                return Bodies.rectangle(x, y, 25, 40);
            });

            const ground2 = Bodies.rectangle(610, 250, 200, 20, {
                isStatic: true
            });

            const pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y) {
                return Bodies.rectangle(x, y, 25, 40);
            });
            this.ball = Bodies.circle(170, 450, 20);
            this.sling = Constraint.create({
                pointA: {
                    x: 170,
                    y: 450
                },
                bodyB: this.ball,
                stiffness: 0.05
            });
            World.add(this.world, [
                ground,
                pyramid,
                ground2,
                pyramid2,
                this.ball,
                this.sling
            ]);

        },
        slingShot() {
            var firing = false;
            Events.on(MouseConstraint, 'enddrag', function (e) {
                if (e.body === this.ball) firing = true;
            });
            Events.on(this.engine, 'afterUpdate', function () {
                if (firing && Math.abs(this.ball.position.x - 300) < 20 && Math.abs(this.ball.position.y - 600) < 20) {
                    this.ball = Bodies.circle(170, 450, 20);
                    World.add(this.engine.world, this.ball);
                    this.sling.bodyB = this.ball;
                    firing = false;
                }
            });
            World.add(this.world, this.ball, this.sling, firing);
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
                min: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 800,
                    y: 600
                }
            });
        },
        listenForCollisionEvents() {
            Events.on(this.engine, "collisionStart", async ({
                pairs
            }) => {
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
        onCollisionEnd({
            pairs
        }) {
            const goalPair = pairs.find(this.isGoalPair);
            if (!goalPair) {
                return;
            }
            this.collisionReject(new Error("Collision was just temporary."));
        },
        async onGoalCollision() {
            await this.$store.dispatch("level/didAchieveLevel", {
                number: 5
            });
            const {
                isConfirmed
            } = await SweetAlert.fire({
                title: "Sehr gut!",
                icon: "success",
                confirmButtonText: "Zum nächsten Level",
                cancelButtonText: "Abbrechen",
                showCancelButton: true
            });
            if (isConfirmed) {
                await this.$router.push("/levels/6");
            }
        }
    }
};
</script>

<style scoped></style>
