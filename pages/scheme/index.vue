<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="schemes"
      item-key="id"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Schemes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <!-- <v-alert type="warning">
        I'm a warning alert.
      </v-alert> -->
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-title>
                <form action="" id="w-100" @submit.prevent="create">
                  <v-card flat>
                    <v-card-text>
                      <div class="row">
                        <div class="col-md-3 pr-md-1">
                          <v-textField
                            label="*Scheme Code"
                            v-model="scode"
                            counter
                            maxlength="7"
                            required
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-6 px-md-1">
                          <v-textField
                            label="*Name"
                            v-model="name"
                            required
                            maxlength="30"
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-3 pl-md-1">
                          <v-textField
                            label="*Address 1"
                            v-model="addr1"
                            maxlength="11"
                            required
                          >
                          </v-textField>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-4 pr-md-1">
                          <v-textField
                            label="Address 2"
                            v-model="addr2"
                            counter
                            maxlength="20"
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-4 px-md-1">
                          <v-textField
                            label="Address 3"
                            v-model="addr3"
                            counter
                            maxlength="20"
                          >
                          </v-textField>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-1 px-md-1">
                          <v-textField
                            label="id"
                            v-model="id"
                            type="text"
                            disabled
                          ></v-textField>
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
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >OK</v-btn
                >
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
        <v-icon small color="red" @click="deleteItem(item.id)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <!-- <v-row>
        <v-col>
          <download-excel
            class="v-btn"
            style="cursor: pointer; color: green"
            :data="banks"
            worksheet="My Worksheet"
            name="PPMPay.xls"
          >
            Download to Excel
          </download-excel>
        </v-col>
      </v-row> -->
  </v-container>
</template>

<script>
import { mapActions, Store } from "vuex";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
var idx = "";
export default {
  components: {
    JsonExcel,
  },

  data: () => ({
    alert: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "SCode",
        align: "start",
        sortable: false,
        value: "SCODE",
      },
      // { text: "SCode", value: "SCODE" },
      { text: "Name", value: "NAME" },
      { text: "Address 1", value: "ADDR1" },
      { text: "Address 2", value: "ADDR2" },
      { text: "Address 3", value: "ADDR3" },
      // { text: "id", value: "id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    schemes: [],
    editedIndex: -1,
    id: "",
    scode: "",
    name: "",
    addr1: "",
    addr2: "",
    addr3: "",

    editedItem: {
      id: "",
      scode: "",
      name: "",
      addr1: "",
      addr2: "",
      addr3: "",
    },
    defaultItem: {
      id: "",
      scode: "",
      name: "",
      addr1: "",
      addr2: "",
      addr3: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
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
    ...mapActions(["getAllSchemes"]),
    ...mapActions(["createScheme"]),
    ...mapActions(["updateScheme"]),
    ...mapActions(["deleteScheme"]),

    hide_alert: function (event) {
      console.log("Hide");
      // `event` is the native DOM event
      window.setInterval(() => {
        this.alert = false;
        console.log("hide alert after 3 seconds");
      }, 3000);
    },

    initialize() {
      //  this.banks = [
      //  {
      //       bankcode: '',
      //       banknAME: '',
      //       addr1: '',
      //       addr2: '',
      //       addr3: '',
      //     }
      //  ]
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
        "http://localhost/ppm/ppm-server/crud-schemes/get-single-scheme.php",
        data,
        config
      );
      if (res.data.status == 1) {
        // this.paymethods= res.data.message[0].paymethods;
        this.id = res.data.message[0].id;
        this.scode = res.data.message[0].SCODE;
        this.name = res.data.message[0].NAME;
        this.addr1 = res.data.message[0].ADDR1;
        this.addr2 = res.data.message[0].ADDR2;
        this.addr3 = res.data.message[0].ADDR3;
      } else {
        alert("bad Call");
      }

      this.editedIndex = this.id;
      // this.editedItem = Object.assign({}, this.banks)
      this.dialog = true;
    },

    deleteItem(id) {
      idx = id;
      this.editedIndex = this.schemes.indexOf(id);
      this.editedItem = Object.assign({}, id);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const data = {
        id: idx,
        //id: this.editedIndex,
      };
      alert(data.id);

      this.deleteScheme(data);

      // this.desserts.splice(this.editedIndex, 1);
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
        if (!this.scode) {
          <v-alert type="warning">I'm a warning alert.</v-alert>;
          alert("Please fill all required fields*");
        } else {
          alert(id);
          const data = {
            id: id,
            scode: this.scode,
            name: this.name,
            addr1: this.addr1,
            addr2: this.addr2,
            addr3: this.addr3,
          };
          this.updateScheme(data);
        }
      } else {
        if (!this.scode || !this.name) {
          alert("Please fill all required fields *");
        } else {
          const data = {
            scode: this.scode,
            name: this.name,
            addr1: this.addr1,
            addr2: this.addr2,
            addr3: this.addr3,
          };
          this.createScheme(data);
          this.loadTable();
        }
      }
      this.loadTable();
      this.close();
    },

    async loadTable() {
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/crud-schemes/get-all-schemes.php"
      );
      if (res.data.status == 1) {
        this.schemes = res.data.message;
        console.log(res.data.message);
      }
    },
  },

  mounted() {
    if (alert) {
      this.hide_alert();
    }
    this.getAllSchemes();
    this.loadTable();
  },
};
</script>
