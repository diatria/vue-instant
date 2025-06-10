import { createElementBlock as x, openBlock as u, renderSlot as B, defineComponent as S, mergeModels as oe, useModel as ve, resolveComponent as m, createBlock as c, withCtx as p, createElementVNode as _, createTextVNode as h, toDisplayString as ue, createVNode as v, inject as de, ref as M, computed as ne, onMounted as W, Fragment as T, renderList as X, unref as k, reactive as pe, onBeforeMount as he, createCommentVNode as g, resolveDirective as ye, withDirectives as we } from "vue";
import be from "axios";
import Q from "dayjs";
import { ElMessage as A } from "element-plus";
import { snakeCase as Z, startCase as fe, kebabCase as ke, get as xe } from "lodash";
const Ce = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, n] of t)
    o[s] = n;
  return o;
}, Ve = {}, Se = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function Ue(e, t) {
  return u(), x("div", Se, [
    B(e.$slots, "default")
  ]);
}
const kt = /* @__PURE__ */ Ce(Ve, [["render", Ue]]), $e = { class: "dialog-footer" }, xt = /* @__PURE__ */ S({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ oe({
    message: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ oe(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const o = ve(e, "modelValue"), s = e, n = t;
    return (a, d) => {
      const C = m("el-button"), y = m("el-dialog");
      return u(), c(y, {
        modelValue: o.value,
        "onUpdate:modelValue": d[2] || (d[2] = (w) => o.value = w),
        title: "Penting!",
        width: "500"
      }, {
        footer: p(() => [
          _("div", $e, [
            v(C, {
              onClick: d[0] || (d[0] = (w) => n("update:modelValue", !1))
            }, {
              default: p(() => d[3] || (d[3] = [
                h("Cancel")
              ])),
              _: 1,
              __: [3]
            }),
            d[5] || (d[5] = h()),
            v(C, {
              type: "primary",
              onClick: d[1] || (d[1] = (w) => n("onConfirm", !0))
            }, {
              default: p(() => d[4] || (d[4] = [
                h("Confirm")
              ])),
              _: 1,
              __: [4]
            })
          ])
        ]),
        default: p(() => [
          _("span", null, ue(s.message), 1),
          d[6] || (d[6] = h())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
function O() {
  throw new Error("App config is not initialized");
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var ae;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ae || (ae = {}));
var le;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(le || (le = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var se;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(se || (se = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const De = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ee = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ce() {
  return de(De);
}
function Me(e) {
  return de(Ee);
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
  return Array.from(`csl:${t}`).map((o) => o.charCodeAt(0).toString(16)).join("");
}
function Oe(e) {
  let t = "";
  for (let o = 0; o < e.length; o += 2)
    t += String.fromCharCode(parseInt(e.substr(o, 2), 16));
  return t.replace("csl:", "");
}
function Fe(e) {
  if (["text", "date", "dateTime"].includes(e)) return "";
  if (e === "number") return 0;
}
function Pe() {
  const e = (t) => t.test(navigator.userAgent);
  return e(/opr\//i) ? "Opera" : e(/edg/i) ? "Microsoft Edge" : e(/chrome|chromium|crios/i) ? "Google Chrome" : e(/firefox|fxios/i) ? "Mozilla Firefox" : e(/safari/i) ? "Apple Safari" : e(/trident/i) ? "Microsoft Internet Explorer" : e(/ucbrowser/i) ? "UC Browser" : e(/samsungbrowser/i) ? "Samsung Browser" : "Unknown browser";
}
function je(e) {
  return e.split(" ").map((t) => t[0]).join("").toUpperCase();
}
function Ae() {
  const e = O().tokenName, t = Z(e);
  return localStorage.getItem(`${t}_refresh_token`) ?? "";
}
function me() {
  const e = O().tokenName;
  return localStorage.getItem(`access_token_${e}`) ?? "";
}
function I(e) {
  var o;
  const t = ce();
  return ((o = e.response) == null ? void 0 : o.data.code) === "FORBIDDEN" && t.push("/403"), e.response ? L(e.response.data.message || "", "error") : L(e.message, "error");
}
function Ie(e) {
  return e === "OK" || e === "Success" ? 200 : e === "Created" ? 201 : e === "Unauthorized" ? 401 : e === "Unauthorized" ? 403 : 404;
}
function _e(e) {
  const o = [
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
  return o ? o.type === "success" : !1;
}
function F(e) {
  const t = e == null ? void 0 : e.includes("http://"), o = e == null ? void 0 : e.includes("https://");
  let s = O().apiUrl;
  return (t || o) && (s = e), be.create({
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
  return new Promise((o, s) => {
    F(e).get(e, t).then((n) => o(n)).catch((n) => {
      s(n);
    });
  });
}
function ge(e, t, o) {
  return new Promise((s, n) => {
    F(e).post(e, t, o).then((a) => s(a)).catch((a) => {
      n(a);
    });
  });
}
function Le(e, t) {
  return new Promise((o, s) => {
    F().delete(e, t).then((n) => o(n)).catch((n) => {
      s(n);
    });
  });
}
function qe(e, t, o) {
  return new Promise((s, n) => {
    F().put(e, t, o).then((a) => s(a)).catch((a) => {
      n(a);
    });
  });
}
function He(e) {
  const t = document.createElement("div");
  return t.innerHTML = e, t.textContent || t.innerText || "";
}
function L(e, t) {
  t === "success" && A.success({ grouping: !0, message: e }), t === "warning" && A.warning({ grouping: !0, message: e }), t === "info" && A.info({ grouping: !0, message: e }), t === "error" && A.error({ grouping: !0, message: e });
}
function Re(e, t) {
  typeof e == "string" && (e = Number(e));
  let o = e % 60, s = (e - o) / 60;
  return t && (o = o < 10 ? `0${o}` : o, s = s < 10 ? `0${s}` : s), `${s}:${o}:00`;
}
function Ye(e, t, o) {
  const s = "id-ID", n = "IDR";
  return new Intl.NumberFormat(t ?? s, {
    style: (o == null ? void 0 : o.style) ?? "currency",
    currency: (o == null ? void 0 : o.currency) ?? n,
    maximumFractionDigits: 0
  }).format(e);
}
function Ke(e) {
  return fe(e);
}
function Ge() {
  const e = Z(O().tokenName);
  localStorage.removeItem(`${e}_refresh_token`);
}
function J(e, t) {
  if (!t) return e;
  const o = /\{(\w+?)\}/g, s = [];
  let n;
  for (; (n = o.exec(e)) !== null; )
    s.push(n[1]);
  let a = e;
  return s.forEach((d) => {
    a = a.replace(`{${d}}`, t[d]);
  }), a ?? "";
}
function Qe(e) {
  var o;
  return ((o = Me().params[e]) == null ? void 0 : o.toString()) || null;
}
function Je(e) {
  const t = Z(O().tokenName);
  localStorage.setItem(`${t}_refresh_token`, e);
}
function q(e) {
  let t = e;
  return t = t.replace(/\/\//g, "/"), t;
}
function We(e) {
  return `/${ke(e)}`;
}
function Xe(e) {
  return fe(e);
}
function Ze(e, t = 500) {
  return new Promise((o) => {
    setTimeout(() => {
      o(e());
    }, t || 500);
  });
}
const Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  beautyDate: Ne,
  beautyDateTime: ze,
  convertHexToString: Oe,
  convertStringToHex: Te,
  csl: Be,
  defaultType: Fe,
  getBrowserType: Pe,
  getInitials: je,
  getRefreshToken: Ae,
  getToken: me,
  htmlToPlainText: He,
  http: F,
  httpDelete: Le,
  httpGet: H,
  httpHandleError: I,
  httpPost: ge,
  httpPut: qe,
  httpStatusCode: Ie,
  httpValidation: _e,
  message: L,
  minuteToTime: Re,
  numberFormat: Ye,
  pascalCase: Ke,
  removeRefreshToken: Ge,
  replaceString: J,
  routeParam: Qe,
  setRefreshToken: Je,
  titleCase: Xe,
  url: q,
  urlToKebab: We,
  waiting: Ze
}, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.3.1 */
var et = /* @__PURE__ */ S({
  name: "Check",
  __name: "check",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), tt = et, rt = /* @__PURE__ */ S({
  name: "Close",
  __name: "close",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), ie = rt, ot = /* @__PURE__ */ S({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      _("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), nt = ot, at = /* @__PURE__ */ S({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), lt = at, st = /* @__PURE__ */ S({
  name: "Promotion",
  __name: "promotion",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
      })
    ]));
  }
}), it = st, ut = /* @__PURE__ */ S({
  name: "View",
  __name: "view",
  setup(e) {
    return (t, o) => (u(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), dt = ut;
const pt = /* @__PURE__ */ S({
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
  setup(e, { expose: t, emit: o }) {
    const s = o, n = e, a = M([]), d = M(""), C = ne(() => n.fieldLabel ?? "name"), y = ne(() => n.fieldValue ?? "id");
    function w() {
      H(`undefined/${n.url}`).then(($) => {
        a.value = $.data.data;
      });
    }
    return W(() => {
      n.url && n.autoFetch && w(), n.options && (a.value = n.options);
    }), t({
      fetchingDataFromServer: w
    }), ($, b) => {
      const N = m("el-option"), l = m("el-select");
      return u(), c(l, {
        modelValue: d.value,
        "onUpdate:modelValue": b[0] || (b[0] = (f) => d.value = f),
        disabled: n.disabled,
        onChange: b[1] || (b[1] = (f) => s("update:modelValue", f)),
        placeholder: "Select",
        filterable: ""
      }, {
        default: p(() => [
          (u(!0), x(T, null, X(a.value, (f) => (u(), c(N, {
            key: f[y.value],
            label: k(xe)(f, C.value),
            value: f[y.value] ?? f.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled"]);
    };
  }
}), ft = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" }, Vt = /* @__PURE__ */ S({
  __name: "ComForm",
  props: {
    backUrl: {},
    columns: {},
    fetchUrl: {},
    queries: {},
    redirectAfterStoreUrl: { type: Function },
    rules: {},
    storeUrl: {}
  },
  emits: ["store", "update", "delete", "form"],
  setup(e, { expose: t, emit: o }) {
    const s = o, n = e, a = pe({}), d = M(), C = ce();
    function y(l, f) {
      if (typeof l == "number") return l;
      if (typeof l == "object" && f) return l[f];
      if (typeof l == "object") return l.default;
    }
    function w() {
      H(n.fetchUrl).then((l) => Object.assign(a, l.data.data)).catch(I);
    }
    function $() {
      n.columns.forEach((l) => {
        l.type === "select" || l.type === "text" || l.type === "textarea" || l.type === "password" ? a[l.name] = l.value ?? "" : l.type === "switch" || l.type === "checkbox" ? a[l.name] = l.value ?? 0 : (l.type === "slot" || l.type === "hide") && (a[l.name] = l.value ?? "");
      });
    }
    function b() {
      s("form", a);
    }
    async function N() {
      d.value && await d.value.validate((l) => {
        l && ge(n.storeUrl, a).then((f) => {
          if (_e(f)) {
            if (L(f.data.message, "success"), s("store", f.data.data), n.redirectAfterStoreUrl)
              return C.push(n.redirectAfterStoreUrl(f.data.data));
            n.backUrl && C.push(`/${n.backUrl}`);
          }
        }).catch(I);
      });
    }
    return he(() => {
      $();
    }), W(() => {
      w(), $();
    }), t({
      initializeForm: $
    }), (l, f) => {
      const V = m("el-input"), i = m("el-switch"), D = m("el-form-item"), z = m("el-checkbox"), P = m("el-col"), R = m("el-row"), j = m("el-button"), Y = m("RouterLink"), K = m("el-form");
      return u(), c(K, {
        model: a,
        rules: n.rules,
        ref_key: "ruleFormRef",
        ref: d,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: p(() => [
          v(R, { gutter: 20 }, {
            default: p(() => [
              (u(!0), x(T, null, X(n.columns, (r, G) => (u(), x(T, { key: G }, [
                ["hide"].includes(r.type) ? g("", !0) : (u(), c(P, {
                  key: 0,
                  span: y(r.grid ?? 24),
                  sm: y(r.grid ?? 24, "sm"),
                  md: y(r.grid ?? 24, "md"),
                  lg: y(r.grid ?? 24, "lg"),
                  xl: y(r.grid ?? 24, "xl")
                }, {
                  default: p(() => [
                    ["checkbox", "slot:el-form-item"].includes(r.type) ? g("", !0) : (u(), c(D, {
                      key: 0,
                      label: r.label,
                      prop: r.name
                    }, {
                      default: p(() => {
                        var E, ee, te, re;
                        return [
                          r.type === "text" ? (u(), c(V, {
                            key: 0,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            disabled: r.disabled,
                            onChange: b
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : g("", !0),
                          r.type === "textarea" ? (u(), c(V, {
                            key: 1,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            type: "textarea",
                            disabled: r.disabled,
                            onChange: b
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : g("", !0),
                          r.type === "select" ? (u(), c(pt, {
                            key: 2,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            url: (E = r.select) == null ? void 0 : E.url,
                            "field-label": ((ee = r.select) == null ? void 0 : ee.field_label) ?? "name",
                            "field-value": ((te = r.select) == null ? void 0 : te.field_value) ?? "id",
                            options: (re = r.select) == null ? void 0 : re.options,
                            disabled: r.disabled,
                            onChange: b
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "url", "field-label", "field-value", "options", "disabled"])) : g("", !0),
                          r.type === "password" ? (u(), c(V, {
                            key: 3,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            onChange: b,
                            type: "password",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0),
                          r.type === "switch" ? (u(), c(i, {
                            key: 4,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            onChange: b,
                            "active-icon": k(tt),
                            "inactive-icon": k(ie)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon"])) : g("", !0),
                          r.type === "slot" ? B(l.$slots, r.name, {
                            key: 5,
                            form: a
                          }) : g("", !0)
                        ];
                      }),
                      _: 2
                    }, 1032, ["label", "prop"])),
                    ["checkbox"].includes(r.type) ? (u(), c(D, {
                      key: 1,
                      prop: r.name
                    }, {
                      default: p(() => [
                        r.type === "checkbox" ? (u(), c(z, {
                          key: 0,
                          modelValue: a[r.name],
                          "onUpdate:modelValue": (E) => a[r.name] = E,
                          onChange: b,
                          label: r.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : g("", !0)
                      ]),
                      _: 2
                    }, 1032, ["prop"])) : g("", !0),
                    r.type === "slot:el-form-item" ? B(l.$slots, r.name, {
                      key: 2,
                      form: a
                    }) : g("", !0)
                  ]),
                  _: 2
                }, 1032, ["span", "sm", "md", "lg", "xl"]))
              ], 64))), 128))
            ]),
            _: 3
          }),
          _("div", ft, [
            v(Y, {
              to: k(q)("/" + n.backUrl)
            }, {
              default: p(() => [
                v(j, {
                  icon: k(ie),
                  type: "danger",
                  plain: ""
                }, {
                  default: p(() => f[0] || (f[0] = [
                    h("Batal")
                  ])),
                  _: 1,
                  __: [0]
                }, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["to"]),
            (u(), c(j, {
              key: 1,
              onClick: N,
              icon: k(it),
              type: "primary",
              class: "ml-4"
            }, {
              default: p(() => f[2] || (f[2] = [
                h(" Simpan ")
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
}), ct = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" }, mt = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, _t = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, gt = { class: "flex justify-end mt-4" }, St = /* @__PURE__ */ S({
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
  setup(e, { expose: t, emit: o }) {
    const s = o, n = e, a = M([]), d = M(0), C = M(10), y = M(1), w = M(!0), $ = pe({
      data: {},
      collection: {
        data: []
      }
    });
    function b() {
      N();
    }
    function N() {
      w.value = !0;
      let V = n.fetchUrl;
      /https?:\/\//i.test(n.fetchUrl) || (V = `undefined/${n.fetchUrl}`), H(V, {
        params: {
          relations: n.apiRelations,
          columns: n.apiColumns,
          pagination_length: C.value,
          page: y.value,
          queries: n.apiQuery,
          order: n.apiOrder
        }
      }).then((i) => {
        w.value = !1, a.value = i.data.data.data, d.value = i.data.data.total, $.collection = i.data.data;
      }).catch((i) => {
        w.value = !1, I(i);
      });
    }
    function l(V) {
      s(
        "tableSelections",
        V.map((i) => i.id)
      );
    }
    function f() {
      N();
    }
    return W(() => {
      N();
    }), t({ refresh: f }), (V, i) => {
      const D = m("el-table-column"), z = m("el-icon"), P = m("RouterLink"), R = m("el-popover"), j = m("el-table"), Y = m("el-pagination"), K = ye("loading");
      return u(), x("div", null, [
        we((u(), c(j, {
          data: a.value,
          onSelectionChange: l,
          style: { width: "100%" }
        }, {
          default: p(() => [
            v(D, {
              type: "selection",
              width: "55",
              fixed: "left"
            }),
            i[10] || (i[10] = h()),
            (u(!0), x(T, null, X(n.tableColumns, (r, G) => (u(), x(T, { key: G }, [
              !r.value && r.type !== "slot" ? (u(), c(D, {
                key: 0,
                prop: r.field,
                label: r.label,
                width: r.width,
                align: r.align ?? "left"
              }, null, 8, ["prop", "label", "width", "align"])) : g("", !0),
              i[2] || (i[2] = h()),
              r.value && r.type !== "slot" ? (u(), c(D, {
                key: 1,
                prop: r.field,
                label: r.label,
                width: r.width,
                align: r.align ?? "left"
              }, {
                default: p((E) => [
                  h(ue(typeof r.value == "function" ? r.value(E.row) : ""), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : g("", !0),
              i[3] || (i[3] = h()),
              r.type === "slot" ? (u(), c(D, {
                key: 2,
                prop: r.field,
                label: r.label,
                width: r.width,
                align: r.align ?? "left"
              }, {
                default: p((E) => [
                  B(V.$slots, r.field, {
                    row: E.row
                  })
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : g("", !0)
            ], 64))), 128)),
            i[11] || (i[11] = h()),
            v(D, {
              width: "55",
              fixed: "right"
            }, {
              default: p((r) => [
                _("div", ct, [
                  v(R, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: p(() => [
                      v(z, null, {
                        default: p(() => [
                          v(k(lt))
                        ]),
                        _: 1
                      })
                    ]),
                    default: p(() => [
                      _("ul", null, [
                        n.viewUrl ? (u(), c(P, {
                          key: 0,
                          to: k(q)("/" + k(J)(n.viewUrl, r.row)),
                          target: "_blank"
                        }, {
                          default: p(() => [
                            _("li", mt, [
                              v(z, null, {
                                default: p(() => [
                                  v(k(dt))
                                ]),
                                _: 1
                              }),
                              i[4] || (i[4] = h()),
                              i[5] || (i[5] = _("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : g("", !0),
                        i[8] || (i[8] = h()),
                        n.editUrl ? (u(), c(P, {
                          key: 1,
                          to: k(q)("/" + k(J)(n.editUrl ?? "", r.row))
                        }, {
                          default: p(() => [
                            _("li", _t, [
                              v(z, null, {
                                default: p(() => [
                                  v(k(nt))
                                ]),
                                _: 1
                              }),
                              i[6] || (i[6] = h()),
                              i[7] || (i[7] = _("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : g("", !0),
                        i[9] || (i[9] = h()),
                        B(V.$slots, "action", {
                          row: r.row
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
          [K, w.value]
        ]),
        _("div", gt, [
          v(Y, {
            "page-size": C.value,
            "onUpdate:pageSize": i[0] || (i[0] = (r) => C.value = r),
            "current-page": y.value,
            "onUpdate:currentPage": i[1] || (i[1] = (r) => y.value = r),
            total: d.value,
            "page-sizes": [10, 25, 50, 75, 100],
            onChange: b,
            layout: "sizes, total, prev, pager, next"
          }, null, 8, ["page-size", "current-page", "total"])
        ])
      ]);
    };
  }
});
export {
  kt as ComContainer,
  xt as ComDialogConfirmation,
  Vt as ComForm,
  pt as ComSelect,
  St as ComTable,
  Ct as helpers
};
