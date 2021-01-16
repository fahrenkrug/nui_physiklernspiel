<template>
<v-container>
    <level-navigation />
    <div id="matterJsElement"></div>
    <v-row>
        <v-col cols="4">Masse: {{ mass }}</v-col>
        <v-col>

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
} from "matter-js";
import SweetAlert from "sweetalert2";
import LevelNavigation from "@/components/LevelNavigation";

const render = {
    fillStyle: "#000",
    strokeStyle: "#fff",
    lineWidth: 3
};
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
            mass: 400,
            ball: null,
            sling: null,
            mouseConstraint: null,
            firing: false,
        };
    },
    computed: {
        world() {
            return this.engine.world;
        },
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
            this.slingShot(this.ball, this.sling, this.firing);
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
                gravity: {
                    x: 0,
                    y: 1
                },
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
            const group = Body.nextGroup(true);
            const target = Bodies.rectangle(610, 250, 100, 20, {
                isStatic: true,
                render,
                collisionFilter: {
                    group: group
                },
            });
            const target_v = Bodies.rectangle(660, 235, 20, 50, {
                isStatic: true,
                render,
                collisionFilter: {
                    group: group
                },
            });
            const target_2 = Bodies.rectangle(810, 100, 100, 20, {
                isStatic: true,
                render,
            });
            const target_2v = Bodies.rectangle(860, 85, 20, 50, {
                isStatic: true,
                render,
            });
            this.ball = Bodies.rectangle(70, 450, 20, 20, {
                mass: 400,
                collisionFilter: {
                    category: this.circleCategory
                }
            });
            this.sling = Constraint.create({
                pointA: {
                    x: 70,
                    y: 450
                },
                bodyB: this.ball,
                stiffness: 0.03
            });
            World.add(this.world, [
                target,
                target_v,
                target_2,
                target_2v,
                this.ball,
                this.sling
            ]);

        },
        slingShot(ball, sling, firing) {
            Events.on(this.mouseConstraint, 'enddrag', function (e) {
                if (e.Body === this.ball) {
                    firing = true;
                };
            });
            Events.on(this.engine, 'afterUpdate', function () {
                if (firing && Math.abs(ball.position.x - 70) < 20 && Math.abs(ball.position.y - 450) < 20) {
                    ball = Bodies.rectangle(70, 450, 20, 20, {
                        mass: 400,
                    });
                    World.add(this.world, ball);
                    sling.bodyB = ball;
                    firing = false;
                }
            });
        },
        setupMouse() {
            const mouse = Mouse.create(this.render.canvas);
            this.mouseConstraint = MouseConstraint.create(this.engine, {
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
            World.add(this.world, this.mouseConstraint);
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
                (pair.bodyA === this.ball && pair.bodyB === this.target) ||
                (pair.bodyB === this.ball && pair.bodyA === this.target) &&
                (pair.bodyA === this.ball && pair.bodyB === this.target_2) ||
                (pair.bodyB === this.ball && pair.bodyA === this.target_2)
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
