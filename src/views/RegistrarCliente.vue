<template>
  <div class="container h-100">
    <v-row class="d-flex justify-content-center h-100">
      <v-col col sm="12" md="11" lg="8" xl="7" class="my-auto">
        <v-stepper v-model="stepper">
          <v-card-title class="headline pb-0"
            ><p class="m-0">
              Crea una cuenta <strong>HOTEL</strong>
            </p></v-card-title
          >
          <v-divider></v-divider>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!-- Contenido -->
              <v-row class="h-100">
                <!-- Imagen -->
                <v-col sm="5" md="4" lg="4" xl="4" class="col-12 my-auto">
                  <v-row class="d-flex justify-content-center">
                    <img
                      id="foto_usuario"
                      class="foto_usuario"
                      src="https://res.cloudinary.com/harold23/image/upload/v1602794744/gqngnkdynbl7tqnudxyu.png"
                    />
                  </v-row>
                  <v-row class="d-flex justify-content-center">
                    <v-chip small class="btn_subirFoto mt-1" @click="subirFoto"
                      >Subir foto
                    </v-chip>
                    <input type="file" id="input_subirFoto" hidden />
                  </v-row>
                </v-col>

                <v-col sm="7" md="8" lg="8" xl="8" class="col-12">
                  <validation-observer ref="primer_observador">
                    <!-- Nombre y apellido -->
                    <v-row>
                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <validation-provider
                          v-slot="{ errors }"
                          name="nombre"
                          rules="requerido"
                        >
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
                      </v-col>

                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <validation-provider
                          v-slot="{ errors }"
                          name="apellidos"
                          rules="requerido"
                        >
                          <v-text-field
                            v-model="apellidos"
                            class="form-input"
                            label="Apellidos"
                            required
                            :error-messages="errors"
                            hide-details="auto"
                            color="blue"
                            dense
                            outlined
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <!-- Correo -->
                    <v-row>
                      <v-col
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="col-12 pt-1"
                      >
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
                      </v-col>
                    </v-row>
                    <!-- Contraseña -->
                    <v-row>
                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <validation-provider
                          v-slot="{ errors }"
                          name="contraseña"
                          rules="requerido|min:8"
                        >
                          <v-text-field
                            v-model="contrasena"
                            label="Contraseña"
                            required
                            :error-messages="errors"
                            :append-icon="
                              mostrarContrasena
                                ? 'fas fa-eye'
                                : 'fas fa-eye-slash'
                            "
                            :type="mostrarContrasena ? 'text' : 'password'"
                            @click:append="
                              mostrarContrasena = !mostrarContrasena
                            "
                            hide-details="auto"
                            color="blue"
                            dense
                            outlined
                          ></v-text-field>
                        </validation-provider>
                      </v-col>

                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <validation-provider
                          v-slot="{ errors }"
                          name="confirmación"
                          rules="requerido|confirmacion:@contraseña"
                        >
                          <v-text-field
                            v-model="confirmacion"
                            label="Confirmación"
                            required
                            :error-messages="errors"
                            :type="mostrarContrasena ? 'text' : 'password'"
                            @click:append="
                              mostrarContrasena = !mostrarContrasena
                            "
                            hide-details="auto"
                            color="blue"
                            dense
                            outlined
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <!-- Identificación -->
                    <v-row>
                      <v-col
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="col-12 pt-1"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          name="identificación"
                          rules="requerido"
                        >
                          <v-text-field
                            v-model="identificacion"
                            class="form-input"
                            label="Identificación"
                            required
                            :error-messages="errors"
                            hide-details="auto"
                            color="blue"
                            dense
                            outlined
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <!-- Fecha -->
                    <v-row>
                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <validation-provider
                              v-slot="{ errors }"
                              name="fecha"
                              rules="requerido|validarFecha:@edad"
                            >
                              <v-text-field
                                v-model="fechaNacimiento"
                                label="Fecha de nacimiento"
                                required
                                :error-messages="errors"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                hide-details="auto"
                                color="blue"
                                dense
                                outlined
                              ></v-text-field>
                            </validation-provider>
                          </template>
                          <v-date-picker
                            v-model="fechaNacimiento"
                            @input="calcEdad"
                            :max="fechaLimite()"
                            no-title
                            color="blue"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pt-1">
                        <validation-provider name="edad">
                          <v-text-field
                            v-model="edad"
                            hide-details="auto"
                            class="form-input"
                            label="Edad (+18)"
                            color="blue"
                            dense
                            outlined
                            readonly
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <!-- Género -->
                    <v-row>
                      <v-col
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="col-12 pt-1"
                      >
                        <v-radio-group
                          v-model="genero"
                          row
                          label="Género"
                          :mandatory="true"
                          hide-details="auto"
                          class="m-0"
                        >
                          <v-radio
                            v-for="item in generos"
                            :key="item"
                            :label="item"
                            :value="item"
                            color="blue"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </validation-observer>
                </v-col>
              </v-row>

              <v-row class="d-flex justify-content-end mr-1 pb-1">
                <v-btn color="" class="blue white--text" @click="siguientePaso">
                  Siguiente
                </v-btn>
              </v-row>
            </v-stepper-content>

            <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++ -->
            <v-stepper-content step="2" class="pt-0">
              <!-- Contenido -->

              <validation-observer ref="segundo_observador">
                <!-- PCD -->
                <v-row>
                  <v-col sm="4" md="4" lg="4" xl="4" class="col-12 pt-1">
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
                  </v-col>

                  <v-col sm="4" md="4" lg="4" xl="4" class="col-12 pt-1">
                    <validation-provider
                      v-slot="{ errors }"
                      name="cantón"
                      rules="requerido"
                    >
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
                  </v-col>

                  <v-col sm="4" md="4" lg="4" xl="4" class="col-12 pt-1">
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
                  </v-col>
                </v-row>
                <!-- Direccion -->
                <v-row>
                  <v-col sm="12" md="12" lg="12" xl="12" class="col-12 pt-1">
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
                  </v-col>
                </v-row>
                <!-- Mapa -->
                <v-row>
                  <v-col sm="6" md="6" lg="6" xl="6" class="col-12 pb-1">
                    <gmap-autocomplete
                      class="pl-2 gmap-autocomplete"
                      @place_changed="establecerMarcador"
                      placeholder="Busca tu ciudad"
                    >
                    </gmap-autocomplete>
                  </v-col>
                </v-row>
                <div id="map-container">
                  <v-row>
                    <v-col sm="12" md="12" lg="12" xl="12" class="col-12 py-0">
                      <gmap-map
                        :center="centro"
                        :zoom="12"
                        style="width: 100%; height: 250px"
                        messages="Hola"
                        hint="Hola"
                      >
                        <gmap-marker
                          @dragend="obtenerCoord"
                          :position="marcador"
                          :animation="4"
                          draggable
                        >
                        </gmap-marker>
                      </gmap-map>
                    </v-col>
                  </v-row>
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

                <v-divider></v-divider>

                <!-- Telefono -->
                <v-row>
                  <v-col sm="12" md="12" lg="12" xl="12" class="col-12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="teléfono"
                      rules="requerido"
                    >
                      <v-combobox
                        v-model="telefono"
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
                  </v-col>
                </v-row>
              </validation-observer>

              <v-row class="d-flex justify-content-between mx-1 pb-1">
                <!-- class="mx-2" -->
                <v-btn text @click="stepper = 1" fab dark x-small color="black">
                  <v-icon dark> fas fa-arrow-left </v-icon>
                </v-btn>
                <v-btn class="blue white--text" @click="registrarCliente">
                  Registrarse
                </v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import provinciaApi from "../api/provincias";
import cantonApi from "../api/cantones";
import distritoApi from "../api/distritos";

import usuarioController from "../controllers/usuario.js";

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
extend("confirmacion", {
  validate(val, { contrasena }) {
    return val == contrasena;
  },
  params: ["contrasena"],
  message: "La confirmación no coincide con la contraseña",
});
extend("validarFecha", {
  validate(val, { edad }) {
    return edad.length != 0;
  },
  params: ["edad"],
  message: "El campo fecha de nacimiento es requerido",
});
extend("min", {
  validate(val, { min }) {
    return val.length >= min;
  },
  params: ["min"],
  message: "Utiliza mínimo {min} caracteres",
});

export default {
  name: "RegistrarUsuario",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    const hoy = new Date();

    return {
      nombre: "",
      apellidos: "",
      identificacion: "",
      correo: "",
      contrasena: "",
      confirmacion: "",
      fechaNacimiento: [
        hoy.getFullYear() - 18,
        (hoy.getMonth() + 1).toString().padStart(2, "0"),
        hoy.getDate().toString().padStart(2, "0"),
      ].join("-"),
      edad: "",
      genero: "",
      provincia: "",
      canton: "",
      distrito: "",
      direccion: "",
      telefono: [],

      // Address
      listaProvincias: provinciaApi.provincias.map((a) => a.nombre),
      listaCantones: [],
      listaDistritos: [],

      // Map
      centro: {},
      marcador: {},
      msjErrMap: false,
      marcadorDragged: false,

      mostrarContrasena: false,
      menu: false,
      generos: ["Masculino", "Femenino", "Otro"],
      stepper: 1,

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

    // Para validar que el campo teléfono solo acepte números
    const campo = document.getElementById("telefono");
    campo.addEventListener("input", function (e) {
      if (!/^[0-9]*$/.test(campo.value)) {
        campo.value = campo.value.substring(0, campo.value.length - 1);
      }
    });
  },

  methods: {
    registrarCliente() {
      let foto = document.getElementById("foto_usuario").src;
      let listaTelefonos = [];

      this.telefono.forEach((telefono) =>
        listaTelefonos.push(new Object({ telefono }))
      );

      this.$refs.segundo_observador.validate().then((response) => {
        if (response && this.marcadorDragged) {
          let usuario = usuarioController.registrarUsuario(
            this.identificacion,
            this.nombre,
            this.apellidos,
            this.correo,
            this.contrasena,
            this.fechaNacimiento,
            this.genero,
            foto,
            this.provincia,
            this.canton,
            this.distrito,
            this.direccion,
            this.marcador.lat,
            this.marcador.lng,
            listaTelefonos,
            "cliente",
            "activo",
            [{ permiso: "1" }, { permiso: "2" }]
          );

          console.log(usuario.msj);
        } else if (!this.marcadorDragged) {
          this.msjErrMap = true;
          document.getElementById("map-container").classList.add("errorMapa");
        }
      });
    },
    siguientePaso() {
      // this.$refs.primer_observador.validate().then((response) => {
      //   if (response) {
      this.stepper = 2;
      //   }
      // });
    },

    fechaLimite() {
      const hoy = new Date();
      return;
      [
        hoy.getFullYear() - 18,
        (hoy.getMonth() + 1).toString().padStart(2, "0"),
        hoy.getDate().toString().padStart(2, "0"),
      ].join("-");
    },

    calcEdad() {
      const hoy = new Date();
      const anoActual = hoy.getFullYear();
      const mesActual = hoy.getMonth();
      const diaActual = hoy.getDate();

      const nacimiento = new Date(this.fechaNacimiento);
      const anoNacimiento = nacimiento.getFullYear();
      const mesNacimiento = nacimiento.getMonth();
      const diaNacimiento = nacimiento.getDate();

      let edad = anoActual - anoNacimiento;

      if (mesNacimiento > mesActual) {
        edad--;
      } else if (mesNacimiento == mesActual && diaActual < diaNacimiento) {
        edad--;
      }

      this.edad = edad;
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

    revisarLimite() {
      if (this.telefono.length == 4) {
        document.getElementById("telefono").setAttribute("readonly", true);
      } else if (this.telefono.length >= 0) {
        document.getElementById("telefono").removeAttribute("readonly");
      }
    },

    subirFoto() {
      let inputSubirFoto = document.getElementById("input_subirFoto");
      let fotoContainer = document.getElementById("foto_usuario");

      const cloudName = "harold23";
      const unsignedUploadPreset = "harold23";
      let archivo = "";

      inputSubirFoto.click();

      inputSubirFoto.addEventListener("change", () => {
        archivo = inputSubirFoto.files[0];
        if (archivo != null) {
          let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          let xhr = new XMLHttpRequest();
          let fd = new FormData();

          xhr.open("POST", url, true);
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

          xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              let urlFoto = JSON.parse(xhr.responseText).secure_url;
              fotoContainer.src = urlFoto;
            }
          };

          fd.append("upload_preset", unsignedUploadPreset);
          fd.append("file", archivo);
          xhr.send(fd);
        }
      });
    },

    establecerMarcador(lugar) {
      const coords = {
        lat: lugar.geometry.location.lat(),
        lng: lugar.geometry.location.lng(),
      };

      this.centro = coords;
      this.marcador = coords;
      this.establecerLatLng(this.marcador);
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
  },
};
</script>

<style>
div.v-radio div.v-input--selection-controls__input {
  margin-right: 2px;
}
div.v-radio div.v-input--selection-controls__input i.v-icon {
  font-size: 18px;
}

img.foto_usuario {
  border: 1px solid #cccccc;
  border-radius: 4px;
  height: 160px;
  width: 160px;
}
span.btn_subirFoto {
  width: 160px;
  text-align: center;
  display: inline-block;
}
</style>