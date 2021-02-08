<template>
  <v-app>
    <v-app-bar color="primary" dark fixed app>
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

        <h3 class="mr-2 to-home" @click="$router.push('/')">MyPhysics</h3>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/multiplayer" text>
          <span class="mr-2">Multiplayer</span>
          <v-icon>mdi-account</v-icon> <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn to="/profile" text>
          <span class="mr-2">Account</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-menu class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="hidden-md-and-up">
            <v-icon class="hidden-md-and-up">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list color="primary" dark >
          <v-list-item>
            <v-btn to="/profile" text>
              <span class="mr-2">Account</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item>
           <v-list-item>
            <v-btn to="/multiplayer" text>
              <span class="mr-2">Multiplayer</span>
              <v-icon>mdi-account</v-icon> <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

  
 
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
