(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("axios"), require("dayjs"), require("element-plus"), require("lodash")) : typeof define === "function" && define.amd ? define(["exports", "vue", "axios", "dayjs", "element-plus", "lodash"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.VueInstant = {}, global.Vue, global.axios, global.dayjs, global.ElementPlus, global.lodash));
})(this, function(exports2, vue, axios, dayjs, elementPlus, lodash) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {};
  const _hoisted_1$3 = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const ComContainer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render]]);
  const _hoisted_1$2 = { class: "dialog-footer" };
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "ComDialogConfirmation",
    props: /* @__PURE__ */ vue.mergeModels({
      message: {}
    }, {
      "modelValue": { type: Boolean },
      "modelModifiers": {}
    }),
    emits: /* @__PURE__ */ vue.mergeModels(["update:modelValue", "onConfirm"], ["update:modelValue"]),
    setup(__props, { emit: __emit }) {
      const model = vue.useModel(__props, "modelValue");
      const props = __props;
      const emit = __emit;
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        return vue.openBlock(), vue.createBlock(_component_el_dialog, {
          modelValue: model.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => model.value = $event),
          title: "Penting!",
          width: "500"
        }, {
          footer: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_1$2, [
              vue.createVNode(_component_el_button, {
                onClick: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", false))
              }, {
                default: vue.withCtx(() => _cache[3] || (_cache[3] = [
                  vue.createTextVNode("Cancel")
                ])),
                _: 1,
                __: [3]
              }),
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: _cache[1] || (_cache[1] = ($event) => emit("onConfirm", true))
              }, {
                default: vue.withCtx(() => _cache[4] || (_cache[4] = [
                  vue.createTextVNode("Confirm")
                ])),
                _: 1,
                __: [4]
              })
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("span", null, vue.toDisplayString(props.message), 1)
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  let config;
  function setAppConfig(cfg) {
    config = cfg;
  }
  function getAppConfig() {
    if (!config) {
      throw new Error("RuntimeConfig belum di-set. Pastikan setAppConfig dipanggil di main.ts");
    }
    return config;
  }
  /*!
    * vue-router v4.5.1
    * (c) 2025 Eduardo San Martin Morote
    * @license MIT
    */
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
  Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
  const routerKey = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
  const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
  Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
  function useRouter() {
    return vue.inject(routerKey);
  }
  function useRoute(_name) {
    return vue.inject(routeLocationKey);
  }
  function beautyDate(date, format) {
    if (date === void 0) return "-";
    if (format) return dayjs(date).format(format);
    return dayjs(date).format("DD MMM YYYY");
  }
  function beautyDateTime(date) {
    return dayjs(date).format("DD MMM YYYY HH:mm");
  }
  function csl(data, label) {
    if (label) console.log(label, data);
    else console.log(data);
  }
  function convertStringToHex(input) {
    const value = typeof input === "number" ? input.toString() : input;
    return Array.from(`csl:${value}`).map((char) => char.charCodeAt(0).toString(16)).join("");
  }
  function convertHexToString(input) {
    let output = "";
    for (let i = 0; i < input.length; i += 2) {
      output += String.fromCharCode(parseInt(input.substr(i, 2), 16));
    }
    return output.replace("csl:", "");
  }
  function defaultType(type) {
    if (["text", "date", "dateTime"].includes(type)) return "";
    if (type === "number") return 0;
  }
  function getBrowserType() {
    const test = (regexp) => {
      return regexp.test(navigator.userAgent);
    };
    if (test(/opr\//i)) {
      return "Opera";
    } else if (test(/edg/i)) {
      return "Microsoft Edge";
    } else if (test(/chrome|chromium|crios/i)) {
      return "Google Chrome";
    } else if (test(/firefox|fxios/i)) {
      return "Mozilla Firefox";
    } else if (test(/safari/i)) {
      return "Apple Safari";
    } else if (test(/trident/i)) {
      return "Microsoft Internet Explorer";
    } else if (test(/ucbrowser/i)) {
      return "UC Browser";
    } else if (test(/samsungbrowser/i)) {
      return "Samsung Browser";
    } else {
      return "Unknown browser";
    }
  }
  function getInitials(name) {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase();
  }
  function hasHttpProtocol(url2) {
    return /^https?:\/\//i.test(url2);
  }
  function httpHandleError(error) {
    var _a, _b;
    const router = useRouter();
    if (!error) return message("Unknown error", "error");
    if (axios.isAxiosError(error)) {
      const data = ((_a = error.response) == null ? void 0 : _a.data) || void 0;
      if ((data == null ? void 0 : data.code) === "FORBIDDEN") router.push("/403");
      if (data == null ? void 0 : data.message) return message(data.message, "error");
      if ((_b = error.response) == null ? void 0 : _b.statusText) return message(error.response.statusText, "error");
      return message(error.message || "Unknown error", "error");
    }
    if (error instanceof Error) return message(error.message, "error");
    if (typeof error === "string") return message(error, "error");
    return message("Unknown error", "error");
  }
  function httpStatusCode(status) {
    if (status === "OK") return 200;
    if (status === "Success") return 200;
    if (status === "Created") return 201;
    if (status === "Unauthorized") return 401;
    if (status === "Forbidden") return 403;
    return 404;
  }
  function httpValidation(response) {
    const httpResponse = [
      { code: 200, message: "OK", type: "success" },
      { code: 201, message: "Created", type: "success" },
      { code: 400, message: "Bad Request", type: "error" },
      { code: 401, message: "Unauthorized", type: "error" },
      { code: 403, message: "Forbidden", type: "error" },
      { code: 404, message: "Not Found", type: "error" },
      { code: 405, message: "Method Not Allowed", type: "error" },
      { code: 429, message: "Too Many Request", type: "error" },
      { code: 500, message: "Internal Server Error", type: "error" },
      { code: 502, message: "Bad Gateway", type: "error" }
    ];
    const found = httpResponse.find((http2) => http2.code === response.status);
    if (found) return found.type === "success";
    return false;
  }
  function http() {
    var _a;
    let withCredentials = void 0;
    if (!withCredentials && getAppConfig()) {
      withCredentials = (_a = getAppConfig().http) == null ? void 0 : _a.withCredentials;
    }
    return axios.create({
      timeout: 6e4,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer `
      },
      baseURL: void 0,
      withCredentials: withCredentials ?? true
    });
  }
  function httpGet(url2, config2) {
    return new Promise((resolve, reject) => {
      http().get(url2, config2).then((result) => resolve(result)).catch((error) => {
        reject(error);
      });
    });
  }
  function httpPost(url2, data, config2) {
    return new Promise((resolve, reject) => {
      http().post(url2, data, config2).then((result) => resolve(result)).catch((error) => {
        reject(error);
      });
    });
  }
  function httpDelete(url2, config2) {
    return new Promise((resolve, reject) => {
      http().delete(url2, config2).then((result) => resolve(result)).catch((error) => {
        reject(error);
      });
    });
  }
  function httpPut(url2, data, config2) {
    return new Promise((resolve, reject) => {
      http().put(url2, data, config2).then((result) => resolve(result)).catch((error) => {
        reject(error);
      });
    });
  }
  function htmlToPlainText(html) {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  function message(message2, type) {
    if (type === "success") elementPlus.ElMessage.success({ grouping: true, message: message2 });
    if (type === "warning") elementPlus.ElMessage.warning({ grouping: true, message: message2 });
    if (type === "info") elementPlus.ElMessage.info({ grouping: true, message: message2 });
    if (type === "error") elementPlus.ElMessage.error({ grouping: true, message: message2 });
  }
  function minuteToTime(minute, leadingZero) {
    if (typeof minute === "string") minute = Number(minute);
    let minutes = minute % 60;
    let hours = (minute - minutes) / 60;
    if (leadingZero) {
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      hours = hours < 10 ? `0${hours}` : hours;
    }
    return `${hours}:${minutes}:00`;
  }
  function numberFormat(number, locale, options) {
    const localeDefault = "id-ID";
    const currencyDefault = "IDR";
    return new Intl.NumberFormat(locale ?? localeDefault, {
      style: (options == null ? void 0 : options.style) ?? "currency",
      currency: (options == null ? void 0 : options.currency) ?? currencyDefault,
      maximumFractionDigits: 0
    }).format(number);
  }
  function pascalCase(text) {
    return lodash.startCase(text);
  }
  function replaceString(text, data) {
    if (!data) return text;
    const regex = /\{(\w+?)\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    let finalText = text;
    matches.forEach((item) => {
      finalText = finalText.replace(`{${item}}`, String(data[item]));
    });
    return finalText ?? "";
  }
  function resolveUrl(input) {
    try {
      const u = new URL(input);
      if (u.protocol === "http:" || u.protocol === "https:") {
        return input;
      }
    } catch {
    }
    const { http: http2 } = getAppConfig();
    if (!(http2 == null ? void 0 : http2.baseUrl)) {
      throw new Error("RuntimeConfig.http.baseUrl belum diset");
    }
    return new URL(input.replace(/^\/+/, ""), http2.baseUrl).toString();
  }
  function routeParam(key) {
    var _a;
    const route = useRoute();
    return ((_a = route.params[key]) == null ? void 0 : _a.toString()) || null;
  }
  function url(text) {
    let replaced = text;
    replaced = replaced.replace(/\/\//g, "/");
    return replaced;
  }
  function urlToKebab(text) {
    return `/${lodash.kebabCase(text)}`;
  }
  function titleCase(text) {
    return lodash.startCase(text);
  }
  function waiting(fn, delay = 500) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn());
      }, delay || 500);
    });
  }
  /*! Element Plus Icons Vue v2.3.1 */
  var check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Check",
    __name: "check",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
        })
      ]));
    }
  });
  var check_default = check_vue_vue_type_script_setup_true_lang_default;
  var close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Close",
    __name: "close",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        })
      ]));
    }
  });
  var close_default = close_vue_vue_type_script_setup_true_lang_default;
  var delete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Delete",
    __name: "delete",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
        })
      ]));
    }
  });
  var delete_default = delete_vue_vue_type_script_setup_true_lang_default;
  var edit_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Edit",
    __name: "edit",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
        }),
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
        })
      ]));
    }
  });
  var edit_default = edit_vue_vue_type_script_setup_true_lang_default;
  var more_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "MoreFilled",
    __name: "more-filled",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
        })
      ]));
    }
  });
  var more_filled_default = more_filled_vue_vue_type_script_setup_true_lang_default;
  var plus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Plus",
    __name: "plus",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
        })
      ]));
    }
  });
  var plus_default = plus_vue_vue_type_script_setup_true_lang_default;
  var promotion_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Promotion",
    __name: "promotion",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
        })
      ]));
    }
  });
  var promotion_default = promotion_vue_vue_type_script_setup_true_lang_default;
  var view_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "View",
    __name: "view",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
        })
      ]));
    }
  });
  var view_default = view_vue_vue_type_script_setup_true_lang_default;
  class HttpBuilder {
    constructor() {
      var _a;
      this.base_path = ((_a = getAppConfig().http) == null ? void 0 : _a.baseUrl) ?? "";
      this.with_credentials = true;
      this.instance = null;
    }
    // ========================
    // Builder Methods (Chainable)
    // ========================
    basePath(path) {
      this.base_path = path;
      return this;
    }
    setToken(token) {
      this.token = token;
      return this;
    }
    withCredentials(enable) {
      this.with_credentials = enable;
      return this;
    }
    // ========================
    // Build Axios Instance
    // ========================
    build() {
      if (!this.instance) {
        this.instance = axios.create({
          baseURL: this.base_path,
          timeout: 6e4,
          withCredentials: this.with_credentials,
          headers: {
            Accept: "application/json",
            ...this.token && { Authorization: `Bearer ${this.token}` }
          }
        });
      }
      return this.instance;
    }
    // ========================
    // HTTP Methods
    // ========================
    get(url2, config2) {
      return this.build().get(url2, config2);
    }
    post(url2, data, config2) {
      return this.build().post(url2, data, config2);
    }
    put(url2, data, config2) {
      return this.build().put(url2, data, config2);
    }
    patch(url2, data, config2) {
      return this.build().patch(url2, data, config2);
    }
    delete(url2, config2) {
      return this.build().delete(url2, config2);
    }
    head(url2, config2) {
      return this.build().head(url2, config2);
    }
    options(url2, config2) {
      return this.build().options(url2, config2);
    }
    // ========================
    // Optional Interceptor Helper
    // ========================
    addInterceptor(onSuccess, onError) {
      this.build().interceptors.response.use(onSuccess, onError);
      return this;
    }
  }
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "ComSelect",
    props: {
      modelValue: {},
      disabled: { type: Boolean },
      fetchOnClick: { type: Boolean, default: true },
      options: {},
      url: {},
      field_label: {},
      field_value: {},
      field_search_column: {},
      placeholder: {},
      placement: {},
      remote: { type: Boolean }
    },
    emits: ["update:modelValue"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const emit = __emit;
      const props = __props;
      const collections = vue.ref([]);
      const fetchLoading = vue.ref(false);
      const http2 = new HttpBuilder();
      const fieldLabel = vue.computed(() => props.field_label ?? "name");
      const fieldValue = vue.computed(() => props.field_value ?? "id");
      const fieldSearchColumn = vue.computed(() => props.field_search_column ?? fieldLabel.value);
      const value = vue.computed({
        get: () => props.modelValue,
        set: (val) => emit("update:modelValue", val)
      });
      function changeCollection(values) {
        collections.value = values;
      }
      function fetchingDataFromServer(search) {
        fetchLoading.value = true;
        if (!props.url) throw new Error("URL belum terdefinisi saat fetch Select");
        let params;
        if (!search && props.remote) return;
        if (props.remote && search) {
          params = {
            queries: [{ field: fieldSearchColumn.value, value: search }]
          };
        }
        http2.get(resolveUrl(props.url), {
          params
        }).then((result) => {
          fetchLoading.value = false;
          collections.value = result.data.data;
        }).catch((error) => {
          httpHandleError(error);
          fetchLoading.value = false;
        });
      }
      vue.watch(
        () => props.options,
        (newOptions) => {
          if (newOptions) {
            collections.value = newOptions;
          }
        }
      );
      vue.onMounted(() => {
        if (props.url && (props.fetchOnClick ?? true)) fetchingDataFromServer();
        if (props.options) collections.value = props.options;
      });
      __expose({
        changeCollection,
        fetchingDataFromServer
      });
      return (_ctx, _cache) => {
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        return vue.openBlock(), vue.createBlock(_component_el_select, {
          modelValue: value.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
          disabled: props.disabled,
          remote: props.remote,
          "remote-method": fetchingDataFromServer,
          loading: fetchLoading.value,
          placeholder: props.placeholder ?? "Select",
          placement: props.placement ?? "bottom",
          filterable: "",
          clearable: ""
        }, {
          default: vue.withCtx(() => [
            typeof fieldLabel.value === "string" ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(collections.value, (item) => {
              return vue.openBlock(), vue.createBlock(_component_el_option, {
                key: item[fieldValue.value],
                label: vue.unref(lodash.get)(item, fieldLabel.value ?? "name"),
                value: vue.unref(lodash.get)(item, fieldValue.value ?? "id")
              }, null, 8, ["label", "value"]);
            }), 128)) : vue.createCommentVNode("", true),
            typeof fieldLabel.value === "function" ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(collections.value, (item) => {
              return vue.openBlock(), vue.createBlock(_component_el_option, {
                key: item[fieldValue.value],
                label: fieldLabel.value(item),
                value: vue.unref(lodash.get)(item, fieldValue.value ?? "id")
              }, null, 8, ["label", "value"]);
            }), 128)) : vue.createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue", "disabled", "remote", "loading", "placeholder", "placement"]);
      };
    }
  });
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "FormField",
    props: {
      column: {},
      modelValue: {},
      disabled: { type: Boolean }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const handleChange = (val) => {
        emit("update:modelValue", val);
        emit("change", val);
      };
      return (_ctx, _cache) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_radio = vue.resolveComponent("el-radio");
        const _component_el_radio_group = vue.resolveComponent("el-radio-group");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_date_picker = vue.resolveComponent("el-date-picker");
        const _component_el_time_picker = vue.resolveComponent("el-time-picker");
        return _ctx.column.type === "text" ? (vue.openBlock(), vue.createBlock(_component_el_input, {
          key: 0,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          disabled: _ctx.disabled || _ctx.column.disabled,
          placeholder: _ctx.column.placeholder
        }, null, 8, ["model-value", "disabled", "placeholder"])) : _ctx.column.type === "textarea" ? (vue.openBlock(), vue.createBlock(_component_el_input, {
          key: 1,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          type: "textarea",
          disabled: _ctx.disabled || _ctx.column.disabled,
          placeholder: _ctx.column.placeholder
        }, null, 8, ["model-value", "disabled", "placeholder"])) : _ctx.column.type === "select" ? (vue.openBlock(), vue.createBlock(_sfc_main$3, {
          key: 2,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          disabled: _ctx.disabled || _ctx.column.disabled,
          "fetch-on-click": (_a = _ctx.column.select) == null ? void 0 : _a.fetch_on_click,
          "field-label": ((_b = _ctx.column.select) == null ? void 0 : _b.field_label) ?? "name",
          "field-value": ((_c = _ctx.column.select) == null ? void 0 : _c.field_value) ?? "id",
          "field-search-column": (_d = _ctx.column.select) == null ? void 0 : _d.field_search_column,
          options: (_e = _ctx.column.select) == null ? void 0 : _e.options,
          placeholder: _ctx.column.placeholder,
          remote: (_f = _ctx.column.select) == null ? void 0 : _f.remote,
          url: (_g = _ctx.column.select) == null ? void 0 : _g.url
        }, null, 8, ["model-value", "disabled", "fetch-on-click", "field-label", "field-value", "field-search-column", "options", "placeholder", "remote", "url"])) : _ctx.column.type === "radio" ? (vue.openBlock(), vue.createBlock(_component_el_radio_group, {
          key: 3,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.column.options, (radio, index) => {
              return vue.openBlock(), vue.createBlock(_component_el_radio, {
                value: radio.value,
                key: `radio-${index}`
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(radio.label), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["model-value"])) : _ctx.column.type === "checkbox:label" && ((_h = _ctx.column.options) == null ? void 0 : _h.length) ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, {
          key: 4,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.column.options, (checkbox, index) => {
              return vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                label: checkbox.label,
                value: checkbox.value,
                key: `checkbox-${index}`
              }, null, 8, ["label", "value"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["model-value"])) : _ctx.column.type === "password" ? (vue.openBlock(), vue.createBlock(_component_el_input, {
          key: 5,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          placeholder: _ctx.column.placeholder,
          type: "password",
          "show-password": ""
        }, null, 8, ["model-value", "placeholder"])) : _ctx.column.type === "switch" ? (vue.openBlock(), vue.createBlock(_component_el_switch, {
          key: 6,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          "active-icon": vue.unref(check_default),
          "inactive-icon": vue.unref(close_default)
        }, null, 8, ["model-value", "active-icon", "inactive-icon"])) : _ctx.column.type === "date" ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
          key: 7,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          type: "date",
          placeholder: _ctx.column.placeholder
        }, null, 8, ["model-value", "placeholder"])) : _ctx.column.type === "date-time" ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
          key: 8,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          placeholder: _ctx.column.placeholder,
          type: "datetime",
          "value-format": "YYYY-MM-DD HH:mm:ss",
          class: "w-full!"
        }, null, 8, ["model-value", "placeholder"])) : _ctx.column.type === "time" ? (vue.openBlock(), vue.createBlock(_component_el_time_picker, {
          key: 9,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange,
          placeholder: _ctx.column.placeholder,
          "value-format": "HH:mm:ss",
          class: "w-full!"
        }, null, 8, ["model-value", "placeholder"])) : _ctx.column.type === "checkbox" && !_ctx.column.options ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
          key: 10,
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": handleChange
        }, null, 8, ["model-value"])) : _ctx.column.type === "slot" ? vue.renderSlot(_ctx.$slots, "default", {
          key: 11,
          column: _ctx.column,
          modelValue: _ctx.modelValue
        }) : vue.createCommentVNode("", true);
      };
    }
  });
  const _hoisted_1$1 = { class: "flex justify-between p-4 border-b border-[#ebeef5]" };
  const _hoisted_2$1 = { key: 0 };
  const _hoisted_3$1 = { class: "text-xl font-bold" };
  const _hoisted_4$1 = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "ComForm",
    props: {
      columns: {},
      id: {},
      description: {},
      fetchUrl: {},
      paramsUrl: {},
      queries: {},
      relations: {},
      rules: {},
      storeUrl: {},
      title: {},
      url: {}
    },
    emits: ["back", "onStored", "onUpdated", "delete", "form", "onChangeItem"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emits = __emit;
      const form = vue.reactive({});
      const ruleFormRef = vue.ref();
      const uploadRefs = {};
      const loading = vue.ref(false);
      const http2 = new HttpBuilder();
      function columnGrid(column, breakPoint) {
        if (typeof column === "number") return column;
        if (typeof column === "object" && breakPoint) return column[breakPoint];
        if (typeof column === "object") return column["default"];
      }
      function getData() {
        const url2 = resolveUrl(props.fetchUrl ?? props.url);
        http2.get(`${url2}/${props.id}`, {
          params: {
            queries: props.queries,
            relations: props.relations
          }
        }).then((result) => {
          Object.assign(form, result.data.data);
          props.columns.forEach((column) => {
            if (typeof column.value === "function") {
              form[column.name] = lodash.get(result.data.data, column.value(), "");
            }
          });
          emits("form", result.data.data);
        }).catch(httpHandleError);
      }
      const handleExceed = (files, uploadFiles, columnName) => {
        const uploadRef = columnName ? uploadRefs[columnName] : Object.values(uploadRefs)[0];
        if (!uploadRef) return;
        uploadRef.clearFiles();
        const file = files[0];
        file.uid = elementPlus.genFileId();
        uploadRef.handleStart(file);
      };
      const handleUploadError = (error, columnName) => {
        const errorMsg = error.message || "Unknown error";
        message(`Upload ${columnName} gagal: ${errorMsg}`, "error");
      };
      const handleUploadSuccess = (response, columnName) => {
        message(`Upload ${columnName} berhasil`, "success");
      };
      function initializeForm() {
        props.columns.forEach((column) => {
          if (column.type === "select") {
            if (typeof column.value === "function") {
              form[column.name] = lodash.get(form, column.value(), "");
            } else form[column.name] = column.value ?? "";
          } else if (column.type === "upload") {
            form[column.name] = column.value ?? "";
          } else if (column.type === "checkbox") {
            form[column.name] = column.value ?? [];
          } else if (column.type === "switch") {
            form[column.name] = column.value ?? 0;
          } else {
            form[column.name] = column.value ?? "";
          }
        });
      }
      function onChange(columnMetaData, inputValue) {
        emits("form", form);
        emits("onChangeItem", { ...columnMetaData, value: inputValue });
      }
      async function submitAllUploads() {
        const uploadPromises = Object.values(uploadRefs).map((uploadRef) => {
          return new Promise((resolve) => {
            uploadRef.submit();
            resolve();
          });
        });
        return Promise.all(uploadPromises);
      }
      async function store() {
        if (!ruleFormRef.value) return;
        if (loading.value) return;
        let url2 = resolveUrl(props.storeUrl ?? props.url);
        await ruleFormRef.value.validate(async (valid) => {
          if (props.paramsUrl) url2 = `${url2}?${props.paramsUrl}`;
          if (valid) {
            loading.value = true;
            try {
              await submitAllUploads();
              await http2.post(url2, form).then((result) => {
                if (result.status >= 200 && result.status < 300) {
                  const data = result.data;
                  message(data.message, "success");
                  emits("onStored", data.data);
                }
              }).catch(httpHandleError);
            } catch (error) {
              httpHandleError(error);
            } finally {
              loading.value = false;
            }
          }
        });
      }
      async function update() {
        if (!ruleFormRef.value) return;
        if (loading.value) return;
        let url2 = resolveUrl(props.storeUrl ?? props.url);
        url2 = `${url2}/${props.id}`;
        if (props.paramsUrl) url2 = `${url2}?${props.paramsUrl}`;
        loading.value = true;
        await ruleFormRef.value.validate((valid) => {
          if (valid) {
            http2.put(url2, form).then((result) => {
              if (result.status >= 200 && result.status < 300) {
                const data = result.data;
                message(data.message, "success");
                emits("onUpdated", data.data);
              }
            }).catch(httpHandleError).finally(() => {
              loading.value = false;
            });
          } else {
            loading.value = false;
          }
        });
      }
      vue.onBeforeMount(() => {
        initializeForm();
      });
      vue.onMounted(() => {
        if (props.id) getData();
        initializeForm();
      });
      __expose({
        initializeForm
      });
      return (_ctx, _cache) => {
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_upload = vue.resolveComponent("el-upload");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_form = vue.resolveComponent("el-form");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("div", _hoisted_1$1, [
            !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
              vue.createElementVNode("div", _hoisted_3$1, vue.toDisplayString(props.title), 1),
              vue.createElementVNode("div", null, vue.toDisplayString(props.description), 1)
            ])) : vue.createCommentVNode("", true),
            vue.renderSlot(_ctx.$slots, "title")
          ]),
          vue.createVNode(_component_el_form, {
            model: form,
            rules: props.rules,
            class: "p-4",
            ref_key: "ruleFormRef",
            ref: ruleFormRef,
            "label-position": "top",
            "label-width": "auto",
            "status-icon": ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_row, { gutter: 20 }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.columns, (column, index) => {
                    return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                      !["hide"].includes(column.type) ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                        key: 0,
                        span: columnGrid(column.grid ?? 24),
                        sm: columnGrid(column.grid ?? 24, "sm"),
                        md: columnGrid(column.grid ?? 24, "md"),
                        lg: columnGrid(column.grid ?? 24, "lg"),
                        xl: columnGrid(column.grid ?? 24, "xl")
                      }, {
                        default: vue.withCtx(() => [
                          !["slot:el-form-item", "checkbox"].includes(column.type) ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                            key: 0,
                            label: column.label,
                            prop: column.name
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_sfc_main$2, {
                                column,
                                modelValue: form[column.name],
                                "onUpdate:modelValue": ($event) => form[column.name] = $event,
                                onChange: (val) => onChange(column, val)
                              }, {
                                slot: vue.withCtx((slotProps) => [
                                  vue.renderSlot(_ctx.$slots, column.name, { form })
                                ]),
                                _: 2
                              }, 1032, ["column", "modelValue", "onUpdate:modelValue", "onChange"])
                            ]),
                            _: 2
                          }, 1032, ["label", "prop"])) : vue.createCommentVNode("", true),
                          column.type === "checkbox" && !column.options ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                            key: 1,
                            prop: column.name
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_sfc_main$2, {
                                column,
                                modelValue: form[column.name],
                                "onUpdate:modelValue": ($event) => form[column.name] = $event,
                                onChange: (val) => onChange(column, val)
                              }, null, 8, ["column", "modelValue", "onUpdate:modelValue", "onChange"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])) : vue.createCommentVNode("", true),
                          column.type === "upload" ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                            key: 2,
                            label: column.label,
                            prop: column.name
                          }, {
                            default: vue.withCtx(() => {
                              var _a;
                              return [
                                vue.createVNode(_component_el_upload, {
                                  ref_for: true,
                                  ref: (el) => {
                                    if (el) uploadRefs[column.name] = el;
                                  },
                                  action: (_a = column.upload) == null ? void 0 : _a.url,
                                  limit: 1,
                                  "on-exceed": (files) => handleExceed(files, [], column.name),
                                  "auto-upload": false,
                                  onChange: (val) => onChange(column, val),
                                  onError: (err) => handleUploadError(err, column.name),
                                  onSuccess: (res) => handleUploadSuccess(res, column.name)
                                }, {
                                  trigger: vue.withCtx(() => [
                                    vue.createVNode(_component_el_button, { type: "primary" }, {
                                      default: vue.withCtx(() => _cache[1] || (_cache[1] = [
                                        vue.createTextVNode("select file")
                                      ])),
                                      _: 1,
                                      __: [1]
                                    })
                                  ]),
                                  tip: vue.withCtx(() => _cache[2] || (_cache[2] = [
                                    vue.createElementVNode("div", { class: "el-upload__tip text-red" }, " limit 1 file, new file will cover the old file ", -1)
                                  ])),
                                  _: 2
                                }, 1032, ["action", "on-exceed", "onChange", "onError", "onSuccess"])
                              ];
                            }),
                            _: 2
                          }, 1032, ["label", "prop"])) : vue.createCommentVNode("", true),
                          column.type === "slot:el-form-item" ? vue.renderSlot(_ctx.$slots, column.name, {
                            key: 3,
                            form
                          }) : vue.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["span", "sm", "md", "lg", "xl"])) : vue.createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 3
              }),
              vue.createElementVNode("div", _hoisted_4$1, [
                vue.createVNode(_component_el_button, {
                  icon: vue.unref(close_default),
                  onClick: _cache[0] || (_cache[0] = ($event) => emits("back")),
                  type: "danger",
                  plain: "",
                  disabled: loading.value
                }, {
                  default: vue.withCtx(() => _cache[3] || (_cache[3] = [
                    vue.createTextVNode("Batal")
                  ])),
                  _: 1,
                  __: [3]
                }, 8, ["icon", "disabled"]),
                props.id ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  onClick: update,
                  icon: vue.unref(promotion_default),
                  type: "primary",
                  class: "ml-4",
                  loading: loading.value
                }, {
                  default: vue.withCtx(() => _cache[4] || (_cache[4] = [
                    vue.createTextVNode(" Perbaharui ")
                  ])),
                  _: 1,
                  __: [4]
                }, 8, ["icon", "loading"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  !_ctx.$slots.buttonStore ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                    key: 0,
                    onClick: store,
                    icon: vue.unref(promotion_default),
                    type: "primary",
                    class: "ml-4",
                    loading: loading.value
                  }, {
                    default: vue.withCtx(() => _cache[5] || (_cache[5] = [
                      vue.createTextVNode(" Simpan ")
                    ])),
                    _: 1,
                    __: [5]
                  }, 8, ["icon", "loading"])) : vue.createCommentVNode("", true),
                  vue.renderSlot(_ctx.$slots, "buttonStore")
                ], 64))
              ])
            ]),
            _: 3
          }, 8, ["model", "rules"])
        ]);
      };
    }
  });
  const _hoisted_1 = { class: "flex justify-between p-4 border-b border-[#ebeef5]" };
  const _hoisted_2 = { key: 0 };
  const _hoisted_3 = { class: "text-xl font-bold" };
  const _hoisted_4 = { class: "text-sm text-gray-400" };
  const _hoisted_5 = {
    key: 1,
    class: "flex justify-end gap-4"
  };
  const _hoisted_6 = {
    key: 0,
    class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center"
  };
  const _hoisted_7 = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" };
  const _hoisted_8 = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" };
  const _hoisted_9 = {
    key: 0,
    class: "flex justify-end p-4"
  };
  const _hoisted_10 = { class: "dialog-footer" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "ComTable",
    props: {
      buttonCreateUrl: {},
      buttonEditUrl: {},
      buttonViewUrl: {},
      buttonMoreFieldShow: { type: Boolean, default: true },
      buttonFilterShow: { type: Boolean, default: true },
      buttonDeleteShow: { type: Boolean, default: true },
      columns: {},
      deleteUrl: {},
      description: {},
      paginationShow: { type: Boolean, default: true },
      setRelations: {},
      setColumns: {},
      setQueries: {},
      setOrder: {},
      style: {},
      toolbarShow: { type: Boolean, default: true },
      title: {},
      url: {}
    },
    emits: ["onReady", "tableSelections"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const emits = __emit;
      const props = __props;
      const data = vue.ref([]);
      const dataSelected = vue.ref([]);
      const dialogDeleteConfirmation = vue.ref();
      const currentPage = vue.ref(1);
      const http2 = new HttpBuilder();
      const loading = vue.ref(true);
      const pageSize = vue.ref(10);
      const tableRef = vue.ref();
      const totalData = vue.ref(0);
      const state = vue.reactive({
        data: {},
        collection: {
          data: []
        }
      });
      function changePage() {
        fetchingDataFromServer();
      }
      function changeSelection(values) {
        values.map((id) => {
          tableRef.value.toggleRowSelection({ id });
        });
      }
      function fetchingDataFromServer() {
        loading.value = true;
        http2.get(resolveUrl(props.url), {
          params: {
            relations: props.setRelations,
            columns: props.setColumns,
            pagination_length: pageSize.value,
            page: currentPage.value,
            queries: props.setQueries,
            order: props.setOrder
          }
        }).then((result) => {
          loading.value = false;
          data.value = result.data.data.data;
          totalData.value = result.data.data.total;
          state.collection = result.data.data;
          emits("onReady", data.value);
        }).catch((error) => {
          loading.value = false;
          httpHandleError(error);
        });
      }
      function handleSelectionChange(val) {
        dataSelected.value = val;
        emits(
          "tableSelections",
          val.map((item) => item.id)
        );
      }
      function refresh() {
        fetchingDataFromServer();
      }
      function remove() {
        if (!props.deleteUrl) {
          throw new Error(`Props 'delete-url' belum di inisialisasi`);
        }
        if (!dialogDeleteConfirmation.value) {
          dialogDeleteConfirmation.value = true;
          return;
        }
        const ids = dataSelected.value.map((item) => {
          return item.id;
        });
        http2.delete(resolveUrl(props.deleteUrl), {
          data: {
            id: ids
          }
        }).then(() => {
          refresh();
          dialogDeleteConfirmation.value = false;
        }).catch(httpHandleError);
      }
      vue.onMounted(() => {
        fetchingDataFromServer();
      });
      __expose({ changeSelection, refresh, remove });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_RouterLink = vue.resolveComponent("RouterLink");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_icon = vue.resolveComponent("el-icon");
        const _component_el_popover = vue.resolveComponent("el-popover");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_pagination = vue.resolveComponent("el-pagination");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        const _directive_loading = vue.resolveDirective("loading");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("div", _hoisted_1, [
            !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.createElementVNode("div", _hoisted_3, vue.toDisplayString(props.title), 1),
              vue.createElementVNode("div", _hoisted_4, vue.toDisplayString(props.description), 1)
            ])) : vue.createCommentVNode("", true),
            vue.renderSlot(_ctx.$slots, "title"),
            props.toolbarShow ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
              vue.renderSlot(_ctx.$slots, "toolbar-1"),
              props.buttonCreateUrl ? (vue.openBlock(), vue.createBlock(_component_RouterLink, {
                key: 0,
                to: props.buttonCreateUrl()
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    icon: vue.unref(plus_default),
                    type: "primary"
                  }, {
                    default: vue.withCtx(() => _cache[5] || (_cache[5] = [
                      vue.createTextVNode("Tambah")
                    ])),
                    _: 1,
                    __: [5]
                  }, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["to"])) : vue.createCommentVNode("", true),
              vue.renderSlot(_ctx.$slots, "toolbar-2"),
              !_ctx.$slots.buttonDelete && dataSelected.value.length && props.buttonDeleteShow ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 1,
                onClick: _cache[0] || (_cache[0] = ($event) => dialogDeleteConfirmation.value = true),
                icon: vue.unref(delete_default),
                type: "danger",
                class: "m-0!"
              }, {
                default: vue.withCtx(() => _cache[6] || (_cache[6] = [
                  vue.createTextVNode("Hapus")
                ])),
                _: 1,
                __: [6]
              }, 8, ["icon"])) : vue.createCommentVNode("", true),
              vue.renderSlot(_ctx.$slots, "buttonDelete"),
              vue.renderSlot(_ctx.$slots, "toolbar-3"),
              vue.renderSlot(_ctx.$slots, "toolbar-4")
            ])) : vue.createCommentVNode("", true)
          ]),
          vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_table, {
            data: data.value,
            onSelectionChange: handleSelectionChange,
            ref_key: "tableRef",
            ref: tableRef,
            "row-key": "id",
            style: { "width": "100%" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_table_column, {
                type: "selection",
                width: "55",
                fixed: "left"
              }),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.columns, (column, index) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                  !column.value && column.type !== "slot" ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                    key: 0,
                    prop: column.field,
                    label: column.label,
                    width: column.width,
                    align: column.align ?? "left"
                  }, null, 8, ["prop", "label", "width", "align"])) : vue.createCommentVNode("", true),
                  column.value && column.type !== "slot" ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                    key: 1,
                    prop: column.field,
                    label: column.label,
                    width: column.width,
                    align: column.align ?? "left"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createTextVNode(vue.toDisplayString(typeof column.value === "function" ? column.value(scope.row) : ""), 1)
                    ]),
                    _: 2
                  }, 1032, ["prop", "label", "width", "align"])) : vue.createCommentVNode("", true),
                  column.type === "slot" ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                    key: 2,
                    prop: column.field,
                    label: column.label,
                    width: column.width,
                    align: column.align ?? "left"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.renderSlot(_ctx.$slots, column.field, {
                        row: scope.row
                      })
                    ]),
                    _: 2
                  }, 1032, ["prop", "label", "width", "align"])) : vue.createCommentVNode("", true)
                ], 64);
              }), 128)),
              vue.createVNode(_component_el_table_column, {
                width: "55",
                fixed: "right"
              }, {
                default: vue.withCtx((scope) => {
                  var _a;
                  return [
                    props.buttonMoreFieldShow ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                      vue.createVNode(_component_el_popover, {
                        placement: "bottom",
                        width: ((_a = props.style) == null ? void 0 : _a.popOverWidth) ?? 150,
                        "popper-class": "!p-0",
                        trigger: "click"
                      }, {
                        reference: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(more_filled_default))
                            ]),
                            _: 1
                          })
                        ]),
                        default: vue.withCtx(() => [
                          vue.createElementVNode("ul", null, [
                            typeof _ctx.buttonViewUrl === "function" ? (vue.openBlock(), vue.createBlock(_component_RouterLink, {
                              key: 0,
                              to: _ctx.buttonViewUrl(scope.row),
                              target: "_blank"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("li", _hoisted_7, [
                                  vue.createVNode(_component_el_icon, null, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(view_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[7] || (_cache[7] = vue.createElementVNode("span", { class: "ml-2" }, "Lihat", -1))
                                ])
                              ]),
                              _: 2
                            }, 1032, ["to"])) : vue.createCommentVNode("", true),
                            typeof _ctx.buttonEditUrl === "function" ? (vue.openBlock(), vue.createBlock(_component_RouterLink, {
                              key: 1,
                              to: _ctx.buttonEditUrl(scope.row)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("li", _hoisted_8, [
                                  vue.createVNode(_component_el_icon, null, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(edit_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[8] || (_cache[8] = vue.createElementVNode("span", { class: "ml-2" }, "Ubah", -1))
                                ])
                              ]),
                              _: 2
                            }, 1032, ["to"])) : vue.createCommentVNode("", true),
                            vue.renderSlot(_ctx.$slots, "action", {
                              row: scope.row
                            })
                          ])
                        ]),
                        _: 2
                      }, 1032, ["width"])
                    ])) : vue.createCommentVNode("", true)
                  ];
                }),
                _: 3
              })
            ]),
            _: 3
          }, 8, ["data"])), [
            [_directive_loading, loading.value]
          ]),
          props.paginationShow ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
            vue.createVNode(_component_el_pagination, {
              "page-size": pageSize.value,
              "onUpdate:pageSize": _cache[1] || (_cache[1] = ($event) => pageSize.value = $event),
              "current-page": currentPage.value,
              "onUpdate:currentPage": _cache[2] || (_cache[2] = ($event) => currentPage.value = $event),
              total: totalData.value,
              "page-sizes": [10, 25, 50, 75, 100],
              onChange: changePage,
              layout: "sizes, total, prev, pager, next"
            }, null, 8, ["page-size", "current-page", "total"])
          ])) : vue.createCommentVNode("", true),
          vue.createVNode(_component_el_dialog, {
            modelValue: dialogDeleteConfirmation.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialogDeleteConfirmation.value = $event),
            title: "Konfirmasi",
            width: "500"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_10, [
                vue.createVNode(_component_el_button, {
                  onClick: _cache[3] || (_cache[3] = ($event) => dialogDeleteConfirmation.value = false)
                }, {
                  default: vue.withCtx(() => _cache[9] || (_cache[9] = [
                    vue.createTextVNode("Cancel")
                  ])),
                  _: 1,
                  __: [9]
                }),
                vue.createVNode(_component_el_button, {
                  type: "primary",
                  onClick: remove
                }, {
                  default: vue.withCtx(() => _cache[10] || (_cache[10] = [
                    vue.createTextVNode(" Confirm ")
                  ])),
                  _: 1,
                  __: [10]
                })
              ])
            ]),
            default: vue.withCtx(() => [
              _cache[11] || (_cache[11] = vue.createElementVNode("span", null, "Anda yakin ingin menghapus data yang Anda pilih ?", -1))
            ]),
            _: 1,
            __: [11]
          }, 8, ["modelValue"])
        ]);
      };
    }
  });
  exports2.ComContainer = ComContainer;
  exports2.ComDialogConfirmation = _sfc_main$4;
  exports2.ComForm = _sfc_main$1;
  exports2.ComSelect = _sfc_main$3;
  exports2.ComTable = _sfc_main;
  exports2.beautyDate = beautyDate;
  exports2.beautyDateTime = beautyDateTime;
  exports2.convertHexToString = convertHexToString;
  exports2.convertStringToHex = convertStringToHex;
  exports2.csl = csl;
  exports2.defaultType = defaultType;
  exports2.getAppConfig = getAppConfig;
  exports2.getBrowserType = getBrowserType;
  exports2.getInitials = getInitials;
  exports2.hasHttpProtocol = hasHttpProtocol;
  exports2.htmlToPlainText = htmlToPlainText;
  exports2.http = http;
  exports2.httpDelete = httpDelete;
  exports2.httpGet = httpGet;
  exports2.httpHandleError = httpHandleError;
  exports2.httpPost = httpPost;
  exports2.httpPut = httpPut;
  exports2.httpStatusCode = httpStatusCode;
  exports2.httpValidation = httpValidation;
  exports2.message = message;
  exports2.minuteToTime = minuteToTime;
  exports2.numberFormat = numberFormat;
  exports2.pascalCase = pascalCase;
  exports2.replaceString = replaceString;
  exports2.resolveUrl = resolveUrl;
  exports2.routeParam = routeParam;
  exports2.setAppConfig = setAppConfig;
  exports2.titleCase = titleCase;
  exports2.url = url;
  exports2.urlToKebab = urlToKebab;
  exports2.waiting = waiting;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=vue-instant.umd.js.map
