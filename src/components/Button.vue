<template>
  <div>
    <v-btn :variant="tipo">{{ texto }}</v-btn>
  </div>
</template>

<script>

export default {
  name: "Button",
  props: {
    texto: String,
    tipo: String
  }
};
</script>

<style scoped>
</style>