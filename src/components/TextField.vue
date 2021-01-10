<template>
  <div>
    <v-text-field v-model=model type="text" class="input" :placeholder=texto></v-text-field>
  </div>
</template>

<script>
export default {
    name: "TextField",
    props: {
      texto: String,
      model: String
    }
};
</script>

<style scoped>

</style>