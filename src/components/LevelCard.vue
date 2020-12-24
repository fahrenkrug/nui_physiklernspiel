<template>
  <v-card>
    <v-img height="250" :src="level.image"></v-img>
    <v-card-title>
      {{ level.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ level.description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        :to="`/levels/${level.number}`"
        :disabled="!level.canBeAccessed"
      >
        {{ level.canBeAccessed ? "Anschauen" : "Noch nicht freigespielt" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LevelCard",
  props: {
    level: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
