<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-title>
                <!-- <h1 class="my-4 text-center">{{ formTitle }}</h1> -->
                <form action="" id="w-100" @submit.prevent="create">
                  <v-card flat>
                    <v-card-text>
                      <div class="row">
                        <div class="col-md-12 pr-md-1">
                          <v-textField
                            label="Name"
                            v-model="name"
                            type="text"
                            counter
                            maxlength="10"
                            required
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-12 px-md-1">
                          <v-textField
                            label="Email"
                            v-model="email"
                            type="email"
                            required
                            maxlength="30"
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-12 pl-md-1">
                          <v-textField
                            label="Password"
                            v-model="password"
                            type="password"
                            maxlength="11"
                            required
                          >
                          </v-textField>
                        </div>
                        <div class="col-md-12 pl-md-1">
                        <v-select
                            v-model="selectl"
                            :hint="'type of user'"
                            :items="accessLevel"
                            item-text="Type"
                            item-value="accessLevel"
                            label="User type"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
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
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small color="orange" class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-row>
      <v-col>
        <download-excel
          class="v-btn"
          style="cursor: pointer; color: green"
          :data="users"
          worksheet="My Worksheet"
          name="PPMUsers.xls"
        >
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
  //middleware: "guest",
  components: {
    JsonExcel,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "email", value: "email" },
    ],
    accessLevel: ["User", "Admin"],
    users: [],

    editedIndex: -1,

    name: "",
    email: "",
    password: "",

    editedItem: {
      name: "",
      email: "",
      password: "",
    },
    defaultItem: {
      name: "",
      email: "",
      password: "",
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
    ...mapActions(["getAllUser"]),
    ...mapActions(["createUser"]),
    ...mapActions(["updateDetails"]),

    initialize() {
      //  this.details = [
      //  ]
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
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        // this.createDetail(data);
        alert("one");
        this.createUser(data);
      } else {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.createUser(data);
      }
      this.loadTable();
      this.close();
    },

    async loadTable() {
      const res = await this.$axios.get(
        "http://localhost/ppm/ppm-server/users/get-all-users.php"
      );
      if (res.data.status == 1) {
        this.users = res.data.message;
        console.log(res.data.message);
      }
    },
  },

  mounted() {
    this.loadTable();
  },
};
</script>