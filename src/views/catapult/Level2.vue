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
import { resizeMixin } from "@/mixins/resizeMixin";

export default {
  name: "Level2",
  mixins: [catapultLevelMixin, resizeMixin],
  components: { LevelNavigation },
  methods: {
    setupWorld() {
      const group = Body.nextGroup(true);

      this.jumpingBox = Bodies.rectangle(255, 355, 30, 30, {
        render: this.jumpingBoxRenderStyle
      });

      const catapult = Bodies.rectangle(400, 420, 520, 20, {
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
      this.target = Bodies.rectangle(640, 20, 110, 14, {
        isStatic: true,
        render: this.targetRenderStyle
      });
      World.add(this.world, [
        this.jumpingBox,
        catapult,
        this.target,
        Bodies.rectangle(400, 590, 800, 60, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(250, 495, 20, 125, {
          isStatic: true,
          render: this.staticBodyRenderStyle
        }),
        Bodies.rectangle(400, 465, 20, 180, {
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
        number: 2,
        gameIdentifier: GAME_IDENTIFIER.CATAPULT
      });
      const { isConfirmed } = await SweetAlert.fire({
        title: "Sehr gut!",
        icon: "success",
        confirmButtonText: "Zum nächsten Level",
        cancelButtonText: "Abbrechen",
        showCancelButton: true
      });
      if (isConfirmed) {
        await this.$router.push("/games/catapult/levels/3");
      }
    }
  }
};
</script>

<style scoped lang="scss">
#matterJsElement {
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
