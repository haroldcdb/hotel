<template>
  <div class="container">
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(imagen, i) in imagenes"
        :key="i"
        :src="imagen.src"
      >
        <v-flex text-right>
          <v-btn
            v-if="!imagenes[0].src.includes('placeholder_hotel')"
            @click="eliminarImagen(i)"
            class="m-2"
            x-small
            color="black"
            dark
            fab
          >
            <v-icon>fas fa-trash-alt</v-icon>
          </v-btn>
        </v-flex>
      </v-carousel-item>
    </v-carousel>

    <input
      id="input_agregarImagenes"
      type="file"
      accept="image/x-png,image/gif,image/jpeg"
      hidden
      multiple
    />
    <v-btn @click="agregarImagen" small block class="my-3"
      >Agregar imagen</v-btn
    >

    <validation-observer ref="observer">
      <!-- Nombre -->
      <validation-provider v-slot="{ errors }" name="nombre" rules="requerido">
        <v-text-field
          v-model="nombre"
          class="form-input"
          label="Nombre"
          required
          :error-messages="errors"
          hide-details="auto"
          color="blue"
          dense
          outlined
        ></v-text-field>
      </validation-provider>
      <!-- Id -->
      <validation-provider
        v-slot="{ errors }"
        name="cédula jurídica"
        rules="requerido"
      >
        <v-text-field
          v-model="cedulaJuridica"
          class="form-input"
          label="Cédula jurídica"
          required
          :error-messages="errors"
          hide-details="auto"
          color="blue"
          dense
          outlined
        ></v-text-field>
      </validation-provider>
      <!-- Correo -->
      <validation-provider
        v-slot="{ errors }"
        name="correo"
        rules="requerido|correo"
      >
        <v-text-field
          v-model="correo"
          class="form-input"
          label="Correo electrónico"
          required
          :error-messages="errors"
          hide-details="auto"
          color="blue"
          dense
          outlined
        ></v-text-field>
      </validation-provider>
      <!-- Cadena -->
      <v-text-field
        v-model="cadenaHotel"
        class="form-input"
        label="Cadena hotelera (opcional)"
        required
        :error-messages="errors"
        hide-details="auto"
        color="blue"
        dense
        outlined
      ></v-text-field>
      <!-- Reseña -->
      <validation-provider v-slot="{ errors }" name="reseña" rules="requerido">
        <v-text-field
          v-model="resena"
          class="form-input"
          label="Reseña"
          required
          :error-messages="errors"
          hide-details="auto"
          color="blue"
          dense
          outlined
        ></v-text-field>
      </validation-provider>
      <!-- Tipo de moneda -->
      <validation-provider
        v-slot="{ errors }"
        name="tipo de moneda"
        rules="requerido"
      >
        <v-select
          v-model="tipoMoneda"
          :items="listaTipoMoneda"
          label="Tipo de moneda"
          class="form-input"
          required
          :error-messages="errors"
          hide-details="auto"
          multiple
          chips
          dense
          outlined
          color="blue"
        ></v-select>
      </validation-provider>
      <!-- Calificacion internacional -->
      <validation-provider
        v-slot="{ errors }"
        name="calificación"
        rules="requerido"
      >
        <v-rating
          v-model="calificacionInternacional"
          label="Calificación internacional"
          color="yellow darken-1"
          background-color="grey darken-1"
          empty-icon="far fa-star"
          full-icon="fas fa-star"
          hover
          length="5"
          required
          :error-messages="errors"
        ></v-rating>
      </validation-provider>
      <!-- Provincia, cantón, distrito -->
      <validation-provider
        v-slot="{ errors }"
        name="provincia"
        rules="requerido"
      >
        <v-select
          v-model="provincia"
          label="Provincia"
          class="form-input"
          :items="listaProvincias"
          @change="llenarCantones"
          required
          :error-messages="errors"
          hide-details="auto"
          dense
          outlined
          color="blue"
        ></v-select>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="cantón" rules="requerido">
        <v-select
          v-model="canton"
          label="Cantón"
          class="form-input"
          :items="listaCantones"
          @change="llenarDistritos"
          required
          :error-messages="errors"
          hide-details="auto"
          dense
          outlined
          color="blue"
        ></v-select>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="distrito"
        rules="requerido"
      >
        <v-select
          v-model="distrito"
          label="Distrito"
          class="form-input"
          :items="listaDistritos"
          required
          :error-messages="errors"
          hide-details="auto"
          dense
          outlined
          color="blue"
        ></v-select>
      </validation-provider>
      <!-- Dirección fisica -->
      <validation-provider
        v-slot="{ errors }"
        name="dirección"
        rules="requerido"
      >
        <v-textarea
          v-model="direccion"
          label="Dirección física"
          class="form-input"
          required
          :error-messages="errors"
          auto-grow
          rows="1"
          row-height="15"
          hide-details="auto"
          outlined
          dense
          color="blue"
        ></v-textarea>
      </validation-provider>
      <!-- Mapa -->
      <gmap-autocomplete
        class="pl-2 gmap-autocomplete"
        @place_changed="establecerMarcador"
        placeholder="Busca tu ciudad"
      ></gmap-autocomplete>
      <div id="map-container">
        <gmap-map
          :center="centro"
          :zoom="12"
          style="width: 100%; height: 250px"
        >
          <gmap-marker
            @dragend="obtenerCoord"
            :position="marcador"
            :animation="4"
            draggable
          ></gmap-marker>
        </gmap-map>
      </div>

      <div class="v-text-field__details mt-1" v-if="msjErrMap">
        <div class="v-messages theme--light error--text" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">
              Debes de elegir un lugar en el mapa
            </div>
          </div>
        </div>
      </div>

      <!-- Categoria -->
      <validation-provider
        v-slot="{ errors }"
        name="categoría"
        rules="requerido"
      >
        <v-select
          v-model="categoria"
          label="Categoría"
          class="form-input"
          :items="listaCategorias"
          required
          :error-messages="errors"
          hide-details="auto"
          dense
          outlined
          color="blue"
        ></v-select>
      </validation-provider>
      <!-- Etiquetas -->
        <v-combobox
          v-model="etiquetas"
          id="etiqueta"
          class="form-input"
          label="Etiquetas (máximo 4)"
          multiple
          append-icon
          chips
          hide-details="auto"
          deletable-chips
          @click="revisarLimite"
          @keyup.enter="revisarLimite"
          color="blue"
          outlined
          dense
        ></v-combobox>
      <!-- Telefono -->
      <validation-provider
        v-slot="{ errors }"
        name="teléfono"
        rules="requerido"
      >
        <v-combobox
          v-model="telefonos"
          id="telefono"
          class="form-input"
          label="Teléfono (máximo 4)"
          required
          :error-messages="errors"
          multiple
          append-icon
          chips
          hide-details="auto"
          deletable-chips
          @click="revisarLimite"
          @keyup.enter="revisarLimite"
          color="blue"
          outlined
          dense
        ></v-combobox>
      </validation-provider>
    </validation-observer>

    <v-btn @click="registrarHotel"> Registrar </v-btn>
    <v-btn @click="llenar"> llenar </v-btn>
  </div>
</template>

<script>
import provinciaApi from "../api/provincias";
import cantonApi from "../api/cantones";
import distritoApi from "../api/distritos";

import hotelController from "../controllers/hotel.js";

import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("requerido", {
  ...required,
  message: "El campo {_field_} es requerido",
});
extend("correo", { ...email, message: "Formato de correo inválido" });

export default {
  name: "RegistrarHotel",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      cedulaJuridica: "",
      nombre: "",
      correo: "",
      cadenaHotel: "",
      resena: "",
      imagenes: [{ src: require("../assets/placeholder_hotel.png") }],
      tipoMoneda: [],
      calificacionInternacional: 0,
      provincia: "",
      canton: "",
      distrito: "",
      direccion: "",
      categoria: "",
      etiquetas: [],
      telefonos: [],

      // Address
      listaProvincias: provinciaApi.provincias.map((a) => a.nombre),
      listaCantones: [],
      listaDistritos: [],
      listaCategorias: ["Playa", "Montaña", "Ciudad"],
      listaTipoMoneda: ["CRC (₡)", "USD ($)", "EUR (€)"],

      // Map
      centro: {},
      marcador: {},
      msjErrMap: false,
      marcadorDragged: false,

      errors: null,
    };
  },
  beforeMount() {
    this.$store.state.btn = false;
    this.$store.state.footer = true;
    this.$store.state.redireccion = "LandingPage";
  },
  mounted() {
    this.posicionActual();
  },
  methods: {
    llenar() {
      (this.imagenes = [
        {
          src:
            "https://res.cloudinary.com/harold23/image/upload/v1604113635/evvbf9yajpop3jokaxkg.png",
        },
        {
          src:
            "https://res.cloudinary.com/harold23/image/upload/v1604113635/enfht23phwyxnmwjovls.jpg",
        },
      ]),
        (this.nombre = "Mi hotel"),
        (this.cedulaJuridica = "123456789"),
        (this.correo = "mihotel@gmail.com"),
        (this.cadenaHotel = "hoteleria"),
        (this.resena = "Un lindo hotel de montaña"),
        (this.tipoMoneda = ["CRC (₡)", "EUR (€)"]),
        (this.calificacionInternacional = 5),
        (this.direccion = "Del palo de mango 200 m norte"),
        (this.marcador.lat = 9.90263460472791),
        (this.marcador.lng = -84.10152706627045),
        (this.categoria = "Montaña"),
        (this.etiquetas = ["montaña", "bonito", "parati"]),
        (this.telefonos = ["22334455", "22665534"]);
    },

    registrarHotel() {
      let listaTipoMoneda = [];
      let listaEtiquetas = [];
      let listaTelefonos = [];

      this.tipoMoneda.forEach((moneda) =>
        listaTipoMoneda.push(new Object({ moneda }))
      );
      this.telefonos.forEach((telefono) =>
        listaTelefonos.push(new Object({ telefono }))
      );
      this.etiquetas.forEach((etiqueta) =>
        listaEtiquetas.push(new Object({ etiqueta }))
      );

      let hotel = hotelController.registrarHotel(
      // console.log(
        this.nombre,
        this.cedulaJuridica,
        this.correo,
        this.cadenaHotel,
        this.imagenes,
        this.resena,
        listaTipoMoneda,
        this.calificacionInternacional,
        this.provincia,
        this.canton,
        this.distrito,
        this.direccion,
        this.marcador.lat,
        this.marcador.lng,
        this.categoria,
        listaEtiquetas,
        listaTelefonos
      );

      console.log(hotel);

      // console.log(hotel);
      // this.$refs.observer.validate().then((response) => {
      //   if (response && this.marcadorDragged) {
      //   } else if (!this.marcadorDragged) {
      //     this.msjErrMap = true;
      //     document.getElementById("map-container").classList.add("errorMapa");
      //   }
      // });
    },

    llenarCantones() {
      let provinciaSeleccionda = this.provincia;

      let provincia = provinciaApi.provincias.filter((item) => {
        return item.nombre === provinciaSeleccionda;
      });
      let lista = cantonApi.cantones.filter((item) => {
        return item.idProvincia === provincia[0].idProvincia;
      });

      this.listaCantones = lista.map((value) => value.nombre);
      this.canton = "";
    },

    llenarDistritos() {
      let cantonSeleccionado = this.canton;

      let canton = cantonApi.cantones.filter(function (item) {
        return item.nombre === cantonSeleccionado;
      });
      let lista = distritoApi.distritos.filter(function (item) {
        return item.idCanton === canton[0].idCanton;
      });

      this.listaDistritos = lista.map((value) => value.nombre);
      this.distrito = "";
    },

    agregarImagen() {
      let inputAgregarImagenes = document.getElementById(
        "input_agregarImagenes"
      );
      const cloudName = "harold23";
      const unsignedUploadPreset = "harold23";

      inputAgregarImagenes.click();

      inputAgregarImagenes.addEventListener("change", () => {
        let loteImagenes = Array.from(inputAgregarImagenes.files);
        for (let i = 0; i < loteImagenes.length; i++) {
          let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          let xhr = new XMLHttpRequest();
          let fd = new FormData();

          xhr.open("POST", url, true);
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

          xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              this.imagenes = this.imagenes[0].src.includes("placeholder_hotel")
                ? []
                : this.imagenes;
              let urlFoto = JSON.parse(xhr.responseText).secure_url;
              this.imagenes.push({ src: urlFoto });
              console.log(urlFoto);
            }
          };

          fd.append("upload_preset", unsignedUploadPreset);
          fd.append("file", loteImagenes[i]);
          xhr.send(fd);
        }

        inputAgregarImagenes.value = "";
      });
    },
    eliminarImagen(index) {
      this.imagenes.splice(index, 1);
      if (this.imagenes.length == 0) {
        this.imagenes.push({ src: require("../assets/placeholder_hotel.png") });
      }
    },
    establecerMarcador(lugar) {
      const coords = {
        lat: lugar.geometry.location.lat(),
        lng: lugar.geometry.location.lng(),
      };

      this.centro = coords;
      this.marcador = coords;
    },
    obtenerCoord(marcador) {
      const coords = {
        lat: marcador.latLng.lat(),
        lng: marcador.latLng.lng(),
      };

      this.centro = coords;
      this.marcador = coords;

      this.msjErrMap = false;
      this.marcadorDragged = true;
      document.getElementById("map-container").classList.remove("errorMapa");
    },
    posicionActual() {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          const coords = {
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude,
          };

          this.centro = coords;
          this.marcador = coords;
        },
        (err) => {
          const coords = {
            lat: 9.90263460472791,
            lng: -84.10152706627045,
          };
          this.centro = coords;
          this.marcador = coords;
        }
      );
    },

    revisarLimite(e) {
      switch (e.target.getAttribute("id")) {
        case "etiqueta":
          if (this.etiqueta.length == 4) {
            e.target.setAttribute("readonly", true);
          } else if (this.etiqueta.length >= 0) {
            e.target.removeAttribute("readonly");
          }
          break;
        case "telefono":
          if (this.telefono.length == 4) {
            e.target.setAttribute("readonly", true);
          } else if (this.telefono.length >= 0) {
            e.target.removeAttribute("readonly");
          }
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>