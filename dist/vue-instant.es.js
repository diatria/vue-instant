import { createElementBlock as C, openBlock as s, renderSlot as P, defineComponent as S, mergeModels as ne, useModel as xe, resolveComponent as _, createBlock as c, withCtx as f, createElementVNode as v, createTextVNode as y, toDisplayString as ce, createVNode as w, inject as me, ref as E, computed as le, onMounted as te, Fragment as N, renderList as R, unref as b, reactive as _e, onBeforeMount as Ce, createCommentVNode as h, resolveDirective as Ve, withDirectives as Se } from "vue";
import Ue from "axios";
import J from "dayjs";
import { ElMessage as H } from "element-plus";
import { snakeCase as re, startCase as ge, kebabCase as $e, get as ie } from "lodash";
const De = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [u, o] of t)
    a[u] = o;
  return a;
}, Me = {}, Ee = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function Ne(e, t) {
  return s(), C("div", Ee, [
    P(e.$slots, "default")
  ]);
}
const Vt = /* @__PURE__ */ De(Me, [["render", Ne]]), ze = { class: "dialog-footer" }, St = /* @__PURE__ */ S({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ ne({
    message: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ ne(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const a = xe(e, "modelValue"), u = e, o = t;
    return (l, d) => {
      const k = _("el-button"), x = _("el-dialog");
      return s(), c(x, {
        modelValue: a.value,
        "onUpdate:modelValue": d[2] || (d[2] = (g) => a.value = g),
        title: "Penting!",
        width: "500"
      }, {
        footer: f(() => [
          v("div", ze, [
            w(k, {
              onClick: d[0] || (d[0] = (g) => o("update:modelValue", !1))
            }, {
              default: f(() => d[3] || (d[3] = [
                y("Cancel")
              ])),
              _: 1,
              __: [3]
            }),
            d[5] || (d[5] = y()),
            w(k, {
              type: "primary",
              onClick: d[1] || (d[1] = (g) => o("onConfirm", !0))
            }, {
              default: f(() => d[4] || (d[4] = [
                y("Confirm")
              ])),
              _: 1,
              __: [4]
            })
          ])
        ]),
        default: f(() => [
          v("span", null, ce(u.message), 1),
          d[6] || (d[6] = y())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
let X;
function Be(e) {
  X = e;
}
function z() {
  if (!X) throw new Error("App config is not initialized. Did you forget to call setAppConfig() in vue-instant ?");
  return X;
}
const Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getAppConfig: z,
  setAppConfig: Be
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var se;
(function(e) {
  e.pop = "pop", e.push = "push";
})(se || (se = {}));
var ue;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ue || (ue = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var de;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(de || (de = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const Oe = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Te = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ve() {
  return me(Oe);
}
function he(e) {
  return me(Te);
}
function Fe(e, t) {
  return e === void 0 ? "-" : t ? J(e).format(t) : J(e).format("DD MMM YYYY");
}
function je(e) {
  return J(e).format("DD MMM YYYY HH:mm");
}
function Pe(e, t) {
  t ? console.log(t, e) : console.log(e);
}
function Ae(e) {
  const t = typeof e == "number" ? e.toString() : e;
  return Array.from(`csl:${t}`).map((a) => a.charCodeAt(0).toString(16)).join("");
}
function Ie(e) {
  let t = "";
  for (let a = 0; a < e.length; a += 2)
    t += String.fromCharCode(parseInt(e.substr(a, 2), 16));
  return t.replace("csl:", "");
}
function qe(e) {
  if (["text", "date", "dateTime"].includes(e)) return "";
  if (e === "number") return 0;
}
function Le() {
  const e = (t) => t.test(navigator.userAgent);
  return e(/opr\//i) ? "Opera" : e(/edg/i) ? "Microsoft Edge" : e(/chrome|chromium|crios/i) ? "Google Chrome" : e(/firefox|fxios/i) ? "Mozilla Firefox" : e(/safari/i) ? "Apple Safari" : e(/trident/i) ? "Microsoft Internet Explorer" : e(/ucbrowser/i) ? "UC Browser" : e(/samsungbrowser/i) ? "Samsung Browser" : "Unknown browser";
}
function He(e) {
  return e.split(" ").map((t) => t[0]).join("").toUpperCase();
}
function Re() {
  const e = z().tokenName, t = re(e);
  return localStorage.getItem(`${t}_refresh_token`) ?? "";
}
function ye() {
  const e = z().tokenName;
  return localStorage.getItem(`access_token_${e}`) ?? "";
}
function j(e) {
  var a;
  const t = ve();
  return ((a = e.response) == null ? void 0 : a.data.code) === "FORBIDDEN" && t.push("/403"), e.response ? I(e.response.data.message || "", "error") : I(e.message, "error");
}
function Ye(e) {
  return e === "OK" || e === "Success" ? 200 : e === "Created" ? 201 : e === "Unauthorized" ? 401 : e === "Unauthorized" ? 403 : 404;
}
function Z(e) {
  const a = [
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
  ].find((u) => u.code === e.status);
  return a ? a.type === "success" : !1;
}
function q(e) {
  const t = e == null ? void 0 : e.includes("http://"), a = e == null ? void 0 : e.includes("https://");
  let u = z().apiUrl;
  return (t || a) && (u = e), Ue.create({
    baseURL: u,
    timeout: 6e4,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ye()}`
    },
    withCredentials: !0
  });
}
function A(e, t) {
  return new Promise((a, u) => {
    q(e).get(e, t).then((o) => a(o)).catch((o) => {
      u(o);
    });
  });
}
function be(e, t, a) {
  return new Promise((u, o) => {
    q(e).post(e, t, a).then((l) => u(l)).catch((l) => {
      o(l);
    });
  });
}
function Ke(e, t) {
  return new Promise((a, u) => {
    q().delete(e, t).then((o) => a(o)).catch((o) => {
      u(o);
    });
  });
}
function we(e, t, a) {
  return new Promise((u, o) => {
    q().put(e, t, a).then((l) => u(l)).catch((l) => {
      o(l);
    });
  });
}
function Ge(e) {
  const t = document.createElement("div");
  return t.innerHTML = e, t.textContent || t.innerText || "";
}
function I(e, t) {
  t === "success" && H.success({ grouping: !0, message: e }), t === "warning" && H.warning({ grouping: !0, message: e }), t === "info" && H.info({ grouping: !0, message: e }), t === "error" && H.error({ grouping: !0, message: e });
}
function Qe(e, t) {
  typeof e == "string" && (e = Number(e));
  let a = e % 60, u = (e - a) / 60;
  return t && (a = a < 10 ? `0${a}` : a, u = u < 10 ? `0${u}` : u), `${u}:${a}:00`;
}
function We(e, t, a) {
  const u = "id-ID", o = "IDR";
  return new Intl.NumberFormat(t ?? u, {
    style: (a == null ? void 0 : a.style) ?? "currency",
    currency: (a == null ? void 0 : a.currency) ?? o,
    maximumFractionDigits: 0
  }).format(e);
}
function Je(e) {
  return ge(e);
}
function Xe() {
  const e = re(z().tokenName);
  localStorage.removeItem(`${e}_refresh_token`);
}
function ee(e, t) {
  if (!t) return e;
  const a = /\{(\w+?)\}/g, u = [];
  let o;
  for (; (o = a.exec(e)) !== null; )
    u.push(o[1]);
  let l = e;
  return u.forEach((d) => {
    l = l.replace(`{${d}}`, t[d]);
  }), l ?? "";
}
function Ze(e) {
  var a;
  return ((a = he().params[e]) == null ? void 0 : a.toString()) || null;
}
function et(e) {
  const t = re(z().tokenName);
  localStorage.setItem(`${t}_refresh_token`, e);
}
function Y(e) {
  let t = e;
  return t = t.replace(/\/\//g, "/"), t;
}
function tt(e) {
  return `/${$e(e)}`;
}
function rt(e) {
  return ge(e);
}
function ot(e, t = 500) {
  return new Promise((a) => {
    setTimeout(() => {
      a(e());
    }, t || 500);
  });
}
const $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  beautyDate: Fe,
  beautyDateTime: je,
  convertHexToString: Ie,
  convertStringToHex: Ae,
  csl: Pe,
  defaultType: qe,
  getBrowserType: Le,
  getInitials: He,
  getRefreshToken: Re,
  getToken: ye,
  htmlToPlainText: Ge,
  http: q,
  httpDelete: Ke,
  httpGet: A,
  httpHandleError: j,
  httpPost: be,
  httpPut: we,
  httpStatusCode: Ye,
  httpValidation: Z,
  message: I,
  minuteToTime: Qe,
  numberFormat: We,
  pascalCase: Je,
  removeRefreshToken: Xe,
  replaceString: ee,
  routeParam: Ze,
  setRefreshToken: et,
  titleCase: rt,
  url: Y,
  urlToKebab: tt,
  waiting: ot
}, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.3.1 */
var at = /* @__PURE__ */ S({
  name: "Check",
  __name: "check",
  setup(e) {
    return (t, a) => (s(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), nt = at, lt = /* @__PURE__ */ S({
  name: "Close",
  __name: "close",
  setup(e) {
    return (t, a) => (s(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), pe = lt, it = /* @__PURE__ */ S({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (t, a) => (s(), C("svg", {
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
}), st = it, ut = /* @__PURE__ */ S({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (t, a) => (s(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), dt = ut, pt = /* @__PURE__ */ S({
  name: "Promotion",
  __name: "promotion",
  setup(e) {
    return (t, a) => (s(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
      })
    ]));
  }
}), fe = pt, ft = /* @__PURE__ */ S({
  name: "View",
  __name: "view",
  setup(e) {
    return (t, a) => (s(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      v("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), ct = ft;
const mt = /* @__PURE__ */ S({
  __name: "ComSelect",
  props: {
    url: {},
    remoteSearch: {},
    fieldLabel: {},
    fieldValue: {},
    options: {},
    autoFetch: { type: Boolean },
    disabled: { type: Boolean },
    remote: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const u = a, o = e, l = E([]), d = E(""), k = le(() => o.fieldLabel ?? "name"), x = le(() => o.fieldValue ?? "id");
    function g() {
      A(`undefined/${o.url}`).then((V) => {
        l.value = V.data.data;
      });
    }
    function B(V) {
      var m, U;
      A(`undefined/${o.url}`, {
        params: {
          queries: [
            {
              field: (m = o.remoteSearch) == null ? void 0 : m.field,
              value: V,
              strict: ((U = o.remoteSearch) == null ? void 0 : U.strict) ?? !1
            }
          ],
          limit: 10
        }
      }).then((M) => {
        l.value = M.data.data;
      });
    }
    return te(() => {
      o.url && o.autoFetch && g(), o.options && (l.value = o.options);
    }), t({
      fetchingDataFromServer: g
    }), (V, m) => {
      const U = _("el-option"), M = _("el-select");
      return o.remote ? (s(), c(M, {
        key: 0,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (r) => d.value = r),
        disabled: o.disabled,
        "remote-method": B,
        onChange: m[1] || (m[1] = (r) => u("update:modelValue", r)),
        placeholder: "Select",
        remote: "",
        filterable: "",
        "remote-show-suffix": ""
      }, {
        default: f(() => [
          (s(!0), C(N, null, R(l.value, (r) => (s(), c(U, {
            key: r[x.value],
            label: b(ie)(r, k.value),
            value: r[x.value] ?? r.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled"])) : (s(), c(M, {
        key: 1,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (r) => d.value = r),
        disabled: o.disabled,
        onChange: m[3] || (m[3] = (r) => u("update:modelValue", r)),
        placeholder: "Select",
        filterable: ""
      }, {
        default: f(() => [
          (s(!0), C(N, null, R(l.value, (r) => (s(), c(U, {
            key: r[x.value],
            label: b(ie)(r, k.value),
            value: r[x.value] ?? r.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled"]));
    };
  }
}), _t = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" }, Dt = /* @__PURE__ */ S({
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
  setup(e, { expose: t, emit: a }) {
    const u = a, o = e, l = _e({}), d = E(), k = he(), x = ve();
    function g(r, n) {
      if (typeof r == "number") return r;
      if (typeof r == "object" && n) return r[n];
      if (typeof r == "object") return r.default;
    }
    function B() {
      A(
        `undefined/${o.fetchUrl}/${k.params.id}${o.paramsUrl}`
      ).then((r) => Object.assign(l, r.data.data)).catch(j);
    }
    function V() {
      o.columns.forEach((r) => {
        r.type === "select" || r.type === "text" || r.type === "textarea" || r.type === "password" ? l[r.name] = r.value ?? "" : r.type === "switch" || r.type === "checkbox" ? l[r.name] = r.value ?? 0 : (r.type === "slot" || r.type === "hide") && (l[r.name] = r.value ?? "");
      }), console.log("initializeForm", l, o.columns);
    }
    function m() {
      u("form", l);
    }
    async function U() {
      d.value && await d.value.validate((r) => {
        console.log("valid", r), r && be(`undefined/${o.storeUrl}${o.paramsUrl}`, l).then((n) => {
          if (Z(n)) {
            if (I(n.data.message, "success"), u("store", n.data.data), o.redirectAfterStoreUrl)
              return x.push(o.redirectAfterStoreUrl(n.data.data));
            o.backUrl && x.push(`/${o.backUrl}`);
          }
        }).catch(j);
      });
    }
    async function M() {
      d.value && await d.value.validate((r) => {
        console.log("valid", r), r && we(
          `undefined/${o.storeUrl}/${k.params.id}/${o.paramsUrl}`,
          l
        ).then((n) => {
          Z(n) && (I(n.data.message, "success"), u("store", n.data.data), o.backUrl && x.push(`/${o.backUrl}`));
        }).catch(j);
      });
    }
    return Ce(() => {
      console.log("onBeforeMount"), V();
    }), te(() => {
      k.params.id && B(), V();
    }), t({
      initializeForm: V
    }), (r, n) => {
      const $ = _("el-input"), O = _("el-switch"), T = _("el-form-item"), K = _("el-checkbox"), G = _("el-col"), Q = _("el-row"), F = _("el-button"), p = _("RouterLink"), W = _("el-form");
      return s(), c(W, {
        model: l,
        rules: o.rules,
        ref_key: "ruleFormRef",
        ref: d,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: f(() => [
          w(Q, { gutter: 20 }, {
            default: f(() => [
              (s(!0), C(N, null, R(o.columns, (i, ke) => (s(), C(N, { key: ke }, [
                ["hide"].includes(i.type) ? h("", !0) : (s(), c(G, {
                  key: 0,
                  span: g(i.grid ?? 24),
                  sm: g(i.grid ?? 24, "sm"),
                  md: g(i.grid ?? 24, "md"),
                  lg: g(i.grid ?? 24, "lg"),
                  xl: g(i.grid ?? 24, "xl")
                }, {
                  default: f(() => [
                    ["checkbox", "slot:el-form-item"].includes(i.type) ? h("", !0) : (s(), c(T, {
                      key: 0,
                      label: i.label,
                      prop: i.name
                    }, {
                      default: f(() => {
                        var L, oe, ae;
                        return [
                          i.type === "text" ? (s(), c($, {
                            key: 0,
                            modelValue: l[i.name],
                            "onUpdate:modelValue": (D) => l[i.name] = D,
                            disabled: i.disabled,
                            onChange: m
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : h("", !0),
                          i.type === "textarea" ? (s(), c($, {
                            key: 1,
                            modelValue: l[i.name],
                            "onUpdate:modelValue": (D) => l[i.name] = D,
                            type: "textarea",
                            disabled: i.disabled,
                            onChange: m
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : h("", !0),
                          i.type === "select" ? (s(), c(mt, {
                            key: 2,
                            modelValue: l[i.name],
                            "onUpdate:modelValue": (D) => l[i.name] = D,
                            url: i.url,
                            "field-label": i.field_label ?? "name",
                            "field-value": i.field_value ?? "id",
                            options: i.options,
                            disabled: i.disabled,
                            remote: (L = i.selectOptions) == null ? void 0 : L.remote,
                            "remote-search": {
                              field: (oe = i.selectOptions) == null ? void 0 : oe.remoteSearchField,
                              strict: (ae = i.selectOptions) == null ? void 0 : ae.remoteSearchStrict
                            },
                            onChange: m
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "url", "field-label", "field-value", "options", "disabled", "remote", "remote-search"])) : h("", !0),
                          i.type === "password" ? (s(), c($, {
                            key: 3,
                            modelValue: l[i.name],
                            "onUpdate:modelValue": (D) => l[i.name] = D,
                            onChange: m,
                            type: "password",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : h("", !0),
                          i.type === "switch" ? (s(), c(O, {
                            key: 4,
                            modelValue: l[i.name],
                            "onUpdate:modelValue": (D) => l[i.name] = D,
                            onChange: m,
                            "active-icon": b(nt),
                            "inactive-icon": b(pe)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon"])) : h("", !0),
                          i.type === "slot" ? P(r.$slots, i.name, {
                            key: 5,
                            form: l
                          }) : h("", !0)
                        ];
                      }),
                      _: 2
                    }, 1032, ["label", "prop"])),
                    ["checkbox"].includes(i.type) ? (s(), c(T, {
                      key: 1,
                      prop: i.name
                    }, {
                      default: f(() => [
                        i.type === "checkbox" ? (s(), c(K, {
                          key: 0,
                          modelValue: l[i.name],
                          "onUpdate:modelValue": (L) => l[i.name] = L,
                          onChange: m,
                          label: i.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : h("", !0)
                      ]),
                      _: 2
                    }, 1032, ["prop"])) : h("", !0),
                    i.type === "slot:el-form-item" ? P(r.$slots, i.name, {
                      key: 2,
                      form: l
                    }) : h("", !0)
                  ]),
                  _: 2
                }, 1032, ["span", "sm", "md", "lg", "xl"]))
              ], 64))), 128))
            ]),
            _: 3
          }),
          v("div", _t, [
            w(p, {
              to: b(Y)("/" + o.backUrl)
            }, {
              default: f(() => [
                w(F, {
                  icon: b(pe),
                  type: "danger",
                  plain: ""
                }, {
                  default: f(() => n[0] || (n[0] = [
                    y("Batal")
                  ])),
                  _: 1,
                  __: [0]
                }, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["to"]),
            b(k).params.id ? (s(), c(F, {
              key: 0,
              onClick: M,
              icon: b(fe),
              type: "primary",
              class: "ml-4"
            }, {
              default: f(() => n[1] || (n[1] = [
                y(" Perbaharui ")
              ])),
              _: 1,
              __: [1]
            }, 8, ["icon"])) : (s(), c(F, {
              key: 1,
              onClick: U,
              icon: b(fe),
              type: "primary",
              class: "ml-4"
            }, {
              default: f(() => n[2] || (n[2] = [
                y(" Simpan ")
              ])),
              _: 1,
              __: [2]
            }, 8, ["icon"]))
          ])
        ]),
        _: 3
      }, 8, ["model", "rules"]);
    };
  }
}), gt = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" }, vt = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, ht = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, yt = { class: "flex justify-end mt-4" }, Mt = /* @__PURE__ */ S({
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
  setup(e, { expose: t, emit: a }) {
    const u = a, o = e, l = E([]), d = E(0), k = E(10), x = E(1), g = E(!0), B = _e({
      data: {},
      collection: {
        data: []
      }
    });
    function V() {
      m();
    }
    function m() {
      g.value = !0;
      let r = o.fetchUrl;
      /https?:\/\//i.test(o.fetchUrl) || (r = `undefined/${o.fetchUrl}`), A(r, {
        params: {
          relations: o.apiRelations,
          columns: o.apiColumns,
          pagination_length: k.value,
          page: x.value,
          queries: o.apiQuery,
          order: o.apiOrder
        }
      }).then((n) => {
        g.value = !1, l.value = n.data.data.data, d.value = n.data.data.total, B.collection = n.data.data;
      }).catch((n) => {
        g.value = !1, j(n);
      });
    }
    function U(r) {
      u(
        "tableSelections",
        r.map((n) => n.id)
      );
    }
    function M() {
      m();
    }
    return te(() => {
      m();
    }), t({ refresh: M }), (r, n) => {
      const $ = _("el-table-column"), O = _("el-icon"), T = _("RouterLink"), K = _("el-popover"), G = _("el-table"), Q = _("el-pagination"), F = Ve("loading");
      return s(), C("div", null, [
        Se((s(), c(G, {
          data: l.value,
          onSelectionChange: U,
          style: { width: "100%" }
        }, {
          default: f(() => [
            w($, {
              type: "selection",
              width: "55",
              fixed: "left"
            }),
            n[10] || (n[10] = y()),
            (s(!0), C(N, null, R(o.tableColumns, (p, W) => (s(), C(N, { key: W }, [
              !p.value && p.type !== "slot" ? (s(), c($, {
                key: 0,
                prop: p.field,
                label: p.label,
                width: p.width,
                align: p.align ?? "left"
              }, null, 8, ["prop", "label", "width", "align"])) : h("", !0),
              n[2] || (n[2] = y()),
              p.value && p.type !== "slot" ? (s(), c($, {
                key: 1,
                prop: p.field,
                label: p.label,
                width: p.width,
                align: p.align ?? "left"
              }, {
                default: f((i) => [
                  y(ce(typeof p.value == "function" ? p.value(i.row) : ""), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : h("", !0),
              n[3] || (n[3] = y()),
              p.type === "slot" ? (s(), c($, {
                key: 2,
                prop: p.field,
                label: p.label,
                width: p.width,
                align: p.align ?? "left"
              }, {
                default: f((i) => [
                  P(r.$slots, p.field, {
                    row: i.row
                  })
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : h("", !0)
            ], 64))), 128)),
            n[11] || (n[11] = y()),
            w($, {
              width: "55",
              fixed: "right"
            }, {
              default: f((p) => [
                v("div", gt, [
                  w(K, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: f(() => [
                      w(O, null, {
                        default: f(() => [
                          w(b(dt))
                        ]),
                        _: 1
                      })
                    ]),
                    default: f(() => [
                      v("ul", null, [
                        o.viewUrl ? (s(), c(T, {
                          key: 0,
                          to: b(Y)("/" + b(ee)(o.viewUrl, p.row)),
                          target: "_blank"
                        }, {
                          default: f(() => [
                            v("li", vt, [
                              w(O, null, {
                                default: f(() => [
                                  w(b(ct))
                                ]),
                                _: 1
                              }),
                              n[4] || (n[4] = y()),
                              n[5] || (n[5] = v("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : h("", !0),
                        n[8] || (n[8] = y()),
                        o.editUrl ? (s(), c(T, {
                          key: 1,
                          to: b(Y)("/" + b(ee)(o.editUrl ?? "", p.row))
                        }, {
                          default: f(() => [
                            v("li", ht, [
                              w(O, null, {
                                default: f(() => [
                                  w(b(st))
                                ]),
                                _: 1
                              }),
                              n[6] || (n[6] = y()),
                              n[7] || (n[7] = v("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : h("", !0),
                        n[9] || (n[9] = y()),
                        P(r.$slots, "action", {
                          row: p.row
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
          [F, g.value]
        ]),
        v("div", yt, [
          w(Q, {
            "page-size": k.value,
            "onUpdate:pageSize": n[0] || (n[0] = (p) => k.value = p),
            "current-page": x.value,
            "onUpdate:currentPage": n[1] || (n[1] = (p) => x.value = p),
            total: d.value,
            "page-sizes": [10, 25, 50, 75, 100],
            onChange: V,
            layout: "sizes, total, prev, pager, next"
          }, null, 8, ["page-size", "current-page", "total"])
        ])
      ]);
    };
  }
});
export {
  Vt as ComContainer,
  St as ComDialogConfirmation,
  Dt as ComForm,
  mt as ComSelect,
  Mt as ComTable,
  $t as helpers,
  Ut as runtimeConfig
};
