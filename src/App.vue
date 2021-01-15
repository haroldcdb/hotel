<template>
  <v-app>
    <!-- Navegación -->
    <Header
      v-if="nav"
      :btnIniciarSesion="btn"
      :btnRegresar="!btn"
      :redireccion="redireccion"
    />
    <Navegacion v-if="!nav" />

    <!-- Loader -->
    <div class="vld-parent">
      <loading :active.sync="loader" :is-full-page="true"></loading>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Footer -->
    <FooterPrincipal v-if="!footer" />
    <FooterSecundario v-if="footer" />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Vue from "vue";

import Header from "./components/Header.vue";
import Navegacion from "./components/Navegacion.vue";
import FooterPrincipal from "./components/FooterPrincipal.vue";
import FooterSecundario from "./components/FooterSecundario.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App",

  components: {
    Header,
    Navegacion,
    FooterPrincipal,
    FooterSecundario,
    Loading,
  },

  computed: {
    nav() {
      return this.$store.state.nav;
    },
    btn() {
      return this.$store.state.btn;
    },
    redireccion() {
      return this.$store.state.redireccion;
    },
    footer() {
      return this.$store.state.footer;
    },
    loader() {
      return this.$store.state.loader;
    },
  },

  data: () => ({
    items: [
      { title: "Home", icon: "home" },
      { title: "My Account", icon: "account_circle" },
      { title: "Users", icon: "supervisor_account" },
    ],
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-linkedin-in",
      "fab fa-instagram",
    ],
  }),

  mounted() {
    this.scroll();
  },

  methods: {
    scroll() {
      const nav = document.querySelector(".page-header");
      let lastScroll = 0;

      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        // !body.classList.contains(scrollDown)
        if (currentScroll > lastScroll && currentScroll > 45) {
          // scroll down
        } else if (currentScroll < lastScroll) {
          // scroll up
        }
        lastScroll = currentScroll;
      });
    },
  },
};
</script>

<style>
/* Estilos de los formularios */
/* Corrección de la posición del mensaje de error */
div.v-text-field__details {
  margin-bottom: 0 !important;
  padding-left: 3px !important;
}
/* Color de los textos de error */
.v-application .error--text {
  color: #df0f0f !important;
}

/* Tamaño de los inputs */
div.v-input__slot,
.v-text-field__slot textarea {
  font-size: 14px !important;
  min-height: 30px !important;
  max-height: 30px !important;
  margin-top: 1px !important;
}

/* Tamaño de los placeholders */
label.v-label {
  top: 6px !important;
  font-size: 14px !important;
}
label.v-label--active {
  top: 9px !important;
}

/* Tamaño de los iconos dentro de los inputs */
div.v-input__append-inner {
  margin-top: 3px !important;
}
div.v-input__append-inner div.v-input__icon button.v-icon,
div.v-input__append-inner div.v-input__icon i.v-icon {
  font-size: 18px !important;
}

/* Separación entre el contenido de los selects */
div.v-list div.v-list-item {
  min-height: 30px !important;
}

/* Tamaño de los checkbox en los selects */
div.v-list div.v-list-item div.v-list-item__action {
  margin: 0 !important;
}
div.v-list
  div.v-list-item
  div.v-list-item__action
  div.v-simple-checkbox
  i.v-icon {
  font-size: 16px;
  margin-bottom: 3px;
}

/* Estilos de los chips */
div.v-select__slot div.v-select__selections span.v-chip {
  background-color: #1976d2 !important;
  color: #fff !important;
  height: 18px !important;
  font-size: 14px !important;
  margin-top: 2px !important;
}
div.v-select__slot
  div.v-select__selections
  span.v-chip
  span.v-chip__content
  button.v-chip__close {
  color: #fff !important;
  font-size: 14px !important;
}

/* Estilos del mapa */
/* Estilos del autocimpletado del mapa */
input.gmap-autocomplete {
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  outline: none;
}
/* Color de bordeado del mapa en error */
div.errorMapa {
  border: 2px solid #df0f0f;
  border-radius: 4px;
}
</style>