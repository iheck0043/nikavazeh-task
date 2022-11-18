<template>
  <FilterNav
    @filter-countries="filterCountries"
    @filter-region="filterRegion"
  />
  <div v-if="error">{{ error }}</div>
  <div v-if="isPending && !error">
    <Spinner />
  </div>
  <div v-if="filteredCountries.length" class="countries-container">
    <CountriesList :countries="filteredCountries" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import CountriesList from "../components/CountriesList.vue";
import FilterNav from "../components/FilterNav.vue";
import Spinner from "../components/Spinner.vue";
import getCountries from "../composables/getCountries";
import getCountriesByRegion from "../composables/getCountriesByRegion";

export default {
  name: "Home",
  components: { CountriesList, FilterNav, Spinner },
  setup() {
    const { error, loadCountries, countries, isPending } = getCountries();

    const filteredCountries = ref([]);

    loadCountries().then(() => {
      filteredCountries.value = [...countries.value];
    });

    const searchTerm = ref("");
    const region = ref("");

    const filterCountries = (value) => {
      searchTerm.value = value;
      if (countries.value.length) {
        filteredCountries.value = countries.value.filter((country) => {
          return (
            country.name.official
              .toLowerCase()
              .indexOf(searchTerm.value.toLowerCase()) != -1
          );
        });
      }
    };

    const filterRegion = async (value) => {
      region.value = value;
      if (countries.value.length) {
        const { regionCountries } = await getCountriesByRegion(region.value);
        filteredCountries.value = regionCountries.value;
      }
    };

    return {
      error,
      isPending,
      filteredCountries,
      filterCountries,
      filterRegion,
    };
  },
};
</script>
<style>
.countries-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
  gap: 40px;
  justify-content: center;
}
</style>
