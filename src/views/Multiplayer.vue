<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-img height="250" src="../assets/coop.jpg"></v-img>
          <v-card-title> Coop-Modus </v-card-title>

          <v-card-subtitle>
            Spiele mit einem Freund gemeinsam und löst die Level in
            Zusammenarbeit. Könnt ihr es schaffen die Level zusammen zu lösen?
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> Starten </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-img height="250" src="../assets/versus.jpg"></v-img>
          <v-card-title> Versus-Modus </v-card-title>

          <v-card-subtitle>
            Spiele gegen einen Freund. Wer von euch ist der wahre Physikexperte?
            Testet eurer Können.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> Starten </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Multiplayer",
};
</script>

<style scoped></style>
