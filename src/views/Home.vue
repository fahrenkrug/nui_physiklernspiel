<template>
  <div class="home">
    <router-link
      v-for="level in levels"
      :key="level.number"
      :to="`/levels/${level.number}`"
      >{{ level.name }}<br />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    levels() {
      return [
        {
          number: 1,
          name: "Tolles Physiklevel"
        },
        {
          number: 2,
          name: "Der Apfel fällt"
        },
        {
          number: 3,
          name: "Das Katapult"
        },
        {
          number: 4,
          name: "Noch ein tolles Physiklevel"
        }
      ];
    }
  }
};
</script>
