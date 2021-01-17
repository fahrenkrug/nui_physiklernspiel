<template>
  <v-container>
    <v-row v-for="rowIndex in games.length / gamesPerRow" :key="rowIndex">
      <v-col
        v-for="colIndex in gamesPerRow"
        :key="`row-${rowIndex}-col-${colIndex}`"
        cols="12"
        sm="6"
      >
        <game-card :game="getGame(rowIndex, colIndex)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import GameCard from "@/components/GameCard";

export default {
  name: "Home",
  components: { GameCard },
  computed: {
    gamesPerRow() {
      return 2;
    },
    ...mapState("game", ["games"])
  },
  methods: {
    getGame(rowIndex, colIndex) {
      return this.games[(rowIndex - 1) * 2 + colIndex - 1];
    }
  }
};
</script>
