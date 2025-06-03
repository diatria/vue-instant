import { createElementBlock as k, openBlock as u, renderSlot as q, defineComponent as $, mergeModels as te, useModel as ye, resolveComponent as _, createBlock as m, withCtx as f, createElementVNode as v, createTextVNode as c, toDisplayString as se, createVNode as w, inject as ue, ref as E, computed as re, onMounted as X, Fragment as F, renderList as Z, unref as h, reactive as de, onBeforeMount as we, createCommentVNode as y, resolveDirective as he, withDirectives as be } from "vue";
import ke from "axios";
import Q from "dayjs";
import { ElMessage as I } from "element-plus";
import { snakeCase as ee, startCase as pe, kebabCase as xe, get as Ce } from "lodash";
const Ve = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Se = {}, Ue = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function $e(e, t) {
  return u(), k("div", Ue, [
    q(e.$slots, "default")
  ]);
}
const ht = /* @__PURE__ */ Ve(Se, [["render", $e]]), De = { class: "dialog-footer" }, bt = /* @__PURE__ */ $({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ te({
    message: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ te(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const n = ye(e, "modelValue"), s = e, o = t;
    return (l, p) => {
      const b = _("el-button"), x = _("el-dialog");
      return u(), m(x, {
        modelValue: n.value,
        "onUpdate:modelValue": p[2] || (p[2] = (g) => n.value = g),
        title: "Penting!",
        width: "500"
      }, {
        footer: f(() => [
          v("div", De, [
            w(b, {
              onClick: p[0] || (p[0] = (g) => o("update:modelValue", !1))
            }, {
              default: f(() => p[3] || (p[3] = [
                c("Cancel")
              ])),
              _: 1,
              __: [3]
            }),
            p[5] || (p[5] = c()),
            w(b, {
              type: "primary",
              onClick: p[1] || (p[1] = (g) => o("onConfirm", !0))
            }, {
              default: f(() => p[4] || (p[4] = [
                c("Confirm")
              ])),
              _: 1,
              __: [4]
            })
          ])
        ]),
        default: f(() => [
          v("span", null, se(s.message), 1),
          p[6] || (p[6] = c())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
function j() {
  throw new Error("App config is not initialized");
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var oe;
(function(e) {
  e.pop = "pop", e.push = "push";
})(oe || (oe = {}));
var ne;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ne || (ne = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var ae;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ae || (ae = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const Ee = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function fe() {
  return ue(Ee);
}
function ce(e) {
  return ue(Me);
}
function Ne(e, t) {
  return e === void 0 ? "-" : t ? Q(e).format(t) : Q(e).format("DD MMM YYYY");
}
function ze(e) {
  return Q(e).format("DD MMM YYYY HH:mm");
}
function Be(e, t) {
  t ? console.log(t, e) : console.log(e);
}
function Te(e) {
  const t = typeof e == "number" ? e.toString() : e;
  return Array.from(`csl:${t}`).map((n) => n.charCodeAt(0).toString(16)).join("");
}
function Oe(e) {
  let t = "";
  for (let n = 0; n < e.length; n += 2)
    t += String.fromCharCode(parseInt(e.substr(n, 2), 16));
  return t.replace("csl:", "");
}
function qe(e) {
  if (["text", "date", "dateTime"].includes(e)) return "";
  if (e === "number") return 0;
}
function Fe() {
  const e = (t) => t.test(navigator.userAgent);
  return e(/opr\//i) ? "Opera" : e(/edg/i) ? "Microsoft Edge" : e(/chrome|chromium|crios/i) ? "Google Chrome" : e(/firefox|fxios/i) ? "Mozilla Firefox" : e(/safari/i) ? "Apple Safari" : e(/trident/i) ? "Microsoft Internet Explorer" : e(/ucbrowser/i) ? "UC Browser" : e(/samsungbrowser/i) ? "Samsung Browser" : "Unknown browser";
}
function Pe(e) {
  return e.split(" ").map((t) => t[0]).join("").toUpperCase();
}
function je() {
  const e = j().tokenName, t = ee(e);
  return localStorage.getItem(`${t}_refresh_token`) ?? "";
}
function me() {
  const e = j().tokenName;
  return localStorage.getItem(`access_token_${e}`) ?? "";
}
function O(e) {
  var n;
  const t = fe();
  return ((n = e.response) == null ? void 0 : n.data.code) === "FORBIDDEN" && t.push("/403"), e.response ? P(e.response.data.message || "", "error") : P(e.message, "error");
}
function Ae(e) {
  return e === "OK" || e === "Success" ? 200 : e === "Created" ? 201 : e === "Unauthorized" ? 401 : e === "Unauthorized" ? 403 : 404;
}
function J(e) {
  const n = [
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
  ].find((s) => s.code === e.status);
  return n ? n.type === "success" : !1;
}
function A(e) {
  const t = e == null ? void 0 : e.includes("http://"), n = e == null ? void 0 : e.includes("https://");
  let s = j().apiUrl;
  return (t || n) && (s = e), ke.create({
    baseURL: s,
    timeout: 6e4,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${me()}`
    },
    withCredentials: !0
  });
}
function H(e, t) {
  return new Promise((n, s) => {
    A(e).get(e, t).then((o) => n(o)).catch((o) => {
      s(o);
    });
  });
}
function _e(e, t, n) {
  return new Promise((s, o) => {
    A(e).post(e, t, n).then((l) => s(l)).catch((l) => {
      o(l);
    });
  });
}
function Ie(e, t) {
  return new Promise((n, s) => {
    A().delete(e, t).then((o) => n(o)).catch((o) => {
      s(o);
    });
  });
}
function ge(e, t, n) {
  return new Promise((s, o) => {
    A().put(e, t, n).then((l) => s(l)).catch((l) => {
      o(l);
    });
  });
}
function Le(e) {
  const t = document.createElement("div");
  return t.innerHTML = e, t.textContent || t.innerText || "";
}
function P(e, t) {
  t === "success" && I.success({ grouping: !0, message: e }), t === "warning" && I.warning({ grouping: !0, message: e }), t === "info" && I.info({ grouping: !0, message: e }), t === "error" && I.error({ grouping: !0, message: e });
}
function He(e, t) {
  typeof e == "string" && (e = Number(e));
  let n = e % 60, s = (e - n) / 60;
  return t && (n = n < 10 ? `0${n}` : n, s = s < 10 ? `0${s}` : s), `${s}:${n}:00`;
}
function Re(e, t, n) {
  const s = "id-ID", o = "IDR";
  return new Intl.NumberFormat(t ?? s, {
    style: (n == null ? void 0 : n.style) ?? "currency",
    currency: (n == null ? void 0 : n.currency) ?? o,
    maximumFractionDigits: 0
  }).format(e);
}
function Ye(e) {
  return pe(e);
}
function Ke() {
  const e = ee(j().tokenName);
  localStorage.removeItem(`${e}_refresh_token`);
}
function W(e, t) {
  if (!t) return e;
  const n = /\{(\w+?)\}/g, s = [];
  let o;
  for (; (o = n.exec(e)) !== null; )
    s.push(o[1]);
  let l = e;
  return s.forEach((p) => {
    l = l.replace(`{${p}}`, t[p]);
  }), l ?? "";
}
function Ge(e) {
  var n;
  return ((n = ce().params[e]) == null ? void 0 : n.toString()) || null;
}
function Qe(e) {
  const t = ee(j().tokenName);
  localStorage.setItem(`${t}_refresh_token`, e);
}
function L(e) {
  let t = e;
  return t = t.replace(/\/\//g, "/"), t;
}
function Je(e) {
  return `/${xe(e)}`;
}
function We(e) {
  return pe(e);
}
function Xe(e, t = 500) {
  return new Promise((n) => {
    setTimeout(() => {
      n(e());
    }, t || 500);
  });
}
const kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  beautyDate: Ne,
  beautyDateTime: ze,
  convertHexToString: Oe,
  convertStringToHex: Te,
  csl: Be,
  defaultType: qe,
  getBrowserType: Fe,
  getInitials: Pe,
  getRefreshToken: je,
  getToken: me,
  htmlToPlainText: Le,
  http: A,
  httpDelete: Ie,
  httpGet: H,
  httpHandleError: O,
  httpPost: _e,
  httpPut: ge,
  httpStatusCode: Ae,
  httpValidation: J,
  message: P,
  minuteToTime: He,
  numberFormat: Re,
  pascalCase: Ye,
  removeRefreshToken: Ke,
  replaceString: W,
  routeParam: Ge,
  setRefreshToken: Qe,
  titleCase: We,
  url: L,
  urlToKebab: Je,
  waiting: Xe
}, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.3.1 */
var Ze = /* @__PURE__ */ $({
  name: "Check",
  __name: "check",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), et = Ze, tt = /* @__PURE__ */ $({
  name: "Close",
  __name: "close",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), le = tt, rt = /* @__PURE__ */ $({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      v("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), ot = rt, nt = /* @__PURE__ */ $({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), at = nt, lt = /* @__PURE__ */ $({
  name: "Promotion",
  __name: "promotion",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
      })
    ]));
  }
}), ie = lt, it = /* @__PURE__ */ $({
  name: "View",
  __name: "view",
  setup(e) {
    return (t, n) => (u(), k("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), st = it;
const ut = /* @__PURE__ */ $({
  __name: "ComSelect",
  props: {
    url: { type: String, required: !1 },
    fieldLabel: { type: String, required: !1 },
    fieldValue: { type: String, required: !1 },
    options: { type: Array, required: !1 },
    autoFetch: { type: Boolean, required: !1, default: !0 },
    disabled: { type: Boolean, required: !1, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: n }) {
    const s = n, o = e, l = E([]), p = E(""), b = re(() => o.fieldLabel ?? "name"), x = re(() => o.fieldValue ?? "id");
    function g() {
      H(`undefined/${o.url}`).then((M) => {
        l.value = M.data.data;
      });
    }
    return X(() => {
      o.url && o.autoFetch && g(), o.options && (l.value = o.options);
    }), t({
      fetchingDataFromServer: g
    }), (M, U) => {
      const C = _("el-option"), N = _("el-select");
      return u(), m(N, {
        modelValue: p.value,
        "onUpdate:modelValue": U[0] || (U[0] = (V) => p.value = V),
        disabled: o.disabled,
        onChange: U[1] || (U[1] = (V) => s("update:modelValue", V)),
        placeholder: "Select",
        filterable: ""
      }, {
        default: f(() => [
          (u(!0), k(F, null, Z(l.value, (V) => (u(), m(C, {
            key: V[x.value],
            label: h(Ce)(V, b.value),
            value: V[x.value] ?? V.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled"]);
    };
  }
}), dt = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" }, xt = /* @__PURE__ */ $({
  __name: "ComForm",
  props: {
    fetchUrl: { type: String, required: !0 },
    // Untuk mengambil data saat dalam keadaan edit
    storeUrl: { type: String, required: !0 },
    // Untuk menyimpan data
    backUrl: { type: String, required: !1 },
    // Untuk kembali kehalaman sebelumnnya
    paramsUrl: { type: String, required: !1, default: "" },
    // Untuk menambah parameter pada url
    redirectAfterStoreUrl: { type: Function, required: !1 },
    columns: {
      type: Array,
      required: !0
    },
    rules: { type: Object, required: !1 }
  },
  emits: ["store", "update", "delete", "form"],
  setup(e, { expose: t, emit: n }) {
    const s = n, o = e, l = de({}), p = E(), b = ce(), x = fe();
    function g(a, r) {
      if (typeof a == "number") return a;
      if (typeof a == "object" && r) return a[r];
      if (typeof a == "object") return a.default;
    }
    function M() {
      H(
        `undefined/${o.fetchUrl}/${b.params.id}${o.paramsUrl}`
      ).then((a) => Object.assign(l, a.data.data)).catch(O);
    }
    function U() {
      o.columns.forEach((a) => {
        a.type === "select" || a.type === "text" || a.type === "textarea" || a.type === "password" ? l[a.name] = a.value ?? "" : a.type === "switch" || a.type === "checkbox" ? l[a.name] = a.value ?? 0 : (a.type === "slot" || a.type === "hide") && (l[a.name] = a.value ?? "");
      }), console.log("initializeForm", l, o.columns);
    }
    function C() {
      s("form", l);
    }
    async function N() {
      p.value && await p.value.validate((a) => {
        console.log("valid", a), a && _e(`undefined/${o.storeUrl}${o.paramsUrl}`, l).then((r) => {
          if (J(r)) {
            if (P(r.data.message, "success"), s("store", r.data.data), o.redirectAfterStoreUrl)
              return x.push(o.redirectAfterStoreUrl(r.data.data));
            o.backUrl && x.push(`/${o.backUrl}`);
          }
        }).catch(O);
      });
    }
    async function V() {
      p.value && await p.value.validate((a) => {
        console.log("valid", a), a && ge(
          `undefined/${o.storeUrl}/${b.params.id}/${o.paramsUrl}`,
          l
        ).then((r) => {
          J(r) && (P(r.data.message, "success"), s("store", r.data.data), o.backUrl && x.push(`/${o.backUrl}`));
        }).catch(O);
      });
    }
    return we(() => {
      console.log("onBeforeMount"), U();
    }), X(() => {
      b.params.id && M(), U();
    }), t({
      initializeForm: U
    }), (a, r) => {
      const D = _("el-input"), z = _("el-switch"), B = _("el-form-item"), R = _("el-checkbox"), Y = _("el-col"), K = _("el-row"), T = _("el-button"), d = _("RouterLink"), G = _("el-form");
      return u(), m(G, {
        model: l,
        rules: o.rules,
        ref_key: "ruleFormRef",
        ref: p,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: f(() => [
          w(K, { gutter: 20 }, {
            default: f(() => [
              (u(!0), k(F, null, Z(o.columns, (i, ve) => (u(), k(F, { key: ve }, [
                ["hide"].includes(i.type) ? y("", !0) : (u(), m(Y, {
                  key: 0,
                  span: g(i.grid ?? 24),
                  sm: g(i.grid ?? 24, "sm"),
                  md: g(i.grid ?? 24, "md"),
                  lg: g(i.grid ?? 24, "lg"),
                  xl: g(i.grid ?? 24, "xl")
                }, {
                  default: f(() => [
                    ["checkbox", "slot:el-form-item"].includes(i.type) ? y("", !0) : (u(), m(B, {
                      key: 0,
                      label: i.label,
                      prop: i.name
                    }, {
                      default: f(() => [
                        i.type === "text" ? (u(), m(D, {
                          key: 0,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          disabled: i.disabled,
                          onChange: C
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : y("", !0),
                        r[0] || (r[0] = c()),
                        i.type === "textarea" ? (u(), m(D, {
                          key: 1,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          type: "textarea",
                          disabled: i.disabled,
                          onChange: C
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : y("", !0),
                        r[1] || (r[1] = c()),
                        i.type === "select" ? (u(), m(ut, {
                          key: 2,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          url: i.url,
                          "field-label": i.field_label ?? "name",
                          "field-value": i.field_value ?? "id",
                          options: i.options,
                          disabled: i.disabled,
                          onChange: C
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "url", "field-label", "field-value", "options", "disabled"])) : y("", !0),
                        r[2] || (r[2] = c()),
                        i.type === "password" ? (u(), m(D, {
                          key: 3,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          onChange: C,
                          type: "password",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : y("", !0),
                        r[3] || (r[3] = c()),
                        i.type === "switch" ? (u(), m(z, {
                          key: 4,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          onChange: C,
                          "active-icon": h(et),
                          "inactive-icon": h(le)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon"])) : y("", !0),
                        r[4] || (r[4] = c()),
                        i.type === "slot" ? q(a.$slots, i.name, {
                          key: 5,
                          form: l
                        }) : y("", !0)
                      ]),
                      _: 2,
                      __: [0, 1, 2, 3, 4]
                    }, 1032, ["label", "prop"])),
                    r[5] || (r[5] = c()),
                    ["checkbox"].includes(i.type) ? (u(), m(B, {
                      key: 1,
                      prop: i.name
                    }, {
                      default: f(() => [
                        i.type === "checkbox" ? (u(), m(R, {
                          key: 0,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (S) => l[i.name] = S,
                          onChange: C,
                          label: i.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : y("", !0)
                      ]),
                      _: 2
                    }, 1032, ["prop"])) : y("", !0),
                    r[6] || (r[6] = c()),
                    i.type === "slot:el-form-item" ? q(a.$slots, i.name, {
                      key: 2,
                      form: l
                    }) : y("", !0)
                  ]),
                  _: 2,
                  __: [5, 6]
                }, 1032, ["span", "sm", "md", "lg", "xl"]))
              ], 64))), 128))
            ]),
            _: 3
          }),
          v("div", dt, [
            w(d, {
              to: h(L)("/" + o.backUrl)
            }, {
              default: f(() => [
                w(T, {
                  icon: h(le),
                  type: "danger",
                  plain: ""
                }, {
                  default: f(() => r[7] || (r[7] = [
                    c("Batal")
                  ])),
                  _: 1,
                  __: [7]
                }, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["to"]),
            r[10] || (r[10] = c()),
            h(b).params.id ? (u(), m(T, {
              key: 0,
              onClick: V,
              icon: h(ie),
              type: "primary",
              class: "ml-4"
            }, {
              default: f(() => r[8] || (r[8] = [
                c("Perbaharui")
              ])),
              _: 1,
              __: [8]
            }, 8, ["icon"])) : (u(), m(T, {
              key: 1,
              onClick: N,
              icon: h(ie),
              type: "primary",
              class: "ml-4"
            }, {
              default: f(() => r[9] || (r[9] = [
                c("Simpan")
              ])),
              _: 1,
              __: [9]
            }, 8, ["icon"]))
          ])
        ]),
        _: 3
      }, 8, ["model", "rules"]);
    };
  }
}), pt = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" }, ft = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, ct = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, mt = { class: "flex justify-end mt-4" }, Ct = /* @__PURE__ */ $({
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
  setup(e, { expose: t, emit: n }) {
    const s = n, o = e, l = E([]), p = E(0), b = E(10), x = E(1), g = E(!0), M = de({
      data: {},
      collection: {
        data: []
      }
    });
    function U() {
      C();
    }
    function C() {
      g.value = !0;
      let a = o.fetchUrl;
      /https?:\/\//i.test(o.fetchUrl) || (a = `undefined/${o.fetchUrl}`), H(a, {
        params: {
          relations: o.apiRelations,
          columns: o.apiColumns,
          pagination_length: b.value,
          page: x.value,
          queries: o.apiQuery,
          order: o.apiOrder
        }
      }).then((r) => {
        g.value = !1, l.value = r.data.data.data, p.value = r.data.data.total, M.collection = r.data.data;
      }).catch((r) => {
        g.value = !1, O(r);
      });
    }
    function N(a) {
      s(
        "tableSelections",
        a.map((r) => r.id)
      );
    }
    function V() {
      C();
    }
    return X(() => {
      C();
    }), t({ refresh: V }), (a, r) => {
      const D = _("el-table-column"), z = _("el-icon"), B = _("RouterLink"), R = _("el-popover"), Y = _("el-table"), K = _("el-pagination"), T = he("loading");
      return u(), k("div", null, [
        be((u(), m(Y, {
          data: l.value,
          onSelectionChange: N,
          style: { width: "100%" }
        }, {
          default: f(() => [
            w(D, {
              type: "selection",
              width: "55",
              fixed: "left"
            }),
            r[10] || (r[10] = c()),
            (u(!0), k(F, null, Z(o.tableColumns, (d, G) => (u(), k(F, { key: G }, [
              !d.value && d.type !== "slot" ? (u(), m(D, {
                key: 0,
                prop: d.field,
                label: d.label,
                width: d.width,
                align: d.align ?? "left"
              }, null, 8, ["prop", "label", "width", "align"])) : y("", !0),
              r[2] || (r[2] = c()),
              d.value && d.type !== "slot" ? (u(), m(D, {
                key: 1,
                prop: d.field,
                label: d.label,
                width: d.width,
                align: d.align ?? "left"
              }, {
                default: f((i) => [
                  c(se(typeof d.value == "function" ? d.value(i.row) : ""), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : y("", !0),
              r[3] || (r[3] = c()),
              d.type === "slot" ? (u(), m(D, {
                key: 2,
                prop: d.field,
                label: d.label,
                width: d.width,
                align: d.align ?? "left"
              }, {
                default: f((i) => [
                  q(a.$slots, d.field, {
                    row: i.row
                  })
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : y("", !0)
            ], 64))), 128)),
            r[11] || (r[11] = c()),
            w(D, {
              width: "55",
              fixed: "right"
            }, {
              default: f((d) => [
                v("div", pt, [
                  w(R, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: f(() => [
                      w(z, null, {
                        default: f(() => [
                          w(h(at))
                        ]),
                        _: 1
                      })
                    ]),
                    default: f(() => [
                      v("ul", null, [
                        o.viewUrl ? (u(), m(B, {
                          key: 0,
                          to: h(L)("/" + h(W)(o.viewUrl, d.row)),
                          target: "_blank"
                        }, {
                          default: f(() => [
                            v("li", ft, [
                              w(z, null, {
                                default: f(() => [
                                  w(h(st))
                                ]),
                                _: 1
                              }),
                              r[4] || (r[4] = c()),
                              r[5] || (r[5] = v("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : y("", !0),
                        r[8] || (r[8] = c()),
                        o.editUrl ? (u(), m(B, {
                          key: 1,
                          to: h(L)("/" + h(W)(o.editUrl ?? "", d.row))
                        }, {
                          default: f(() => [
                            v("li", ct, [
                              w(z, null, {
                                default: f(() => [
                                  w(h(ot))
                                ]),
                                _: 1
                              }),
                              r[6] || (r[6] = c()),
                              r[7] || (r[7] = v("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : y("", !0),
                        r[9] || (r[9] = c()),
                        q(a.$slots, "action", {
                          row: d.row
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
          [T, g.value]
        ]),
        v("div", mt, [
          w(K, {
            "page-size": b.value,
            "onUpdate:pageSize": r[0] || (r[0] = (d) => b.value = d),
            "current-page": x.value,
            "onUpdate:currentPage": r[1] || (r[1] = (d) => x.value = d),
            total: p.value,
            "page-sizes": [10, 25, 50, 75, 100],
            onChange: U,
            layout: "sizes, total, prev, pager, next"
          }, null, 8, ["page-size", "current-page", "total"])
        ])
      ]);
    };
  }
});
export {
  ht as ComContainer,
  bt as ComDialogConfirmation,
  xt as ComForm,
  ut as ComSelect,
  Ct as ComTable,
  kt as helpers
};
