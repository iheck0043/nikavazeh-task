<template>
  <div class="app" :class="mode">
    <MainNav :mode="mode" @toggle="toggle" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import MainNav from "./components/MainNav.vue";

export default {
  components: { MainNav },
  setup() {
    const mode = ref("dark");

    const toggle = () => {
      if (mode.value === "dark") {
        mode.value = "";
      } else {
        mode.value = "dark";
      }
    };

    return { mode, toggle };
  },
};
</script>

<style>
.app {
  max-width: 100vw;
  min-height: 100vh;
  background: var(--light-background);
  color: var(--light-text);
}

.app.dark {
  background: var(--dark-background);
  color: var(--dark-text);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 35px;
}
</style>
