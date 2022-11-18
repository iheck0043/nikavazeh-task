import { ref } from "vue";

const getCountriesByRegion = async (region) => {
  const error = ref(null);
  const regionCountries = ref(null);

  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    regionCountries.value = data;
    console.log(regionCountries.value);
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }

  return { error, regionCountries };
};

export default getCountriesByRegion;
