<template>
  <div class="spin"></div>
</template>

<script>
export default {};
</script>

<style>
.spin {
  width: 30px;
  height: 30px;
  margin: 30px auto;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--light-text);
  animation: spin 0.7s ease infinite;
}
.app.dark .spin {
  border-top-color: var(--dark-text);
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
