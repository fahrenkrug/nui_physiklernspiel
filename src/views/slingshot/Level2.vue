/* eslint-disable */
<template>
<div>
    <v-container :fluid="true">
        <level-navigation />
        <div id="matterJsElement"></div>
        <v-row>
            <v-col cols="4">Masse: {{ mass }}</v-col>
            <v-col>Nimm die Schleuder in die Hand und triff die Ziele. </v-col>
        </v-row>
    </v-container>
</div>
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
import {
    resizeMixin
} from "@/mixins/resizeMixin";
import {
    GAME_IDENTIFIER
} from "@/store/modules/game";

export default {
    name: "Level2",
    mixins: [resizeMixin],
    components: {
        LevelNavigation
    },
    data() {
        return {
            engine: null,
            render: null,
            runner: null,
            mass: 400,
            ball: null,
            sling: null,
            mouseConstraint: null,
            firing: false,
            hits: null,
            compoundBodyA: null,
            compoundBodyB: null
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
        Body.setMass(this.ball, this.mass);
    },
    methods: {
        setup() {
            this.setupEngine();
            this.setupWorld();
            this.setupMouse();
            this.slingShot(this.ball, this.sling, this.firing);
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
                gravity: {
                    x: 0,
                    y: 1
                },
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

        setupWorld() {
            // add bodies
            var target = Bodies.rectangle(610, 250, 100, 20, {
                isStatic: true,
                id: 3,
            });
            var target_v = Bodies.rectangle(660, 235, 20, 50, {
                isStatic: true,
            });
            var target_v2 = Bodies.rectangle(560, 235, 20, 50, {
                isStatic: true,
            });
            var target_2 = Bodies.rectangle(810, 100, 100, 20, {
                isStatic: true,
                id: 4,
            });
            var target_2v = Bodies.rectangle(860, 85, 20, 50, {
                isStatic: true,
            });
            var target_2v2 = Bodies.rectangle(760, 85, 20, 50, {
                isStatic: true,
            });
            this.compoundBodyA = Body.create({
                parts: [target, target_v, target_v2],
                isStatic: true,
                id: 3,
            });
            this.compoundBodyB = Body.create({
                parts: [target_2, target_2v, target_2v2],
                isStatic: true,
                color: this.blue,
                id: 4,
            });
            this.ball = Bodies.rectangle(70, 450, 20, 20, {
                mass: 400,
                friction: 1,
                inertia: Infinity,
                id: 1,
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
                this.compoundBodyA,
                this.compoundBodyB,
                this.ball,
                this.sling
            ]);

        },
        slingShot(ball, sling, firing) {
            //console.log(ball);
            Events.on(this.mouseConstraint, 'enddrag', function (e) {
                if (e.Body === this.ball) {
                    firing = true;
                };
            });
            Events.on(this.engine, 'afterUpdate', function () {
                if (firing && Math.abs(ball.position.x - 70) < 20 && Math.abs(ball.position.y - 450) < 20) {
                    this.ball = ball;
                    ball = Bodies.rectangle(70, 450, 20, 20, {
                        mass: 400,
                        friction: 1,
                        inertia: Infinity,
                        id: 1,
                    });
                    World.add(this.world, ball);
                    sling.bodyB = ball;
                    this.slingShot = sling;
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
                    this.hits++;
                    if (this.hits == 2) {
                        await this.onGoalCollision();
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        },
        isGoalPair(pair) {
            if ((pair.bodyA.id === this.ball.id && pair.bodyB.id === this.compoundBodyA.id) || (pair.bodyB.id === this.ball.id && pair.bodyA.id === this.compoundBodyA.id)) {
                console.log("hit registered A");
                return true;
            }
            if ((pair.bodyA.id === this.ball.id && pair.bodyB.id === this.compoundBodyB.id) || (pair.bodyB.id === this.ball.id && pair.bodyA.id === this.compoundBodyB.id)) {
                console.log("hit registered B");
                return true;
            }
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
                number: 2,
                gameIdentifier: GAME_IDENTIFIER.SLINGSHOT
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
                await this.$router.push("/games/slingshot/levels/3");
            }
        }
    }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        max-width: 80%;
    }
}
</style>
