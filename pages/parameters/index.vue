<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <h1 class="my-4 text-center">|System Parameters</h1>
          <form action="" id="w-100" @submit.prevent="updateP">
            <v-row justify="center" align="center">
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Company Name"
                  v-model="CompanyName"
                  type="text"
                ></v-textField>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Address1"
                  type="text"
                  v-model="addr1"
                ></v-textField>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Address2"
                  type="text"
                  v-model="addr2"
                ></v-textField>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Address3"
                  type="text"
                  v-model="addr3"
                ></v-textField>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Email"
                  type="email"
                  v-model="email"
                ></v-textField>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Phone Number"
                  type="text"
                  v-model="PhoneNumber"
                ></v-textField>
              </v-col>
              <!-- <v-col cols="11" sm="5">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Current Period"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col> -->
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Year"
                  type="text"
                  v-model="year"
                ></v-textField
              ></v-col>
              <v-col cols="12" sm="8" md="6">
                <v-textField
                  label="Month"
                  type="text"
                  v-model="MON"
                ></v-textField
              ></v-col>
            </v-row>

            <v-btn color="primary" type="submit">Save</v-btn>
          </form>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  middleware: ["auth"],
  data() {
    return {
      CompanyName: "",
      addr1: "",
      addr2: "",
      addr3: "",
      email: "",
      PhoneNumber: "",
      MON: "",
      year: "",
      menu: false,
      modal: false,
    };
  },
  methods: {
    ...mapActions(["createParameters"]),
    ...mapActions(["updatePara"]),

     updateP() {
if (!this.CompanyName || !this.MON || !this.year) {
        alert("Please fill mandatory Fields");
      } else {
        const data = {
          id: 1,
          C_NAME: this.CompanyName,
          ADDR1: this.addr1,
         ADDR2: this.addr2,
          ADDR3: this.addr3,
          PHONE: this.PhoneNumber,
          EMAIL: this.email,
          MON: this.MON,
          YEAR: this.year,
        };
        this
        this.updatePara(data);
      }
    },

    async getParam() {
      const data = {
        id: "1",
        // id: this.$route.params.detailsid
      };
      // alert(data.id);
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-parameters/get-all-param.php",
        // "http://localhost/ppm/ppm-server/crud-details.php/get-details-id.php",
        data
      );
      if (res.data.status == 1) {
        // this.paymethods= res.data.message[0].paymethods;
        this.CompanyName = res.data.message[0].C_NAME;
        this.addr1 = res.data.message[0].ADDR1;
        this.addr2 = res.data.message[0].ADDR2;
        this.addr3 = res.data.message[0].ADDR3;
        this.email = res.data.message[0].EMAIL;
        this.PhoneNumber = res.data.message[0].PHONE;
        this.MON = res.data.message[0].MON;
        this.year = res.data.message[0].YEAR;
      } 
    },
    create() {
      if (!this.CompanyName || !this.MON || !this.year) {
        alert("Please fill mandatory Fields");
      } else {
        const data = {
          CompanyName: this.CompanyName,
          addr1: this.addr1,
          addr2: this.addr2,
          addr3: this.addr3,
          PhoneNumber: this.PhoneNumber,
          email: this.email,
          month: this.month,
          year: this.year,
        };
        this.createParameters(data);
      }
    },
  },
  mounted() {
    this.getParam();
  },
};
</script>
<style>
#w-100 {
  width: 100%;
}
.text-center {
  text-align: center !important;
}
</style>