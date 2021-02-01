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
import { Constraint, World, Bodies, Body, Vector } from "matter-js";
import SweetAlert from "sweetalert2";
import LevelNavigation from "@/components/LevelNavigation";
import { GAME_IDENTIFIER } from "@/store/modules/game";
import { catapultLevelMixin } from "@/mixins/catapultLevelMixin";

export default {
  name: "Level3",
  mixins: [catapultLevelMixin],
  components: { LevelNavigation },
  methods: {
    setupWorld() {
      const group = Body.nextGroup(true);

      this.jumpingBox = Bodies.rectangle(255, 355, 30, 30, {
        render: this.jumpingBoxRenderStyle
      });

      const catapult = Bodies.rectangle(400, 520, 320, 20, {
        collisionFilter: { group },
        render: this.catapultRenderStyle
      });

      this.circle = Bodies.circle(700, 500, 40, {
        mass: 200,
        render: this.ballRenderStyle,
        collisionFilter: {
          category: this.circleCategory
        }
      });
      this.target = Bodies.rectangle(90, 560, 60, 14, {
        isStatic: true,
        render: this.targetRenderStyle
      });
      World.add(this.world, [
        this.jumpingBox,
        catapult,
        this.target,
        Bodies.rectangle(400, 600, 800, 50.5, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(270, 565, 20, 10, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(400, 535, 20, 80, {
          isStatic: true,
          collisionFilter: { group },
          render: this.staticBodyRenderStyle
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
    async onGoalCollision() {
      await this.$store.dispatch("level/didAchieveLevel", {
        number: 3,
        gameIdentifier: GAME_IDENTIFIER.CATAPULT
      });
      const { isConfirmed } = await SweetAlert.fire({
        title: "Sehr gut! Alle Katapult-Level durchgespielt.",
        icon: "success",
        confirmButtonText: "Zur Spieleübersicht",
        showCancelButton: false
      });
      if (isConfirmed) {
        await this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped></style>
