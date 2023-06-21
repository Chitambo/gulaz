<template>
  <v-card v-if="$store.state.token">
    <v-card-title class="headline">
      {{ CompanyName }} </v-card-title
    ><v-card-text>
      <!-- {{ month }}-{{ year }}{{dateNm}} -->
    
    </v-card-text>

    <v-card-text width="500">
      <v-sheet color="rgba(0, 0, 0, .12)" max-width="300">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">Pensioner count</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <!-- <v-btn block text> Proccessing </v-btn> -->
    </v-card-actions>
    <v-row></v-row>





  <v-container fluid>
      <v-row dense>
        <v-col
          
          
    
        >
          <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Current Period
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ month }}- {{ year }}
        </v-list-item-title>
        <v-list-item-subtitle>You can close the current period here</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80" 
        color="pink"
        font-weight="900"
      >{{ month }}</v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        depressed
        color="primary"
        @click="calc(($month = 1))"
      >
        Close Period
      </v-btn>
    </v-card-actions>
  </v-card>
        </v-col>
        <v-col>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <!-- <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions> -->
  </v-card>
        </v-col>


        <v-col>
 <v-card
class="mx-auto"
    max-width="344"
    outlined>
    <v-card-text>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/"
            ><v-btn color="green darken-2" width="100%" align="center"
              >Home <v-icon> mdi-home </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>

        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/reports/"
            ><v-btn color="blue darken-2" width="100%"
              >This Month<v-icon> mdi-file-chart </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <!-- <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/details/"
            ><v-btn color="purple darken-2" width="100%"
              >Pensioners <v-icon> mdi-map </v-icon></v-btn
            ></nuxt-link
          >
        </v-col> -->
        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/settings/"
            ><v-btn color="teal darken-2" width="100%"
              >Settings<v-icon> mdi-bank </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>

        <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/details/"
            ><v-btn color="orange darken-2" width="100%"
              >Pensioners <v-icon> mdi-account-group </v-icon></v-btn
            ></nuxt-link
          >
        </v-col>

        <!-- <v-col cols="12" sm="8" md="6">
          <nuxt-link to="/details/"
            ><v-btn color="blue-grey darken-2" width="100%"
              >Transactions <v-icon> mdi-credit-card-outline </v-icon></v-btn
            ></nuxt-link
          >
        </v-col> -->
      </v-row>
    </v-card-text>
    </v-card>

        </v-col>



      </v-row>
    </v-container>


  </v-card>
  <v-card v-else>
    <v-card-title class="headline"> Please Login </v-card-title>
  </v-card>
  
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "IndexPage",
  data: () => {
    return {
      CompanyName: "",
      month: "",
      year: "",
      dateNm:"",
      value: [423, 446, 675, 510, 590, 610, 760],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  methods: {
    // ...mapActions(["readUser"]),
    ...mapActions(["calculate"]),
    ...mapActions(["monthend"]),
    

    


    async getParam() {
      const data = {
        id: "1",
      };

      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-parameters/get-all-param.php",
        data
      );
      // alert(res.data.message[0].C_NAME);
      if (res.data.status == 1) {
        // this.paymethods= res.data.message[0].paymethods;
        this.CompanyName = res.data.message[0].C_NAME;
        this.month = res.data.message[0].MON;
        this.year = res.data.message[0].YEAR;
      }
      // d = new Date();
      // dateNm = monthNames[d.getMonth()];
      // alert(dateNm);
    },

     calc(month) {
      const data = {
        month: month,
      };
      this.monthend(data);
      this.getParam()
    },
    
  },
  mounted() {
    // this.readUser();
    this.getParam();
  },
};
</script>
