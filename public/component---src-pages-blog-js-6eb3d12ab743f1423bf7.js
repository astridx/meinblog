(self.webpackChunkblog_astrid_guenther_de=self.webpackChunkblog_astrid_guenther_de||[]).push([[7],{7228:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.__esModule=!0,t.exports.default=t.exports},2858:function(t){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},3646:function(t,e,r){var n=r(7228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},9713:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.__esModule=!0,t.exports.default=t.exports},6860:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},3884:function(t){t.exports=function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,s=[],o=!0,a=!1;try{for(r=r.call(t);!(o=(n=r.next()).done)&&(s.push(n.value),!e||s.length!==e);o=!0);}catch(c){a=!0,i=c}finally{try{o||null==r.return||r.return()}finally{if(a)throw i}}return s}},t.exports.__esModule=!0,t.exports.default=t.exports},521:function(t){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},8206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},3038:function(t,e,r){var n=r(2858),i=r(3884),s=r(379),o=r(521);t.exports=function(t,e){return n(t)||i(t,e)||s(t,e)||o()},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,r){var n=r(3646),i=r(6860),s=r(379),o=r(8206);t.exports=function(t){return n(t)||i(t)||s(t)||o()},t.exports.__esModule=!0,t.exports.default=t.exports},379:function(t,e,r){var n=r(7228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},7091:function(t){"use strict";var e="%[a-f0-9]{2}",r=new RegExp(e,"gi"),n=new RegExp("("+e+")+","gi");function i(t,e){try{return decodeURIComponent(t.join(""))}catch(s){}if(1===t.length)return t;e=e||1;var r=t.slice(0,e),n=t.slice(e);return Array.prototype.concat.call([],i(r),i(n))}function s(t){try{return decodeURIComponent(t)}catch(s){for(var e=t.match(r),n=1;n<e.length;n++)e=(t=i(e,n).join("")).match(r);return t}}t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var r={"%FE%FF":"��","%FF%FE":"��"},i=n.exec(t);i;){try{r[i[0]]=decodeURIComponent(i[0])}catch(e){var o=s(i[0]);o!==i[0]&&(r[i[0]]=o)}i=n.exec(t)}r["%C2"]="�";for(var a=Object.keys(r),c=0;c<a.length;c++){var l=a[c];t=t.replace(new RegExp(l,"g"),r[l])}return t}(t)}}},8616:function(t){"use strict";t.exports=function(t,e){for(var r={},n=Object.keys(t),i=Array.isArray(e),s=0;s<n.length;s++){var o=n[s],a=t[o];(i?-1!==e.indexOf(o):e(o,a,t))&&(r[o]=a)}return r}},2073:function(t){"use strict";var e,r;!function(e,r,n){var i;(i=n.define)&&i.amd?i([],(function(){return r})):(i=n.modules)?i["FlexSearch".toLowerCase()]=r:t.exports=r}(0,function t(e){function r(t,e){var r=e?e.id:t&&t.id;this.id=r||0===r?r:N++,this.init(t,e),a(this,"index",(function(){return this.a?Object.keys(this.a.index[this.a.keys[0]].c):Object.keys(this.c)})),a(this,"length",(function(){return this.index.length}))}function n(t,e,r,n){return this.u!==this.g&&(this.o=this.o.concat(r),this.u++,n&&this.o.length>=n&&(this.u=this.g),this.u===this.g&&(this.cache&&this.j.set(e,this.o),this.F&&this.F(this.o))),this}function i(t){var e=E();for(var r in t)if(t.hasOwnProperty(r)){var n=t[r];b(n)?e[r]=n.slice(0):w(n)?e[r]=i(n):e[r]=n}return e}function s(t,e){for(var r=t.length,n=x(e),i=[],s=0,o=0;s<r;s++){var a=t[s];(n&&e(a)||!n&&!e[a])&&(i[o++]=a)}return i}function o(t,e,r,n,i,s,o,a,c,l){var u;if(r=y(r,o?0:i,a,s,e,c,l),a&&(a=r.page,u=r.next,r=r.result),o)e=this.where(o,null,i,r);else{for(e=r,r=this.l,i=e.length,s=Array(i),o=0;o<i;o++)s[o]=r[e[o]];e=s}return r=e,n&&(x(n)||(1<(A=n.split(":")).length?n=g:(A=A[0],n=p)),r.sort(n)),r=v(a,u,r),this.cache&&this.j.set(t,r),r}function a(t,e,r){Object.defineProperty(t,e,{get:r})}function c(t){return new RegExp(t,"g")}function l(t,e){for(var r=0;r<e.length;r+=2)t=t.replace(e[r],e[r+1]);return t}function u(t,e,r,n,i,s,o,a){return e[r]?e[r]:(i=i?(a-(o||a/1.5))*s+(o||a/1.5)*i:s,e[r]=i,i>=o&&((t=(t=t[a-(i+.5>>0)])[r]||(t[r]=[]))[t.length]=n),i)}function h(t,e){if(t)for(var r=Object.keys(t),n=0,i=r.length;n<i;n++){var s=r[n],o=t[s];if(o)for(var a=0,c=o.length;a<c;a++){if(o[a]===e){1===c?delete t[s]:o.splice(a,1);break}w(o[a])&&h(o[a],e)}}}function f(t){for(var e="",r="",n="",i=0;i<t.length;i++){var s=t[i];s!==r&&(i&&"h"===s?(n="a"===n||"e"===n||"i"===n||"o"===n||"u"===n||"y"===n,(("a"===r||"e"===r||"i"===r||"o"===r||"u"===r||"y"===r)&&n||" "===r)&&(e+=s)):e+=s),n=i===t.length-1?"":t[i+1],r=s}return e}function d(t,e){return 0>(t=t.length-e.length)?1:t?-1:0}function p(t,e){return(t=t[A])<(e=e[A])?-1:t>e?1:0}function g(t,e){for(var r=A.length,n=0;n<r;n++)t=t[A[n]],e=e[A[n]];return t<e?-1:t>e?1:0}function v(t,e,r){return t?{page:t,next:e?""+e:null,result:r}:r}function y(t,e,r,n,i,s,o){var a,c=[];if(!0===r){r="0";var l=""}else l=r&&r.split(":");var u=t.length;if(1<u){var h,f,d,p,g,y,b,x,w,j,O=E(),S=[],A=0,F=!0,I=0;if(l&&(2===l.length?(x=l,l=!1):l=w=parseInt(l[0],10)),o){for(h=E();A<u;A++)if("not"===i[A])for(p=(f=t[A]).length,d=0;d<p;d++)h["@"+f[d]]=1;else b=A+1;if(k(b))return v(r,a,c);A=0}else y=m(i)&&i;for(;A<u;A++){var M=A===(b||u)-1;if(!y||!A)if((d=y||i&&i[A])&&"and"!==d){if("or"!==d)continue;j=!1}else j=s=!0;if(p=(f=t[A]).length){if(F){if(!g){g=f;continue}var N=g.length;for(d=0;d<N;d++){var _="@"+(F=g[d]);o&&h[_]||(O[_]=1,s||(c[I++]=F))}g=null,F=!1}for(_=!1,d=0;d<p;d++){var C="@"+(N=f[d]),R=s?O[C]||0:A;if(!(!R&&!n||o&&h[C]||!s&&O[C]))if(R===A){if(M){if((!w||--w<I)&&(c[I++]=N,e&&I===e))return v(r,I+(l||0),c)}else O[C]=A+1;_=!0}else n&&((C=S[R]||(S[R]=[]))[C.length]=N)}if(j&&!_&&!n)break}else if(j&&!n)return v(r,a,f)}if(g)if(A=g.length,o)for(d=l?parseInt(l,10):0;d<A;d++)h["@"+(t=g[d])]||(c[I++]=t);else c=g;if(n)for(I=c.length,x?(A=parseInt(x[0],10)+1,d=parseInt(x[1],10)+1):(A=S.length,d=0);A--;)if(N=S[A]){for(p=N.length;d<p;d++)if(n=N[d],(!o||!h["@"+n])&&(c[I++]=n,e&&I===e))return v(r,A+":"+d,c);d=0}}else!u||i&&"not"===i[0]||(c=t[0],l&&(l=parseInt(l[0],10)));return e&&(o=c.length,l&&l>o&&(l=0),(a=(l=l||0)+e)<o?c=c.slice(l,a):(a=0,l&&(c=c.slice(l)))),v(r,a,c)}function m(t){return"string"==typeof t}function b(t){return t.constructor===Array}function x(t){return"function"==typeof t}function w(t){return"object"==typeof t}function k(t){return void 0===t}function j(t){for(var e=Array(t),r=0;r<t;r++)e[r]=E();return e}function E(){return Object.create(null)}function O(){var t,e;self.onmessage=function(r){if(r=r.data)if(r.search){var n=e.search(r.content,r.threshold?{limit:r.limit,threshold:r.threshold,where:r.where}:r.limit);self.postMessage({id:t,content:r.content,limit:r.limit,result:n})}else r.add?e.add(r.id,r.content):r.update?e.update(r.id,r.content):r.remove?e.remove(r.id):r.clear?e.clear():r.info?((r=e.info()).worker=t,console.log(r)):r.register&&(t=r.id,r.options.cache=!1,r.options.async=!1,r.options.worker=!1,e=new(e=new Function(r.register.substring(r.register.indexOf("{")+1,r.register.lastIndexOf("}")))())(r.options))}}function S(r,n,i,s){r=e("flexsearch","id"+r,O,(function(t){(t=t.data)&&t.result&&s(t.id,t.content,t.result,t.limit,t.where,t.cursor,t.suggest)}),n);var o=t.toString();return i.id=n,r.postMessage({register:o,options:i,id:n}),r}var A,F={encode:"icase",f:"forward",split:/\W+/,cache:!1,async:!1,g:!1,D:!1,a:!1,b:9,threshold:0,depth:0},I={memory:{encode:"extra",f:"strict",threshold:0,b:1},speed:{encode:"icase",f:"strict",threshold:1,b:3,depth:2},match:{encode:"extra",f:"full",threshold:1,b:3},score:{encode:"extra",f:"strict",threshold:1,b:9,depth:4},balance:{encode:"balance",f:"strict",threshold:0,b:3,depth:3},fast:{encode:"icase",f:"strict",threshold:8,b:9,depth:1}},M=[],N=0,_={},C={};r.create=function(t,e){return new r(t,e)},r.registerMatcher=function(t){for(var e in t)t.hasOwnProperty(e)&&M.push(c(e),t[e]);return this},r.registerEncoder=function(t,e){return T[t]=e.bind(T),this},r.registerLanguage=function(t,e){return _[t]=e.filter,C[t]=e.stemmer,this},r.encode=function(t,e){return T[t](e)},r.prototype.init=function(t,e){if(this.v=[],e){var s=e.preset;t=e}else t||(t=F),s=t.preset;if(e={},m(t)?(e=I[t],t={}):s&&(e=I[s]),s=t.worker)if("undefined"==typeof Worker)t.worker=!1,this.m=null;else{var o=parseInt(s,10)||4;this.C=-1,this.u=0,this.o=[],this.F=null,this.m=Array(o);for(var a=0;a<o;a++)this.m[a]=S(this.id,a,t,n.bind(this))}if(this.f=t.tokenize||e.f||this.f||F.f,this.split=k(s=t.split)?this.split||F.split:m(s)?c(s):s,this.D=t.rtl||this.D||F.D,this.async="undefined"==typeof Promise||k(s=t.async)?this.async||F.async:s,this.g=k(s=t.worker)?this.g||F.g:s,this.threshold=k(s=t.threshold)?e.threshold||this.threshold||F.threshold:s,this.b=k(s=t.resolution)?s=e.b||this.b||F.b:s,s<=this.threshold&&(this.b=this.threshold+1),this.depth="strict"!==this.f||k(s=t.depth)?e.depth||this.depth||F.depth:s,this.w=(s=k(s=t.encode)?e.encode||F.encode:s)&&T[s]&&T[s].bind(T)||(x(s)?s:this.w||!1),(s=t.matcher)&&this.addMatcher(s),s=(e=t.lang)||t.filter){if(m(s)&&(s=_[s]),b(s)){o=this.w,a=E();for(var l=0;l<s.length;l++){var u=o?o(s[l]):s[l];a[u]=1}s=a}this.filter=s}if(s=e||t.stemmer){var h;for(h in e=m(s)?C[s]:s,o=this.w,a=[],e)e.hasOwnProperty(h)&&(l=o?o(h):h,a.push(c(l+"($|\\W)"),o?o(e[h]):e[h]));this.stemmer=h=a}if(this.a=a=(s=t.doc)?i(s):this.a||F.a,this.i=j(this.b-(this.threshold||0)),this.h=E(),this.c=E(),a){if(this.l=E(),t.doc=null,h=a.index={},e=a.keys=[],o=a.field,l=a.tag,u=a.store,b(a.id)||(a.id=a.id.split(":")),u){var f=E();if(m(u))f[u]=1;else if(b(u))for(var d=0;d<u.length;d++)f[u[d]]=1;else w(u)&&(f=u);a.store=f}if(l){if(this.G=E(),u=E(),o)if(m(o))u[o]=t;else if(b(o))for(f=0;f<o.length;f++)u[o[f]]=t;else w(o)&&(u=o);for(b(l)||(a.tag=l=[l]),o=0;o<l.length;o++)this.G[l[o]]=E();this.I=l,o=u}var p;if(o)for(b(o)||(w(o)?(p=o,a.field=o=Object.keys(o)):a.field=o=[o]),a=0;a<o.length;a++)b(l=o[a])||(p&&(t=p[l]),e[a]=l,o[a]=l.split(":")),h[l]=new r(t);t.doc=s}return this.B=!0,this.j=!!(this.cache=s=k(s=t.cache)?this.cache||F.cache:s)&&new $(s),this},r.prototype.encode=function(t){return t&&(M.length&&(t=l(t,M)),this.v.length&&(t=l(t,this.v)),this.w&&(t=this.w(t)),this.stemmer&&(t=l(t,this.stemmer))),t},r.prototype.addMatcher=function(t){var e=this.v;for(var r in t)t.hasOwnProperty(r)&&e.push(c(r),t[r]);return this},r.prototype.add=function(t,e,r,n,i){if(this.a&&w(t))return this.A("add",t,e);if(e&&m(e)&&(t||0===t)){var o="@"+t;if(this.c[o]&&!n)return this.update(t,e);if(this.g)return++this.C>=this.m.length&&(this.C=0),this.m[this.C].postMessage({add:!0,id:t,content:e}),this.c[o]=""+this.C,r&&r(),this;if(!i){if(this.async&&"function"!=typeof importScripts){var a=this;return o=new Promise((function(r){setTimeout((function(){a.add(t,e,null,n,!0),a=null,r()}))})),r?(o.then(r),this):o}if(r)return this.add(t,e,null,n,!0),r(),this}if(!(e=this.encode(e)).length)return this;i=x(r=this.f)?r(e):e.split(this.split),this.filter&&(i=s(i,this.filter));var c=E();c._ctx=E();for(var l=i.length,h=this.threshold,f=this.depth,d=this.b,p=this.i,g=this.D,v=0;v<l;v++){var y=i[v];if(y){var b=y.length,k=(g?v+1:l-v)/l,O="";switch(r){case"reverse":case"both":for(var S=b;--S;)u(p,c,O=y[S]+O,t,g?1:(b-S)/b,k,h,d-1);O="";case"forward":for(S=0;S<b;S++)u(p,c,O+=y[S],t,g?(S+1)/b:1,k,h,d-1);break;case"full":for(S=0;S<b;S++)for(var A=(g?S+1:b-S)/b,F=b;F>S;F--)u(p,c,O=y.substring(S,F),t,A,k,h,d-1);break;default:if(b=u(p,c,y,t,1,k,h,d-1),f&&1<l&&b>=h)for(b=c._ctx[y]||(c._ctx[y]=E()),y=this.h[y]||(this.h[y]=j(d-(h||0))),0>(k=v-f)&&(k=0),(O=v+f+1)>l&&(O=l);k<O;k++)k!==v&&u(y,b,i[k],t,0,d-(k<v?v-k:k-v),h,d-1)}}}this.c[o]=1,this.B=!1}return this},r.prototype.A=function(t,e,r){if(b(e)){var n=e.length;if(n--){for(var i=0;i<n;i++)this.A(t,e[i]);return this.A(t,e[n],r)}}else{var s,o=this.a.index,a=this.a.keys,c=this.a.tag;i=this.a.store;var l=this.a.id;n=e;for(var u=0;u<l.length;u++)n=n[l[u]];if("remove"===t&&(delete this.l[n],l=a.length,l--)){for(e=0;e<l;e++)o[a[e]].remove(n);return o[a[l]].remove(n,r)}if(c){for(s=0;s<c.length;s++){var h=c[s],f=e;for(l=h.split(":"),u=0;u<l.length;u++)f=f[l[u]];f="@"+f}s=(s=this.G[h])[f]||(s[f]=[])}for(var d=0,p=(l=this.a.field).length;d<p;d++){for(h=l[d],c=e,f=0;f<h.length;f++)c=c[h[f]];h=o[a[d]],f="add"===t?h.add:h.update,d===p-1?f.call(h,n,c,r):f.call(h,n,c)}if(i){for(r=Object.keys(i),t=E(),o=0;o<r.length;o++)if(i[a=r[o]]){a=a.split(":");var g=void 0,v=void 0;for(l=0;l<a.length;l++)g=(g||e)[c=a[l]],v=(v||t)[c]=g}e=t}s&&(s[s.length]=e),this.l[n]=e}return this},r.prototype.update=function(t,e,r){return this.a&&w(t)?this.A("update",t,e):(this.c["@"+t]&&m(e)&&(this.remove(t),this.add(t,e,r,!0)),this)},r.prototype.remove=function(t,e,r){if(this.a&&w(t))return this.A("remove",t,e);var n="@"+t;if(this.c[n]){if(this.g)return this.m[this.c[n]].postMessage({remove:!0,id:t}),delete this.c[n],e&&e(),this;if(!r){if(this.async&&"function"!=typeof importScripts){var i=this;return n=new Promise((function(e){setTimeout((function(){i.remove(t,null,!0),i=null,e()}))})),e?(n.then(e),this):n}if(e)return this.remove(t,null,!0),e(),this}for(e=0;e<this.b-(this.threshold||0);e++)h(this.i[e],t);this.depth&&h(this.h,t),delete this.c[n],this.B=!1}return this},r.prototype.search=function(t,e,r,n){if(w(e)){if(b(e))for(var i=0;i<e.length;i++)e[i].query=t;else e.query=t;t=e,e=1e3}else e&&x(e)?(r=e,e=1e3):e||0===e||(e=1e3);if(!this.g){var a=[],c=t;if(w(t)&&!b(t)){r||(r=t.callback)&&(c.callback=null);var l=t.sort,u=t.page;e=t.limit,T=t.threshold;var h=t.suggest;t=t.query}if(this.a){T=this.a.index;var f,p,g=c.where,v=c.bool||"or",k=c.field,j=v;if(k)b(k)||(k=[k]);else if(b(c)){var O=c;k=[],j=[];for(var S=0;S<c.length;S++)i=(n=c[S]).bool||v,k[S]=n.field,j[S]=i,"not"===i?f=!0:"and"===i&&(p=!0)}else k=this.a.keys;for(v=k.length,S=0;S<v;S++)O&&(c=O[S]),u&&!m(c)&&(c.page=null,c.limit=0),a[S]=T[k[S]].search(c,0);if(r)return r(o.call(this,t,j,a,l,e,h,g,u,p,f));if(this.async){var A=this;return new Promise((function(r){Promise.all(a).then((function(n){r(o.call(A,t,j,n,l,e,h,g,u,p,f))}))}))}return o.call(this,t,j,a,l,e,h,g,u,p,f)}if(T||(T=this.threshold||0),!n){if(this.async&&"function"!=typeof importScripts){var F=this;return T=new Promise((function(t){setTimeout((function(){t(F.search(c,e,null,!0)),F=null}))})),r?(T.then(r),this):T}if(r)return r(this.search(c,e,null,!0)),this}if(!t||!m(t))return a;if(c=t,this.cache)if(this.B){if(r=this.j.get(t))return r}else this.j.clear(),this.B=!0;if(!(c=this.encode(c)).length)return a;r=x(r=this.f)?r(c):c.split(this.split),this.filter&&(r=s(r,this.filter)),O=r.length,n=!0,i=[];var I=E(),M=0;if(1<O&&(this.depth&&"strict"===this.f?v=!0:r.sort(d)),!v||(S=this.h))for(var N=this.b;M<O;M++){var _=r[M];if(_){if(v){if(!k)if(S[_])k=_,I[_]=1;else if(!h)return a;if(h&&M===O-1&&!i.length)v=!1,I[_=k||_]=0;else if(!k)continue}if(!I[_]){var C=[],R=!1,U=0,q=v?S[k]:this.i;if(q)for(var L=void 0,P=0;P<N-T;P++)(L=q[P]&&q[P][_])&&(C[U++]=L,R=!0);if(R)k=_,i[i.length]=1<U?C.concat.apply([],C):C[0];else if(!h){n=!1;break}I[_]=1}}}else n=!1;return n&&(a=y(i,e,u,h)),this.cache&&this.j.set(t,a),a}this.F=r,this.u=0,this.o=[];for(var T=0;T<this.g;T++)this.m[T].postMessage({search:!0,limit:e,content:t})},r.prototype.find=function(t,e){return this.where(t,e,1)[0]||null},r.prototype.where=function(t,e,r,n){var i,s,o,a=this.l,c=[],l=0;if(w(t)){r||(r=e);var u=Object.keys(t),h=u.length;if(i=!1,1===h&&"id"===u[0])return[a[t.id]];if((s=this.I)&&!n)for(var f=0;f<s.length;f++){var d=s[f],p=t[d];if(!k(p)){if(o=this.G[d]["@"+p],0==--h)return o;u.splice(u.indexOf(d),1),delete t[d];break}}for(s=Array(h),f=0;f<h;f++)s[f]=u[f].split(":")}else{if(x(t)){for(r=(e=n||Object.keys(a)).length,u=0;u<r;u++)t(h=a[e[u]])&&(c[l++]=h);return c}if(k(e))return[a[t]];if("id"===t)return[a[e]];u=[t],h=1,s=[t.split(":")],i=!0}for(f=(n=o||n||Object.keys(a)).length,d=0;d<f;d++){p=o?n[d]:a[n[d]];for(var g=!0,v=0;v<h;v++){i||(e=t[u[v]]);var y=s[v],m=y.length,b=p;if(1<m)for(var j=0;j<m;j++)b=b[y[j]];else b=b[y[0]];if(b!==e){g=!1;break}}if(g&&(c[l++]=p,r&&l===r))break}return c},r.prototype.info=function(){if(!this.g)return{id:this.id,items:this.length,cache:!(!this.cache||!this.cache.s)&&this.cache.s.length,matcher:M.length+(this.v?this.v.length:0),worker:this.g,threshold:this.threshold,depth:this.depth,resolution:this.b,contextual:this.depth&&"strict"===this.f};for(var t=0;t<this.g;t++)this.m[t].postMessage({info:!0,id:this.id})},r.prototype.clear=function(){return this.destroy().init()},r.prototype.destroy=function(){if(this.cache&&(this.j.clear(),this.j=null),this.i=this.h=this.c=null,this.a){for(var t=this.a.keys,e=0;e<t.length;e++)this.a.index[t[e]].destroy();this.a=this.l=null}return this},r.prototype.export=function(t){var e=!t||k(t.serialize)||t.serialize;if(this.a){var r=!t||k(t.doc)||t.doc,n=!t||k(t.index)||t.index;t=[];var i=0;if(n)for(n=this.a.keys;i<n.length;i++){var s=this.a.index[n[i]];t[i]=[s.i,s.h,Object.keys(s.c)]}r&&(t[i]=this.l)}else t=[this.i,this.h,Object.keys(this.c)];return e&&(t=JSON.stringify(t)),t},r.prototype.import=function(t,e){(!e||k(e.serialize)||e.serialize)&&(t=JSON.parse(t));var r=E();if(this.a){var n=!e||k(e.doc)||e.doc,i=0;if(!e||k(e.index)||e.index){for(var s=(e=this.a.keys).length,o=t[0][2];i<o.length;i++)r[o[i]]=1;for(i=0;i<s;i++){o=this.a.index[e[i]];var a=t[i];a&&(o.i=a[0],o.h=a[1],o.c=r)}}n&&(this.l=w(n)?n:t[i])}else{for(n=t[2],i=0;i<n.length;i++)r[n[i]]=1;this.i=t[0],this.h=t[1],this.c=r}};var R,U,q,L,P=(U=c("\\s+"),q=c("[^a-z0-9 ]"),L=[c("[-/]")," ",q,"",U," "],function(t){return f(l(t.toLowerCase(),L))}),T={icase:function(t){return t.toLowerCase()},simple:function(){var t=c("\\s+"),e=c("[^a-z0-9 ]"),r=c("[-/]"),n=[c("[àáâãäå]"),"a",c("[èéêë]"),"e",c("[ìíîï]"),"i",c("[òóôõöő]"),"o",c("[ùúûüű]"),"u",c("[ýŷÿ]"),"y",c("ñ"),"n",c("[çc]"),"k",c("ß"),"s",c(" & ")," and ",r," ",e,"",t," "];return function(t){return" "===(t=l(t.toLowerCase(),n))?"":t}}(),advanced:function(){var t=c("ae"),e=c("ai"),r=c("ay"),n=c("ey"),i=c("oe"),s=c("ue"),o=c("ie"),a=c("sz"),u=c("zs"),h=c("ck"),d=c("cc"),p=[t,"a",e,"ei",r,"ei",n,"ei",i,"o",s,"u",o,"i",a,"s",u,"s",c("sh"),"s",h,"k",d,"k",c("th"),"t",c("dt"),"t",c("ph"),"f",c("pf"),"f",c("ou"),"o",c("uo"),"u"];return function(t,e){return t?(2<(t=this.simple(t)).length&&(t=l(t,p)),e||1<t.length&&(t=f(t)),t):t}}(),extra:(R=[c("p"),"b",c("z"),"s",c("[cgq]"),"k",c("n"),"m",c("d"),"t",c("[vw]"),"f",c("[aeiouy]"),""],function(t){if(!t)return t;if(1<(t=this.advanced(t,!0)).length){t=t.split(" ");for(var e=0;e<t.length;e++){var r=t[e];1<r.length&&(t[e]=r[0]+l(r.substring(1),R))}t=f(t=t.join(" "))}return t}),balance:P},$=function(){function t(t){this.clear(),this.H=!0!==t&&t}return t.prototype.clear=function(){this.cache=E(),this.count=E(),this.index=E(),this.s=[]},t.prototype.set=function(t,e){if(this.H&&k(this.cache[t])){var r=this.s.length;if(r===this.H){r--;var n=this.s[r];delete this.cache[n],delete this.count[n],delete this.index[n]}this.index[t]=r,this.s[r]=t,this.count[t]=-1,this.cache[t]=e,this.get(t)}else this.cache[t]=e},t.prototype.get=function(t){var e=this.cache[t];if(this.H&&e){var r=++this.count[t],n=this.index,i=n[t];if(0<i){for(var s=this.s,o=i;this.count[s[--i]]<=r&&-1!==i;);if(++i!==o){for(r=o;r>i;r--)o=s[r-1],s[r]=o,n[o]=r;s[i]=t,n[t]=i}}}return e},t}();return r}((e={},r="undefined"!=typeof Blob&&"undefined"!=typeof URL&&URL.createObjectURL,function(t,n,i,s,o){return i=r?URL.createObjectURL(new Blob(["("+i.toString()+")()"],{type:"text/javascript"})):t+".min.js",e[t+="-"+n]||(e[t]=[]),e[t][o]=new Worker(i),e[t][o].onmessage=s,e[t][o]})),this)},2203:function(t,e,r){"use strict";var n=r(9713),i=r(3038),s=r(319);function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return o=t.done,t},e:function(t){c=!0,s=t},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw s}}}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var c=r(8936),l=r(7091),u=r(4734),h=r(8616),f=Symbol("encodeFragmentIdentifier");function d(t){if("string"!=typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function p(t,e){return e.encode?e.strict?c(t):encodeURIComponent(t):t}function g(t,e){return e.decode?l(t):t}function v(t){return Array.isArray(t)?t.sort():"object"==typeof t?v(Object.keys(t)).sort((function(t,e){return Number(t)-Number(e)})).map((function(e){return t[e]})):t}function y(t){var e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),t}function m(t){var e=(t=y(t)).indexOf("?");return-1===e?"":t.slice(e+1)}function b(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&"string"==typeof t&&""!==t.trim()?t=Number(t):!e.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function x(t,e){d((e=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);var r=function(t){var e;switch(t.arrayFormat){case"index":return function(t,r,n){e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===n[t]&&(n[t]={}),n[t][e[1]]=r):n[t]=r};case"bracket":return function(t,r,n){e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"colon-list-separator":return function(t,r,n){e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"comma":case"separator":return function(e,r,n){var i="string"==typeof r&&r.includes(t.arrayFormatSeparator),s="string"==typeof r&&!i&&g(r,t).includes(t.arrayFormatSeparator);r=s?g(r,t):r;var o=i||s?r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)})):null===r?r:g(r,t);n[e]=o};case"bracket-separator":return function(e,r,n){var i=/(\[\])$/.test(e);if(e=e.replace(/\[\]$/,""),i){var s=null===r?[]:r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)}));void 0!==n[e]?n[e]=[].concat(n[e],s):n[e]=s}else n[e]=r?g(r,t):r};default:return function(t,e,r){void 0!==r[t]?r[t]=[].concat(r[t],e):r[t]=e}}}(e),n=Object.create(null);if("string"!=typeof t)return n;if(!(t=t.trim().replace(/^[?#&]/,"")))return n;var s,a=o(t.split("&"));try{for(a.s();!(s=a.n()).done;){var c=s.value;if(""!==c){var l=u(e.decode?c.replace(/\+/g," "):c,"="),h=i(l,2),f=h[0],p=h[1];p=void 0===p?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?p:g(p,e),r(g(f,e),p,n)}}}catch(O){a.e(O)}finally{a.f()}for(var y=0,m=Object.keys(n);y<m.length;y++){var x=m[y],w=n[x];if("object"==typeof w&&null!==w)for(var k=0,j=Object.keys(w);k<j.length;k++){var E=j[k];w[E]=b(w[E],e)}else n[x]=b(w,e)}return!1===e.sort?n:(!0===e.sort?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((function(t,e){var r=n[e];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?t[e]=v(r):t[e]=r,t}),Object.create(null))}e.extract=m,e.parse=x,e.stringify=function(t,e){if(!t)return"";d((e=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);for(var r=function(r){return e.skipNull&&null==t[r]||e.skipEmptyString&&""===t[r]},n=function(t){switch(t.arrayFormat){case"index":return function(e){return function(r,n){var i=r.length;return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(s(r),null===n?[[p(e,t),"[",i,"]"].join("")]:[[p(e,t),"[",p(i,t),"]=",p(n,t)].join("")])}};case"bracket":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(s(r),null===n?[[p(e,t),"[]"].join("")]:[[p(e,t),"[]=",p(n,t)].join("")])}};case"colon-list-separator":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(s(r),null===n?[[p(e,t),":list="].join("")]:[[p(e,t),":list=",p(n,t)].join("")])}};case"comma":case"separator":case"bracket-separator":var e="bracket-separator"===t.arrayFormat?"[]=":"=";return function(r){return function(n,i){return void 0===i||t.skipNull&&null===i||t.skipEmptyString&&""===i?n:(i=null===i?"":i,0===n.length?[[p(r,t),e,p(i,t)].join("")]:[[n,p(i,t)].join(t.arrayFormatSeparator)])}};default:return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(s(r),null===n?[p(e,t)]:[[p(e,t),"=",p(n,t)].join("")])}}}}(e),i={},o=0,a=Object.keys(t);o<a.length;o++){var c=a[o];r(c)||(i[c]=t[c])}var l=Object.keys(i);return!1!==e.sort&&l.sort(e.sort),l.map((function(r){var i=t[r];return void 0===i?"":null===i?p(r,e):Array.isArray(i)?0===i.length&&"bracket-separator"===e.arrayFormat?p(r,e)+"[]":i.reduce(n(r),[]).join("&"):p(r,e)+"="+p(i,e)})).filter((function(t){return t.length>0})).join("&")},e.parseUrl=function(t,e){e=Object.assign({decode:!0},e);var r=u(t,"#"),n=i(r,2),s=n[0],o=n[1];return Object.assign({url:s.split("?")[0]||"",query:x(m(t),e)},e&&e.parseFragmentIdentifier&&o?{fragmentIdentifier:g(o,e)}:{})},e.stringifyUrl=function(t,r){r=Object.assign(n({encode:!0,strict:!0},f,!0),r);var i=y(t.url).split("?")[0]||"",s=e.extract(t.url),o=e.parse(s,{sort:!1}),a=Object.assign(o,t.query),c=e.stringify(a,r);c&&(c="?".concat(c));var l=function(t){var e="",r=t.indexOf("#");return-1!==r&&(e=t.slice(r)),e}(t.url);return t.fragmentIdentifier&&(l="#".concat(r[f]?p(t.fragmentIdentifier,r):t.fragmentIdentifier)),"".concat(i).concat(c).concat(l)},e.pick=function(t,r,i){i=Object.assign(n({parseFragmentIdentifier:!0},f,!1),i);var s=e.parseUrl(t,i),o=s.url,a=s.query,c=s.fragmentIdentifier;return e.stringifyUrl({url:o,query:h(a,r),fragmentIdentifier:c},i)},e.exclude=function(t,r,n){var i=Array.isArray(r)?function(t){return!r.includes(t)}:function(t,e){return!r(t,e)};return e.pick(t,i,n)}},4734:function(t){"use strict";t.exports=function(t,e){if("string"!=typeof t||"string"!=typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];var r=t.indexOf(e);return-1===r?[t]:[t.slice(0,r),t.slice(r+e.length)]}},8936:function(t){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,(function(t){return"%".concat(t.charCodeAt(0).toString(16).toUpperCase())}))}},19:function(t,e,r){"use strict";r.d(e,{V:function(){return c}});var n=r(5785),i=r(7294),s=r(5444),o=r(1496),a=function(t){var e=t.node,r=t.query,n=t.prefix,a=t.hideDate,c=t.yearOnly,l=new Date(e.date),u=new Date;u.setMonth(u.getMonth()-1);var h,f,d=!1;if(l>u&&(d=!0),e.date){var p=e.date.split(" "),g=p.pop();p[0]=p[0].slice(0,3),h=p.join(" ").slice(0,-1),f=g}return i.createElement(s.rU,{to:n?"/"+n+e.slug:e.slug,key:e.id,className:d?"post new":"post"},i.createElement("span",{className:"flex",style:{alignItems:"center"}},e.thumbnail&&i.createElement(o.Z,{fixed:e.thumbnail,style:{marginRight:"1rem",minWidth:"25px"}}),function(t,e){if(e){var r=new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),n=t.search(r);if(-1!==n){var s=n+e.length;return i.createElement("h3",null,t.slice(0,n),i.createElement("strong",{className:"highlighted"},t.slice(n,s)),t.slice(s))}return i.createElement("h3",null,t)}return i.createElement("h3",null,t)}(e.title,r),i.createElement("span",{className:"new-badge"},d&&"New!")),i.createElement("span",null,h&&!a&&i.createElement("small",null,c?f:h)))},c=function(t){var e=t.data,r=void 0===e?[]:e,s=t.showYears,o=t.query,c=t.prefix,l=t.hideDate,u=t.yearOnly,h=(0,i.useMemo)((function(){var t={};return r.forEach((function(e){var r,i=null===(r=e.date)||void 0===r?void 0:r.split(", ")[1];t[i]=[].concat((0,n.Z)(t[i]||[]),[e])})),t}),[r]),f=(0,i.useMemo)((function(){return Object.keys(h).reverse()}),[h]);return s?f.map((function(t){return i.createElement("section",{key:t},i.createElement("h2",null,t),i.createElement("div",{className:"posts"},h[t].map((function(t){return i.createElement(a,{key:t.id,node:t,query:o,prefix:c})}))))})):i.createElement("div",{className:"posts"},r.map((function(t){return i.createElement(a,{key:t.id,node:t,query:o,prefix:c,hideDate:l,yearOnly:u})})))}},622:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return b}});var n=r(7294),i=r(5444),s=r(5414),o=r(2786),a=r(2073),c=r.n(a);function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,i=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(c){i=!0,s=c}finally{try{n||null==a.return||a.return()}finally{if(i)throw s}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var u=new Error("FlexSearch index is required. Check that your index exists and is valid."),h=new Error("FlexSearch store is required. Check that your store exists and is valid."),f=r(2203),d=r(9499),p=r(19),g=function(t){var e=t.data,r=(0,d.useLocation)(),s=(0,n.useRef)(null),o=f.parse(r.search).search,a=(0,n.useState)(o||""),g=a[0],v=a[1],y=(0,i.K2)("3667468360").localSearchPages,m=function(t,e,r,i){var s=l((0,n.useState)(null),2),o=s[0],a=s[1];return(0,n.useEffect)((function(){if(!e)throw u;if(!r)throw h}),[e,r]),(0,n.useEffect)((function(){if(e instanceof c())a(e);else{var t=c().create();t.import(e),a(t)}}),[e]),(0,n.useMemo)((function(){return t&&o&&r?o.search(t,i).map((function(t){return r[t]})):[]}),[t,o,r])}(g,y.index,y.store);return n.createElement(n.Fragment,null,n.createElement("div",{className:"search-bar"},n.createElement("input",{ref:s,id:"search",type:"search",className:"search-input",placeholder:"Begin typing to search...",value:g,onChange:function(t){(0,d.navigate)(t.target.value?"/blog/?search="+t.target.value:""),v(t.target.value)}})),n.createElement("section",null,g?m.length>0?n.createElement(p.V,{data:m,showYears:!0,query:g}):n.createElement("p",{style:{marginTop:"2rem"}},"Sorry, nothing matched that search."):n.createElement(p.V,{data:e,showYears:!0})))},v=r(2248),y=r(8415),m=r(5501);function b(t){var e=t.data.allMarkdownRemark.edges,r=(0,n.useMemo)((function(){return(0,y.Nx)(e)}),[e]);return n.createElement(n.Fragment,null,n.createElement(s.Z,{title:"Articles | "+m.Z.siteTitle}),n.createElement(v.H,{customDescription:"Tutorials, technical articles, snippets, reference materials, and all development-related resources I've written."}),n.createElement("article",{className:"blog-page"},n.createElement("header",null,n.createElement("div",{className:"container"},n.createElement("h1",null,"My digital garden"),n.createElement("p",{className:"description"},"Mein digitaler Garten."))),n.createElement("section",null,n.createElement("div",{className:"container"},n.createElement(g,{data:r,showYears:!0})))))}b.Layout=o.A}}]);
//# sourceMappingURL=component---src-pages-blog-js-6eb3d12ab743f1423bf7.js.map