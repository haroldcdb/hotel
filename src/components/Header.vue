<template>
  <div>
    <v-app-bar app color="blue-grey darken-1" height="45px">
      <v-spacer></v-spacer>

      <v-btn v-if="btnIniciarSesion" class="py-1 px-2 btn-inicioSesion" :to="{ name: redireccion }"
        >Iniciar sesión</v-btn 
      >

      <v-btn
        v-if="btnRegresar"
        text
        fab
        dark
        x-small
        color="dark"
        class="p-1 btn-regresar"
        active-class="no-active"
        :to="{ name: redireccion }">
        <v-icon dark> fas fa-arrow-left </v-icon>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["btnRegresar", "btnIniciarSesion", "redireccion"],
};
</script>

<style>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
.v-btn {
  text-decoration: none !important;
}

.btn-inicioSesion {
  height: 27px !important; 
  font-size: 11px !important;
}
</style>