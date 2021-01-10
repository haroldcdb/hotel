<template>
  <div class="">
    <Filtro
      class="filtro"
      v-on:getValor="filtrado"
      style="position: sticky; top: 0px; z-index: 5"
    />

    <v-row class="mx-5">
      <v-col lg="7">
        <div v-if="listaHotelesFiltrados.length == 0">
          No hay hoteles para mostrar
        </div>
        <v-card
          v-for="(hotel, index) in listaHotelesFiltrados"
          :key="index"
          elevation="3"
          width="100%"
          :class="index != listaHotelesFiltrados.length - 1 ? 'mb-3' : ''"
        >
          <!-- @mouseover="mostrarInfoVentana(hotel, index)" -->
          <v-row>
            <v-col lg="4" class="pl-5 py-1 columna">
              <v-carousel
                :continuous="hotel.imagenes.length > 1"
                hide-delimiters
                height="200px"
                style="border-radius: 4px"
              >
                <v-carousel-item
                  v-for="(imagen, index) in hotel.imagenes"
                  :key="index"
                  :src="imagen.src"
                >
                </v-carousel-item>
              </v-carousel>
            </v-col>

            <v-col lg="8" class="p-1">
              <v-card-title
                class="p-0"
                @click="redirigirPerfil(hotel.cedulaJuridica)"
                >{{ hotel.nombre }}</v-card-title
              >
              <v-card-text class="p-0 text--primary">{{
                hotel.resena
              }}</v-card-text>
              <small class="p-0 text--secondary"
                >{{ hotel.provincia }}, {{ hotel.canton }},
                {{ hotel.distrito }}</small
              >

              <v-spacer></v-spacer>

              <v-card-actions class="pl-0">
                <v-btn
                  small
                  text
                  outlined
                  v-for="(tab, index2) in tabs"
                  :key="index2"
                  @click="mostrar(index, index2)"
                >
                  {{ tab }}
                  <v-icon class="pl-2" x-small>{{
                    expInfo[index][index2].activo
                      ? "fas fa-chevron-up"
                      : "fas fa-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="12" class="p-0">
              <v-expand-transition>
                <div v-show="expInfo[index][0].activo" class="mx-2">
                  <v-divider class="mx-4 mb-0"></v-divider>
                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                    soldier, not with all the bed making you'll be doing. Then
                    we'll go with that data file! Hey, you add a one and two
                    zeros to that or we walk! You're going to do his laundry?
                    I've got to find a way to escape.
                  </v-card-text>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-show="expInfo[index][1].activo" class="mx-2">
                  <v-divider class="mx-4 mb-0"></v-divider>
                  <v-card-text> I'm a thing. </v-card-text>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-show="expInfo[index][2].activo" class="mx-2">
                  <v-divider class="mx-4 mb-0"></v-divider>
                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                    soldier, not with all the bed.
                  </v-card-text>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-show="expInfo[index][3].activo" class="mx-2">
                  <v-divider class="mx-4 mb-0"></v-divider>
                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                    soldier, not with all the bed making you'll be doing. Then
                    we'll go with that data file! Hey, you add a one and two
                    zeros to that or we walk! You're going to do his laundry?
                    I've got to find a way to escape.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="5">
        <div class="map-container" id="map-container">
          <gmap-map
            :center="centro"
            :zoom="8"
            style="width: 100%; height: 100%"
            @click="abrirVentanaInfo = false"
          >
            <gmap-marker
              v-for="(marcador, index) in marcadores"
              :key="index"
              :position="marcador.posicion"
              :animation="4"
              :draggable="false"
              @click="mostrarInfoVentana(marcador.hotel, index)"
            ></gmap-marker>

            <!-- :options="optInfo" -->
            <gmap-info-window
              :position="posVentanaInfo"
              :opened="abrirVentanaInfo"
            >
              <div v-html="contenido"></div>
            </gmap-info-window>
          </gmap-map>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import hotelController from "../controllers/hotel";
import Filtro from "../components/Filtro";
import Vue from "vue";

export default {
  name: "InicioCliente",
  components: {
    Filtro,
  },
  data() {
    return {
      usuario:
        "Hola " + JSON.parse(localStorage.getItem("usuarioEnLinea")).nombre,
      imagen: "",
      nombreHotel: "",
      resena: "",
      provincia: "",
      canton: "",
      distrito: "",

      listaHoteles: [],
      listaHotelesFiltrados: [],
      tabs: ["Habitaciones", "Ubicación", "Servicio", "Otro"],
      expInfo: [],

      centro: {
        lat: 9.90263460472791,
        lng: -84.10152706627045,
      },
      marcadores: [],

      contenido: "",
      posVentanaInfo: {
        lat: 0,
        lng: 0,
      },
      abrirVentanaInfo: false,
      indexActual: null,
      optInfo: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  beforeMount() {
    this.$store.state.nav = false;
    this.$store.state.footer = false;
    this.datosHoteles();

    // Se crea el arreglo de objetos que controla los botones para que expandan o no
    for (let i = 0; i < this.listaHoteles.length; i++) {
      let array = [];
      for (let j = 0; j < 4; j++) {
        array.push({ activo: false });
      }
      this.expInfo.push(array);
    }
  },
  mounted() {
    this.scroll();
  },
  methods: {
    mostrarInfoVentana(hotel, index) {
      this.posVentanaInfo = { lat: hotel.lat, lng: hotel.lng };
      this.contenido = this.obtInfoVentana(hotel);

      // Se revisa si el marcador que fue seleccionado se volvió a cliquear
      if (this.indexActual == index) {
        this.abrirVentanaInfo = !this.abrirVentanaInfo;
      }
      // Si es otro marcador se reinicia el indice para abrir uno nuevo
      else {
        this.abrirVentanaInfo = true;
        this.indexActual = index;
      }
    },

    obtInfoVentana(infoHotel) {
      return `<div class="card" style="width:200px;height:190px">
                <figure class="image">
                  <img src="${infoHotel.imagenes[0].src}" alt="Placeholder image" style="width:100%;height:100px">
                </figure>
                <div>
                  <div>
                    <p class="title mb-1">${infoHotel.nombre}</p>
                  </div>
                  <div>
                    ${infoHotel.resena}
                  </div>
                </div>
              </div>`;
    },

    mostrar(index, index2) {
      // Esto es para reiniciar el arreglo de objetos que controla los botones para que expandan o no
      if (!this.expInfo[index][index2].activo) {
        this.expInfo[index].splice(0, this.expInfo.length);
        for (let j = 0; j < 4; j++) {
          this.expInfo[index].push({ activo: false });
        }
      }
      this.expInfo[index][index2].activo = !this.expInfo[index][index2].activo;
    },
    datosHoteles() {
      this.listaHoteles = hotelController.obtenerHoteles().hoteles;
      this.listaHotelesFiltrados = this.listaHoteles.slice();

      // Ingresar la info del hotel para mostrarla en los marcadores
      for (const hotel of this.listaHoteles) {
        let posicion = { lat: hotel.lat, lng: hotel.lng };
        this.marcadores.push({ posicion, hotel });
      }
    },
    filtrado(valorFiltrado) {
      // Se borran todos los hoteles para ingresar los nuevos hoteles filtrados
      this.listaHotelesFiltrados.splice(0, this.listaHotelesFiltrados.length);
      this.marcadores.splice(0, this.marcadores.length);

      // Se recorre la lista de hoteles para ver cual coincide con el criterio
      for (const hotel of this.listaHoteles) {
        if (
          hotel.nombre.toLowerCase().includes(valorFiltrado.toLowerCase()) ||
          hotel.provincia.toLowerCase().includes(valorFiltrado.toLowerCase()) ||
          hotel.canton.toLowerCase().includes(valorFiltrado.toLowerCase()) ||
          hotel.distrito.toLowerCase().includes(valorFiltrado.toLowerCase())
        ) {
          this.listaHotelesFiltrados.push(hotel);
          let posicion = { lat: hotel.lat, lng: hotel.lng };
          this.marcadores.push({ posicion, hotel });
        }
      }
    },
    redirigirPerfil(cedulaJuridica) {
      let hotel = hotelController.obtenerHotel(cedulaJuridica).hotel;
      console.log(hotel);
      // this.$router.push("/perfil-hotel");
    },

    scroll() {
      const map = document.querySelector("#map-container");
      let lastScroll = 0;
      let limite = false;

      document.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset;
        if (currentScroll >= 45 && !limite) {
          // scroll down
          map.style.height = map.offsetHeight + 45 + "px";
          limite = true;
        } else if (currentScroll <= 45 && limite) {
          // scroll up
          map.style.height = map.offsetHeight - 45 + "px";
          limite = false;
        }
        lastScroll = currentScroll;
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
>>> div.map-container {
  position: sticky;
  top: 145px;
  height: 73.5vh;
  transition: 0.3s;
}

>>> div.v-card__title:hover {
  cursor: pointer;
  color: rgb(102, 102, 102);
}

>>> div.v-window__prev,
>>> div.v-window__next {
  margin: 0 5px;
}
>>> div.v-window__prev button.v-btn,
>>> div.v-window__next button.v-btn {
  width: 30px;
  height: 30px;
}

>>> div.v-window__prev button.v-btn span.v-btn__content i.v-icon,
>>> div.v-window__next button.v-btn span.v-btn__content i.v-icon {
  font-size: 16px !important;
}
</style>