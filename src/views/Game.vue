<template>
  <v-container>
    <v-row v-for="rowIndex in numberOfRows" :key="rowIndex">
      <v-col
        v-for="colIndex in numberOfColsForRow(rowIndex)"
        :key="`row-${rowIndex}-col-${colIndex}`"
        cols="12"
        sm="6"
      >
        <level-card :level="getLevel(rowIndex, colIndex)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LevelCard from "@/components/LevelCard";
import { mapState } from "vuex";

export default {
  name: "Game",
  components: { LevelCard },
  computed: {
    levelsPerRow() {
      return 2;
    },
    hasOddNumberOfLevels() {
      return this.levelsForGame.length % 2 !== 0;
    },
    numberOfRows() {
      if (this.hasOddNumberOfLevels) {
        return (this.levelsForGame.length - 1) / this.levelsPerRow + 1;
      }
      return this.levelsForGame.length / this.levelsPerRow;
    },
    game() {
      return this.games.find(
        ({ identifier }) => identifier === this.$route.params.slug
      );
    },
    levelsForGame() {
      return this.levels.filter(
        ({ gameIdentifier }) => gameIdentifier === this.game.identifier
      );
    },
    ...mapState("level", ["levels"]),
    ...mapState("game", ["games"])
  },
  methods: {
    getLevel(rowIndex, colIndex) {
      return this.levelsForGame[(rowIndex - 1) * 2 + colIndex - 1];
    },
    numberOfColsForRow(rowIndex) {
      if (this.hasOddNumberOfLevels && rowIndex === this.numberOfRows) {
        return 1;
      }
      return this.levelsPerRow;
    }
  }
};
</script>

<style scoped></style>
