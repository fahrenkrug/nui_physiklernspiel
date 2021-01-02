<template>
  <v-row>
    <v-col cols="4">
      <v-btn @click="onReload">
        <v-icon>mdi-reload</v-icon>
        Reload
      </v-btn>
    </v-col>
    <v-col cols="3" offset="1">
      <v-btn
        v-if="previousLevelNumber !== 0"
        @click="onPreviousLevel"
        :disabled="!hasPreviousLevel"
      >
        <v-icon>mdi-previous</v-icon>
        Level {{ previousLevelNumber }}
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn @click="onNextLevel" :disabled="!hasNextLevel">
        <v-icon>mdi-next</v-icon>
        Level {{ nextLevelNumber }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LevelNavigation",
  computed: {
    levelNumber() {
      const split = this.$route.path.split("/");
      return parseInt(split[split.length - 1]);
    },
    previousLevelNumber() {
      return this.levelNumber - 1;
    },
    nextLevelNumber() {
      return this.levelNumber + 1;
    },
    hasPreviousLevel() {
      return this.previousLevelNumber > 0;
    },
    hasNextLevel() {
      const level = this.levels.find(
        ({ number }) => number === this.nextLevelNumber
      );
      return level ? level.canBeAccessed : false;
    },
    ...mapState("level", ["levels"])
  },
  methods: {
    onReload() {
      this.$router.go(this.$router.currentRoute);
    },
    onPreviousLevel() {
      this.$router.push(`${this.previousLevelNumber}`);
    },
    onNextLevel() {
      this.$router.push(`${this.nextLevelNumber}`);
    }
  }
};
</script>

<style scoped></style>
