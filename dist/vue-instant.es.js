import { createElementBlock as V, openBlock as u, renderSlot as z, defineComponent as U, mergeModels as ae, useModel as ve, resolveComponent as m, createBlock as f, withCtx as p, createElementVNode as _, createTextVNode as w, toDisplayString as ce, createVNode as h, inject as fe, ref as E, computed as le, onMounted as J, Fragment as T, renderList as W, unref as C, reactive as me, onBeforeMount as he, createCommentVNode as v, resolveDirective as we, withDirectives as ye } from "vue";
import be from "axios";
import q from "dayjs";
import { ElMessage as L } from "element-plus";
import { snakeCase as X, startCase as _e, kebabCase as ke, get as xe } from "lodash";
const Ce = (e, r) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of r)
    o[i] = n;
  return o;
}, Ve = {}, Se = { class: "mx-auto h-full xl:w-3/4 lg:w-1/2" };
function Ue(e, r) {
  return u(), V("div", Se, [
    z(e.$slots, "default")
  ]);
}
const ot = /* @__PURE__ */ Ce(Ve, [["render", Ue]]), De = { class: "dialog-footer" }, nt = /* @__PURE__ */ U({
  __name: "ComDialogConfirmation",
  props: /* @__PURE__ */ ae({
    message: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ ae(["update:modelValue", "onConfirm"], ["update:modelValue"]),
  setup(e, { emit: r }) {
    const o = ve(e, "modelValue"), i = e, n = r;
    return (a, d) => {
      const S = m("el-button"), y = m("el-dialog");
      return u(), f(y, {
        modelValue: o.value,
        "onUpdate:modelValue": d[2] || (d[2] = (b) => o.value = b),
        title: "Penting!",
        width: "500"
      }, {
        footer: p(() => [
          _("div", De, [
            h(S, {
              onClick: d[0] || (d[0] = (b) => n("update:modelValue", !1))
            }, {
              default: p(() => d[3] || (d[3] = [
                w("Cancel")
              ])),
              _: 1,
              __: [3]
            }),
            d[5] || (d[5] = w()),
            h(S, {
              type: "primary",
              onClick: d[1] || (d[1] = (b) => n("onConfirm", !0))
            }, {
              default: p(() => d[4] || (d[4] = [
                w("Confirm")
              ])),
              _: 1,
              __: [4]
            })
          ])
        ]),
        default: p(() => [
          _("span", null, ce(i.message), 1),
          d[6] || (d[6] = w())
        ]),
        _: 1,
        __: [6]
      }, 8, ["modelValue"]);
    };
  }
});
let K;
function at(e) {
  K = e;
}
function O() {
  if (!K) throw new Error("App config is not initialized");
  return K;
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var ie;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ie || (ie = {}));
var se;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(se || (se = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var ue;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ue || (ue = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const $e = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ee = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ge() {
  return fe($e);
}
function Ne(e) {
  return fe(Ee);
}
function lt(e, r) {
  return e === void 0 ? "-" : r ? q(e).format(r) : q(e).format("DD MMM YYYY");
}
function it(e) {
  return q(e).format("DD MMM YYYY HH:mm");
}
function st(e, r) {
  r ? console.log(r, e) : console.log(e);
}
function ut(e) {
  const r = typeof e == "number" ? e.toString() : e;
  return Array.from(`csl:${r}`).map((o) => o.charCodeAt(0).toString(16)).join("");
}
function dt(e) {
  let r = "";
  for (let o = 0; o < e.length; o += 2)
    r += String.fromCharCode(parseInt(e.substr(o, 2), 16));
  return r.replace("csl:", "");
}
function pt(e) {
  if (["text", "date", "dateTime"].includes(e)) return "";
  if (e === "number") return 0;
}
function ct() {
  const e = (r) => r.test(navigator.userAgent);
  return e(/opr\//i) ? "Opera" : e(/edg/i) ? "Microsoft Edge" : e(/chrome|chromium|crios/i) ? "Google Chrome" : e(/firefox|fxios/i) ? "Mozilla Firefox" : e(/safari/i) ? "Apple Safari" : e(/trident/i) ? "Microsoft Internet Explorer" : e(/ucbrowser/i) ? "UC Browser" : e(/samsungbrowser/i) ? "Samsung Browser" : "Unknown browser";
}
function ft(e) {
  return e.split(" ").map((r) => r[0]).join("").toUpperCase();
}
function mt() {
  const e = O().tokenName, r = X(e);
  return localStorage.getItem(`${r}_refresh_token`) ?? "";
}
function Me() {
  const e = O().tokenName;
  return localStorage.getItem(`access_token_${e}`) ?? "";
}
function P(e) {
  var o;
  const r = ge();
  return ((o = e.response) == null ? void 0 : o.data.code) === "FORBIDDEN" && r.push("/403"), e.response ? G(e.response.data.message || "", "error") : G(e.message, "error");
}
function _t(e) {
  return e === "OK" || e === "Success" ? 200 : e === "Created" ? 201 : e === "Unauthorized" ? 401 : e === "Unauthorized" ? 403 : 404;
}
function Be(e) {
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
  const r = e == null ? void 0 : e.includes("http://"), o = e == null ? void 0 : e.includes("https://");
  let i = O().apiUrl;
  return (r || o) && (i = e), be.create({
    baseURL: i,
    timeout: 6e4,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Me()}`
    },
    withCredentials: !0
  });
}
function Z(e, r) {
  return new Promise((o, i) => {
    I(e).get(e, r).then((n) => o(n)).catch((n) => {
      i(n);
    });
  });
}
function ze(e, r, o) {
  return new Promise((i, n) => {
    I(e).post(e, r, o).then((a) => i(a)).catch((a) => {
      n(a);
    });
  });
}
function gt(e, r) {
  return new Promise((o, i) => {
    I().delete(e, r).then((n) => o(n)).catch((n) => {
      i(n);
    });
  });
}
function vt(e, r, o) {
  return new Promise((i, n) => {
    I().put(e, r, o).then((a) => i(a)).catch((a) => {
      n(a);
    });
  });
}
function ht(e) {
  const r = document.createElement("div");
  return r.innerHTML = e, r.textContent || r.innerText || "";
}
function G(e, r) {
  r === "success" && L.success({ grouping: !0, message: e }), r === "warning" && L.warning({ grouping: !0, message: e }), r === "info" && L.info({ grouping: !0, message: e }), r === "error" && L.error({ grouping: !0, message: e });
}
function wt(e, r) {
  typeof e == "string" && (e = Number(e));
  let o = e % 60, i = (e - o) / 60;
  return r && (o = o < 10 ? `0${o}` : o, i = i < 10 ? `0${i}` : i), `${i}:${o}:00`;
}
function yt(e, r, o) {
  const i = "id-ID", n = "IDR";
  return new Intl.NumberFormat(r ?? i, {
    style: (o == null ? void 0 : o.style) ?? "currency",
    currency: (o == null ? void 0 : o.currency) ?? n,
    maximumFractionDigits: 0
  }).format(e);
}
function bt(e) {
  return _e(e);
}
function kt() {
  const e = X(O().tokenName);
  localStorage.removeItem(`${e}_refresh_token`);
}
function de(e, r) {
  if (!r) return e;
  const o = /\{(\w+?)\}/g, i = [];
  let n;
  for (; (n = o.exec(e)) !== null; )
    i.push(n[1]);
  let a = e;
  return i.forEach((d) => {
    a = a.replace(`{${d}}`, r[d]);
  }), a ?? "";
}
function xt(e) {
  var o;
  return ((o = Ne().params[e]) == null ? void 0 : o.toString()) || null;
}
function Ct(e) {
  const r = X(O().tokenName);
  localStorage.setItem(`${r}_refresh_token`, e);
}
function Q(e) {
  let r = e;
  return r = r.replace(/\/\//g, "/"), r;
}
function Vt(e) {
  return `/${ke(e)}`;
}
function St(e) {
  return _e(e);
}
function Ut(e, r = 500) {
  return new Promise((o) => {
    setTimeout(() => {
      o(e());
    }, r || 500);
  });
}
/*! Element Plus Icons Vue v2.3.1 */
var Te = /* @__PURE__ */ U({
  name: "Check",
  __name: "check",
  setup(e) {
    return (r, o) => (u(), V("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), Oe = Te, Ae = /* @__PURE__ */ U({
  name: "Close",
  __name: "close",
  setup(e) {
    return (r, o) => (u(), V("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), pe = Ae, Fe = /* @__PURE__ */ U({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (r, o) => (u(), V("svg", {
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
}), Le = Fe, Pe = /* @__PURE__ */ U({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (r, o) => (u(), V("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), Ie = Pe, je = /* @__PURE__ */ U({
  name: "Promotion",
  __name: "promotion",
  setup(e) {
    return (r, o) => (u(), V("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472zm256 512V657.024L512 768z"
      })
    ]));
  }
}), Re = je, He = /* @__PURE__ */ U({
  name: "View",
  __name: "view",
  setup(e) {
    return (r, o) => (u(), V("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      _("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), Ye = He;
const qe = /* @__PURE__ */ U({
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
  setup(e, { expose: r, emit: o }) {
    const i = o, n = e, a = E([]), d = E(!1), S = E(""), y = le(() => n.fieldLabel ?? "name"), b = le(() => n.fieldValue ?? "id");
    function D(k) {
      if (d.value = !0, !n.url) throw new Error("URL belum terdefinisi saat fetch Select");
      let x;
      !k && n.remote || (n.remote && k && (x = {
        queries: [{ field: y.value, value: k }]
      }), Z(n.url, {
        params: x
      }).then((l) => {
        d.value = !1, a.value = l.data.data;
      }).catch((l) => {
        P(l), d.value = !1;
      }));
    }
    return J(() => {
      n.url && (n.fetchOnClick ?? !0) && D(), n.options && (a.value = n.options);
    }), r({
      fetchingDataFromServer: D
    }), (k, x) => {
      const l = m("el-option"), g = m("el-select");
      return u(), f(g, {
        modelValue: S.value,
        "onUpdate:modelValue": x[0] || (x[0] = (c) => S.value = c),
        disabled: n.disabled,
        remote: n.remote,
        "remote-method": D,
        loading: d.value,
        onChange: x[1] || (x[1] = (c) => i("update:modelValue", c)),
        placeholder: n.placeholder ?? "Select",
        filterable: ""
      }, {
        default: p(() => [
          (u(!0), V(T, null, W(a.value, (c) => (u(), f(l, {
            key: c[b.value],
            label: C(xe)(c, y.value),
            value: c[b.value] ?? c.id
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled", "remote", "loading", "placeholder"]);
    };
  }
}), Ke = { class: "flex justify-end border-t border-slate-200 border-solid pt-4" }, Dt = /* @__PURE__ */ U({
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
  setup(e, { expose: r, emit: o }) {
    const i = o, n = e, a = me({}), d = E(), S = ge();
    function y(l, g) {
      if (typeof l == "number") return l;
      if (typeof l == "object" && g) return l[g];
      if (typeof l == "object") return l.default;
    }
    function b() {
      Z(n.fetchUrl).then((l) => Object.assign(a, l.data.data)).catch(P);
    }
    function D() {
      n.columns.forEach((l) => {
        l.type === "select" || l.type === "text" || l.type === "textarea" || l.type === "password" ? a[l.name] = l.value ?? "" : l.type === "switch" || l.type === "checkbox" ? a[l.name] = l.value ?? 0 : (l.type === "slot" || l.type === "hide") && (a[l.name] = l.value ?? "");
      });
    }
    function k() {
      i("form", a);
    }
    async function x() {
      d.value && await d.value.validate((l) => {
        l && ze(n.storeUrl, a).then((g) => {
          if (Be(g)) {
            if (G(g.data.message, "success"), i("store", g.data.data), n.redirectAfterStoreUrl)
              return S.push(n.redirectAfterStoreUrl(g.data.data));
            n.backUrl && S.push(`/${n.backUrl}`);
          }
        }).catch(P);
      });
    }
    return he(() => {
      D();
    }), J(() => {
      b(), D();
    }), r({
      initializeForm: D
    }), (l, g) => {
      const c = m("el-input"), s = m("el-switch"), N = m("el-form-item"), B = m("el-checkbox"), A = m("el-col"), j = m("el-row"), F = m("el-button"), R = m("RouterLink"), H = m("el-form");
      return u(), f(H, {
        model: a,
        rules: n.rules,
        ref_key: "ruleFormRef",
        ref: d,
        "label-position": "top",
        "label-width": "auto",
        "status-icon": ""
      }, {
        default: p(() => [
          h(j, { gutter: 20 }, {
            default: p(() => [
              (u(!0), V(T, null, W(n.columns, (t, Y) => (u(), V(T, { key: Y }, [
                ["hide"].includes(t.type) ? v("", !0) : (u(), f(A, {
                  key: 0,
                  span: y(t.grid ?? 24),
                  sm: y(t.grid ?? 24, "sm"),
                  md: y(t.grid ?? 24, "md"),
                  lg: y(t.grid ?? 24, "lg"),
                  xl: y(t.grid ?? 24, "xl")
                }, {
                  default: p(() => [
                    ["checkbox", "slot:el-form-item"].includes(t.type) ? v("", !0) : (u(), f(N, {
                      key: 0,
                      label: t.label,
                      prop: t.name
                    }, {
                      default: p(() => {
                        var M, ee, te, re, oe, ne;
                        return [
                          t.type === "text" ? (u(), f(c, {
                            key: 0,
                            modelValue: a[t.name],
                            "onUpdate:modelValue": ($) => a[t.name] = $,
                            disabled: t.disabled,
                            onChange: k
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : v("", !0),
                          t.type === "textarea" ? (u(), f(c, {
                            key: 1,
                            modelValue: a[t.name],
                            "onUpdate:modelValue": ($) => a[t.name] = $,
                            type: "textarea",
                            disabled: t.disabled,
                            onChange: k
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : v("", !0),
                          t.type === "select" ? (u(), f(qe, {
                            key: 2,
                            modelValue: a[t.name],
                            "onUpdate:modelValue": ($) => a[t.name] = $,
                            disabled: t.disabled,
                            "fetch-on-click": (M = t.select) == null ? void 0 : M.fetch_on_click,
                            "field-label": ((ee = t.select) == null ? void 0 : ee.field_label) ?? "name",
                            "field-value": ((te = t.select) == null ? void 0 : te.field_value) ?? "id",
                            options: (re = t.select) == null ? void 0 : re.options,
                            placeholder: t.placeholder,
                            remote: (oe = t.select) == null ? void 0 : oe.remote,
                            url: (ne = t.select) == null ? void 0 : ne.url,
                            onChange: k
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "fetch-on-click", "field-label", "field-value", "options", "placeholder", "remote", "url"])) : v("", !0),
                          t.type === "password" ? (u(), f(c, {
                            key: 3,
                            modelValue: a[t.name],
                            "onUpdate:modelValue": ($) => a[t.name] = $,
                            onChange: k,
                            type: "password",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : v("", !0),
                          t.type === "switch" ? (u(), f(s, {
                            key: 4,
                            modelValue: a[t.name],
                            "onUpdate:modelValue": ($) => a[t.name] = $,
                            onChange: k,
                            "active-icon": C(Oe),
                            "inactive-icon": C(pe)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon"])) : v("", !0),
                          t.type === "slot" ? z(l.$slots, t.name, {
                            key: 5,
                            form: a
                          }) : v("", !0)
                        ];
                      }),
                      _: 2
                    }, 1032, ["label", "prop"])),
                    ["checkbox"].includes(t.type) ? (u(), f(N, {
                      key: 1,
                      prop: t.name
                    }, {
                      default: p(() => [
                        t.type === "checkbox" ? (u(), f(B, {
                          key: 0,
                          modelValue: a[t.name],
                          "onUpdate:modelValue": (M) => a[t.name] = M,
                          onChange: k,
                          label: t.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : v("", !0)
                      ]),
                      _: 2
                    }, 1032, ["prop"])) : v("", !0),
                    t.type === "slot:el-form-item" ? z(l.$slots, t.name, {
                      key: 2,
                      form: a
                    }) : v("", !0)
                  ]),
                  _: 2
                }, 1032, ["span", "sm", "md", "lg", "xl"]))
              ], 64))), 128))
            ]),
            _: 3
          }),
          _("div", Ke, [
            h(R, {
              to: C(Q)("/" + n.backUrl)
            }, {
              default: p(() => [
                h(F, {
                  icon: C(pe),
                  type: "danger",
                  plain: ""
                }, {
                  default: p(() => g[0] || (g[0] = [
                    w("Batal")
                  ])),
                  _: 1,
                  __: [0]
                }, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["to"]),
            (u(), f(F, {
              key: 1,
              onClick: x,
              icon: C(Re),
              type: "primary",
              class: "ml-4"
            }, {
              default: p(() => g[2] || (g[2] = [
                w(" Simpan ")
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
}), Ge = { class: "hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center" }, Qe = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, Je = { class: "flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100" }, We = { class: "flex justify-end mt-4" }, $t = /* @__PURE__ */ U({
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
  setup(e, { expose: r, emit: o }) {
    const i = o, n = e, a = E([]), d = E(0), S = E(10), y = E(1), b = E(!0), D = me({
      data: {},
      collection: {
        data: []
      }
    });
    function k() {
      x();
    }
    function x() {
      b.value = !0;
      let c = n.fetchUrl;
      /https?:\/\//i.test(n.fetchUrl) || (c = `undefined/${n.fetchUrl}`), Z(c, {
        params: {
          relations: n.apiRelations,
          columns: n.apiColumns,
          pagination_length: S.value,
          page: y.value,
          queries: n.apiQuery,
          order: n.apiOrder
        }
      }).then((s) => {
        b.value = !1, a.value = s.data.data.data, d.value = s.data.data.total, D.collection = s.data.data;
      }).catch((s) => {
        b.value = !1, P(s);
      });
    }
    function l(c) {
      i(
        "tableSelections",
        c.map((s) => s.id)
      );
    }
    function g() {
      x();
    }
    return J(() => {
      x();
    }), r({ refresh: g }), (c, s) => {
      const N = m("el-table-column"), B = m("el-icon"), A = m("RouterLink"), j = m("el-popover"), F = m("el-table"), R = m("el-pagination"), H = we("loading");
      return u(), V("div", null, [
        ye((u(), f(F, {
          data: a.value,
          onSelectionChange: l,
          style: { width: "100%" }
        }, {
          default: p(() => [
            h(N, {
              type: "selection",
              width: "55",
              fixed: "left"
            }),
            s[10] || (s[10] = w()),
            (u(!0), V(T, null, W(n.tableColumns, (t, Y) => (u(), V(T, { key: Y }, [
              !t.value && t.type !== "slot" ? (u(), f(N, {
                key: 0,
                prop: t.field,
                label: t.label,
                width: t.width,
                align: t.align ?? "left"
              }, null, 8, ["prop", "label", "width", "align"])) : v("", !0),
              s[2] || (s[2] = w()),
              t.value && t.type !== "slot" ? (u(), f(N, {
                key: 1,
                prop: t.field,
                label: t.label,
                width: t.width,
                align: t.align ?? "left"
              }, {
                default: p((M) => [
                  w(ce(typeof t.value == "function" ? t.value(M.row) : ""), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : v("", !0),
              s[3] || (s[3] = w()),
              t.type === "slot" ? (u(), f(N, {
                key: 2,
                prop: t.field,
                label: t.label,
                width: t.width,
                align: t.align ?? "left"
              }, {
                default: p((M) => [
                  z(c.$slots, t.field, {
                    row: M.row
                  })
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "align"])) : v("", !0)
            ], 64))), 128)),
            s[11] || (s[11] = w()),
            h(N, {
              width: "55",
              fixed: "right"
            }, {
              default: p((t) => [
                _("div", Ge, [
                  h(j, {
                    placement: "bottom",
                    width: 150,
                    "popper-class": "!p-0",
                    trigger: "click"
                  }, {
                    reference: p(() => [
                      h(B, null, {
                        default: p(() => [
                          h(C(Ie))
                        ]),
                        _: 1
                      })
                    ]),
                    default: p(() => [
                      _("ul", null, [
                        n.viewUrl ? (u(), f(A, {
                          key: 0,
                          to: C(Q)("/" + C(de)(n.viewUrl, t.row)),
                          target: "_blank"
                        }, {
                          default: p(() => [
                            _("li", Qe, [
                              h(B, null, {
                                default: p(() => [
                                  h(C(Ye))
                                ]),
                                _: 1
                              }),
                              s[4] || (s[4] = w()),
                              s[5] || (s[5] = _("span", { class: "ml-2" }, "Lihat", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : v("", !0),
                        s[8] || (s[8] = w()),
                        n.editUrl ? (u(), f(A, {
                          key: 1,
                          to: C(Q)("/" + C(de)(n.editUrl ?? "", t.row))
                        }, {
                          default: p(() => [
                            _("li", Je, [
                              h(B, null, {
                                default: p(() => [
                                  h(C(Le))
                                ]),
                                _: 1
                              }),
                              s[6] || (s[6] = w()),
                              s[7] || (s[7] = _("span", { class: "ml-2" }, "Ubah", -1))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])) : v("", !0),
                        s[9] || (s[9] = w()),
                        z(c.$slots, "action", {
                          row: t.row
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
          [H, b.value]
        ]),
        _("div", We, [
          h(R, {
            "page-size": S.value,
            "onUpdate:pageSize": s[0] || (s[0] = (t) => S.value = t),
            "current-page": y.value,
            "onUpdate:currentPage": s[1] || (s[1] = (t) => y.value = t),
            total: d.value,
            "page-sizes": [10, 25, 50, 75, 100],
            onChange: k,
            layout: "sizes, total, prev, pager, next"
          }, null, 8, ["page-size", "current-page", "total"])
        ])
      ]);
    };
  }
});
export {
  ot as ComContainer,
  nt as ComDialogConfirmation,
  Dt as ComForm,
  qe as ComSelect,
  $t as ComTable,
  lt as beautyDate,
  it as beautyDateTime,
  dt as convertHexToString,
  ut as convertStringToHex,
  st as csl,
  pt as defaultType,
  O as getAppConfig,
  ct as getBrowserType,
  ft as getInitials,
  mt as getRefreshToken,
  Me as getToken,
  ht as htmlToPlainText,
  I as http,
  gt as httpDelete,
  Z as httpGet,
  P as httpHandleError,
  ze as httpPost,
  vt as httpPut,
  _t as httpStatusCode,
  Be as httpValidation,
  G as message,
  wt as minuteToTime,
  yt as numberFormat,
  bt as pascalCase,
  kt as removeRefreshToken,
  de as replaceString,
  xt as routeParam,
  at as setAppConfig,
  Ct as setRefreshToken,
  St as titleCase,
  Q as url,
  Vt as urlToKebab,
  Ut as waiting
};
