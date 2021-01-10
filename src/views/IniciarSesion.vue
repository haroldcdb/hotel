<template>
  <div class="container h-100">
    <v-row class="d-flex justify-content-center h-100">
      <v-col sm="11" md="8" lg="6" xl="5" class="my-auto">
        <v-card>
          <v-card-title class="headline pb-0">Inicio de sesión</v-card-title>
          <v-divider></v-divider>

          <validation-observer ref="observador">
            <div class="container">
              <div>
                <validation-provider
                  v-slot="{ errors }"
                  name="correo"
                  rules="required|correo"
                >
                  <v-text-field
                    v-model="correo"
                    class="form-input"
                    label="Correo electrónico"
                    required
                    :error-messages="errors"
                    color="blue"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </validation-provider>
              </div>
              <div class="mt-4 mb-2">
                <validation-provider
                  v-slot="{ errors }"
                  name="contraseña"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="contrasena"
                    class="form-input"
                    label="Contraseña"
                    required
                    :error-messages="errors"
                    @keyup.enter="iniciarSesion"
                    :append-icon="
                      mostrarContrasena ? 'fas fa-eye' : 'fas fa-eye-slash'
                    "
                    :type="mostrarContrasena ? 'text' : 'password'"
                    @click:append="mostrarContrasena = !mostrarContrasena"
                    color="blue"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </validation-provider>
              </div>

              <v-btn
                :disabled="!formInvalido"
                @click="iniciarSesion"
                block
                color="blue white--text"
                class="mt-5"
                >Iniciar sesion</v-btn
              >
            </div>
          </validation-observer>
        </v-card>
        <p class="mt-2">
          Si aún no tienes una cuenta
          <v-chip
            class="m-0 px-2 btn_registrarse"
            small
            :to="{ name: 'RegistrarCliente' }"
            >REGíSTRATE AQUÍ</v-chip
          >
        </p>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="grey lighten-2">Lo sentimos</v-card-title>

        <v-card-title class="pt-5">{{ mensaje }}</v-card-title>

        <v-divider></v-divider>

        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="primary" outlined @click="dialog = false"
            >Entendido</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import usuarioController from "../controllers/usuario.js";

import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", { ...required, message: "El campo {_field_} es requerido" });
extend("correo", { ...email, message: "Formato de correo inválido" });
extend("min", {
  validate(value, { min }) {
    return value.length >= min;
  },
  params: ["min"],
  message: "Utiliza mínimo {min} caracteres",
});

export default {
  name: "IniciarSesion",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      correo: "",
      contrasena: "",
      mostrarContrasena: false,
      mensaje: "",
      dialog: false,
      errors: null,
    };
  },

  computed: {
    formInvalido() {
      return this.correo && this.contrasena;
    },
  },

  beforeMount() {
    this.$store.state.btn = false;
    this.$store.state.footer = true;
    this.$store.state.redireccion = "LandingPage";
  },

  methods: {
    iniciarSesion() {
      this.$refs.observador.validate().then((response) => {
        if (response) {
          this.$store.state.loader = true;
          const usuario = usuarioController.iniciarSesion(
            this.correo,
            this.contrasena
          );

          console.log(usuario);

          if (usuario.error == "correo") {
            this.mensaje = usuario.msj;
            this.dialog = true;
          } else if (usuario.error == "contrasena") {
            this.contrasena = "";
            // La contrasena no coincide
          } else if (usuario.usuario) {
            setInterval(() => {
              this.$store.state.loader = false;
              this.$router.push("/inicio-cliente");
            }, 1000);
          } else {
            console.log("Error en el servidor");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
a.v-chip {
  text-decoration: none !important;
}
</style>