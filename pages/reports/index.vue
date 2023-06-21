<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn depressed color="primary" @click="calc((month = '1'))">
          Calculate
        </v-btn>
        <!-- <h5>Payments</h5> -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
      </v-data-table>
    </v-card>

    <v-row>
      <v-col>
        <!-- <v-btn color="success" class="white--text" @click="generatePDF"
          >Generate PDF</v-btn
        > -->

        <v-btn class="mx-2" fab dark small color="indigo" @click="generatePDF">
          <v-icon dark>mdi-file-pdf-box </v-icon>
        </v-btn>


      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <ul>
          <li v-for="item in items">{{ item.title }} - {{ item.body }}</li>
        </ul>
      </v-col>
    </v-row> -->

    <!-- <v-card>
      <v-list flat>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card> -->
  </v-container>
</template>
<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import VueJsonToCsv from "vue-json-to-csv";
import { mapActions } from "vuex";

import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
// import JsonExcel from "@/components/JsonExcel";

export default {
  components: {
    JsonExcel,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },

        { text: "NRC NO", value: "NRCNO" },
        { text: "Man No", value: "STAFF_NO" },
        { text: "Names", value: "NAME" },
        { text: "Bank AC", value: "BANK_A_NO" },
        { text: "Pension Amt", value: "PEN_AMT" },
        { text: "Amount", value: "MON_PAY" },
        { text: "pay Date", value: "NEXTDATE" },
        { text: "Pay Freq", value: "PAY_FREQ" },
      ],

      selectedItem: 1,
      items: [],
    };
  },
  methods: {
    ...mapActions(["calculate"]),

    calc(month) {
      const data = {
        id: month,
      };
      this.calculate(data);
    },

    async generatePDF() {
      // this.getParam();

      // const res = await this.$axios.get(
      //   "http://localhost/ppm/ppm-server/crud-trans/get-all-trans.php"
      // );
      // if (res.data.status == 1) {
      //   alert("green");
      //   this.items = res.data.message;
      //   console.log(res.data.message);
      // }

      // alert(this.items);
      const columns = [
        { title: "ID", dataKey: "id" },
        { title: "NRC NO", dataKey: "NRCNO" },
        { title: "Man No", dataKey: "STAFF_NO" },
        { title: "Names", dataKey: "NAME" },
        { title: "Bank AC", dataKey: "BANK_A_NO" },
        { title: "Pension Amt", dataKey: "PEN_AMT" },
        { title: "Amount", dataKey: "MON_PAY" },
        { title: "pay Date", dataKey: "NEXTDATE" },
        { title: "Pay Freq", dataKey: "PAY_FREQ" },
      ];

      var pdf = new jsPDF("l", "in", "A4");
      pdf.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.5, top: 1.25 },
      });
      // Using array of sentences
      pdf;
      // pdf
      //   .setTextColor(0, 0, 255)
      //   .text(
      //     "This is a simple footer located .5 inches from page bottom",
      //     0.5,
      //     pdf.internal.pageSize.height - 0.5
      //   );
      pdf.save("list.pdf");
    },
    async fetchData() {
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-trans/get-all-trans.php"
      );
      if (res.data.status == 1) {
        // alert("green");
        this.items = res.data.message;
        console.log(res.data.message);
      }
    },

    startDownload() {
      alert("show loading");
    },

    finishDownload() {
      alert("hide loading");
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

