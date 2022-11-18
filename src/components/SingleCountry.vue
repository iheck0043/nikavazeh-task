<template>
  <router-link
    :to="{ name: 'CountryDetails', params: { name: country.name.common } }"
    class="card"
  >
    <div class="card-img">
      <img :src="country.flags.svg" alt="" />
    </div>
    <div class="card-body">
      <h3>{{ country.name.official }}</h3>
      <ul>
        <li>
          <strong>Population:</strong>
          {{ formatPopulation(country.population) }}
        </li>
        <li><strong>Region:</strong> {{ country.region }}</li>
        <li v-if="country.capital">
          <strong>Capital:</strong> {{ country.capital[0] }}
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["country"],
  setup() {
    const formatPopulation = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return { formatPopulation };
  },
};
</script>

<style>
a {
  color: var(--light-text);
}

.app.dark a {
  color: var(--dark-text);
}

.card {
  background: var(--light-elements);
  border-radius: 6px;
  box-shadow: 0 0 4px rgb(0 0 0 / 9%), 0 7px 8px rgb(0 0 0 / 5%);
  overflow: hidden;
}

.app.dark .card {
  background: var(--dark-elements);
}

.card-img {
  max-width: 100%;
  height: 150px;
  overflow: hidden;
}
.card-img img {
  object-fit: cover;
  max-width: 100%;
  min-height: 100%;
  display: block;
}
.card-body {
  padding: 2rem;
  padding-bottom: 3rem;
}
.card-body h3 {
  margin-bottom: 1.5rem;
}
</style>
