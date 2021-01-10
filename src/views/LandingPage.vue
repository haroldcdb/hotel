<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr class="my-4" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
      <v-btn :to="{name: 'RegistrarCliente'}" large class="blue white--text" href="#" role="button"
        >Registrate</v-btn
      >
    </div>

    <v-row>
      <v-col
        v-for="card in cards"
        :key="card"
        col
        xs="12"
        sm="12"
        md="5"
        lg=""
        xl=""
      >
        <v-card :loading="loading" class="mx-10 my-5">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve"
              >Reserve</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="jumbotron">
      <h1 class="display-4 text-center">Hello, world!</h1>
      <p class="lead text-center">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr class="my-4" />
      <p class="text-center">
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>

      <div class="d-flex justify-content-center">
        <v-btn :to="{name: 'RegistrarHotelero'}" large color="blue white--text"> Registra tu hotel </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",

  components: {},

  data: () => ({
    loading: false,
    selection: 1,
    cards: 3,
  }),

  beforeMount() {
    this.$store.state.btn = true;
    this.$store.state.nav = true;
    this.$store.state.footer = false;
    this.$store.state.redireccion = "IniciarSesion";
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
