<template>
  <v-card class="mx-auto ma-12" max-width="500" outlined>
    <!--<v-row justify="space-around">
   <nuxt-link to="/banks/"> <v-icon
      large
      color="green darken-2"
      
    >
      mdi-domain
    </v-icon></nuxt-link>

    <v-icon
      large
      color="blue darken-2"
    >
      mdi-message-text
    </v-icon>

    <v-icon
      large
      color="purple darken-2"
    >
      mdi-dialpad
    </v-icon>

    <v-icon
      large
      color="teal darken-2"
    >
      mdi-email
    </v-icon>

    <v-icon
      large
      color="blue-grey darken-2"
    >
      mdi-call-split
    </v-icon>

    <v-icon
      large
      color="orange darken-2"
    >
      mdi-arrow-up-bold-box-outline
    </v-icon>
  </v-row> -->
    <v-card-text class="mt-12">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/district/"
            ><v-btn color="purple darken-2" width="100%"
              >Districts <v-icon> mdi-map </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/banks/"
            ><v-btn color="teal darken-2" width="100%"
              >Banks<v-icon> mdi-bank </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>

        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/parameters/"
            ><v-btn color="orange darken-2" width="100%"
              >Parameters <v-icon> mdi-application-cog-outline </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/scheme/"
            ><v-btn color="orange darken-2" width="100%"
              >Scheme <v-icon> mdi-application-cog-outline </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>

        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/users/">
            <div v-if="isAuthorized">
              <v-btn color="blue-grey darken-2" width="100%"
                >Register User <v-icon> mdi-credit-card-outline </v-icon></v-btn
              >
            </div>
            <div v-else>
              <div>You don't have permission to create users!</div>
            </div></nuxt-link
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, Store } from "vuex";
import Vue from "vue";
export default {
  data() {
    return {
      isAuthorized: false,
    };
  },
  methods: {
    ...mapActions(["readUser"]),
    ...mapActions(["calculate"]),
    ...mapActions(["monthend"]),
  },
  // async created() {
  //   if (
  //     //if user is admin or super admin
  //     user.role === "super_admin" ||
  //     user.role === "admin" ||
  //     //if have necessary permission
  //     user.role.permissions.some((p) => p.key === "create-contact")
  //   ) {
  //     this.isAuthorized = true;
  //   }
  // },
  mounted() {
    this.readUser();
  },
};
</script>
