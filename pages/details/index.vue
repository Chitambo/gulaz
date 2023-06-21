<template>
  <v-container>
    <v-data-table :headers="headers" :items="details" item-key="id" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pensioners Details</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-title>
                <h1 class="my-4 text-center">{{ formTitle }}</h1>
                <form action="" id="w-100" @submit.prevent="create">
                  <v-card flat>
                    <v-card-text>
                      <div class="row">
                        <div class="col-md-3 pr-md-1">
                          <v-textField label="*Staff Number" v-model="staffno" counter maxlength="7" required>
                          </v-textField>
                        </div>
                        <div class="col-md-6 px-md-1">
                          <v-textField label="*Names" v-model="name" required maxlength="30">
                          </v-textField>
                        </div>
                        <div class="col-md-3 pl-md-1">
                          <v-textField label="*Enter NRC Number" v-model="nrcno" maxlength="11" @input="formatInput"
                            placeholder="e.g. 533420/12/1" required>
                          </v-textField>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-4 pr-md-1">
                          <v-textField label="Address 1" v-model="addr1" counter maxlength="20">
                          </v-textField>
                        </div>
                        <div class="col-md-4 px-md-1">
                          <v-textField label="Address 2" v-model="addr2" counter maxlength="20">
                          </v-textField>
                        </div>
                        <div class="col-md-4 pl-md-1">
                          <v-textField label="Address 3" v-model="addr3" counter maxlength="20">
                          </v-textField>
                        </div>
                      </div>


                      <div class="row">
                        <div class="col-md-4 pl-md-1">
                          <v-autocomplete ref="pay_stat" v-model="pay_stat" :items="paymethods" @Change="updatePayStat"
                            label="Payment Methods" placeholder="Select..."></v-autocomplete>
                        </div>


                        <div class="col-md-4 pr-md-1" v-show="pay_stat === 'Bank'">
                          <v-textField label="Bank Code" v-model="bankcode" maxlength="13">
                          </v-textField>
                        </div>
                        <div class="col-md-4 px-md-1" v-show="pay_stat === 'Bank'">
                          <v-textField label="Bank Account Number" v-model="bank_a_no" maxlength="13">
                          </v-textField>
                        </div>

                        <div class="col-md-4 pl-md-1">
                          <v-textField label="Phone number" v-model="phoneno" maxlength="13" placeholder="eg. 0977123123">
                          </v-textField>
                        </div>


                      </div>

                      <div class="row">
                        <div class="col-md-4 px-md-1">
                          <v-select
                          v-model="select"
                          :hint="`${select.DISTRICT}, ${select.NAME}`"
                          :items="paypoint"
                          item-text="NAME"
                          item-value="paypoint.DISTRICT"
                          label="Paypoint"
                          persistent-hint
                          return-object
                          single-line>
                        </v-select>
                        <!-- <v-select
          v-model="pay_point"
          :hint="`${select.DISTRICT}, ${select.NAME}`"
          :items="paypoint"
          item-text="name"
          item-value="district"
          label="Pay point"
          persistent-hint
          return-object
          single-line
        ></v-select> -->
                        </div>
                        <div class="col-md-4 pl-md-1">
                          <v-textField label="Town Name" v-model="status2" type="text"></v-textField>
                        </div>
                        <div class="col-md-2 pr-md-1">
                          <v-textField label="Guarantee Period" v-model="g_period" type="number" required>
                          </v-textField>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-2 px-md-1">
                          <v-textField label="Spouse Pension" v-model="s_pension" suffix="%" type="text"
                            value="0"></v-textField>
                        </div>
                        <div class="col-md-2 pl-md-1">
                          <v-textField label="Pension Amount" v-model="pen_amt" type="text" value="0" required
                            hint="*required"></v-textField>
                        </div>
                        <div class="col-md-2 pl-md-1">
                          <v-textField label="Payment Frequency" v-model="pay_freq" value="1" type="number"
                            required></v-textField>
                        </div>
                        <div class="col-md-3 pl-md-1">
                          <v-textField label="Commencment Date" v-model="st_date" type="date" required></v-textField>
                        </div>

                        <div class="col-md-3 pl-md-1">
                          <v-textField label="Next Payment Date" v-model="nextdate" type="date" required></v-textField>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3 pr-md-1">
                          <v-textField label="Spouse Name" v-model="s_name">
                          </v-textField>
                        </div>
                        <div class="col-md-6 px-md-1">
                          <v-textField label="Spouse NRC Number" v-model="s_nrcno" type="text"></v-textField>
                        </div>
                        <div class="col-md-2 pl-md-1">
                          <v-textField label="Scheme" v-model="scheme" type="text"></v-textField>
                        </div>
                        <div class="col-md-1 px-md-1">
                          <v-textField label="id" v-model="id" type="text" disabled></v-textField>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save(id)">
                    Save
                  </v-btn>

                  <!-- <v-btn color="primary" type="submit">Save</v-btn> -->
                  <!-- <v-btn color="primary" class="mr-4" type="submit">
                  submit
                </v-btn>
                <v-btn @click="clear"> clear </v-btn> -->
                </form>
              </v-card-title>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="orange" class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <!-- <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-row>
      <v-col>
        <download-excel class="v-btn" style="cursor: pointer; color: green" :data="details" worksheet="My Worksheet"
          name="PPMPay.xls">
          Download to Excel
        </download-excel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, Store } from "vuex";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
export default {
  components: {
    JsonExcel,
  },
  data: () => ({
    select: { DISTRICT: "", NAME: "" },
    paypoint: [],
    paymethods: ["Cheque", "Cash", "Bank"],
    paymethodsx: [{ id: 1, name: "Cheque" }, { id: 2, name: "Cash" }, { id: 3, name: "Bank" }],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Staff No",
        align: "start",
        sortable: false,
        value: "STAFF_NO",
      },
      { text: "Name", value: "NAME" },
      { text: "NRC NO", value: "NRCNO" },
      { text: "Date", value: "NEXTDATE" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    details: [],

    editedIndex: -1,
    // id:"",
    nrcno: "",
    staffno: "",
    name: "",
    addr1: "",
    addr2: "",
    addr3: "",
    bankcode: "",
    bank_a_no: "",
    phoneno: "",
    // pay_point: "",
    pay_freq: "1",
    g_period: "0",
    s_pension: "",
    s_name: "",
    s_nrcno: "",
    // dod: "",
    // s_dod: "",
    scode: "",
    pay_stat: " ",
    st_date: "",
    nextdate: "",
    endg_date: "",
    pen_amt: "0.00",
    amt_todate: "0.00",
    //mon_pay: "",
    status1: "",
    status2: "",
    status3: "",
    status4: "",
    district: "",
    PriCurr: "ZMW",
    pstate: "N",
    scheme:"",

    editedItem: {
      nrcno: "",
      staffno: "",
      name: "",
      addr1: "",
      addr2: "",
      addr3: "",
      bankcode: "",
      bank_a_no: "",
      pay_freq: "1",
      g_period: "0",
      s_pension: "",
      s_name: "",
      s_nrcno: "",
      // dod: "",
      // s_dod: "",
      scode: "",
      pay_stat: "",
      st_date: "",
      nextdate: "",
      endg_date: "",
      pen_amt: "0.00",
      amt_todate: "0.00",
      //mon_pay: "",
      status1: "",
      status2: "",
      status3: "",
      status4: "",
      district: "",
      PriCurr: "ZMW",
      pstate: "N",
      scheme:"",
    },
    defaultItem: {
      nrcno: "",
      staffno: "",
      name: "",
      addr1: "",
      addr2: "",
      addr3: "",
      bankcode: "",
      bank_a_no: "",
      pay_freq: "1",
      g_period: "0",
      s_pension: "",
      s_name: "",
      s_nrcno: "",
      // dod: "",
      // s_dod: "",
      scode: "",
      pay_stat: "",
      st_date: "",
      nextdate: "",
      endg_date: "",
      pen_amt: "0.00",
      amt_todate: "0.00",
      //mon_pay: "",
      status1: "",
      status2: "",
      status3: "",
      status4: "",
      district: "",
      PriCurr: "ZMW",
      pstate: "N",
      scheme:""
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },


    parsedDate: {
      get() {
        return this.nrcno.replace(/\//g, '');
      },
      set(newValue) {
        const date = newValue.match(/(\d{6})(\d{2})(\d{1})/);
        if (date) {
          this.nrcno = `${date[1]}/${date[2]}/${date[3]}`;
        } else {
          this.nrcno = newValue;
        }
      }
    }

  },



  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(["getAllDetails"]),
    ...mapActions(["createDetail"]),
    ...mapActions(["updateDetails"]),

    initialize() {
      //  this.details = [
      //  ]
    },

    formatInput() {
      this.parsedDate = this.nrcno;
    },

    updatePayStat() {
      if (this.selectedPayment == 'Cheque') {
        this.pay_stat = '1';
      }
      if (this.selectedPayment == 'Bank') {
        this.pay_stat = '2';
      }
      if (this.selectedPayment == 'Cash') {
        this.pay_stat = '3';
      }
    },

    async editItem(id) {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const data = {
        id: id,
      };

      //  alert(id);
      const res = await this.$axios.post(
        "http://localhost/ppm/ppm-server/crud-details.php/get-single-detail.php",
        data,
        config
      );
      if (res.data.status == 1) {
        // this.paymethods= res.data.message[0].paymethods;
        this.id = res.data.message[0].id;
        this.nrcno = res.data.message[0].NRCNO;
        this.staffno = res.data.message[0].STAFF_NO;
        this.name = res.data.message[0].NAME;
        this.addr1 = res.data.message[0].ADDR1;
        this.addr2 = res.data.message[0].ADDR2;
        this.addr3 = res.data.message[0].ADDR3;
        // if (res.data.message[0].PAY_STAT == 1) {
        //   this.pay_stat="Cheque";
        // }
        // if (res.data.message[0].PAY_STAT == 2) {
        //   this.pay_stat="Bank";
        // }
        // if (res.data.message[0].PAY_STAT == 3) {
        //   this.pay_stat="Cash";
        // }

        this.pay_stat = res.data.message[0].PAY_STAT;
        this.bankcode = res.data.message[0].BANKCODE;
        this.bank_a_no = res.data.message[0].BANK_A_NO;
        this.phoneno = res.data.message[0].PHONENO;
        this.pay_freq = res.data.message[0].PAY_FREQ;
        this.g_period = res.data.message[0].G_PERIOD;
        this.s_pension = res.data.message[0].S_PENSION;
        this.s_name = res.data.message[0].S_NAME;
        this.s_nrcno = res.data.message[0].S_NRCNO;
        this.select.value = res.data.message[0].DISTRICT;
        this.scode = res.data.message[0].SCODE;

        this.st_date = res.data.message[0].ST_DATE;
        this.nextdate = res.data.message[0].NEXTDATE;
        this.endg_date = res.data.message[0].ENDG_DATE;
        this.pen_amt = res.data.message[0].PEN_AMT;
        this.amt_todate = res.data.message[0].AMT_TODATE;
        this.status1 = res.data.message[0].STATUS1;
        this.status2 = res.data.message[0].STATUS1;
        this.status3 = res.data.message[0].STATUS1;
        this.status4 = res.data.message[0].STATUS1;
        this.district = res.data.message[0].district;
        // this.select = res.data.message[0].district;
        this.scheme = res.data.message[0].SCODE;

      } else {
        alert("bad Call");
      }

      this.editedIndex = this.id;
      // this.editedItem = Object.assign({}, this.details)
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, id);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(id) {
      if (this.editedIndex > -1) {
          if (!this.nrcno || !this.staffno || !this.name || !this.nextdate) {
          alert("Please fill all required fields *");
        } else {
          const data = {
            id: id,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10),
            nrcno: this.nrcno,
            staffno: this.staffno,
            name: this.name,
            addr1: this.addr1,
            addr2: this.addr2,
            addr3: this.addr3,
            pay_stat: this.pay_stat,
            bankcode: this.bankcode,
            bank_a_no: this.bank_a_no,
            phoneno: this.phoneno,
            pay_stat: this.pay_stat,
            pay_freq: this.pay_freq,
            g_period: this.g_period,
            s_pension: this.s_pension,
            s_name: this.s_name,
            s_nrcno: this.s_nrcno,
            //  dod : this.dod,
            //  s_dod : this.s_dod,
            scode: this.scode,

            st_date: this.st_date,
            nextdate: this.nextdate,
            endg_date: this.endg_date,
            pen_amt: this.pen_amt,
            amt_todate: this.amt_todate,
            //mon_pay: this.mon_pay,
            status1: this.status1,
            status2: this.status2,
            status3: this.status3,
            status4: this.status4,
            // district: this.district,
            scheme: this.scheme,
            // district: this.select.value,
          };
          // this.createDetail(data);
          this.updateDetails(data);
        }
      } else {
        if (!this.nrcno || !this.staffno || !this.name || !this.nextdate) {
          alert("Please fill all required fields **");
        } else {
          // alert(this.pay_stat.id);
          const data = {
            // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            // .toISOString()
            // .substr(0, 10),
            nrcno: this.nrcno,
            staffno: this.staffno,
            name: this.name,
            addr1: this.addr1,
            addr2: this.addr2,
            addr3: this.addr3,
            pay_stat: this.pay_stat,
            bankcode: this.bankcode,
            bank_a_no: this.bank_a_no,
            phoneno: this.phoneno,
            pay_freq: this.pay_freq,
            g_period: this.g_period,
            s_pension: this.s_pension,
            s_name: this.s_name,
            s_nrcno: this.s_nrcno,
            //  dod : this.dod,
            //  s_dod : this.s_dod,
            scode: this.scode,
            pay_stat: this.pay_stat,
            st_date: this.st_date,
            nextdate: this.nextdate,
            endg_date: this.endg_date,
            pen_amt: this.pen_amt,
            amt_todate: this.amt_todate,
            //mon_pay: this.mon_pay,
            status1: this.status1,
            status2: this.status2,
            status3: this.status3,
            status4: this.status4,
            district: this.district,
            pstate: this.pstate,
            scheme: this.scheme,
          };
          this.createDetail(data);
        }
      }
      this.loadTable();
      this.close();
    },

    async getPaypoints() {
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-districts/get-all-districts.php"
      );
      if (res.data.status == 1) {
        this.paypoint = res.data.message;
        console.log(res.data.message);
      }
    },

    async loadTable() {
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-details.php/get-all-detatils.php"
      );
      if (res.data.status == 1) {
        this.details = res.data.message;
        console.log(res.data.message);
      }
    },
  },

  mounted() {
    this.getAllDetails();
    this.loadTable();
    this.getPaypoints();
  },
};
</script>
