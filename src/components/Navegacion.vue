<template>
  <div>
    <div class="page-header">
      <v-app-bar color="blue" class="white--text" height="45px">
        <v-app-bar-nav-icon
          @click="navegacion = !navegacion"
          class="navIcon"
        ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="usuario_dropdown" v-bind="attrs" v-on="on">
              <img :src="foto" class="img_usuario" />
              <span class="ml-2 mr-1 black--text">{{ nombre }}</span>
              <v-icon style="font-size: 14px"> fas fa-caret-down </v-icon>
            </div>
          </template>
          <v-list class="menu">
            <a class="px-3">Configuración</a>
            <a class="px-3">Cambiar contraseña</a>
            <v-divider class="my-2"></v-divider>
            <a class="px-3" @click="cerrarSesion">Cerrar sesión</a>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <v-navigation-drawer app v-model="navegacion" temporary dark>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="foto" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ nombre }} {{ apellidos }}</v-list-item-title>
            <v-list-item-subtitle>En línea</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider class="my-0"></v-divider>

      <v-row>
        <v-col class="p-0">
          <div v-for="(item, index) in itemsNav" :key="index">
            <v-btn class="" text block>{{ item }}</v-btn>
            <v-divider class="m-0"></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import usuario from "../controllers/usuario";
export default {
  name: "",
  data() {
    return {
      navegacion: false,

      nombre: "",
      foto: "",
      itemsNav: ["Home", "Task list", "Grid", "Butttons"],

      // items: [{ title: "Configuración" }, { title: "Cerrar sesión" }],
    };
  },
  beforeMount() {
    const usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"));
    this.nombre = usuario.nombre;
    this.apellidos = usuario.apellidos;
    this.foto = usuario.foto;
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("usuarioEnLinea");
      this.$router.push("/");
    },
  },
};
</script>

<style>

.usuario_dropdown {
  display: flex;
  align-items: center;
  font-size: 12px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #ffffff;
}

.usuario_dropdown:hover {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
}

.usuario_dropdown .img_usuario {
  width: 23px;
  border-radius: 50%;
}

.menu a {
  font-size: 12px;
  display: block;
  margin: 2px 0;
  color: #000000 !important;
}
.menu a:hover {
  color: #242857 !important;
}

button.navIcon span i.v-icon {
  font-size: 20px !important;
}
</style>