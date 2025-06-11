import { createElementBlock, openBlock, renderSlot, defineComponent, mergeModels, useModel, resolveComponent, createBlock, withCtx, createElementVNode, createTextVNode, toDisplayString, createVNode, inject, ref, computed, onMounted, Fragment, renderList, unref, reactive, onBeforeMount, createCommentVNode, resolveDirective, withDirectives } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { snakeCase, startCase, kebabCase, get } from "lodash";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {};
const _hoisted_1$3 = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const ComContainer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const _hoisted_1$2 = { class: "dialog-footer" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ mergeModels({
    message: {}
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const model = useModel(__props, "modelValue");
    const props = __props;
    const emit = __emit;
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: model.value,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => model.value = $event),
        title: "Penting!",
        width: "500"
      }, {
        footer: withCtx(() => [
          createElementVNode("div", _hoisted_1$2, [
            createVNode(_component_el_button, {
              onClick: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", false))
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode("Cancel")
              ])),
              _: 1,
              __: [3]
            }),
            _cache[5] || (_cache[5] = createTextVNode()),
            createVNode(_component_el_button, {
              type: "primary",
              onClick: _cache[1] || (_cache[1] = ($event) => emit("onConfirm", true))
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode("Confirm")
              ])),
              _: 1,
              __: [4]
            })
          ])
        ]),
        default: withCtx(() => [
          createElementVNode("span", null, toDisplayString(props.message), 1),
          _cache[6] || (_cache[6] = createTextVNode())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
let config;
function setAppConfig(cfg) {
  config = cfg;
}
function getAppConfig() {
  if (!config) throw new Error("App config is not initialized");
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
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
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
function getRefreshToken() {
  const tokenName = getAppConfig().tokenName;
  const snakeCaseTokenName = snakeCase(tokenName);
  return localStorage.getItem(`${snakeCaseTokenName}_refresh_token`) ?? "";
}
function getToken() {
  const tokenName = getAppConfig().tokenName;
  return localStorage.getItem(`access_token_${tokenName}`) ?? "";
}
function httpHandleError(error) {
  var _a;
  const router = useRouter();
  if (((_a = error.response) == null ? void 0 : _a.data.code) === "FORBIDDEN") router.push("/403");
  if (error.response) return message(error.response.data.message || "", "error");
  return message(error.message, "error");
}
function httpStatusCode(status) {
  if (status === "OK") return 200;
  if (status === "Success") return 200;
  if (status === "Created") return 201;
  if (status === "Unauthorized") return 401;
  if (status === "Unauthorized") return 403;
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
function http(baseURL) {
  const containHttp = baseURL == null ? void 0 : baseURL.includes("http://");
  const containHttps = baseURL == null ? void 0 : baseURL.includes("https://");
  let baseUrl = getAppConfig().apiUrl;
  if (containHttp || containHttps) baseUrl = baseURL;
  return axios.create({
    baseURL: baseUrl,
    timeout: 6e4,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    withCredentials: true
  });
}
function httpGet(url2, config2) {
  return new Promise((resolve, reject) => {
    http(url2).get(url2, config2).then((result) => resolve(result)).catch((error) => {
      reject(error);
    });
  });
}
function httpPost(url2, data, config2) {
  return new Promise((resolve, reject) => {
    http(url2).post(url2, data, config2).then((result) => resolve(result)).catch((error) => {
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
  if (type === "success") ElMessage.success({ grouping: true, message: message2 });
  if (type === "warning") ElMessage.warning({ grouping: true, message: message2 });
  if (type === "info") ElMessage.info({ grouping: true, message: message2 });
  if (type === "error") ElMessage.error({ grouping: true, message: message2 });
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
  return startCase(text);
}
function removeRefreshToken() {
  const tokenName = snakeCase(getAppConfig().tokenName);
  localStorage.removeItem(`${tokenName}_refresh_token`);
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
    finalText = finalText.replace(`{${item}}`, data[item]);
  });
  return finalText ?? "";
}
function routeParam(key) {
  var _a;
  const route = useRoute();
  return ((_a = route.params[key]) == null ? void 0 : _a.toString()) || null;
}
function setRefreshToken(token) {
  const tokenName = snakeCase(getAppConfig().tokenName);
  localStorage.setItem(`${tokenName}_refresh_token`, token);
}
function url(text) {
  let replaced = text;
  replaced = replaced.replace(/\/\//g, "/");
  return replaced;
}
function urlToKebab(text) {
  return `/${kebabCase(text)}`;
}
function titleCase(text) {
  return startCase(text);
}
function waiting(fn, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delay || 500);
  });
}
/*! Element Plus Icons Vue v2.3.1 */
var check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Check",
  __name: "check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
});
var check_default = check_vue_vue_type_script_setup_true_lang_default;
var close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Close",
  __name: "close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
});
var close_default = close_vue_vue_type_script_setup_true_lang_default;
var edit_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Edit",
  __name: "edit",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
});
var edit_default = edit_vue_vue_type_script_setup_true_lang_default;
var more_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "MoreFilled",
  __name: "more-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
});
var more_filled_default = more_filled_vue_vue_type_script_setup_true_lang_default;
var promotion_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Promotion",
  __name: "promotion",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
      })
    ]));
  }
});
var promotion_default = promotion_vue_vue_type_script_setup_true_lang_default;
var view_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "View",
  __name: "view",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
});
var view_default = view_vue_vue_type_script_setup_true_lang_default;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ComSelect",
  props: {
    disabled: { type: Boolean },
    fetchOnClick: { type: Boolean },
    fieldLabel: {},
    fieldValue: {},
    options: {},
    placeholder: {},
    remote: { type: Boolean },
    url: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const collections = ref([]);
    const fetchLoading = ref(false);
    const value = ref("");
    const fieldLabel = computed(() => props.fieldLabel ?? "name");
    const fieldValue = computed(() => props.fieldValue ?? "id");
    function fetchingDataFromServer(search) {
      fetchLoading.value = true;
      if (!props.url) throw new Error("URL belum terdefinisi saat fetch Select");
      let params;
      if (!search && props.remote) return;
      if (props.remote && search) {
        params = {
          queries: [{ field: fieldLabel.value, value: search }]
        };
      }
      httpGet(props.url, {
        params
      }).then((result) => {
        fetchLoading.value = false;
        collections.value = result.data.data;
      }).catch((error) => {
        httpHandleError(error);
        fetchLoading.value = false;
      });
    }
    onMounted(() => {
      if (props.url && (props.fetchOnClick ?? true)) fetchingDataFromServer();
      if (props.options) collections.value = props.options;
    });
    __expose({
      fetchingDataFromServer
    });
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      return openBlock(), createBlock(_component_el_select, {
        modelValue: value.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
        disabled: props.disabled,
        remote: props.remote,
        "remote-method": fetchingDataFromServer,
        loading: fetchLoading.value,
        onChange: _cache[1] || (_cache[1] = (val) => emit("update:modelValue", val)),
        placeholder: props.placeholder ?? "Select",
        filterable: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(collections.value, (item) => {
            return openBlock(), createBlock(_component_el_option, {
              key: item[fieldValue.value],
              label: unref(get)(item, fieldLabel.value),
              value: item[fieldValue.value] ?? item["id"]
            }, null, 8, ["label", "value"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled", "remote", "loading", "placeholder"]);
    };
  }
});
const _hoisted_1$1 = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ComForm",
  props: {
    columns: {},
    id: {},
    fetchUrl: {},
    paramsUrl: {},
    queries: {},
    rules: {},
    storeUrl: {},
    url: {}
  },
  emits: ["back", "store", "update", "delete", "form"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const form = reactive({});
    const ruleFormRef = ref();
    function columnGrid(column, breakPoint) {
      if (typeof column === "number") return column;
      if (typeof column === "object" && breakPoint) return column[breakPoint];
      if (typeof column === "object") return column["default"];
    }
    function getData() {
      const url2 = props.fetchUrl ?? props.url;
      httpGet(`${url2}/${props.id}?${props.paramsUrl}`).then((result) => {
        Object.assign(form);
        emits("form", result.data.data);
      }).catch(httpHandleError);
    }
    function initializeForm() {
      props.columns.forEach((column) => {
        if (column.type === "select") {
          form[column.name] = column.value ?? "";
        } else if (column.type === "text") {
          form[column.name] = column.value ?? "";
        } else if (column.type === "textarea") {
          form[column.name] = column.value ?? "";
        } else if (column.type === "password") {
          form[column.name] = column.value ?? "";
        } else if (column.type === "switch") {
          form[column.name] = column.value ?? 0;
        } else if (column.type === "checkbox") {
          form[column.name] = column.value ?? 0;
        } else if (column.type === "slot") {
          form[column.name] = column.value ?? "";
        } else if (column.type === "hide") {
          form[column.name] = column.value ?? "";
        }
      });
    }
    function onChange() {
      emits("form", form);
    }
    async function store() {
      if (!ruleFormRef.value) return;
      const url2 = props.storeUrl ?? props.url;
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          httpPost(`${url2}?${props.paramsUrl}`, form).then((result) => {
            if (httpValidation(result)) {
              message(result.data.message, "success");
              emits("store", result.data.data);
            }
          }).catch(httpHandleError);
        }
      });
    }
    async function update() {
      if (!ruleFormRef.value) return;
      const url2 = props.storeUrl ?? props.url;
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          httpPut(`${url2}/${props.id}?${props.paramsUrl}`, form).then((result) => {
            if (httpValidation(result)) {
              message(result.data.message, "success");
              emits("update", result.data.data);
            }
          }).catch(httpHandleError);
        }
      });
    }
    onBeforeMount(() => {
      initializeForm();
    });
    onMounted(() => {
      if (props.id) getData();
      initializeForm();
    });
    __expose({
      initializeForm
    });
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createBlock(_component_el_form, {
        model: form,
        rules: props.rules,
        ref_key: "ruleFormRef",
        ref: ruleFormRef,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_el_row, { gutter: 20 }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.columns, (column, index) => {
                return openBlock(), createElementBlock(Fragment, { key: index }, [
                  !["hide"].includes(column.type) ? (openBlock(), createBlock(_component_el_col, {
                    key: 0,
                    span: columnGrid(column.grid ?? 24),
                    sm: columnGrid(column.grid ?? 24, "sm"),
                    md: columnGrid(column.grid ?? 24, "md"),
                    lg: columnGrid(column.grid ?? 24, "lg"),
                    xl: columnGrid(column.grid ?? 24, "xl")
                  }, {
                    default: withCtx(() => [
                      !["checkbox", "slot:el-form-item"].includes(column.type) ? (openBlock(), createBlock(_component_el_form_item, {
                        key: 0,
                        label: column.label,
                        prop: column.name
                      }, {
                        default: withCtx(() => {
                          var _a, _b, _c, _d, _e, _f;
                          return [
                            column.type === "text" ? (openBlock(), createBlock(_component_el_input, {
                              key: 0,
                              modelValue: form[column.name],
                              "onUpdate:modelValue": ($event) => form[column.name] = $event,
                              disabled: column.disabled,
                              onChange
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : createCommentVNode("", true),
                            column.type === "textarea" ? (openBlock(), createBlock(_component_el_input, {
                              key: 1,
                              modelValue: form[column.name],
                              "onUpdate:modelValue": ($event) => form[column.name] = $event,
                              type: "textarea",
                              disabled: column.disabled,
                              onChange
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : createCommentVNode("", true),
                            column.type === "select" ? (openBlock(), createBlock(_sfc_main$2, {
                              key: 2,
                              modelValue: form[column.name],
                              "onUpdate:modelValue": ($event) => form[column.name] = $event,
                              disabled: column.disabled,
                              "fetch-on-click": (_a = column.select) == null ? void 0 : _a.fetch_on_click,
                              "field-label": ((_b = column.select) == null ? void 0 : _b.field_label) ?? "name",
                              "field-value": ((_c = column.select) == null ? void 0 : _c.field_value) ?? "id",
                              options: (_d = column.select) == null ? void 0 : _d.options,
                              placeholder: column.placeholder,
                              remote: (_e = column.select) == null ? void 0 : _e.remote,
                              url: (_f = column.select) == null ? void 0 : _f.url,
                              onChange
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "fetch-on-click", "field-label", "field-value", "options", "placeholder", "remote", "url"])) : createCommentVNode("", true),
                            column.type === "password" ? (openBlock(), createBlock(_component_el_input, {
                              key: 3,
                              modelValue: form[column.name],
                              "onUpdate:modelValue": ($event) => form[column.name] = $event,
                              onChange,
                              type: "password",
                              "show-password": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                            column.type === "switch" ? (openBlock(), createBlock(_component_el_switch, {
                              key: 4,
                              modelValue: form[column.name],
                              "onUpdate:modelValue": ($event) => form[column.name] = $event,
                              onChange,
                              "active-icon": unref(check_default),
                              "inactive-icon": unref(close_default)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon"])) : createCommentVNode("", true),
                            column.type === "slot" ? renderSlot(_ctx.$slots, column.name, {
                              key: 5,
                              form
                            }) : createCommentVNode("", true)
                          ];
                        }),
                        _: 2
                      }, 1032, ["label", "prop"])) : createCommentVNode("", true),
                      ["checkbox"].includes(column.type) ? (openBlock(), createBlock(_component_el_form_item, {
                        key: 1,
                        prop: column.name
                      }, {
                        default: withCtx(() => [
                          column.type === "checkbox" ? (openBlock(), createBlock(_component_el_checkbox, {
                            key: 0,
                            modelValue: form[column.name],
                            "onUpdate:modelValue": ($event) => form[column.name] = $event,
                            onChange,
                            label: column.label
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["prop"])) : createCommentVNode("", true),
                      column.type === "slot:el-form-item" ? renderSlot(_ctx.$slots, column.name, {
                        key: 2,
                        form
                      }) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["span", "sm", "md", "lg", "xl"])) : createCommentVNode("", true)
                ], 64);
              }), 128))
            ]),
            _: 3
          }),
          createElementVNode("div", _hoisted_1$1, [
            createVNode(_component_el_button, {
              icon: unref(close_default),
              onClick: _cache[0] || (_cache[0] = ($event) => emits("back")),
              type: "danger",
              plain: ""
            }, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createTextVNode("Batal")
              ])),
              _: 1,
              __: [1]
            }, 8, ["icon"]),
            props.id ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              onClick: update,
              icon: unref(promotion_default),
              type: "primary",
              class: "ml-4"
            }, {
              default: withCtx(() => _cache[2] || (_cache[2] = [
                createTextVNode(" Perbaharui ")
              ])),
              _: 1,
              __: [2]
            }, 8, ["icon"])) : (openBlock(), createBlock(_component_el_button, {
              key: 1,
              onClick: store,
              icon: unref(promotion_default),
              type: "primary",
              class: "ml-4"
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" Simpan ")
              ])),
              _: 1,
              __: [3]
            }, 8, ["icon"]))
          ])
        ]),
        _: 3
      }, 8, ["model", "rules"]);
    };
  }
});
const _hoisted_1 = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" };
const _hoisted_2 = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" };
const _hoisted_3 = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" };
const _hoisted_4 = { class: "flex justify-end mt-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComTable",
  props: {
    apiRelations: {},
    apiColumns: {},
    apiQuery: {},
    apiOrder: {},
    editUrl: {},
    fetchUrl: {},
    removeUrl: {},
    tableColumns: {},
    viewUrl: {}
  },
  emits: ["tableSelections"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const data = ref([]);
    const totalData = ref(0);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const loading = ref(true);
    const state = reactive({
      data: {},
      collection: {
        data: []
      }
    });
    function changePage() {
      fetchingDataFromServer();
    }
    function fetchingDataFromServer() {
      loading.value = true;
      let url2 = props.fetchUrl;
      if (!/https?:\/\//i.test(props.fetchUrl)) {
        url2 = `${void 0}/${props.fetchUrl}`;
      }
      httpGet(url2, {
        params: {
          relations: props.apiRelations,
          columns: props.apiColumns,
          pagination_length: pageSize.value,
          page: currentPage.value,
          queries: props.apiQuery,
          order: props.apiOrder
        }
      }).then((result) => {
        loading.value = false;
        data.value = result.data.data.data;
        totalData.value = result.data.data.total;
        state.collection = result.data.data;
      }).catch((error) => {
        loading.value = false;
        httpHandleError(error);
      });
    }
    function handleSelectionChange(val) {
      emits(
        "tableSelections",
        val.map((item) => item.id)
      );
    }
    function refresh() {
      fetchingDataFromServer();
    }
    onMounted(() => {
      fetchingDataFromServer();
    });
    __expose({ refresh });
    return (_ctx, _cache) => {
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", null, [
        withDirectives((openBlock(), createBlock(_component_el_table, {
          data: data.value,
          onSelectionChange: handleSelectionChange,
          style: { "width": "100%" }
        }, {
          default: withCtx(() => [
            createVNode(_component_el_table_column, {
              type: "selection",
              width: "55",
              fixed: "left"
            }),
            _cache[10] || (_cache[10] = createTextVNode()),
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.tableColumns, (column, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                !column.value && column.type !== "slot" ? (openBlock(), createBlock(_component_el_table_column, {
                  key: 0,
                  prop: column.field,
                  label: column.label,
                  width: column.width,
                  align: column.align ?? "left"
                }, null, 8, ["prop", "label", "width", "align"])) : createCommentVNode("", true),
                _cache[2] || (_cache[2] = createTextVNode()),
                column.value && column.type !== "slot" ? (openBlock(), createBlock(_component_el_table_column, {
                  key: 1,
                  prop: column.field,
                  label: column.label,
                  width: column.width,
                  align: column.align ?? "left"
                }, {
                  default: withCtx((scope) => [
                    createTextVNode(toDisplayString(typeof column.value === "function" ? column.value(scope.row) : ""), 1)
                  ]),
                  _: 2
                }, 1032, ["prop", "label", "width", "align"])) : createCommentVNode("", true),
                _cache[3] || (_cache[3] = createTextVNode()),
                column.type === "slot" ? (openBlock(), createBlock(_component_el_table_column, {
                  key: 2,
                  prop: column.field,
                  label: column.label,
                  width: column.width,
                  align: column.align ?? "left"
                }, {
                  default: withCtx((scope) => [
                    renderSlot(_ctx.$slots, column.field, {
                      row: scope.row
                    })
                  ]),
                  _: 2
                }, 1032, ["prop", "label", "width", "align"])) : createCommentVNode("", true)
              ], 64);
            }), 128)),
            _cache[11] || (_cache[11] = createTextVNode()),
            createVNode(_component_el_table_column, {
              width: "55",
              fixed: "right"
            }, {
              default: withCtx((scope) => [
                createElementVNode("div", _hoisted_1, [
                  createVNode(_component_el_popover, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(more_filled_default))
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createElementVNode("ul", null, [
                        props.viewUrl ? (openBlock(), createBlock(_component_RouterLink, {
                          key: 0,
                          to: unref(url)("/" + unref(replaceString)(props.viewUrl, scope.row)),
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createElementVNode("li", _hoisted_2, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(view_default))
                                ]),
                                _: 1
                              }),
                              _cache[4] || (_cache[4] = createTextVNode()),
                              _cache[5] || (_cache[5] = createElementVNode("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : createCommentVNode("", true),
                        _cache[8] || (_cache[8] = createTextVNode()),
                        props.editUrl ? (openBlock(), createBlock(_component_RouterLink, {
                          key: 1,
                          to: unref(url)("/" + unref(replaceString)(props.editUrl ?? "", scope.row))
                        }, {
                          default: withCtx(() => [
                            createElementVNode("li", _hoisted_3, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(edit_default))
                                ]),
                                _: 1
                              }),
                              _cache[6] || (_cache[6] = createTextVNode()),
                              _cache[7] || (_cache[7] = createElementVNode("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : createCommentVNode("", true),
                        _cache[9] || (_cache[9] = createTextVNode()),
                        renderSlot(_ctx.$slots, "action", {
                          row: scope.row
                        })
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ])
              ]),
              _: 3
            })
          ]),
          _: 3,
          __: [10, 11]
        }, 8, ["data"])), [
          [_directive_loading, loading.value]
        ]),
        createElementVNode("div", _hoisted_4, [
          createVNode(_component_el_pagination, {
            "page-size": pageSize.value,
            "onUpdate:pageSize": _cache[0] || (_cache[0] = ($event) => pageSize.value = $event),
            "current-page": currentPage.value,
            "onUpdate:currentPage": _cache[1] || (_cache[1] = ($event) => currentPage.value = $event),
            total: totalData.value,
            "page-sizes": [10, 25, 50, 75, 100],
            onChange: changePage,
            layout: "sizes, total, prev, pager, next"
          }, null, 8, ["page-size", "current-page", "total"])
        ])
      ]);
    };
  }
});
export {
  ComContainer,
  _sfc_main$3 as ComDialogConfirmation,
  _sfc_main$1 as ComForm,
  _sfc_main$2 as ComSelect,
  _sfc_main as ComTable,
  beautyDate,
  beautyDateTime,
  convertHexToString,
  convertStringToHex,
  csl,
  defaultType,
  getAppConfig,
  getBrowserType,
  getInitials,
  getRefreshToken,
  getToken,
  htmlToPlainText,
  http,
  httpDelete,
  httpGet,
  httpHandleError,
  httpPost,
  httpPut,
  httpStatusCode,
  httpValidation,
  message,
  minuteToTime,
  numberFormat,
  pascalCase,
  removeRefreshToken,
  replaceString,
  routeParam,
  setAppConfig,
  setRefreshToken,
  titleCase,
  url,
  urlToKebab,
  waiting
};
//# sourceMappingURL=vue-instant.es.js.map
