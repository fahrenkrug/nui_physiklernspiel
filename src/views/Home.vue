<template>
  <v-container>
    <v-row v-for="rowIndex in levels.length / levelsPerRow" :key="rowIndex">
      <v-col
        v-for="colIndex in levelsPerRow"
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
import { mapState } from "vuex";
import LevelCard from "@/components/LevelCard";

export default {
  name: "Home",
  components: { LevelCard },
  computed: {
    levelsPerRow() {
      return 2;
    },
    ...mapState("level", ["levels"])
  },
  methods: {
    getLevel(rowIndex, colIndex) {
      return this.levels[(rowIndex - 1) * 2 + colIndex - 1];
    }
  }
};
</script>
