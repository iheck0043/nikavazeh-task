<template>
  <div>
    <button @click="goBack" class="btn">
      <i class="fas fa-long-arrow-alt-left left-arrow-icon"></i>
      Back
    </button>
  </div>
  <div v-if="country" class="details-grid">
    <div class="country-photo">
      <img :src="country.flag" alt="" />
    </div>

    <div class="col2">
      <h2>{{ country.name }}</h2>
      <div class="country-details">
        <ul>
          <li><strong>Native Name: </strong>{{ country.nativeName }}</li>
          <li>
            <strong>Population: </strong
            >{{ formatPopulation(country.population) }}
          </li>
          <li><strong>Region: </strong>{{ country.region }}</li>
          <li><strong>Sub Region: </strong>{{ country.subregion }}</li>
          <li><strong>Capital: </strong>{{ country.capital }}</li>
        </ul>
        <ul>
          <li v-if="country.topLevelDomain.length">
            <strong>Top Level Domain:</strong> {{ country.topLevelDomain[0] }}
          </li>
          <li>
            <strong>Currencies: </strong>
            <span v-for="currency in currencies" :key="currency"
              >{{ currency }}
            </span>
          </li>
          <li>
            <strong>Languages: </strong>
            <span v-for="language in languages" :key="language">
              {{ language }}
            </span>
          </li>
        </ul>
      </div>
      <div v-if="bordersArr.length">
        <strong>Border Countries: </strong>

        <router-link
          :to="{ name: 'CountryDetails', params: { name: border } }"
          class="btn"
          v-for="border in bordersArr"
          :key="border"
          >{{ border }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";

import Spinner from "../components/Spinner.vue";

export default {
  props: ["name"],
  components: { Spinner },
  setup(props) {
    const country = ref(null);
    const error = ref(null);
    const bordersArr = ref([]);
    const isPending = ref(false);
    const router = useRouter();
    const route = useRoute();

    const goBack = () => {
      router.push("/");
    };

    console.log(route.params.name);

    const getSingleCountry = async (routeName) => {
      error.value = null;
      isPending.value = true;

      try {
        const res = await fetch(
          `https://restcountries.com/v2/name/${routeName}`
        );
        if (!res.ok) {
          throw Error("could not get that country data");
        }
        const data = await res.json();
        country.value = data[0];
        let borders = data[0].borders;
        if (borders.length) {
          borders.forEach(async (border) => {
            const res = await fetch(
              `https://restcountries.com/v2/alpha/${border}`
            );
            const data = await res.json();
            bordersArr.value.push(data.name);
          });
        }
        isPending.value = false;
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
        isPending.value = false;
      }
    };

    // fetch a single country
    getSingleCountry(route.params.name);

    watch(
      () => route.params.name,
      async (newName) => {
        getSingleCountry(newName);
      }
    );

    // return all language names
    const languages = computed(() => {
      if (country.value) {
        return country.value.languages.map((language) => {
          if (
            country.value.languages.indexOf(language) ===
            country.value.languages.length - 1
          ) {
            return language.name;
          } else {
            return language.name + ", ";
          }
        });
      }
    });

    // return all currency names
    const currencies = computed(() => {
      if (country.value) {
        return country.value.currencies.map((currency) => {
          if (
            country.value.currencies.indexOf(currency) ===
            country.value.currencies.length - 1
          ) {
            return currency.name;
          } else {
            return currency.name + ", ";
          }
        });
      }
    });

    const formatPopulation = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return {
      error,
      country,
      bordersArr,
      languages,
      currencies,
      goBack,
      formatPopulation,
    };
  },
};
</script>

<style scoped>
.details-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 30px;
}
@media only screen and (min-width: 800px) {
  .details-grid {
    min-height: 400px;
    max-height: 400px;
    flex-direction: row;
    gap: 80px;
  }
}

.country-photo {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.country-photo img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  max-height: 350px;
  object-fit: cover;
}

.col2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 4;
}

.col2 h2 {
  font-size: 32px;
  margin-bottom: 24px;
}

@media (min-width: 800px) {
  .col2 h2 {
    font-size: 34px;
  }
}

.col2 .country-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 25px;
}

@media only screen and (min-width: 800px) {
  .col2 .country-details {
    flex-direction: row;
    gap: 120px;
  }
}

.col2 .country-details ul li {
  padding: 0.5rem 0;
}

.btn {
  display: inline-block;
  background: var(--light-elements);
  padding: 0.5rem 1.5rem;
  margin: 1rem;
  box-shadow: 0 0 4px rgb(0 0 0 / 9%), 0 7px 8px rgb(0 0 0 / 5%);
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  color: inherit;
}

.app.dark .btn {
  background: var(--dark-elements);
}

.btn:hover {
  box-shadow: 0 0 4px rgb(0 0 0 / 20%), 0 7px 8px rgb(0 0 0 / 20%);
}

strong {
  font-weight: 800;
}
.left-arrow-icon {
  margin-right: 0.5rem;
}
</style>
