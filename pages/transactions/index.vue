

<template >
  <div>
    <v-container>
              
      <v-card>
        <v-card-title>
          <span class="title">Payments this month </span>

          <v-spacer></v-spacer>
          <div>
            <v-btn elevation="4" class="blue-grey mr-2" fab small dark>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn
              elevation="4"
              class="brown lighten-1 mr-2"
              fab
              small
              dark
              @click="getAllTrans()"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn elevation="4" class="teal darken-2 mr-2" fab small dark>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
            <!-- <v-btn
              elevation="4"
              class="deep-orange darken-3"
              fab
              small
              dark
              nuxt-link
              to="/details/create-details"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn> -->
          </div>
        </v-card-title>

        <v-btn depressed color="primary" @click="calc(month='1')"> Calculate </v-btn>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
    </v-container>
    <v-container>
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">NRC NO</th>
              <th class="text-left">Man No</th>
              <th class="text-left">Names</th>
              <th class="text-left">Bank AC</th>
              <th class="text-left">Pay Freq</th>
              <th class="text-left">Pension Amt</th>
              <th class="text-left">Amount</th>
              <th class="text-left">pay Date</th>
            </tr>
          </thead>
          <tbody v-if="$store.state.districts.length > 0">
            <tr v-for="district in $store.state.districts" :key="district.id">
              <td>{{ district.id }}</td>
              <td>{{ district.NRCNO }}</td>
              <td>{{ district.STAFF_NO }}</td>
              <td>{{ district.NAME }}</td>
              <td>{{ district.BANK_A_NO }}</td>
              <td>{{ district.PAY_FREQ }}</td>
              <td>{{ district.PEN_AMT }}</td>
              <td>{{ district.MON_PAY }}</td>
              <td>{{ district.NEXTDATE }}</td>

              <!-- <td>
                <nuxt-link
                  :to="{
                    name: 'district-districtid',
                    path: 'district/:id',
                    params: { districtid: district.id },
                  }"
                  ><v-btn class="secondary">Edit</v-btn></nuxt-link
                >
              </td>
              <td>
                <v-btn @click="deleteDistrict(district.id)" class="error"
                  >Delete</v-btn
                >
              </td> -->
            </tr>
          </tbody>
          <tbody v-else>
            <h3>Record Not Found</h3>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  middleware: ["auth"],

  methods: {
    ...mapActions(["getAllTrans"]),
    ...mapActions(["deleteDistrict"]),
    ...mapActions(["calculate"]),
    deleteDistrict(id) {
      const data = {
        id: id,
      };
      this.deleteDistrict(data);
      this.getAllTrans();
    },

    calc(month) {
      const data = {
        id: month,
      };
      this.calculate(data);
      this.getAllTrans();
    },
  },
  mounted() {
    this.getAllTrans();
  },
};
</script>
<style >
</style>