<template>
  <v-container>
    <v-row>
      <v-col cols="4" offset="4">
        <v-card elevation="2">
          <v-row>
            <v-col cols="4" offset="3">
              <v-avatar size="192">
                <img
                  src="https://images.unsplash.com/photo-1554276329-c4fee827c444?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3032&q=80"
                  alt="Profile"
                />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 class="text-center">Playhound</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-chip class="ma-2" color="primary">
                Physik-Experte
              </v-chip>

              <v-chip class="ma-2" color="secondary">
                Tryhard
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p class="text-center">Dabei seit: 12.12.2020</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h5 class="text-center">Bestzeiten:</h5>
            </v-col>
          </v-row>
          <v-row v-for="(time, index) in times" :key="time">
            <v-col cols="12" class="py-0">
              <p :class="`text-center ${index !== 3 ? 'my-0' : ''}`">
                Level {{ index + 1 }}: {{ time }} Sekunden
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    times() {
      return [2, 20, 21, 17];
    }
  }
};
</script>

<style scoped></style>
