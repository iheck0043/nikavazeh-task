<template>
  <nav class="filter-nav">
    <form class="search-form" @submit.prevent>
      <i class="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        v-model.trim="search"
        @keyup="filterCountries('input')"
      />
    </form>

    <div
      @click="toggleFilterRegion"
      class="filter-region"
      aria-label="select-region"
    >
      <span v-if="!filteredRegion">Filter by Region</span>
      <span v-else> {{ filteredRegion }}</span>
      <i class="fas fa-chevron-down icon"></i>
      <ul v-show="filterMenu" class="filter-menu">
        <li @click="filterRegion('africa')">Africa</li>
        <li @click="filterRegion('americas')">America</li>
        <li @click="filterRegion('asia')">Asia</li>
        <li @click="filterRegion('europe')">Europe</li>
        <li @click="filterRegion('oceania')">Oceania</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(props, context) {
    const search = ref("");
    const filteredRegion = ref(null);
    const filterMenu = ref(false);

    const toggleFilterRegion = () => {
      filterMenu.value = !filterMenu.value;
    };

    const filterCountries = (by, region) => {
      if (by === "input") {
        context.emit("filter-countries", search.value.toLowerCase());
      }
    };

    const filterRegion = (region) => {
      filteredRegion.value = region;
      context.emit("filter-region", filteredRegion.value);
    };

    return {
      search,
      filteredRegion,
      filterCountries,
      toggleFilterRegion,
      filterMenu,
      filterRegion,
    };
  },
};
</script>

<style>
.filter-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding: 3rem 0;
}
.search-form {
  border-radius: 6px;
  background: var(--light-elements);
  display: flex;
  align-items: center;
  min-width: 400px;
  padding: 0 15px;
  box-shadow: 0 0 4px rgb(0 0 0 / 9%), 0 7px 8px rgb(0 0 0 / 5%);
}

.app.dark .search-form {
  background: var(--dark-elements);
}

.search-form input {
  display: inline-block;
  width: 100%;
  padding: 12px;
}

.app.dark .search-form input {
  color: var(--dark-text);
}

.filter-region {
  position: relative;
  cursor: pointer;
  background: var(--light-elements);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 150px;
  box-shadow: 0 0 4px rgb(0 0 0 / 9%), 0 7px 8px rgb(0 0 0 / 5%);
}

.app.dark .filter-region {
  background: var(--dark-elements);
}

.filter-region .icon {
  font-size: 10px;
}
.filter-region .filter-menu {
  position: absolute;
  top: 50px;
  width: 150px;
  left: 0;
  list-style: none;
  border-radius: 4px;
  background-color: var(--light-elements);
  box-shadow: 0 0 4px rgb(0 0 0 / 9%), 0 7px 8px rgb(0 0 0 / 5%);
}

.app.dark .filter-region .filter-menu {
  background-color: var(--dark-elements);
}

.filter-region .filter-menu li {
  cursor: pointer;
  font-size: 12px;
  padding: 10px 20px;
  transition: all 0.3s ease;
}
.filter-region .filter-menu li:hover {
  color: var(--light-text);
  background-color: var(--light-background);
}
</style>
