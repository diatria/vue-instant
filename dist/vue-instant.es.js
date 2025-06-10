import { createElementBlock as x, openBlock as u, renderSlot as B, defineComponent as S, mergeModels as oe, useModel as _e, resolveComponent as m, createBlock as c, withCtx as p, createElementVNode as _, createTextVNode as h, toDisplayString as de, createVNode as v, inject as pe, ref as N, computed as ne, onMounted as J, Fragment as T, renderList as W, unref as k, reactive as fe, onBeforeMount as ge, createCommentVNode as g, resolveDirective as ve, withDirectives as he } from "vue";
import ye from "axios";
import R from "dayjs";
import { ElMessage as P } from "element-plus";
import { snakeCase as X, startCase as ce, kebabCase as we, get as be } from "lodash";
const ke = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
  return o;
}, xe = {}, Ce = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function Ve(e, t) {
  return u(), x("div", Ce, [
    B(e.$slots, "default")
  ]);
}
const tt = /* @__PURE__ */ ke(xe, [["render", Ve]]), Se = { class: "dialog-footer" }, rt = /* @__PURE__ */ S({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ oe({
    message: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ oe(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const o = _e(e, "modelValue"), i = e, n = t;
    return (a, d) => {
      const C = m("el-button"), y = m("el-dialog");
      return u(), c(y, {
        modelValue: o.value,
        "onUpdate:modelValue": d[2] || (d[2] = (w) => o.value = w),
        title: "Penting!",
        width: "500"
      }, {
        footer: p(() => [
          _("div", Se, [
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
          _("span", null, de(i.message), 1),
          d[6] || (d[6] = h())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
let Y;
function ot(e) {
  Y = e;
}
function F() {
  if (!Y) throw new Error("App config is not initialized");
  return Y;
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
var ie;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ie || (ie = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const Ue = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function me() {
  return pe(Ue);
}
function De(e) {
  return pe($e);
}
function nt(e, t) {
  return e === void 0 ? "-" : t ? R(e).format(t) : R(e).format("DD MMM YYYY");
}
function at(e) {
  return R(e).format("DD MMM YYYY HH:mm");
}
function lt(e, t) {
  t ? console.log(t, e) : console.log(e);
}
function it(e) {
  const t = typeof e == "number" ? e.toString() : e;
  return Array.from(`csl:${t}`).map((o) => o.charCodeAt(0).toString(16)).join("");
}
function st(e) {
  let t = "";
  for (let o = 0; o < e.length; o += 2)
    t += String.fromCharCode(parseInt(e.substr(o, 2), 16));
  return t.replace("csl:", "");
}
function ut(e) {
  if (["text", "date", "dateTime"].includes(e)) return "";
  if (e === "number") return 0;
}
function dt() {
  const e = (t) => t.test(navigator.userAgent);
  return e(/opr\//i) ? "Opera" : e(/edg/i) ? "Microsoft Edge" : e(/chrome|chromium|crios/i) ? "Google Chrome" : e(/firefox|fxios/i) ? "Mozilla Firefox" : e(/safari/i) ? "Apple Safari" : e(/trident/i) ? "Microsoft Internet Explorer" : e(/ucbrowser/i) ? "UC Browser" : e(/samsungbrowser/i) ? "Samsung Browser" : "Unknown browser";
}
function pt(e) {
  return e.split(" ").map((t) => t[0]).join("").toUpperCase();
}
function ft() {
  const e = F().tokenName, t = X(e);
  return localStorage.getItem(`${t}_refresh_token`) ?? "";
}
function Ee() {
  const e = F().tokenName;
  return localStorage.getItem(`access_token_${e}`) ?? "";
}
function K(e) {
  var o;
  const t = me();
  return ((o = e.response) == null ? void 0 : o.data.code) === "FORBIDDEN" && t.push("/403"), e.response ? G(e.response.data.message || "", "error") : G(e.message, "error");
}
function ct(e) {
  return e === "OK" || e === "Success" ? 200 : e === "Created" ? 201 : e === "Unauthorized" ? 401 : e === "Unauthorized" ? 403 : 404;
}
function Ne(e) {
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
  ].find((i) => i.code === e.status);
  return o ? o.type === "success" : !1;
}
function I(e) {
  const t = e == null ? void 0 : e.includes("http://"), o = e == null ? void 0 : e.includes("https://");
  let i = F().apiUrl;
  return (t || o) && (i = e), ye.create({
    baseURL: i,
    timeout: 6e4,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Ee()}`
    },
    withCredentials: !0
  });
}
function Z(e, t) {
  return new Promise((o, i) => {
    I(e).get(e, t).then((n) => o(n)).catch((n) => {
      i(n);
    });
  });
}
function Me(e, t, o) {
  return new Promise((i, n) => {
    I(e).post(e, t, o).then((a) => i(a)).catch((a) => {
      n(a);
    });
  });
}
function mt(e, t) {
  return new Promise((o, i) => {
    I().delete(e, t).then((n) => o(n)).catch((n) => {
      i(n);
    });
  });
}
function _t(e, t, o) {
  return new Promise((i, n) => {
    I().put(e, t, o).then((a) => i(a)).catch((a) => {
      n(a);
    });
  });
}
function gt(e) {
  const t = document.createElement("div");
  return t.innerHTML = e, t.textContent || t.innerText || "";
}
function G(e, t) {
  t === "success" && P.success({ grouping: !0, message: e }), t === "warning" && P.warning({ grouping: !0, message: e }), t === "info" && P.info({ grouping: !0, message: e }), t === "error" && P.error({ grouping: !0, message: e });
}
function vt(e, t) {
  typeof e == "string" && (e = Number(e));
  let o = e % 60, i = (e - o) / 60;
  return t && (o = o < 10 ? `0${o}` : o, i = i < 10 ? `0${i}` : i), `${i}:${o}:00`;
}
function ht(e, t, o) {
  const i = "id-ID", n = "IDR";
  return new Intl.NumberFormat(t ?? i, {
    style: (o == null ? void 0 : o.style) ?? "currency",
    currency: (o == null ? void 0 : o.currency) ?? n,
    maximumFractionDigits: 0
  }).format(e);
}
function yt(e) {
  return ce(e);
}
function wt() {
  const e = X(F().tokenName);
  localStorage.removeItem(`${e}_refresh_token`);
}
function se(e, t) {
  if (!t) return e;
  const o = /\{(\w+?)\}/g, i = [];
  let n;
  for (; (n = o.exec(e)) !== null; )
    i.push(n[1]);
  let a = e;
  return i.forEach((d) => {
    a = a.replace(`{${d}}`, t[d]);
  }), a ?? "";
}
function bt(e) {
  var o;
  return ((o = De().params[e]) == null ? void 0 : o.toString()) || null;
}
function kt(e) {
  const t = X(F().tokenName);
  localStorage.setItem(`${t}_refresh_token`, e);
}
function Q(e) {
  let t = e;
  return t = t.replace(/\/\//g, "/"), t;
}
function xt(e) {
  return `/${we(e)}`;
}
function Ct(e) {
  return ce(e);
}
function Vt(e, t = 500) {
  return new Promise((o) => {
    setTimeout(() => {
      o(e());
    }, t || 500);
  });
}
/*! Element Plus Icons Vue v2.3.1 */
var ze = /* @__PURE__ */ S({
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
}), Be = ze, Te = /* @__PURE__ */ S({
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
}), ue = Te, Fe = /* @__PURE__ */ S({
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
}), Ae = Fe, Oe = /* @__PURE__ */ S({
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
}), Pe = Oe, Ie = /* @__PURE__ */ S({
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
}), je = Ie, Le = /* @__PURE__ */ S({
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
}), qe = Le;
const He = /* @__PURE__ */ S({
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
    const i = o, n = e, a = N([]), d = N(""), C = ne(() => n.fieldLabel ?? "name"), y = ne(() => n.fieldValue ?? "id");
    function w() {
      Z(`undefined/${n.url}`).then(($) => {
        a.value = $.data.data;
      });
    }
    return J(() => {
      n.url && n.autoFetch && w(), n.options && (a.value = n.options);
    }), t({
      fetchingDataFromServer: w
    }), ($, b) => {
      const M = m("el-option"), l = m("el-select");
      return u(), c(l, {
        modelValue: d.value,
        "onUpdate:modelValue": b[0] || (b[0] = (f) => d.value = f),
        disabled: n.disabled,
        onChange: b[1] || (b[1] = (f) => i("update:modelValue", f)),
        placeholder: "Select",
        filterable: ""
      }, {
        default: p(() => [
          (u(!0), x(T, null, W(a.value, (f) => (u(), c(M, {
            key: f[y.value],
            label: k(be)(f, C.value),
            value: f[y.value] ?? f.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled"]);
    };
  }
}), Re = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" }, St = /* @__PURE__ */ S({
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
    const i = o, n = e, a = fe({}), d = N(), C = me();
    function y(l, f) {
      if (typeof l == "number") return l;
      if (typeof l == "object" && f) return l[f];
      if (typeof l == "object") return l.default;
    }
    function w() {
      Z(n.fetchUrl).then((l) => Object.assign(a, l.data.data)).catch(K);
    }
    function $() {
      n.columns.forEach((l) => {
        l.type === "select" || l.type === "text" || l.type === "textarea" || l.type === "password" ? a[l.name] = l.value ?? "" : l.type === "switch" || l.type === "checkbox" ? a[l.name] = l.value ?? 0 : (l.type === "slot" || l.type === "hide") && (a[l.name] = l.value ?? "");
      });
    }
    function b() {
      i("form", a);
    }
    async function M() {
      d.value && await d.value.validate((l) => {
        l && Me(n.storeUrl, a).then((f) => {
          if (Ne(f)) {
            if (G(f.data.message, "success"), i("store", f.data.data), n.redirectAfterStoreUrl)
              return C.push(n.redirectAfterStoreUrl(f.data.data));
            n.backUrl && C.push(`/${n.backUrl}`);
          }
        }).catch(K);
      });
    }
    return ge(() => {
      $();
    }), J(() => {
      w(), $();
    }), t({
      initializeForm: $
    }), (l, f) => {
      const V = m("el-input"), s = m("el-switch"), D = m("el-form-item"), z = m("el-checkbox"), A = m("el-col"), j = m("el-row"), O = m("el-button"), L = m("RouterLink"), q = m("el-form");
      return u(), c(q, {
        model: a,
        rules: n.rules,
        ref_key: "ruleFormRef",
        ref: d,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: p(() => [
          v(j, { gutter: 20 }, {
            default: p(() => [
              (u(!0), x(T, null, W(n.columns, (r, H) => (u(), x(T, { key: H }, [
                ["hide"].includes(r.type) ? g("", !0) : (u(), c(A, {
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
                          r.type === "select" ? (u(), c(He, {
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
                          r.type === "switch" ? (u(), c(s, {
                            key: 4,
                            modelValue: a[r.name],
                            "onUpdate:modelValue": (U) => a[r.name] = U,
                            onChange: b,
                            "active-icon": k(Be),
                            "inactive-icon": k(ue)
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
          _("div", Re, [
            v(L, {
              to: k(Q)("/" + n.backUrl)
            }, {
              default: p(() => [
                v(O, {
                  icon: k(ue),
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
            (u(), c(O, {
              key: 1,
              onClick: M,
              icon: k(je),
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
}), Ye = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" }, Ke = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, Ge = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, Qe = { class: "flex justify-end mt-4" }, Ut = /* @__PURE__ */ S({
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
    const i = o, n = e, a = N([]), d = N(0), C = N(10), y = N(1), w = N(!0), $ = fe({
      data: {},
      collection: {
        data: []
      }
    });
    function b() {
      M();
    }
    function M() {
      w.value = !0;
      let V = n.fetchUrl;
      /https?:\/\//i.test(n.fetchUrl) || (V = `undefined/${n.fetchUrl}`), Z(V, {
        params: {
          relations: n.apiRelations,
          columns: n.apiColumns,
          pagination_length: C.value,
          page: y.value,
          queries: n.apiQuery,
          order: n.apiOrder
        }
      }).then((s) => {
        w.value = !1, a.value = s.data.data.data, d.value = s.data.data.total, $.collection = s.data.data;
      }).catch((s) => {
        w.value = !1, K(s);
      });
    }
    function l(V) {
      i(
        "tableSelections",
        V.map((s) => s.id)
      );
    }
    function f() {
      M();
    }
    return J(() => {
      M();
    }), t({ refresh: f }), (V, s) => {
      const D = m("el-table-column"), z = m("el-icon"), A = m("RouterLink"), j = m("el-popover"), O = m("el-table"), L = m("el-pagination"), q = ve("loading");
      return u(), x("div", null, [
        he((u(), c(O, {
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
            s[10] || (s[10] = h()),
            (u(!0), x(T, null, W(n.tableColumns, (r, H) => (u(), x(T, { key: H }, [
              !r.value && r.type !== "slot" ? (u(), c(D, {
                key: 0,
                prop: r.field,
                label: r.label,
                width: r.width,
                align: r.align ?? "left"
              }, null, 8, ["prop", "label", "width", "align"])) : g("", !0),
              s[2] || (s[2] = h()),
              r.value && r.type !== "slot" ? (u(), c(D, {
                key: 1,
                prop: r.field,
                label: r.label,
                width: r.width,
                align: r.align ?? "left"
              }, {
                default: p((E) => [
                  h(de(typeof r.value == "function" ? r.value(E.row) : ""), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : g("", !0),
              s[3] || (s[3] = h()),
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
            s[11] || (s[11] = h()),
            v(D, {
              width: "55",
              fixed: "right"
            }, {
              default: p((r) => [
                _("div", Ye, [
                  v(j, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: p(() => [
                      v(z, null, {
                        default: p(() => [
                          v(k(Pe))
                        ]),
                        _: 1
                      })
                    ]),
                    default: p(() => [
                      _("ul", null, [
                        n.viewUrl ? (u(), c(A, {
                          key: 0,
                          to: k(Q)("/" + k(se)(n.viewUrl, r.row)),
                          target: "_blank"
                        }, {
                          default: p(() => [
                            _("li", Ke, [
                              v(z, null, {
                                default: p(() => [
                                  v(k(qe))
                                ]),
                                _: 1
                              }),
                              s[4] || (s[4] = h()),
                              s[5] || (s[5] = _("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : g("", !0),
                        s[8] || (s[8] = h()),
                        n.editUrl ? (u(), c(A, {
                          key: 1,
                          to: k(Q)("/" + k(se)(n.editUrl ?? "", r.row))
                        }, {
                          default: p(() => [
                            _("li", Ge, [
                              v(z, null, {
                                default: p(() => [
                                  v(k(Ae))
                                ]),
                                _: 1
                              }),
                              s[6] || (s[6] = h()),
                              s[7] || (s[7] = _("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : g("", !0),
                        s[9] || (s[9] = h()),
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
          [q, w.value]
        ]),
        _("div", Qe, [
          v(L, {
            "page-size": C.value,
            "onUpdate:pageSize": s[0] || (s[0] = (r) => C.value = r),
            "current-page": y.value,
            "onUpdate:currentPage": s[1] || (s[1] = (r) => y.value = r),
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
  tt as ComContainer,
  rt as ComDialogConfirmation,
  St as ComForm,
  He as ComSelect,
  Ut as ComTable,
  nt as beautyDate,
  at as beautyDateTime,
  st as convertHexToString,
  it as convertStringToHex,
  lt as csl,
  ut as defaultType,
  F as getAppConfig,
  dt as getBrowserType,
  pt as getInitials,
  ft as getRefreshToken,
  Ee as getToken,
  gt as htmlToPlainText,
  I as http,
  mt as httpDelete,
  Z as httpGet,
  K as httpHandleError,
  Me as httpPost,
  _t as httpPut,
  ct as httpStatusCode,
  Ne as httpValidation,
  G as message,
  vt as minuteToTime,
  ht as numberFormat,
  yt as pascalCase,
  wt as removeRefreshToken,
  se as replaceString,
  bt as routeParam,
  ot as setAppConfig,
  kt as setRefreshToken,
  Ct as titleCase,
  Q as url,
  xt as urlToKebab,
  Vt as waiting
};
