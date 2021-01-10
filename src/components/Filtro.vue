<template>
  <div>
    <div class="filtro">
      <v-row class="cont-row">
        <v-col lg="5">
          <div class="inputFiltro">
            <v-text-field
              v-model="valorFiltro"
              @input="retornarValor"
              hide-details="auto"
              outlined
              color="blue"
              label="Escribe una ciudad, hotel, dirección o lugar de interés"
              append-icon="fas fa-map-marker-alt"
            ></v-text-field>
          </div>
        </v-col>
        <v-col lg="4">
          <v-row>
            <v-col class="p-0">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaLlegada"
                    label="Llegada"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details="auto"
                    color="blue"
                    dense
                    outlined
                    append-icon="fas fa-calendar-alt"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaLlegada"
                  no-title
                  color="blue"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col class="p-0">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaSalida"
                    label="Salida"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details="auto"
                    color="blue"
                    dense
                    outlined
                    append-icon="fas fa-calendar-alt"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaSalida"
                  no-title
                  color="blue"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="3">
          <v-menu
            transition="slide-y-transition"
            offset-y
            bottom
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-container
                class="cantidad-container py-1"
                v-bind="attrs"
                v-on="on"
              >
                <p class="m-0" style="font-size: 14px; display: inline-block">
                  {{ items[0].cantidad + items[1].cantidad }}
                  {{
                    items[0].cantidad + items[1].cantidad > 1
                      ? "Huéspedes"
                      : "Huésped"
                  }}
                </p>
                <p class="m-0" style="font-size: 14px; display: inline-block">
                  {{ items[2].cantidad }}
                  {{ items[2].cantidad > 1 ? "Habitaciones" : "Habitación" }}
                </p>
              </v-container>
            </template>

            <v-list class="p-3">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="d-flex"
                style="height: 30px; margin: 0 0 5px 0"
              >
                <div style="min-width: 100px">{{ item.nombre }}</div>
                <div class="d-flex">
                  <v-btn
                    outlined
                    x-small
                    icon
                    :disabled="
                      items[index].cantidad < items[index].cantidadMinima
                    "
                    class="mx-2"
                    ><v-icon x-small @click="items[index].cantidad--"
                      >fas fa-minus</v-icon
                    ></v-btn
                  >
                  <v-text-field
                    v-model="items[index].cantidad"
                    class="txt_cantidad"
                    outlined
                    style="width: 35px"
                    readonly
                  ></v-text-field>
                  <v-btn outlined x-small icon class="mx-2"
                    ><v-icon x-small @click="items[index].cantidad++"
                      >fas fa-plus</v-icon
                    ></v-btn
                  >
                </div>
              </div>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="cont-row">
        <v-col lg="4" class="pt-0">
          <small>Precio por noche ₡{{ value }}</small>
          <v-slider v-model="value" min="40000" max="400000"></v-slider>
        </v-col>
        <v-col lg="2" class="pt-0 pl-1">
          <div
            style="
              border-right: 1px solid black;
              background-color: #ddd;
              height: 100%;
            "
          ></div>
        </v-col>
        <v-col lg="2" class="pt-0 pl-1">
          <div
            style="
              border-right: 1px solid black;
              background-color: #ddd;
              height: 100%;
            "
          ></div>
        </v-col>
        <v-col lg="2" class="pt-0 pl-1">
          <div
            style="
              border-right: 1px solid black;
              background-color: #ddd;
              height: 100%;
            "
          ></div>
        </v-col>
        <v-col lg="2" class="pt-0 pl-1">
          <div
            style="
              border-right: 1px solid black;
              background-color: #ddd;
              height: 100%;
            "
          ></div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import usuario from "../controllers/usuario";
export default {
  name: "",
  data() {
    return {
      fechaLlegada: "",
      fechaSalida: "",
      menu1: false,
      menu2: false,

      value: 0,

      valorFiltro: "",

      items: [
        {
          nombre: "Adultos",
          cantidad: 1,
          cantidadMinima: 2,
        },
        {
          nombre: "Niños",
          cantidad: 0,
          cantidadMinima: 1,
        },
        {
          nombre: "Habitaciones",
          cantidad: 1,
          cantidadMinima: 2,
        },
      ],
    };
  },
  methods: {
    retornarValor() {
      this.$emit("getValor", this.valorFiltro);
    },
  },
};
</script>

<style lang="postcss" scoped>
>>> div.filtro {
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

>>> div.inputFiltro label.v-label--active {
  top: 16px !important;
}

>>> div.v-input__slot {
  border-radius: 0 !important;
}

>>> .cantidad-container {
  border: 1px solid #a1a1a1;
}

>>> div.txt_cantidad div.v-input__control div.v-input__slot {
  max-height: 25px !important;
  min-height: 25px !important;
  padding: 0 8px !important;
}

>>> .cont-row {
  width: 65%;
  margin: 0 auto;
}

>>>.v-messages  {
  display: none;
}
</style>