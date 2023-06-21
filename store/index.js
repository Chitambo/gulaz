export const state = () => ({
  token: localStorage.getItem("token") || "",
  user: {},
  products: [],
  districts: [],
  details: [],
  banks: [],
  trans: [],
  schemes: [],
});

export const getters = {
  user: (state) => {
    return state.user;
  },
  token: (state) => {
    return state.token;
  },
  products: (state) => {
    return state.products;
  },
  districts: (state) => {
    return state.districts;
  },
  details: (state) => {
    return state.details;
  },
  banks: (state) => {
    return state.banks;
  },
  trans: (state) => {
    return state.trans;
  },
  schemes: (state) => {
    return state.scheme;
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setDistricts(state, districts) {
    state.districts = districts;
  },
  setDetails(state, details) {
    state.details = details;
  },
  setBanks(state, banks) {
    state.banks = banks;
  },
  setTrans(state, trans) {
    state.trans = trans;
  },
  setSchemes(state, schemes) {
    state.schemes = schemes;
  },
};

export const actions = {
  async createUser(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/auth-file/create-user.php",
      data
    );

    if (res.data.status == 1) {
      alert(res.data.message);
      data.name = "";
      data.email = "";
      data.password = "";
      this.$router.push("/login");
    } else {
      alert(res.data.message);
    }
  },

  async loginUser({ commit }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/auth-file/login-user.php",
      data
    );
    if (res.data.status == 1) {
      data.email = "";
      data.password = "";
      localStorage.setItem("token", res.data.jwt);
      commit("setToken", res.data.jwt);
      //  alert(res.data.jwt)
      this.$router.push("/");
    } else {
      alert(res.data.message);
    }
  },

  async logoutUser({ commit }) {
    commit("setToken", "");
    localStorage.removeItem("token");
    this.$router.push("/login");
  },

  async readUser({ commit }) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/auth-file/read-user.php",
      data,
      config
    );
    if (res.data.status == 1) {
      commit("setUser", res.data.message);
      alert(res.data.message)
    } else {
      alert(res.data.message);
    }
  },

  async createProduct(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-file/create-product.php",
      data,
      config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/product/");
    } else {
      alert(res.data.message);
    }
  },

  async createDetail(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-details.php/create-details.php",
      data,
      config
    );
    if (res.data.status == 1) {
      alert("good work");
      alert(res.data.message);
      this.$router.push("/details/");
    } else {
      alert("bad work")
      alert(res.data.message);
    }
  },

  async createTrans(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-details.php/create-trans.php",
      data,
      config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/trans/");
    } else {
      alert(res.data.message);
    }
  },

  async createDistrict(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-districts/create-district.php",
      data,
      config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/district/");
    } else {
      alert(res.data.message);
    }
  },

  async createBank(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
       "http://localhost/ppm/ppm-server/crud-banks/create-bank.php",
      // "http://localhost:1337/details",
      data,
      config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      //<v-alert dense type="success"></v-alert>;
      this.$router.push("/banks/");
    } else {
      alert(res.data.message);
    }
  },

  async createScheme(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-schemes/create-scheme.php",
      data
      ,config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/scheme/");
    } else {
      alert(res.data.message);
    }
  },

  async makeUser(_, data) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-banks/create-bank.php",
      data,
      config
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      //<v-alert dense type="success"></v-alert>;
      this.$router.push("/banks/");
    } else {
      alert(res.data.message);
    }
  },

  async deleteProduct({ commit, state }, data) {
    const res = await this.$axios.post(
      "https://nuxt-app123.000webhostapp.com/php-api-with-jwt-auth/crud-file/delete-products.php",
      data
    );
    const newProducts = state.products.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setProducts", newProducts);
    } else {
      alert(res.data.message);
    }
  },

  async deleteDetails({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-details.php/delete-details.php",
      data
    );
    const newDetails = state.details.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setDetails", newDetails);
    } else {
      alert(res.data.message);
    }
  },

  async deleteBanks({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-banks/delete-banks.php",
      data
    );
    alert(data.id);
    const newBanks = state.banks.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setBanks", newBanks);
    } else {
      alert(res.data.message);
    }
  },

  async deleteTrans({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-details.php/delete-trans.php",
      data
    );
    const newTrans = state.trans.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setTrans", newTrans);
    } else {
      alert(res.data.message);
    }
  },

  async deleteDistrict({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-districts/delete-districts.php",
      data
    );
    const newDistricts = state.districts.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setDistricts", newDistricts);
    } else {
      alert(res.data.status);
      alert(res.data.message);
      // alert(res.data.message1);
    }
  },

  async deleteScheme({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-schemes/delete-scheme.php",
      data
    );
    const newSchemes = state.schemes.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert(res.data.message);
      commit("setSchemes", newSchemes);
    } else {
      alert(res.data.message);
    }
  },


  async getAllTrans({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-trans/get-all-trans.php"
    );
    if (res.data.status == 1) {
      commit("setDistricts", res.data.message);
    }
  },
  async getAllDetails({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-details.php/get-all-detatils.php"
    );
    if (res.data.status == 1) {
      commit("setDetails", res.data.message);
    }
  },

  async getAllDistrict({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-districts/get-all-districts.php"
    );
    // async getAllDistrict({ commit }, { $config: { baseURL } }) {
    //   const res = await this.$axios.get(`${baseURL}/crud-districts/get-all-districts.php`
    //   );
    if (res.data.status == 1) {
      commit("setDistricts", res.data.message);
    }
  },
  async getAllBanks({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-banks/get-all-banks.php"
    );
    if (res.data.status == 1) {
      commit("setBanks", res.data.message);
    }
  },
  async getAllSchemes({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-schemes/get-all-schemes.php"
    );
    if (res.data.status == 1) {
      commit("setSchemes", res.data.message);
    }
  },

  async getAllParam({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/crud-parameters/get-all-param.php"
    );
    if (res.data.status == 1) {
      commit("setParam", res.data.message);
    }
  },

  async getAllUser({ commit }) {
    const res = await this.$axios.get(
      "http://localhost/ppm/ppm-server/users/get-all-users.php"
    );
    if (res.data.status == 1) {
      commit("setParam", res.data.message);
    }
  },

  async updateProduct(_, data) {
    const res = await this.$axios.post(
      "https://nuxt-app123.000webhostapp.com/php-api-with-jwt-auth/crud-file/update-products.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/product/");
    } else {
      alert(res.data.message);
    }
  },

  async updateBank(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-banks/update-banks.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/banks/");
    } else {
      alert(res.data.message);
    }
  },

  async updateDetails(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-details.php/update-details.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/details/");
    } else {
      alert(res.data.message);
      alert("from server");
    }
  },

  async updateDistrict(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-districts/update-districts.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/district/");
    } else {
      alert(res.data.message);
    }
  },

  async updateScheme(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-schemes/update-scheme.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/scheme/");
    } else {
      alert(res.data.message);
    }
  },

  async updatePara(_, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/crud-parameters/update-param.php",
      data
    );
    if (res.data.status == 1) {
      alert(res.data.message);
      this.$router.push("/settings/");
    } else {
      alert(res.data.message);
    }
  },

  // async calculate(data) {
  //   const config = {
  //     headers: {
  //       Authorization: localStorage.getItem("token"),
  //     },

  //   };

  //   // const data = {
  //   //   data: data,

  //   // };
  //   const res = await this.$axios.post(
  //     "http://localhost/ppm/ppm-server/processing/cal.php",
  //     data
  //   );
  //   if (res.data.status == 1) {
  //     alert(res.data.message);
  //   } else {
  //     alert("hello")
  //     alert(res.data.status);
  //     alert(res.data.message);
  //   }
  // },

  async calculate({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/processing/cal.php",
      data
    );
    const newDistricts = state.districts.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert("done");
      alert(res.data.message);
      commit("setDistricts", newDistricts);
    } else {
      // alert("bad");

      alert(res.data.message);
    }
  },

  async monthend({ commit, state }, data) {
    const res = await this.$axios.post(
      "http://localhost/ppm/ppm-server/processing/monthend.php",
      data
    );
    // this.$forceUpdate();
    const newDistricts = state.districts.filter((item) => item.id !== data.id);
    if (res.data.status == 1) {
      alert("done");
      alert(res.data.message);
      commit("setDistricts", newDistricts);
      alert("Month Closed");
    } else {
      // alert("bad");
      // alert(res.data.message);
      alert("Month Closed");
      this.$router.push("/details");
      // this.$forceUpdate();
    }
  },
};
