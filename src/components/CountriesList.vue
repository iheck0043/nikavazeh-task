<template>
  <SingleCountry
    :country="country"
    v-for="country in countries"
    :key="country.name"
  />
</template>

<script>
import SingleCountry from "./SingleCountry.vue";

export default {
  props: ["countries"],
  components: { SingleCountry },
};
</script>

<style></style>
