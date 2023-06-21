<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/"> <v-toolbar-title v-text="title" /></nuxt-link>

   <!-- <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(link, index) in links"
          :key="index"
          @click="links.route"
        >
          <v-list-tile-title>{{ links.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu> -->
      <v-spacer />
      <v-toolbar-title v-if="$store.state.token">
        <nuxt-link to="/" class="mx-4 text--white">Home</nuxt-link>
        <nuxt-link to="/details/create-details" class="mr-4 text--white"
          >Create</nuxt-link
        >
        <span class="mr-4">{{ $store.state.user.name }}</span>
        <v-btn color="error" @click="logout">Logout</v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <nuxt-link to="/login" class="text--white">Login</nuxt-link>
        <nuxt-link to="/signup" class="mx-4 text--white">Signup</nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      links:[
        {icon: 'setup',text: 'Setup', route: '/'},
        {icon: 'users',text: 'Users', route: '/'},
        {icon: 'Oganization',text: 'Users', route: '/'},
      ],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "PPM",
    };
  },

  methods: {
    ...mapActions(["logoutUser"]),
    ...mapActions(["readUser"]),
    logout() {
      this.logoutUser();
    },
  },
  mounted() {
    this.readUser();
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
.text--white {
  color: white !important;
}
</style>