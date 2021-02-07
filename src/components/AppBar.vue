<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2 to-home"
        contain
        src="../assets/physikspiel_logo.svg"
        transition="scale-transition"
        width="40"
        @click="$router.push('/')"
      />

      <h3 class="mr-2 to-home" @click="$router.push('/')">Physikspiel</h3>
    </div>


<v-spacer></v-spacer>

    <v-btn  to="/multiplayer" text>
      <span class="mr-2">Multiplayer</span>
      <v-icon>mdi-account</v-icon>  <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn to="/profile" text>
      <span class="mr-2">Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
};
</script>

<style scoped>
.to-home:hover {
  cursor: pointer;
}
</style>
