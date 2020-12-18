<template>
  <div class="home">
    <router-link
      v-for="level in levels"
      :key="level.number"
      :to="`/levels-${level.number}`"
      >{{ level.name }}<br />
    </router-link>
  </div>
  <!--  <div class="level">-->
  <!--    <h1>Level 2</h1>-->
  <!--    <h1>This is a level page</h1>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: "Level2"
};
</script>

<style scoped></style>
