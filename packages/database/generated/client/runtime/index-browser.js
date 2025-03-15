var he = Object.defineProperty;
var We = Object.getOwnPropertyDescriptor;
var Ge = Object.getOwnPropertyNames;
var Je = Object.prototype.hasOwnProperty;
var Me = (e, n) => {
    for (var i in n) he(e, i, { get: n[i], enumerable: !0 });
  },
  Xe = (e, n, i, t) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (const r of Ge(n))
        !Je.call(e, r) &&
          r !== i &&
          he(e, r, {
            get: () => n[r],
            enumerable: !(t = We(n, r)) || t.enumerable,
          });
    return e;
  };
var Ke = (e) => Xe(he({}, '__esModule', { value: !0 }), e);
var Xn = {};
Me(Xn, {
  Decimal: () => je,
  Public: () => pe,
  getRuntime: () => Re,
  makeStrictEnum: () => Pe,
  objectEnumValues: () => Oe,
});
module.exports = Ke(Xn);
var pe = {};
Me(pe, { validator: () => Ce });
function Ce(...e) {
  return (n) => n;
}
var ne = Symbol(),
  ge = new WeakMap(),
  me = class {
    constructor(n) {
      n === ne
        ? ge.set(this, 'Prisma.'.concat(this._getName()))
        : ge.set(
            this,
            'new Prisma.'
              .concat(this._getNamespace(), '.')
              .concat(this._getName(), '()')
          );
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return ge.get(this);
    }
  },
  G = class extends me {
    _getNamespace() {
      return 'NullTypes';
    }
  },
  J = class extends G {};
we(J, 'DbNull');
var X = class extends G {};
we(X, 'JsonNull');
var K = class extends G {};
we(K, 'AnyNull');
var Oe = {
  classes: { DbNull: J, JsonNull: X, AnyNull: K },
  instances: { DbNull: new J(ne), JsonNull: new X(ne), AnyNull: new K(ne) },
};
function we(e, n) {
  Object.defineProperty(e, 'name', { value: n, configurable: !0 });
}
var xe = new Set([
  'toJSON',
  '$$typeof',
  'asymmetricMatch',
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
]);
function Pe(e) {
  return new Proxy(e, {
    get(n, i) {
      if (i in n) return n[i];
      if (!xe.has(i))
        throw new TypeError('Invalid enum value: '.concat(String(i)));
    },
  });
}
var Qe = 'Cloudflare-Workers',
  Ye = 'node';
function be() {
  var e, n, i;
  return typeof Netlify == 'object'
    ? 'netlify'
    : typeof EdgeRuntime == 'string'
      ? 'edge-light'
      : ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === Qe
        ? 'workerd'
        : globalThis.Deno
          ? 'deno'
          : globalThis.__lagon__
            ? 'lagon'
            : ((i = (n = globalThis.process) == null ? void 0 : n.release) ==
                null
                  ? void 0
                  : i.name) === Ye
              ? 'node'
              : globalThis.Bun
                ? 'bun'
                : globalThis.fastly
                  ? 'fastly'
                  : 'unknown';
}
var ze = {
  node: 'Node.js',
  workerd: 'Cloudflare Workers',
  deno: 'Deno and Deno Deploy',
  netlify: 'Netlify Edge Functions',
  'edge-light':
    'Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)',
};
function Re() {
  const e = be();
  return {
    id: e,
    prettyName: ze[e] || e,
    isEdge: ['workerd', 'deno', 'netlify', 'edge-light'].includes(e),
  };
}
var H = 9e15,
  $ = 1e9,
  Ne = '0123456789abcdef',
  re =
    '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
  se =
    '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
  ve = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -H,
    maxE: H,
    crypto: !1,
  },
  Te,
  Z,
  w = !0,
  ue = '[DecimalError] ',
  V = ue + 'Invalid argument: ',
  Le = ue + 'Precision limit exceeded',
  De = ue + 'crypto unavailable',
  Fe = '[object Decimal]',
  R = Math.floor,
  C = Math.pow,
  ye = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  en = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  nn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  Ie = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  L = 1e7,
  m = 7,
  tn = 9007199254740991,
  rn = re.length - 1,
  Ee = se.length - 1,
  h = { toStringTag: Fe };
h.absoluteValue = h.abs = function () {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), p(e);
};
h.ceil = function () {
  return p(new this.constructor(this), this.e + 1, 2);
};
h.clampedTo = h.clamp = function (e, n) {
  var i,
    r = this.constructor;
  if (((e = new r(e)), (n = new r(n)), !e.s || !n.s)) return new r(Number.NaN);
  if (e.gt(n)) throw Error(V + n);
  return (i = this.cmp(e)), i < 0 ? e : this.cmp(n) > 0 ? n : new r(this);
};
h.comparedTo = h.cmp = function (e) {
  var n,
    i,
    t,
    r,
    o = this.d,
    u = (e = new this.constructor(e)).d,
    l = this.s,
    f = e.s;
  if (!o || !u)
    return !l || !f
      ? Number.NaN
      : l !== f
        ? l
        : o === u
          ? 0
          : !o ^ (l < 0)
            ? 1
            : -1;
  if (!o[0] || !u[0]) return o[0] ? l : u[0] ? -f : 0;
  if (l !== f) return l;
  if (this.e !== e.e) return (this.e > e.e) ^ (l < 0) ? 1 : -1;
  for (t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n)
    if (o[n] !== u[n]) return (o[n] > u[n]) ^ (l < 0) ? 1 : -1;
  return t === r ? 0 : (t > r) ^ (l < 0) ? 1 : -1;
};
h.cosine = h.cos = function () {
  var e,
    n,
    i = this,
    t = i.constructor;
  return i.d
    ? i.d[0]
      ? ((e = t.precision),
        (n = t.rounding),
        (t.precision = e + Math.max(i.e, i.sd()) + m),
        (t.rounding = 1),
        (i = sn(t, $e(t, i))),
        (t.precision = e),
        (t.rounding = n),
        p(Z == 2 || Z == 3 ? i.neg() : i, e, n, !0))
      : new t(1)
    : new t(Number.NaN);
};
h.cubeRoot = h.cbrt = function () {
  var e,
    n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    a = this.constructor;
  if (!this.isFinite() || this.isZero()) return new a(this);
  for (
    w = !1,
      s = this.s * C(this.s * this, 1 / 3),
      !s || Math.abs(s) == 1 / 0
        ? ((i = O(this.d)),
          (e = this.e),
          (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? '0' : '00'),
          (s = C(i, 1 / 3)),
          (e = R((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          s == 1 / 0
            ? (i = '5e' + e)
            : ((i = s.toExponential()),
              (i = i.slice(0, i.indexOf('e') + 1) + e)),
          (t = new a(i)),
          (t.s = this.s))
        : (t = new a(s.toString())),
      o = (e = a.precision) + 3;
    ;
  )
    if (
      ((u = t),
      (l = u.times(u).times(u)),
      (f = l.plus(this)),
      (t = S(f.plus(this).times(u), f.plus(l), o + 2, 1)),
      O(u.d).slice(0, o) === (i = O(t.d)).slice(0, o))
    )
      if (((i = i.slice(o - 3, o + 1)), i == '9999' || (!r && i == '4999'))) {
        if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(this))) {
          t = u;
          break;
        }
        (o += 4), (r = 1);
      } else {
        (!+i || (!+i.slice(1) && i.charAt(0) == '5')) &&
          (p(t, e + 1, 1), (n = !t.times(t).times(t).eq(this)));
        break;
      }
  return (w = !0), p(t, e, a.rounding, n);
};
h.decimalPlaces = h.dp = function () {
  var e,
    n = this.d,
    i = Number.NaN;
  if (n) {
    if (((e = n.length - 1), (i = (e - R(this.e / m)) * m), (e = n[e]), e))
      for (; e % 10 == 0; e /= 10) i--;
    i < 0 && (i = 0);
  }
  return i;
};
h.dividedBy = h.div = function (e) {
  return S(this, new this.constructor(e));
};
h.dividedToIntegerBy = h.divToInt = function (e) {
  var i = this.constructor;
  return p(S(this, new i(e), 0, 1, 1), i.precision, i.rounding);
};
h.equals = h.eq = function (e) {
  return this.cmp(e) === 0;
};
h.floor = function () {
  return p(new this.constructor(this), this.e + 1, 3);
};
h.greaterThan = h.gt = function (e) {
  return this.cmp(e) > 0;
};
h.greaterThanOrEqualTo = h.gte = function (e) {
  var n = this.cmp(e);
  return n == 1 || n === 0;
};
h.hyperbolicCosine = h.cosh = function () {
  var e,
    n,
    i,
    t,
    r,
    s = this,
    o = s.constructor,
    u = new o(1);
  if (!s.isFinite()) return new o(s.s ? 1 / 0 : Number.NaN);
  if (s.isZero()) return u;
  (i = o.precision),
    (t = o.rounding),
    (o.precision = i + Math.max(s.e, s.sd()) + 4),
    (o.rounding = 1),
    (r = s.d.length),
    r < 32
      ? ((e = Math.ceil(r / 3)), (n = (1 / le(4, e)).toString()))
      : ((e = 16), (n = '2.3283064365386962890625e-10')),
    (s = j(o, 1, s.times(n), new o(1), !0));
  for (var l, f = e, c = new o(8); f--; )
    (l = s.times(s)), (s = u.minus(l.times(c.minus(l.times(c)))));
  return p(s, (o.precision = i), (o.rounding = t), !0);
};
h.hyperbolicSine = h.sinh = function () {
  var e,
    n,
    i,
    t,
    r = this,
    s = r.constructor;
  if (!r.isFinite() || r.isZero()) return new s(r);
  if (
    ((n = s.precision),
    (i = s.rounding),
    (s.precision = n + Math.max(r.e, r.sd()) + 4),
    (s.rounding = 1),
    (t = r.d.length),
    t < 3)
  )
    r = j(s, 2, r, r, !0);
  else {
    (e = 1.4 * Math.sqrt(t)),
      (e = e > 16 ? 16 : e | 0),
      (r = r.times(1 / le(5, e))),
      (r = j(s, 2, r, r, !0));
    for (var o, u = new s(5), l = new s(16), f = new s(20); e--; )
      (o = r.times(r)), (r = r.times(u.plus(o.times(l.times(o).plus(f)))));
  }
  return (s.precision = n), (s.rounding = i), p(r, n, i, !0);
};
h.hyperbolicTangent = h.tanh = function () {
  var e,
    n,
    t = this.constructor;
  return this.isFinite()
    ? this.isZero()
      ? new t(this)
      : ((e = t.precision),
        (n = t.rounding),
        (t.precision = e + 7),
        (t.rounding = 1),
        S(this.sinh(), this.cosh(), (t.precision = e), (t.rounding = n)))
    : new t(this.s);
};
h.inverseCosine = h.acos = function () {
  var e = this,
    n = e.constructor,
    i = e.abs().cmp(1),
    t = n.precision,
    r = n.rounding;
  return i !== -1
    ? i === 0
      ? e.isNeg()
        ? D(n, t, r)
        : new n(0)
      : new n(Number.NaN)
    : e.isZero()
      ? D(n, t + 4, r).times(0.5)
      : ((n.precision = t + 6),
        (n.rounding = 1),
        (e = new n(1).minus(e).div(e.plus(1)).sqrt().atan()),
        (n.precision = t),
        (n.rounding = r),
        e.times(2));
};
h.inverseHyperbolicCosine = h.acosh = function () {
  var e,
    n,
    i = this,
    t = i.constructor;
  return i.lte(1)
    ? new t(i.eq(1) ? 0 : Number.NaN)
    : i.isFinite()
      ? ((e = t.precision),
        (n = t.rounding),
        (t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4),
        (t.rounding = 1),
        (w = !1),
        (i = i.times(i).minus(1).sqrt().plus(i)),
        (w = !0),
        (t.precision = e),
        (t.rounding = n),
        i.ln())
      : new t(i);
};
h.inverseHyperbolicSine = h.asinh = function () {
  var e,
    n,
    i = this,
    t = i.constructor;
  return !i.isFinite() || i.isZero()
    ? new t(i)
    : ((e = t.precision),
      (n = t.rounding),
      (t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6),
      (t.rounding = 1),
      (w = !1),
      (i = i.times(i).plus(1).sqrt().plus(i)),
      (w = !0),
      (t.precision = e),
      (t.rounding = n),
      i.ln());
};
h.inverseHyperbolicTangent = h.atanh = function () {
  var e,
    n,
    i,
    t,
    r = this,
    s = r.constructor;
  return r.isFinite()
    ? r.e >= 0
      ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : Number.NaN)
      : ((e = s.precision),
        (n = s.rounding),
        (t = r.sd()),
        Math.max(t, e) < 2 * -r.e - 1
          ? p(new s(r), e, n, !0)
          : ((s.precision = i = t - r.e),
            (r = S(r.plus(1), new s(1).minus(r), i + e, 1)),
            (s.precision = e + 4),
            (s.rounding = 1),
            (r = r.ln()),
            (s.precision = e),
            (s.rounding = n),
            r.times(0.5)))
    : new s(Number.NaN);
};
h.inverseSine = h.asin = function () {
  var e,
    n,
    i,
    t,
    r = this,
    s = r.constructor;
  return r.isZero()
    ? new s(r)
    : ((n = r.abs().cmp(1)),
      (i = s.precision),
      (t = s.rounding),
      n !== -1
        ? n === 0
          ? ((e = D(s, i + 4, t).times(0.5)), (e.s = r.s), e)
          : new s(Number.NaN)
        : ((s.precision = i + 6),
          (s.rounding = 1),
          (r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan()),
          (s.precision = i),
          (s.rounding = t),
          r.times(2)));
};
h.inverseTangent = h.atan = function () {
  var e,
    n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f = this,
    c = f.constructor,
    a = c.precision,
    d = c.rounding;
  if (f.isFinite()) {
    if (f.isZero()) return new c(f);
    if (f.abs().eq(1) && a + 4 <= Ee)
      return (o = D(c, a + 4, d).times(0.25)), (o.s = f.s), o;
  } else {
    if (!f.s) return new c(Number.NaN);
    if (a + 4 <= Ee) return (o = D(c, a + 4, d).times(0.5)), (o.s = f.s), o;
  }
  for (
    c.precision = u = a + 10,
      c.rounding = 1,
      i = Math.min(28, (u / m + 2) | 0),
      e = i;
    e;
    --e
  )
    f = f.div(f.times(f).plus(1).sqrt().plus(1));
  for (
    w = !1, n = Math.ceil(u / m), t = 1, l = f.times(f), o = new c(f), r = f;
    e !== -1;
  )
    if (
      ((r = r.times(l)),
      (s = o.minus(r.div((t += 2)))),
      (r = r.times(l)),
      (o = s.plus(r.div((t += 2)))),
      o.d[n] !== void 0)
    )
      for (e = n; o.d[e] === s.d[e] && e--; );
  return (
    i && (o = o.times(2 << (i - 1))),
    (w = !0),
    p(o, (c.precision = a), (c.rounding = d), !0)
  );
};
h.isFinite = function () {
  return !!this.d;
};
h.isInteger = h.isInt = function () {
  return !!this.d && R(this.e / m) > this.d.length - 2;
};
h.isNaN = function () {
  return !this.s;
};
h.isNegative = h.isNeg = function () {
  return this.s < 0;
};
h.isPositive = h.isPos = function () {
  return this.s > 0;
};
h.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
h.lessThan = h.lt = function (e) {
  return this.cmp(e) < 0;
};
h.lessThanOrEqualTo = h.lte = function (e) {
  return this.cmp(e) < 1;
};
h.logarithm = h.log = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    c = this.constructor,
    a = c.precision,
    d = c.rounding,
    g = 5;
  if (e == null) (e = new c(10)), (n = !0);
  else {
    if (((e = new c(e)), (i = e.d), e.s < 0 || !i || !i[0] || e.eq(1)))
      return new c(Number.NaN);
    n = e.eq(10);
  }
  if (((i = this.d), this.s < 0 || !i || !i[0] || this.eq(1)))
    return new c(
      i && !i[0] ? -1 / 0 : this.s != 1 ? Number.NaN : i ? 0 : 1 / 0
    );
  if (n)
    if (i.length > 1) s = !0;
    else {
      for (r = i[0]; r % 10 === 0; ) r /= 10;
      s = r !== 1;
    }
  if (
    ((w = !1),
    (u = a + g),
    (o = B(this, u)),
    (t = n ? oe(c, u + 10) : B(e, u)),
    (l = S(o, t, u, 1)),
    x(l.d, (r = a), d))
  )
    do
      if (
        ((u += 10),
        (o = B(this, u)),
        (t = n ? oe(c, u + 10) : B(e, u)),
        (l = S(o, t, u, 1)),
        !s)
      ) {
        +O(l.d).slice(r + 1, r + 15) + 1 == 1e14 && (l = p(l, a + 1, 0));
        break;
      }
    while (x(l.d, (r += 10), d));
  return (w = !0), p(l, a, d);
};
h.minus = h.sub = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    c,
    a,
    d,
    v = this.constructor;
  if (((e = new v(e)), !this.d || !e.d))
    return (
      !this.s || !e.s
        ? (e = new v(Number.NaN))
        : this.d
          ? (e.s = -e.s)
          : (e = new v(e.d || this.s !== e.s ? this : Number.NaN)),
      e
    );
  if (this.s != e.s) return (e.s = -e.s), this.plus(e);
  if (
    ((f = this.d),
    (d = e.d),
    (u = v.precision),
    (l = v.rounding),
    !f[0] || !d[0])
  ) {
    if (d[0]) e.s = -e.s;
    else if (f[0]) e = new v(this);
    else return new v(l === 3 ? -0 : 0);
    return w ? p(e, u, l) : e;
  }
  if (
    ((i = R(e.e / m)), (c = R(this.e / m)), (f = f.slice()), (s = c - i), s)
  ) {
    for (
      a = s < 0,
        a
          ? ((n = f), (s = -s), (o = d.length))
          : ((n = d), (i = c), (o = f.length)),
        t = Math.max(Math.ceil(u / m), o) + 2,
        s > t && ((s = t), (n.length = 1)),
        n.reverse(),
        t = s;
      t--;
    )
      n.push(0);
    n.reverse();
  } else {
    for (t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++)
      if (f[t] != d[t]) {
        a = f[t] < d[t];
        break;
      }
    s = 0;
  }
  for (
    a && ((n = f), (f = d), (d = n), (e.s = -e.s)),
      o = f.length,
      t = d.length - o;
    t > 0;
    --t
  )
    f[o++] = 0;
  for (t = d.length; t > s; ) {
    if (f[--t] < d[t]) {
      for (r = t; r && f[--r] === 0; ) f[r] = L - 1;
      --f[r], (f[t] += L);
    }
    f[t] -= d[t];
  }
  while (f[--o] === 0) f.pop();
  for (; f[0] === 0; f.shift()) --i;
  return f[0]
    ? ((e.d = f), (e.e = fe(f, i)), w ? p(e, u, l) : e)
    : new v(l === 3 ? -0 : 0);
};
h.modulo = h.mod = function (e) {
  var n,
    t = this.constructor;
  return (
    (e = new t(e)),
    !this.d || !e.s || (e.d && !e.d[0])
      ? new t(Number.NaN)
      : !e.d || (this.d && !this.d[0])
        ? p(new t(this), t.precision, t.rounding)
        : ((w = !1),
          t.modulo == 9
            ? ((n = S(this, e.abs(), 0, 3, 1)), (n.s *= e.s))
            : (n = S(this, e, 0, t.modulo, 1)),
          (n = n.times(e)),
          (w = !0),
          this.minus(n))
  );
};
h.naturalExponential = h.exp = function () {
  return Se(this);
};
h.naturalLogarithm = h.ln = function () {
  return B(this);
};
h.negated = h.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s), p(e);
};
h.plus = h.add = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    c,
    d = this.constructor;
  if (((e = new d(e)), !this.d || !e.d))
    return (
      !this.s || !e.s
        ? (e = new d(Number.NaN))
        : this.d || (e = new d(e.d || this.s === e.s ? this : Number.NaN)),
      e
    );
  if (this.s != e.s) return (e.s = -e.s), this.minus(e);
  if (
    ((f = this.d),
    (c = e.d),
    (u = d.precision),
    (l = d.rounding),
    !f[0] || !c[0])
  )
    return c[0] || (e = new d(this)), w ? p(e, u, l) : e;
  if (
    ((s = R(this.e / m)), (t = R(e.e / m)), (f = f.slice()), (r = s - t), r)
  ) {
    for (
      r < 0
        ? ((i = f), (r = -r), (o = c.length))
        : ((i = c), (t = s), (o = f.length)),
        s = Math.ceil(u / m),
        o = s > o ? s + 1 : o + 1,
        r > o && ((r = o), (i.length = 1)),
        i.reverse();
      r--;
    )
      i.push(0);
    i.reverse();
  }
  for (
    o = f.length,
      r = c.length,
      o - r < 0 && ((r = o), (i = c), (c = f), (f = i)),
      n = 0;
    r;
  )
    (n = ((f[--r] = f[r] + c[r] + n) / L) | 0), (f[r] %= L);
  for (n && (f.unshift(n), ++t), o = f.length; f[--o] == 0; ) f.pop();
  return (e.d = f), (e.e = fe(f, t)), w ? p(e, u, l) : e;
};
h.precision = h.sd = function (e) {
  var n;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(V + e);
  return (
    this.d
      ? ((n = Ze(this.d)), e && this.e + 1 > n && (n = this.e + 1))
      : (n = Number.NaN),
    n
  );
};
h.round = function () {
  var n = this.constructor;
  return p(new n(this), this.e + 1, n.rounding);
};
h.sine = h.sin = function () {
  var e,
    n,
    i = this,
    t = i.constructor;
  return i.isFinite()
    ? i.isZero()
      ? new t(i)
      : ((e = t.precision),
        (n = t.rounding),
        (t.precision = e + Math.max(i.e, i.sd()) + m),
        (t.rounding = 1),
        (i = un(t, $e(t, i))),
        (t.precision = e),
        (t.rounding = n),
        p(Z > 2 ? i.neg() : i, e, n, !0))
    : new t(Number.NaN);
};
h.squareRoot = h.sqrt = function () {
  var e,
    n,
    i,
    t,
    r,
    s,
    u = this.d,
    l = this.e,
    f = this.s,
    c = this.constructor;
  if (f !== 1 || !u || !u[0])
    return new c(!f || (f < 0 && (!u || u[0])) ? Number.NaN : u ? this : 1 / 0);
  for (
    w = !1,
      f = Math.sqrt(+this),
      f == 0 || f == 1 / 0
        ? ((n = O(u)),
          (n.length + l) % 2 == 0 && (n += '0'),
          (f = Math.sqrt(n)),
          (l = R((l + 1) / 2) - (l < 0 || l % 2)),
          f == 1 / 0
            ? (n = '5e' + l)
            : ((n = f.toExponential()),
              (n = n.slice(0, n.indexOf('e') + 1) + l)),
          (t = new c(n)))
        : (t = new c(f.toString())),
      i = (l = c.precision) + 3;
    ;
  )
    if (
      ((s = t),
      (t = s.plus(S(this, s, i + 2, 1)).times(0.5)),
      O(s.d).slice(0, i) === (n = O(t.d)).slice(0, i))
    )
      if (((n = n.slice(i - 3, i + 1)), n == '9999' || (!r && n == '4999'))) {
        if (!r && (p(s, l + 1, 0), s.times(s).eq(this))) {
          t = s;
          break;
        }
        (i += 4), (r = 1);
      } else {
        (!+n || (!+n.slice(1) && n.charAt(0) == '5')) &&
          (p(t, l + 1, 1), (e = !t.times(t).eq(this)));
        break;
      }
  return (w = !0), p(t, l, c.rounding, e);
};
h.tangent = h.tan = function () {
  var e,
    n,
    i = this,
    t = i.constructor;
  return i.isFinite()
    ? i.isZero()
      ? new t(i)
      : ((e = t.precision),
        (n = t.rounding),
        (t.precision = e + 10),
        (t.rounding = 1),
        (i = i.sin()),
        (i.s = 1),
        (i = S(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0)),
        (t.precision = e),
        (t.rounding = n),
        p(Z == 2 || Z == 4 ? i.neg() : i, e, n, !0))
    : new t(Number.NaN);
};
h.times = h.mul = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    a = this.constructor,
    d = this.d,
    g = (e = new a(e)).d;
  if (((e.s *= this.s), !d || !d[0] || !g || !g[0]))
    return new a(
      !e.s || (d && !d[0] && !g) || (g && !g[0] && !d)
        ? Number.NaN
        : !d || !g
          ? e.s / 0
          : e.s * 0
    );
  for (
    i = R(this.e / m) + R(e.e / m),
      l = d.length,
      f = g.length,
      l < f && ((s = d), (d = g), (g = s), (o = l), (l = f), (f = o)),
      s = [],
      o = l + f,
      t = o;
    t--;
  )
    s.push(0);
  for (t = f; --t >= 0; ) {
    for (n = 0, r = l + t; r > t; )
      (u = s[r] + g[t] * d[r - t - 1] + n),
        (s[r--] = (u % L) | 0),
        (n = (u / L) | 0);
    s[r] = ((s[r] + n) % L) | 0;
  }
  while (!s[--o]) s.pop();
  return (
    n ? ++i : s.shift(),
    (e.d = s),
    (e.e = fe(s, i)),
    w ? p(e, a.precision, a.rounding) : e
  );
};
h.toBinary = function (e, n) {
  return ke(this, 2, e, n);
};
h.toDecimalPlaces = h.toDP = function (e, n) {
  var i = this,
    t = i.constructor;
  return (
    (i = new t(i)),
    e === void 0
      ? i
      : (_(e, 0, $),
        n === void 0 ? (n = t.rounding) : _(n, 0, 8),
        p(i, e + i.e + 1, n))
  );
};
h.toExponential = function (e, n) {
  var i,
    t = this,
    r = t.constructor;
  return (
    e === void 0
      ? (i = F(t, !0))
      : (_(e, 0, $),
        n === void 0 ? (n = r.rounding) : _(n, 0, 8),
        (t = p(new r(t), e + 1, n)),
        (i = F(t, !0, e + 1))),
    t.isNeg() && !t.isZero() ? '-' + i : i
  );
};
h.toFixed = function (e, n) {
  var i,
    t,
    s = this.constructor;
  return (
    e === void 0
      ? (i = F(this))
      : (_(e, 0, $),
        n === void 0 ? (n = s.rounding) : _(n, 0, 8),
        (t = p(new s(this), e + this.e + 1, n)),
        (i = F(t, !1, e + t.e + 1))),
    this.isNeg() && !this.isZero() ? '-' + i : i
  );
};
h.toFraction = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    c,
    a,
    d,
    v = this.d,
    N = this.constructor;
  if (!v) return new N(this);
  if (
    ((f = i = new N(1)),
    (t = l = new N(0)),
    (n = new N(t)),
    (s = n.e = Ze(v) - this.e - 1),
    (o = s % m),
    (n.d[0] = C(10, o < 0 ? m + o : o)),
    e == null)
  )
    e = s > 0 ? n : f;
  else {
    if (((u = new N(e)), !u.isInt() || u.lt(f))) throw Error(V + u);
    e = u.gt(n) ? (s > 0 ? n : f) : u;
  }
  for (
    w = !1,
      u = new N(O(v)),
      c = N.precision,
      N.precision = s = v.length * m * 2;
    (a = S(u, n, 0, 1, 1)), (r = i.plus(a.times(t))), r.cmp(e) != 1;
  )
    (i = t),
      (t = r),
      (r = f),
      (f = l.plus(a.times(r))),
      (l = r),
      (r = n),
      (n = u.minus(a.times(r))),
      (u = r);
  return (
    (r = S(e.minus(i), t, 0, 1, 1)),
    (l = l.plus(r.times(f))),
    (i = i.plus(r.times(t))),
    (l.s = f.s = this.s),
    (d =
      S(f, t, s, 1)
        .minus(this)
        .abs()
        .cmp(S(l, i, s, 1).minus(this).abs()) < 1
        ? [f, t]
        : [l, i]),
    (N.precision = c),
    (w = !0),
    d
  );
};
h.toHexadecimal = h.toHex = function (e, n) {
  return ke(this, 16, e, n);
};
h.toNearest = function (e, n) {
  var i = this,
    t = i.constructor;
  if (((i = new t(i)), e == null)) {
    if (!i.d) return i;
    (e = new t(1)), (n = t.rounding);
  } else {
    if (((e = new t(e)), n === void 0 ? (n = t.rounding) : _(n, 0, 8), !i.d))
      return e.s ? i : e;
    if (!e.d) return e.s && (e.s = i.s), e;
  }
  return (
    e.d[0]
      ? ((w = !1), (i = S(i, e, 0, n, 1).times(e)), (w = !0), p(i))
      : ((e.s = i.s), (i = e)),
    i
  );
};
h.toNumber = function () {
  return +this;
};
h.toOctal = function (e, n) {
  return ke(this, 8, e, n);
};
h.toPower = h.pow = function (e) {
  var n,
    i,
    t,
    r,
    s,
    o,
    u = this,
    l = u.constructor,
    f = +(e = new l(e));
  if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new l(C(+u, f));
  if (((u = new l(u)), u.eq(1))) return u;
  if (((t = l.precision), (s = l.rounding), e.eq(1))) return p(u, t, s);
  if (((n = R(e.e / m)), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= tn))
    return (r = Ue(l, u, i, t)), e.s < 0 ? new l(1).div(r) : p(r, t, s);
  if (((o = u.s), o < 0)) {
    if (n < e.d.length - 1) return new l(Number.NaN);
    if ((e.d[n] & 1 || (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1))
      return (u.s = o), u;
  }
  return (
    (i = C(+u, f)),
    (n =
      i == 0 || !isFinite(i)
        ? R(f * (Math.log('0.' + O(u.d)) / Math.LN10 + u.e + 1))
        : new l(i + '').e),
    n > l.maxE + 1 || n < l.minE - 1
      ? new l(n > 0 ? o / 0 : 0)
      : ((w = !1),
        (l.rounding = u.s = 1),
        (i = Math.min(12, (n + '').length)),
        (r = Se(e.times(B(u, t + i)), t)),
        r.d &&
          ((r = p(r, t + 5, 1)),
          x(r.d, t, s) &&
            ((n = t + 10),
            (r = p(Se(e.times(B(u, n + i)), n), n + 5, 1)),
            +O(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))),
        (r.s = o),
        (w = !0),
        (l.rounding = s),
        p(r, t, s))
  );
};
h.toPrecision = function (e, n) {
  var i,
    t = this,
    r = t.constructor;
  return (
    e === void 0
      ? (i = F(t, t.e <= r.toExpNeg || t.e >= r.toExpPos))
      : (_(e, 1, $),
        n === void 0 ? (n = r.rounding) : _(n, 0, 8),
        (t = p(new r(t), e, n)),
        (i = F(t, e <= t.e || t.e <= r.toExpNeg, e))),
    t.isNeg() && !t.isZero() ? '-' + i : i
  );
};
h.toSignificantDigits = h.toSD = function (e, n) {
  var t = this.constructor;
  return (
    e === void 0
      ? ((e = t.precision), (n = t.rounding))
      : (_(e, 1, $), n === void 0 ? (n = t.rounding) : _(n, 0, 8)),
    p(new t(this), e, n)
  );
};
h.toString = function () {
  var n = this.constructor,
    i = F(this, this.e <= n.toExpNeg || this.e >= n.toExpPos);
  return this.isNeg() && !this.isZero() ? '-' + i : i;
};
h.truncated = h.trunc = function () {
  return p(new this.constructor(this), this.e + 1, 1);
};
h.valueOf = h.toJSON = function () {
  var n = this.constructor,
    i = F(this, this.e <= n.toExpNeg || this.e >= n.toExpPos);
  return this.isNeg() ? '-' + i : i;
};
function O(e) {
  var n,
    i,
    t,
    r = e.length - 1,
    s = '',
    o = e[0];
  if (r > 0) {
    for (s += o, n = 1; n < r; n++)
      (t = e[n] + ''), (i = m - t.length), i && (s += U(i)), (s += t);
    (o = e[n]), (t = o + ''), (i = m - t.length), i && (s += U(i));
  } else if (o === 0) return '0';
  while (o % 10 === 0) o /= 10;
  return s + o;
}
function _(e, n, i) {
  if (e !== ~~e || e < n || e > i) throw Error(V + e);
}
function x(e, n, i, t) {
  var r, s, o, u;
  for (s = e[0]; s >= 10; s /= 10) --n;
  return (
    --n < 0 ? ((n += m), (r = 0)) : ((r = Math.ceil((n + 1) / m)), (n %= m)),
    (s = C(10, m - n)),
    (u = (e[r] % s) | 0),
    t == null
      ? n < 3
        ? (n == 0 ? (u = (u / 100) | 0) : n == 1 && (u = (u / 10) | 0),
          (o =
            (i < 4 && u == 99999) ||
            (i > 3 && u == 49999) ||
            u == 5e4 ||
            u == 0))
        : (o =
            (((i < 4 && u + 1 == s) || (i > 3 && u + 1 == s / 2)) &&
              ((e[r + 1] / s / 100) | 0) == C(10, n - 2) - 1) ||
            ((u == s / 2 || u == 0) && ((e[r + 1] / s / 100) | 0) == 0))
      : n < 4
        ? (n == 0
            ? (u = (u / 1e3) | 0)
            : n == 1
              ? (u = (u / 100) | 0)
              : n == 2 && (u = (u / 10) | 0),
          (o = ((t || i < 4) && u == 9999) || (!t && i > 3 && u == 4999)))
        : (o =
            (((t || i < 4) && u + 1 == s) || (!t && i > 3 && u + 1 == s / 2)) &&
            ((e[r + 1] / s / 1e3) | 0) == C(10, n - 3) - 1),
    o
  );
}
function ie(e, n, i) {
  for (var t, r = [0], s, o = 0, u = e.length; o < u; ) {
    for (s = r.length; s--; ) r[s] *= n;
    for (r[0] += Ne.indexOf(e.charAt(o++)), t = 0; t < r.length; t++)
      r[t] > i - 1 &&
        (r[t + 1] === void 0 && (r[t + 1] = 0),
        (r[t + 1] += (r[t] / i) | 0),
        (r[t] %= i));
  }
  return r.reverse();
}
function sn(e, n) {
  var i, t, r;
  if (n.isZero()) return n;
  (t = n.d.length),
    t < 32
      ? ((i = Math.ceil(t / 3)), (r = (1 / le(4, i)).toString()))
      : ((i = 16), (r = '2.3283064365386962890625e-10')),
    (e.precision += i),
    (n = j(e, 1, n.times(r), new e(1)));
  for (var s = i; s--; ) {
    var o = n.times(n);
    n = o.times(o).minus(o).times(8).plus(1);
  }
  return (e.precision -= i), n;
}
var S = (() => {
  function e(t, r, s) {
    var o,
      u = 0,
      l = t.length;
    for (t = t.slice(); l--; )
      (o = t[l] * r + u), (t[l] = (o % s) | 0), (u = (o / s) | 0);
    return u && t.unshift(u), t;
  }
  function n(t, r, s, o) {
    var u, l;
    if (s != o) l = s > o ? 1 : -1;
    else
      for (u = l = 0; u < s; u++)
        if (t[u] != r[u]) {
          l = t[u] > r[u] ? 1 : -1;
          break;
        }
    return l;
  }
  function i(t, r, s, o) {
    for (var u = 0; s--; )
      (t[s] -= u), (u = t[s] < r[s] ? 1 : 0), (t[s] = u * o + t[s] - r[s]);
    while (!t[0] && t.length > 1) t.shift();
  }
  return (t, r, s, o, u, l) => {
    var f,
      c,
      a,
      d,
      g,
      v,
      N,
      A,
      M,
      q,
      E,
      P,
      Y,
      I,
      ce,
      z,
      W,
      ae,
      T,
      y,
      ee = t.constructor,
      de = t.s == r.s ? 1 : -1,
      b = t.d,
      k = r.d;
    if (!b || !b[0] || !k || !k[0])
      return new ee(
        !t.s || !r.s || (b ? k && b[0] == k[0] : !k)
          ? Number.NaN
          : (b && b[0] == 0) || !k
            ? de * 0
            : de / 0
      );
    for (
      l
        ? ((g = 1), (c = t.e - r.e))
        : ((l = L), (g = m), (c = R(t.e / g) - R(r.e / g))),
        T = k.length,
        W = b.length,
        M = new ee(de),
        q = M.d = [],
        a = 0;
      k[a] == (b[a] || 0);
      a++
    );
    if (
      (k[a] > (b[a] || 0) && c--,
      s == null
        ? ((I = s = ee.precision), (o = ee.rounding))
        : u
          ? (I = s + (t.e - r.e) + 1)
          : (I = s),
      I < 0)
    )
      q.push(1), (v = !0);
    else {
      if (((I = (I / g + 2) | 0), (a = 0), T == 1)) {
        for (d = 0, k = k[0], I++; (a < W || d) && I--; a++)
          (ce = d * l + (b[a] || 0)), (q[a] = (ce / k) | 0), (d = (ce % k) | 0);
        v = d || a < W;
      } else {
        for (
          d = (l / (k[0] + 1)) | 0,
            d > 1 &&
              ((k = e(k, d, l)),
              (b = e(b, d, l)),
              (T = k.length),
              (W = b.length)),
            z = T,
            E = b.slice(0, T),
            P = E.length;
          P < T;
        )
          E[P++] = 0;
        (y = k.slice()), y.unshift(0), (ae = k[0]), k[1] >= l / 2 && ++ae;
        do
          (d = 0),
            (f = n(k, E, T, P)),
            f < 0
              ? ((Y = E[0]),
                T != P && (Y = Y * l + (E[1] || 0)),
                (d = (Y / ae) | 0),
                d > 1
                  ? (d >= l && (d = l - 1),
                    (N = e(k, d, l)),
                    (A = N.length),
                    (P = E.length),
                    (f = n(N, E, A, P)),
                    f == 1 && (d--, i(N, T < A ? y : k, A, l)))
                  : (d == 0 && (f = d = 1), (N = k.slice())),
                (A = N.length),
                A < P && N.unshift(0),
                i(E, N, P, l),
                f == -1 &&
                  ((P = E.length),
                  (f = n(k, E, T, P)),
                  f < 1 && (d++, i(E, T < P ? y : k, P, l))),
                (P = E.length))
              : f === 0 && (d++, (E = [0])),
            (q[a++] = d),
            f && E[0] ? (E[P++] = b[z] || 0) : ((E = [b[z]]), (P = 1));
        while ((z++ < W || E[0] !== void 0) && I--);
        v = E[0] !== void 0;
      }
      q[0] || q.shift();
    }
    if (g == 1) (M.e = c), (Te = v);
    else {
      for (a = 1, d = q[0]; d >= 10; d /= 10) a++;
      (M.e = a + c * g - 1), p(M, u ? s + M.e + 1 : s, o, v);
    }
    return M;
  };
})();
function p(e, n, i, t) {
  var r,
    s,
    o,
    u,
    l,
    f,
    c,
    a,
    d,
    g = e.constructor;
  e: if (n != null) {
    if (((a = e.d), !a)) return e;
    for (r = 1, u = a[0]; u >= 10; u /= 10) r++;
    if (((s = n - r), s < 0))
      (s += m),
        (o = n),
        (c = a[(d = 0)]),
        (l = ((c / C(10, r - o - 1)) % 10) | 0);
    else if (((d = Math.ceil((s + 1) / m)), (u = a.length), d >= u))
      if (t) {
        while (u++ <= d) a.push(0);
        (c = l = 0), (r = 1), (s %= m), (o = s - m + 1);
      } else break e;
    else {
      for (c = u = a[d], r = 1; u >= 10; u /= 10) r++;
      (s %= m),
        (o = s - m + r),
        (l = o < 0 ? 0 : ((c / C(10, r - o - 1)) % 10) | 0);
    }
    if (
      ((t =
        t ||
        n < 0 ||
        a[d + 1] !== void 0 ||
        (o < 0 ? c : c % C(10, r - o - 1))),
      (f =
        i < 4
          ? (l || t) && (i == 0 || i == (e.s < 0 ? 3 : 2))
          : l > 5 ||
            (l == 5 &&
              (i == 4 ||
                t ||
                (i == 6 &&
                  ((s > 0 ? (o > 0 ? c / C(10, r - o) : 0) : a[d - 1]) % 10) &
                    1) ||
                i == (e.s < 0 ? 8 : 7)))),
      n < 1 || !a[0])
    )
      return (
        (a.length = 0),
        f
          ? ((n -= e.e + 1), (a[0] = C(10, (m - (n % m)) % m)), (e.e = -n || 0))
          : (a[0] = e.e = 0),
        e
      );
    if (
      (s == 0
        ? ((a.length = d), (u = 1), d--)
        : ((a.length = d + 1),
          (u = C(10, m - s)),
          (a[d] = o > 0 ? (((c / C(10, r - o)) % C(10, o)) | 0) * u : 0)),
      f)
    )
      for (;;)
        if (d == 0) {
          for (s = 1, o = a[0]; o >= 10; o /= 10) s++;
          for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++;
          s != u && (e.e++, a[0] == L && (a[0] = 1));
          break;
        } else {
          if (((a[d] += u), a[d] != L)) break;
          (a[d--] = 0), (u = 1);
        }
    for (s = a.length; a[--s] === 0; ) a.pop();
  }
  return (
    w &&
      (e.e > g.maxE
        ? ((e.d = null), (e.e = Number.NaN))
        : e.e < g.minE && ((e.e = 0), (e.d = [0]))),
    e
  );
}
function F(e, n, i) {
  if (!e.isFinite()) return Ve(e);
  var t,
    r = e.e,
    s = O(e.d),
    o = s.length;
  return (
    n
      ? (i && (t = i - o) > 0
          ? (s = s.charAt(0) + '.' + s.slice(1) + U(t))
          : o > 1 && (s = s.charAt(0) + '.' + s.slice(1)),
        (s = s + (e.e < 0 ? 'e' : 'e+') + e.e))
      : r < 0
        ? ((s = '0.' + U(-r - 1) + s), i && (t = i - o) > 0 && (s += U(t)))
        : r >= o
          ? ((s += U(r + 1 - o)),
            i && (t = i - r - 1) > 0 && (s = s + '.' + U(t)))
          : ((t = r + 1) < o && (s = s.slice(0, t) + '.' + s.slice(t)),
            i && (t = i - o) > 0 && (r + 1 === o && (s += '.'), (s += U(t)))),
    s
  );
}
function fe(e, n) {
  var i = e[0];
  for (n *= m; i >= 10; i /= 10) n++;
  return n;
}
function oe(e, n, i) {
  if (n > rn) throw ((w = !0), i && (e.precision = i), Error(Le));
  return p(new e(re), n, 1, !0);
}
function D(e, n, i) {
  if (n > Ee) throw Error(Le);
  return p(new e(se), n, i, !0);
}
function Ze(e) {
  var n = e.length - 1,
    i = n * m + 1;
  if (((n = e[n]), n)) {
    for (; n % 10 == 0; n /= 10) i--;
    for (n = e[0]; n >= 10; n /= 10) i++;
  }
  return i;
}
function U(e) {
  for (var n = ''; e--; ) n += '0';
  return n;
}
function Ue(e, n, i, t) {
  var r,
    s = new e(1),
    o = Math.ceil(t / m + 4);
  for (w = !1; ; ) {
    if (
      (i % 2 && ((s = s.times(n)), _e(s.d, o) && (r = !0)),
      (i = R(i / 2)),
      i === 0)
    ) {
      (i = s.d.length - 1), r && s.d[i] === 0 && ++s.d[i];
      break;
    }
    (n = n.times(n)), _e(n.d, o);
  }
  return (w = !0), s;
}
function Ae(e) {
  return e.d[e.d.length - 1] & 1;
}
function Be(e, n, i) {
  for (var t, r, s = new e(n[0]), o = 0; ++o < n.length; ) {
    if (((r = new e(n[o])), !r.s)) {
      s = r;
      break;
    }
    (t = s.cmp(r)), (t === i || (t === 0 && s.s === i)) && (s = r);
  }
  return s;
}
function Se(e, n) {
  var i,
    t,
    r,
    s,
    o,
    u,
    l,
    f = 0,
    c = 0,
    a = 0,
    d = e.constructor,
    g = d.rounding,
    v = d.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new d(
      e.d
        ? e.d[0]
          ? e.s < 0
            ? 0
            : 1 / 0
          : 1
        : e.s
          ? e.s < 0
            ? 0
            : e
          : Number.NaN
    );
  for (
    n == null ? ((w = !1), (l = v)) : (l = n), u = new d(0.03125);
    e.e > -2;
  )
    (e = e.times(u)), (a += 5);
  for (
    t = ((Math.log(C(2, a)) / Math.LN10) * 2 + 5) | 0,
      l += t,
      i = s = o = new d(1),
      d.precision = l;
    ;
  ) {
    if (
      ((s = p(s.times(e), l, 1)),
      (i = i.times(++c)),
      (u = o.plus(S(s, i, l, 1))),
      O(u.d).slice(0, l) === O(o.d).slice(0, l))
    ) {
      for (r = a; r--; ) o = p(o.times(o), l, 1);
      if (n == null)
        if (f < 3 && x(o.d, l - t, g, f))
          (d.precision = l += 10), (i = s = u = new d(1)), (c = 0), f++;
        else return p(o, (d.precision = v), g, (w = !0));
      else return (d.precision = v), o;
    }
    o = u;
  }
}
function B(e, n) {
  var i,
    t,
    r,
    s,
    o,
    u,
    l,
    f,
    c,
    a,
    d,
    g = 1,
    v = 10,
    N = e,
    A = N.d,
    M = N.constructor,
    q = M.rounding,
    E = M.precision;
  if (N.s < 0 || !A || !A[0] || (!N.e && A[0] == 1 && A.length == 1))
    return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? Number.NaN : A ? 0 : N);
  if (
    (n == null ? ((w = !1), (c = E)) : (c = n),
    (M.precision = c += v),
    (i = O(A)),
    (t = i.charAt(0)),
    Math.abs((s = N.e)) < 15e14)
  ) {
    while ((t < 7 && t != 1) || (t == 1 && i.charAt(1) > 3))
      (N = N.times(e)), (i = O(N.d)), (t = i.charAt(0)), g++;
    (s = N.e),
      t > 1 ? ((N = new M('0.' + i)), s++) : (N = new M(t + '.' + i.slice(1)));
  } else
    return (
      (f = oe(M, c + 2, E).times(s + '')),
      (N = B(new M(t + '.' + i.slice(1)), c - v).plus(f)),
      (M.precision = E),
      n == null ? p(N, E, q, (w = !0)) : N
    );
  for (
    a = N,
      l = o = N = S(N.minus(1), N.plus(1), c, 1),
      d = p(N.times(N), c, 1),
      r = 3;
    ;
  ) {
    if (
      ((o = p(o.times(d), c, 1)),
      (f = l.plus(S(o, new M(r), c, 1))),
      O(f.d).slice(0, c) === O(l.d).slice(0, c))
    )
      if (
        ((l = l.times(2)),
        s !== 0 && (l = l.plus(oe(M, c + 2, E).times(s + ''))),
        (l = S(l, new M(g), c, 1)),
        n == null)
      )
        if (x(l.d, c - v, q, u))
          (M.precision = c += v),
            (f = o = N = S(a.minus(1), a.plus(1), c, 1)),
            (d = p(N.times(N), c, 1)),
            (r = u = 1);
        else return p(l, (M.precision = E), q, (w = !0));
      else return (M.precision = E), l;
    (l = f), (r += 2);
  }
}
function Ve(e) {
  return String((e.s * e.s) / 0);
}
function te(e, n) {
  var i, t, r;
  for (
    (i = n.indexOf('.')) > -1 && (n = n.replace('.', '')),
      (t = n.search(/e/i)) > 0
        ? (i < 0 && (i = t), (i += +n.slice(t + 1)), (n = n.substring(0, t)))
        : i < 0 && (i = n.length),
      t = 0;
    n.charCodeAt(t) === 48;
    t++
  );
  for (r = n.length; n.charCodeAt(r - 1) === 48; --r);
  if (((n = n.slice(t, r)), n)) {
    if (
      ((r -= t),
      (e.e = i = i - t - 1),
      (e.d = []),
      (t = (i + 1) % m),
      i < 0 && (t += m),
      t < r)
    ) {
      for (t && e.d.push(+n.slice(0, t)), r -= m; t < r; )
        e.d.push(+n.slice(t, (t += m)));
      (n = n.slice(t)), (t = m - n.length);
    } else t -= r;
    while (t--) n += '0';
    e.d.push(+n),
      w &&
        (e.e > e.constructor.maxE
          ? ((e.d = null), (e.e = Number.NaN))
          : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
  } else (e.e = 0), (e.d = [0]);
  return e;
}
function on(e, n) {
  var i, t, r, s, o, u, l, f, c;
  if (n.indexOf('_') > -1) {
    if (((n = n.replace(/(\d)_(?=\d)/g, '$1')), Ie.test(n))) return te(e, n);
  } else if (n === 'Infinity' || n === 'NaN')
    return +n || (e.s = Number.NaN), (e.e = Number.NaN), (e.d = null), e;
  if (en.test(n)) (i = 16), (n = n.toLowerCase());
  else if (ye.test(n)) i = 2;
  else if (nn.test(n)) i = 8;
  else throw Error(V + n);
  for (
    s = n.search(/p/i),
      s > 0
        ? ((l = +n.slice(s + 1)), (n = n.substring(2, s)))
        : (n = n.slice(2)),
      s = n.indexOf('.'),
      o = s >= 0,
      t = e.constructor,
      o &&
        ((n = n.replace('.', '')),
        (u = n.length),
        (s = u - s),
        (r = Ue(t, new t(i), s, s * 2))),
      f = ie(n, i, L),
      c = f.length - 1,
      s = c;
    f[s] === 0;
    --s
  )
    f.pop();
  return s < 0
    ? new t(e.s * 0)
    : ((e.e = fe(f, c)),
      (e.d = f),
      (w = !1),
      o && (e = S(e, r, u * 4)),
      l && (e = e.times(Math.abs(l) < 54 ? C(2, l) : Q.pow(2, l))),
      (w = !0),
      e);
}
function un(e, n) {
  var i,
    t = n.d.length;
  if (t < 3) return n.isZero() ? n : j(e, 2, n, n);
  (i = 1.4 * Math.sqrt(t)),
    (i = i > 16 ? 16 : i | 0),
    (n = n.times(1 / le(5, i))),
    (n = j(e, 2, n, n));
  for (var r, s = new e(5), o = new e(16), u = new e(20); i--; )
    (r = n.times(n)), (n = n.times(s.plus(r.times(o.times(r).minus(u)))));
  return n;
}
function j(e, n, i, t, r) {
  var s,
    o,
    u,
    l,
    f = 1,
    c = e.precision,
    a = Math.ceil(c / m);
  for (w = !1, l = i.times(i), u = new e(t); ; ) {
    if (
      ((o = S(u.times(l), new e(n++ * n++), c, 1)),
      (u = r ? t.plus(o) : t.minus(o)),
      (t = S(o.times(l), new e(n++ * n++), c, 1)),
      (o = u.plus(t)),
      o.d[a] !== void 0)
    ) {
      for (s = a; o.d[s] === u.d[s] && s--; );
      if (s == -1) break;
    }
    (s = u), (u = t), (t = o), (o = s), f++;
  }
  return (w = !0), (o.d.length = a + 1), o;
}
function le(e, n) {
  for (var i = e; --n; ) i *= e;
  return i;
}
function $e(e, n) {
  var i,
    t = n.s < 0,
    r = D(e, e.precision, 1),
    s = r.times(0.5);
  if (((n = n.abs()), n.lte(s))) return (Z = t ? 4 : 1), n;
  if (((i = n.divToInt(r)), i.isZero())) Z = t ? 3 : 2;
  else {
    if (((n = n.minus(i.times(r))), n.lte(s)))
      return (Z = Ae(i) ? (t ? 2 : 3) : t ? 4 : 1), n;
    Z = Ae(i) ? (t ? 1 : 4) : t ? 3 : 2;
  }
  return n.minus(r).abs();
}
function ke(e, n, i, t) {
  var r,
    s,
    o,
    u,
    l,
    f,
    c,
    a,
    d,
    g = e.constructor,
    v = i !== void 0;
  if (
    (v
      ? (_(i, 1, $), t === void 0 ? (t = g.rounding) : _(t, 0, 8))
      : ((i = g.precision), (t = g.rounding)),
    !e.isFinite())
  )
    c = Ve(e);
  else {
    for (
      c = F(e),
        o = c.indexOf('.'),
        v
          ? ((r = 2), n == 16 ? (i = i * 4 - 3) : n == 8 && (i = i * 3 - 2))
          : (r = n),
        o >= 0 &&
          ((c = c.replace('.', '')),
          (d = new g(1)),
          (d.e = c.length - o),
          (d.d = ie(F(d), 10, r)),
          (d.e = d.d.length)),
        a = ie(c, 10, r),
        s = l = a.length;
      a[--l] == 0;
    )
      a.pop();
    if (a[0]) {
      if (
        (o < 0
          ? s--
          : ((e = new g(e)),
            (e.d = a),
            (e.e = s),
            (e = S(e, d, i, t, 0, r)),
            (a = e.d),
            (s = e.e),
            (f = Te)),
        (o = a[i]),
        (u = r / 2),
        (f = f || a[i + 1] !== void 0),
        (f =
          t < 4
            ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2))
            : o > u ||
              (o === u &&
                (t === 4 ||
                  f ||
                  (t === 6 && a[i - 1] & 1) ||
                  t === (e.s < 0 ? 8 : 7)))),
        (a.length = i),
        f)
      )
        while (++a[--i] > r - 1) (a[i] = 0), i || (++s, a.unshift(1));
      for (l = a.length; !a[l - 1]; --l);
      for (o = 0, c = ''; o < l; o++) c += Ne.charAt(a[o]);
      if (v) {
        if (l > 1)
          if (n == 16 || n == 8) {
            for (o = n == 16 ? 4 : 3, --l; l % o; l++) c += '0';
            for (a = ie(c, r, n), l = a.length; !a[l - 1]; --l);
            for (o = 1, c = '1.'; o < l; o++) c += Ne.charAt(a[o]);
          } else c = c.charAt(0) + '.' + c.slice(1);
        c = c + (s < 0 ? 'p' : 'p+') + s;
      } else if (s < 0) {
        while (++s) c = '0' + c;
        c = '0.' + c;
      } else if (++s > l) for (s -= l; s--; ) c += '0';
      else s < l && (c = c.slice(0, s) + '.' + c.slice(s));
    } else c = v ? '0p+0' : '0';
    c = (n == 16 ? '0x' : n == 2 ? '0b' : n == 8 ? '0o' : '') + c;
  }
  return e.s < 0 ? '-' + c : c;
}
function _e(e, n) {
  if (e.length > n) return (e.length = n), !0;
}
function fn(e) {
  return new this(e).abs();
}
function ln(e) {
  return new this(e).acos();
}
function cn(e) {
  return new this(e).acosh();
}
function an(e, n) {
  return new this(e).plus(n);
}
function dn(e) {
  return new this(e).asin();
}
function hn(e) {
  return new this(e).asinh();
}
function pn(e) {
  return new this(e).atan();
}
function gn(e) {
  return new this(e).atanh();
}
function mn(e, n) {
  (e = new this(e)), (n = new this(n));
  var i,
    t = this.precision,
    r = this.rounding,
    s = t + 4;
  return (
    !e.s || !n.s
      ? (i = new this(Number.NaN))
      : !e.d && !n.d
        ? ((i = D(this, s, 1).times(n.s > 0 ? 0.25 : 0.75)), (i.s = e.s))
        : !n.d || e.isZero()
          ? ((i = n.s < 0 ? D(this, t, r) : new this(0)), (i.s = e.s))
          : !e.d || n.isZero()
            ? ((i = D(this, s, 1).times(0.5)), (i.s = e.s))
            : n.s < 0
              ? ((this.precision = s),
                (this.rounding = 1),
                (i = this.atan(S(e, n, s, 1))),
                (n = D(this, s, 1)),
                (this.precision = t),
                (this.rounding = r),
                (i = e.s < 0 ? i.minus(n) : i.plus(n)))
              : (i = this.atan(S(e, n, s, 1))),
    i
  );
}
function wn(e) {
  return new this(e).cbrt();
}
function Nn(e) {
  return p((e = new this(e)), e.e + 1, 2);
}
function vn(e, n, i) {
  return new this(e).clamp(n, i);
}
function En(e) {
  if (!e || typeof e != 'object') throw Error(ue + 'Object expected');
  var n,
    i,
    t,
    r = e.defaults === !0,
    s = [
      'precision',
      1,
      $,
      'rounding',
      0,
      8,
      'toExpNeg',
      -H,
      0,
      'toExpPos',
      0,
      H,
      'maxE',
      0,
      H,
      'minE',
      -H,
      0,
      'modulo',
      0,
      9,
    ];
  for (n = 0; n < s.length; n += 3)
    if (((i = s[n]), r && (this[i] = ve[i]), (t = e[i]) !== void 0))
      if (R(t) === t && t >= s[n + 1] && t <= s[n + 2]) this[i] = t;
      else throw Error(V + i + ': ' + t);
  if (((i = 'crypto'), r && (this[i] = ve[i]), (t = e[i]) !== void 0))
    if (t === !0 || t === !1 || t === 0 || t === 1)
      if (t)
        if (
          typeof crypto < 'u' &&
          crypto &&
          (crypto.getRandomValues || crypto.randomBytes)
        )
          this[i] = !0;
        else throw Error(De);
      else this[i] = !1;
    else throw Error(V + i + ': ' + t);
  return this;
}
function Sn(e) {
  return new this(e).cos();
}
function kn(e) {
  return new this(e).cosh();
}
function He(e) {
  var n, i, t;
  function r(s) {
    var o, u, l;
    if (!(this instanceof r)) return new r(s);
    if (((this.constructor = r), qe(s))) {
      (this.s = s.s),
        w
          ? !s.d || s.e > r.maxE
            ? ((this.e = Number.NaN), (this.d = null))
            : s.e < r.minE
              ? ((this.e = 0), (this.d = [0]))
              : ((this.e = s.e), (this.d = s.d.slice()))
          : ((this.e = s.e), (this.d = s.d ? s.d.slice() : s.d));
      return;
    }
    if (((l = typeof s), l === 'number')) {
      if (s === 0) {
        (this.s = 1 / s < 0 ? -1 : 1), (this.e = 0), (this.d = [0]);
        return;
      }
      if (
        (s < 0 ? ((s = -s), (this.s = -1)) : (this.s = 1), s === ~~s && s < 1e7)
      ) {
        for (o = 0, u = s; u >= 10; u /= 10) o++;
        w
          ? o > r.maxE
            ? ((this.e = Number.NaN), (this.d = null))
            : o < r.minE
              ? ((this.e = 0), (this.d = [0]))
              : ((this.e = o), (this.d = [s]))
          : ((this.e = o), (this.d = [s]));
        return;
      }
      if (s * 0 !== 0) {
        s || (this.s = Number.NaN), (this.e = Number.NaN), (this.d = null);
        return;
      }
      return te(this, s.toString());
    }
    if (l === 'string')
      return (
        (u = s.charCodeAt(0)) === 45
          ? ((s = s.slice(1)), (this.s = -1))
          : (u === 43 && (s = s.slice(1)), (this.s = 1)),
        Ie.test(s) ? te(this, s) : on(this, s)
      );
    if (l === 'bigint')
      return (
        s < 0 ? ((s = -s), (this.s = -1)) : (this.s = 1), te(this, s.toString())
      );
    throw Error(V + s);
  }
  if (
    ((r.prototype = h),
    (r.ROUND_UP = 0),
    (r.ROUND_DOWN = 1),
    (r.ROUND_CEIL = 2),
    (r.ROUND_FLOOR = 3),
    (r.ROUND_HALF_UP = 4),
    (r.ROUND_HALF_DOWN = 5),
    (r.ROUND_HALF_EVEN = 6),
    (r.ROUND_HALF_CEIL = 7),
    (r.ROUND_HALF_FLOOR = 8),
    (r.EUCLID = 9),
    (r.config = r.set = En),
    (r.clone = He),
    (r.isDecimal = qe),
    (r.abs = fn),
    (r.acos = ln),
    (r.acosh = cn),
    (r.add = an),
    (r.asin = dn),
    (r.asinh = hn),
    (r.atan = pn),
    (r.atanh = gn),
    (r.atan2 = mn),
    (r.cbrt = wn),
    (r.ceil = Nn),
    (r.clamp = vn),
    (r.cos = Sn),
    (r.cosh = kn),
    (r.div = Mn),
    (r.exp = Cn),
    (r.floor = On),
    (r.hypot = Pn),
    (r.ln = bn),
    (r.log = Rn),
    (r.log10 = _n),
    (r.log2 = An),
    (r.max = qn),
    (r.min = Tn),
    (r.mod = Ln),
    (r.mul = Dn),
    (r.pow = Fn),
    (r.random = In),
    (r.round = Zn),
    (r.sign = Un),
    (r.sin = Bn),
    (r.sinh = Vn),
    (r.sqrt = $n),
    (r.sub = Hn),
    (r.sum = jn),
    (r.tan = Wn),
    (r.tanh = Gn),
    (r.trunc = Jn),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      t = [
        'precision',
        'rounding',
        'toExpNeg',
        'toExpPos',
        'maxE',
        'minE',
        'modulo',
        'crypto',
      ],
        n = 0;
      n < t.length;
    )
      e.hasOwnProperty((i = t[n++])) || (e[i] = this[i]);
  return r.config(e), r;
}
function Mn(e, n) {
  return new this(e).div(n);
}
function Cn(e) {
  return new this(e).exp();
}
function On(e) {
  return p((e = new this(e)), e.e + 1, 3);
}
function Pn() {
  var e,
    n,
    i = new this(0);
  for (w = !1, e = 0; e < arguments.length; )
    if (((n = new this(arguments[e++])), n.d)) i.d && (i = i.plus(n.times(n)));
    else {
      if (n.s) return (w = !0), new this(1 / 0);
      i = n;
    }
  return (w = !0), i.sqrt();
}
function qe(e) {
  return e instanceof Q || (e && e.toStringTag === Fe) || !1;
}
function bn(e) {
  return new this(e).ln();
}
function Rn(e, n) {
  return new this(e).log(n);
}
function An(e) {
  return new this(e).log(2);
}
function _n(e) {
  return new this(e).log(10);
}
function qn() {
  return Be(this, arguments, -1);
}
function Tn() {
  return Be(this, arguments, 1);
}
function Ln(e, n) {
  return new this(e).mod(n);
}
function Dn(e, n) {
  return new this(e).mul(n);
}
function Fn(e, n) {
  return new this(e).pow(n);
}
function In(e) {
  var n,
    i,
    t,
    r,
    s = 0,
    o = new this(1),
    u = [];
  if (
    (e === void 0 ? (e = this.precision) : _(e, 1, $),
    (t = Math.ceil(e / m)),
    this.crypto)
  )
    if (crypto.getRandomValues)
      for (n = crypto.getRandomValues(new Uint32Array(t)); s < t; )
        (r = n[s]),
          r >= 429e7
            ? (n[s] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (u[s++] = r % 1e7);
    else if (crypto.randomBytes) {
      for (n = crypto.randomBytes((t *= 4)); s < t; )
        (r =
          n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24)),
          r >= 214e7
            ? crypto.randomBytes(4).copy(n, s)
            : (u.push(r % 1e7), (s += 4));
      s = t / 4;
    } else throw Error(De);
  else while (s < t) u[s++] = (Math.random() * 1e7) | 0;
  for (
    t = u[--s],
      e %= m,
      t && e && ((r = C(10, m - e)), (u[s] = ((t / r) | 0) * r));
    u[s] === 0;
    s--
  )
    u.pop();
  if (s < 0) (i = 0), (u = [0]);
  else {
    for (i = -1; u[0] === 0; i -= m) u.shift();
    for (t = 1, r = u[0]; r >= 10; r /= 10) t++;
    t < m && (i -= m - t);
  }
  return (o.e = i), (o.d = u), o;
}
function Zn(e) {
  return p((e = new this(e)), e.e + 1, this.rounding);
}
function Un(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || Number.NaN;
}
function Bn(e) {
  return new this(e).sin();
}
function Vn(e) {
  return new this(e).sinh();
}
function $n(e) {
  return new this(e).sqrt();
}
function Hn(e, n) {
  return new this(e).sub(n);
}
function jn() {
  var e = 0,
    n = arguments,
    i = new this(n[e]);
  for (w = !1; i.s && ++e < n.length; ) i = i.plus(n[e]);
  return (w = !0), p(i, this.precision, this.rounding);
}
function Wn(e) {
  return new this(e).tan();
}
function Gn(e) {
  return new this(e).tanh();
}
function Jn(e) {
  return p((e = new this(e)), e.e + 1, 1);
}
h[Symbol.for('nodejs.util.inspect.custom')] = h.toString;
h[Symbol.toStringTag] = 'Decimal';
var Q = (h.constructor = He(ve));
re = new Q(re);
se = new Q(se);
var je = Q;
0 &&
  (module.exports = {
    Decimal,
    Public,
    getRuntime,
    makeStrictEnum,
    objectEnumValues,
  });
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
//# sourceMappingURL=index-browser.js.map
