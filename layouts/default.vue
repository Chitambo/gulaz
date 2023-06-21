<template>
  <v-app dark>
    <v-navigation-drawer v-if="$store.state.token" v-model="drawer" :mini-variant.sync="mini" permanent
      mini-variant-width="70" width="250" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <!-- <v-img src="https://randomuser.me/api/portraits/men/83.jpg"></v-img> -->
          <v-img src='/prud.png'></v-img>
        </v-list-item-avatar>

        <!-- <v-list-item-title>John Banda</v-list-item-title> -->
        <!-- <v-list-item-title>hi  {{ $store.state.user.name }}</v-list-item-title> -->

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="1">
      <v-app-bar-nav-icon @click.native.stop="drawer = !drawer" light></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="text-xs-center pr-3 mt-2">
        <v-badge left="">
          <span slot="badge">6</span>
          <v-icon large color="grey lighten-1">mdi-bell-outline</v-icon>
        </v-badge>

        <v-badge color="red">
          <span slot="badge">!</span>
          <v-icon large color="grey">mdi-email-outline</v-icon>
        </v-badge>
      </div>

      <!-- <nuxt-link to="/"> <v-toolbar-title v-text="title" /></nuxt-link> -->
      <!-- <v-spacer /> -->
      <v-toolbar-title v-if="$store.state.token">
        <!-- <nuxt-link to="/" class="mx-4 text--white">Home</nuxt-link>
        <nuxt-link to="/details/create-details" class="mr-4 text--white"
          >Create</nuxt-link
        > -->
        <span class="mr-4">{{ $store.state.user.name }}</span>
        <!-- <v-btn color="error" @click="logout">Logout</v-btn> -->
        <v-btn icon color="pink" @click="logout">
          <v-icon>mdi-power-standby</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <nuxt-link to="/login" class="text--white">Login</nuxt-link>
        <!-- <nuxt-link to="/signup" class="mx-4 text--white">Signup</nuxt-link> -->
      </v-toolbar-title>
    </v-app-bar>

    <!-- <v-app-bar app elevation=1>
      <nuxt-link to="/"> <v-toolbar-title v-text="title" /></nuxt-link>
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
    </v-app-bar>  -->



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
      links: [
        { icon: "setup", text: "Setup", route: "/" },
        { icon: "users", text: "Users", route: "/" },
        { icon: "Oganization", text: "Users", route: "/" },
      ],
      drawer: true,
      dialog: false,
      dialogText: "",
      dialogTitle: "",
      isRootComponent: true,
      drawer: window.innerWidth > 960,
      fixed: false,
      items: [
        { title: "Home", icon: "mdi-home", link: "/" },
        {
          title: "Pensioners",
          icon: "mdi-account-group-outline",
          link: "/details/",
        },
        // { title: "Transactions", icon: "mdi-import", link: "/transactions/" },
        { title: "This Month", icon: "mdi-file-chart-outline", link: "/reports/" },
        // { title: "Users", icon: "mdi-account", link:"/users" },
        { title: "Settings", icon: "mdi-cog-outline", link: "/settings/" },
      ],
      mini: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      menuItem: "",

      title: "PPM",
    };
  },

  methods: {
    ...mapActions(["logoutUser"]),
    ...mapActions(["readUser"]),
    logout() {
      this.logoutUser();
    },
    async getParam() {
      const data = {
        id: '1'
      };

      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-parameters/get-all-param.php",
        data
      );
      if (res.data.status == 1) {
        // this.paymethods= res.data.message[0].paymethods;
        $CompanyName = res.data.message[0].C_NAME;
        $month = res.data.message[0].MON;
        $year = res.data.message[0].YEAR;

      }
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

.avatar {
  border-radius: 50%;
}
</style>
