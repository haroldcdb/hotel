<template>
  <div>
    <v-footer padless>
      <v-card class="flex grey darken-4" flat tile>
        <v-card-text class="py-2 white--text text-center">
          <strong>Hotel</strong>
          -
          {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import usuario from "../controllers/usuario";
export default {
  name: "",
  data() {
    return {};
  },
  beforeMount() {},
  methods: {},
};
</script>

<style>
</style>