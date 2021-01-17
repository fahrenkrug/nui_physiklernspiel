<template>
  <v-card>
    <v-img height="250" :src="game.image"></v-img>
    <v-card-title>
      {{ game.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ game.description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text :to="`/games/${game.identifier}`">
        Levels anschauen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
