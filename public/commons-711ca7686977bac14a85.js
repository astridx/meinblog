(self.webpackChunkblog_astrid_guenther_de=self.webpackChunkblog_astrid_guenther_de||[]).push([[351],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function o(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,u,l,s;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(!o(e[u],a[u]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(s=e.entries();!(u=s.next()).done;)if(!a.has(u.value[0]))return!1;for(s=e.entries();!(u=s.next()).done;)if(!o(u.value[1],a.get(u.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(s=e.entries();!(u=s.next()).done;)if(!a.has(u.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(e[u]!==a[u])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(l=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(a,l[u]))return!1;if(t&&e instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==l[u]&&"__v"!==l[u]&&"__o"!==l[u]||!e.$$typeof)&&!o(e[l[u]],a[l[u]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return o(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},5414:function(e,t,n){"use strict";var r,i,o,a,c=n(5697),u=n.n(c),l=n(4839),s=n.n(l),f=n(2993),p=n.n(f),d=n(7294),m=n(6494),h=n.n(m),g="bodyAttributes",b="htmlAttributes",y="titleAttributes",E={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},v=(Object.keys(E).map((function(e){return E[e]})),"charset"),A="cssText",w="href",T="http-equiv",O="innerHTML",C="itemprop",I="name",S="property",k="rel",j="src",R="target",x={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},N="defaultTitle",L="defer",P="encodeSpecialCharacters",M="onChangeClientState",H="titleTemplate",B=Object.keys(x).reduce((function(e,t){return e[x[t]]=t,e}),{}),D=[E.NOSCRIPT,E.SCRIPT,E.STYLE],U="data-react-helmet",F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Z=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Y=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},z=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},G=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},J=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},W=function(e){var t=_(e,E.TITLE),n=_(e,H);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=_(e,N);return t||r||void 0},X=function(e){return _(e,M)||function(){}},V=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return q({},e,t)}),{})},K=function(e,t){return t.filter((function(e){return void 0!==e[E.BASE]})).map((function(e){return e[E.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),i=0;i<r.length;i++){var o=r[i].toLowerCase();if(-1!==e.indexOf(o)&&n[o])return t.concat(n)}return t}),[])},Q=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+F(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var i={};n.filter((function(e){for(var n=void 0,o=Object.keys(e),a=0;a<o.length;a++){var c=o[a],u=c.toLowerCase();-1===t.indexOf(u)||n===k&&"canonical"===e[n].toLowerCase()||u===k&&"stylesheet"===e[u].toLowerCase()||(n=u),-1===t.indexOf(c)||c!==O&&c!==A&&c!==C||(n=c)}if(!n||!e[n])return!1;var l=e[n].toLowerCase();return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][l]&&(i[n][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var o=Object.keys(i),a=0;a<o.length;a++){var c=o[a],u=h()({},r[c],i[c]);r[c]=u}return e}),[]).reverse()},_=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},$=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){$(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:n.g.requestAnimationFrame||$,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:n.g.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ie=null,oe=function(e,t){var n=e.baseTag,r=e.bodyAttributes,i=e.htmlAttributes,o=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.onChangeClientState,l=e.scriptTags,s=e.styleTags,f=e.title,p=e.titleAttributes;ue(E.BODY,r),ue(E.HTML,i),ce(f,p);var d={baseTag:le(E.BASE,n),linkTags:le(E.LINK,o),metaTags:le(E.META,a),noscriptTags:le(E.NOSCRIPT,c),scriptTags:le(E.SCRIPT,l),styleTags:le(E.STYLE,s)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(h[e]=d[e].oldTags)})),t&&t(),u(e,m,h)},ae=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ae(e)),ue(E.TITLE,t)},ue=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(U),i=r?r.split(","):[],o=[].concat(i),a=Object.keys(t),c=0;c<a.length;c++){var u=a[c],l=t[u]||"";n.getAttribute(u)!==l&&n.setAttribute(u,l),-1===i.indexOf(u)&&i.push(u);var s=o.indexOf(u);-1!==s&&o.splice(s,1)}for(var f=o.length-1;f>=0;f--)n.removeAttribute(o[f]);i.length===o.length?n.removeAttribute(U):n.getAttribute(U)!==a.join(",")&&n.setAttribute(U,a.join(","))}},le=function(e,t){var n=document.head||document.querySelector(E.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),i=Array.prototype.slice.call(r),o=[],a=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===O)n.innerHTML=t.innerHTML;else if(r===A)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(U,"true"),i.some((function(e,t){return a=t,n.isEqualNode(e)}))?i.splice(a,1):o.push(n)})),i.forEach((function(e){return e.parentNode.removeChild(e)})),o.forEach((function(e){return n.appendChild(e)})),{oldTags:i,newTags:o}},se=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[x[n]||n]=e[n],t}),t)},pe=function(e,t,n){switch(e){case E.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[U]=!0,i=fe(n,r),[d.createElement(E.TITLE,i,e)];var e,n,r,i},toString:function(){return function(e,t,n,r){var i=se(n),o=ae(t);return i?"<"+e+' data-react-helmet="true" '+i+">"+J(o,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+J(o,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case g:case b:return{toComponent:function(){return fe(t)},toString:function(){return se(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,i=((r={key:n})[U]=!0,r);return Object.keys(t).forEach((function(e){var n=x[e]||e;if(n===O||n===A){var r=t.innerHTML||t.cssText;i.dangerouslySetInnerHTML={__html:r}}else i[n]=t[e]})),d.createElement(e,i)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var i=Object.keys(r).filter((function(e){return!(e===O||e===A)})).reduce((function(e,t){var i=void 0===r[t]?t:t+'="'+J(r[t],n)+'"';return e?e+" "+i:i}),""),o=r.innerHTML||r.cssText||"",a=-1===D.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+i+(a?"/>":">"+o+"</"+e+">")}),"")}(e,t,n)}}}},de=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,i=e.htmlAttributes,o=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.scriptTags,l=e.styleTags,s=e.title,f=void 0===s?"":s,p=e.titleAttributes;return{base:pe(E.BASE,t,r),bodyAttributes:pe(g,n,r),htmlAttributes:pe(b,i,r),link:pe(E.LINK,o,r),meta:pe(E.META,a,r),noscript:pe(E.NOSCRIPT,c,r),script:pe(E.SCRIPT,u,r),style:pe(E.STYLE,l,r),title:pe(E.TITLE,{title:f,titleAttributes:p},r)}},me=s()((function(e){return{baseTag:K([w,R],e),bodyAttributes:V(g,e),defer:_(e,L),encode:_(e,P),htmlAttributes:V(b,e),linkTags:Q(E.LINK,[k,w],e),metaTags:Q(E.META,[I,v,T,S,C],e),noscriptTags:Q(E.NOSCRIPT,[O],e),onChangeClientState:X(e),scriptTags:Q(E.SCRIPT,[j,O],e),styleTags:Q(E.STYLE,[A],e),title:W(e),titleAttributes:V(y,e)}}),(function(e){ie&&ne(ie),e.defer?ie=te((function(){oe(e,(function(){ie=null}))})):(oe(e),ie=null)}),de)((function(){return null})),he=(i=me,a=o=function(e){function t(){return Z(this,t),G(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case E.SCRIPT:case E.NOSCRIPT:return{innerHTML:t};case E.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,i=e.newChildProps,o=e.nestedChildren;return q({},r,((t={})[n.type]=[].concat(r[n.type]||[],[q({},i,this.mapNestedChildrenToProps(n,o))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,i=e.newProps,o=e.newChildProps,a=e.nestedChildren;switch(r.type){case E.TITLE:return q({},i,((t={})[r.type]=a,t.titleAttributes=q({},o),t));case E.BODY:return q({},i,{bodyAttributes:q({},o)});case E.HTML:return q({},i,{htmlAttributes:q({},o)})}return q({},i,((n={})[r.type]=q({},o),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=q({},t);return Object.keys(e).forEach((function(t){var r;n=q({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return d.Children.forEach(e,(function(e){if(e&&e.props){var i=e.props,o=i.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[B[n]||n]=e[n],t}),t)}(z(i,["children"]));switch(n.warnOnInvalidChildren(e,o),e.type){case E.LINK:case E.META:case E.NOSCRIPT:case E.SCRIPT:case E.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:a,nestedChildren:o});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:o})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=z(e,["children"]),r=q({},n);return t&&(r=this.mapChildrenToProps(t,r)),d.createElement(i,r)},Y(t,null,[{key:"canUseDOM",set:function(e){i.canUseDOM=e}}]),t}(d.Component),o.propTypes={base:u().object,bodyAttributes:u().object,children:u().oneOfType([u().arrayOf(u().node),u().node]),defaultTitle:u().string,defer:u().bool,encodeSpecialCharacters:u().bool,htmlAttributes:u().object,link:u().arrayOf(u().object),meta:u().arrayOf(u().object),noscript:u().arrayOf(u().object),onChangeClientState:u().func,script:u().arrayOf(u().object),style:u().arrayOf(u().object),title:u().string,titleAttributes:u().object,titleTemplate:u().string},o.defaultProps={defer:!0,encodeSpecialCharacters:!0},o.peek=i.peek,o.rewind=function(){var e=i.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);he.renderStatic=he.rewind,t.Z=he},4839:function(e,t,n){"use strict";var r,i=n(7294),o=(r=i)&&"object"==typeof r&&"default"in r?r.default:r;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,l=[];function s(){u=e(l.map((function(e){return e.props}))),f.canUseDOM?t(u):n&&(u=n(u))}var f=function(e){var t,n;function i(){return e.apply(this,arguments)||this}n=e,(t=i).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,i.peek=function(){return u},i.rewind=function(){if(i.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=u;return u=void 0,l=[],e};var a=i.prototype;return a.UNSAFE_componentWillMount=function(){l.push(this),s()},a.componentDidUpdate=function(){s()},a.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),s()},a.render=function(){return o.createElement(r,this.props)},i}(i.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),a(f,"canUseDOM",c),f}}},2786:function(e,t,n){"use strict";n.d(t,{A:function(){return E}});var r=n(7294),i=n(9499),o=n(5414),a=n(5444),c=n(8415),u=function(e){var t=e.position,n=void 0===t?"down":t;return r.createElement("svg",{width:"10",height:"5",viewBox:"-2.5 -5 75 60",preserveAspectRatio:"none",style:"right"===n?{transform:"rotate(-90deg)"}:{}},r.createElement("path",{d:"M0,0 l35,50 l35,-50",fill:"none",strokeLinecap:"round",strokeWidth:"5"}))},l=function(){return r.createElement("svg",{viewBox:"0 0 20 20",width:"18",height:"20"},r.createElement("path",{fill:"var(--primary)",d:"M15.475,6.692l-4.084-4.083C11.32,2.538,11.223,2.5,11.125,2.5h-6c-0.413,0-0.75,0.337-0.75,0.75v13.5c0,0.412,0.337,0.75,0.75,0.75h9.75c0.412,0,0.75-0.338,0.75-0.75V6.94C15.609,6.839,15.554,6.771,15.475,6.692 M11.5,3.779l2.843,2.846H11.5V3.779z M14.875,16.75h-9.75V3.25h5.625V7c0,0.206,0.168,0.375,0.375,0.375h3.75V16.75z"}))},s=function(e){var t=e.setCollapsed,n=(0,i.useLocation)(),o=(0,r.useState)({}),s=o[0],f=o[1],p=(0,a.K2)("352937542").allMarkdownRemark.edges,d=(0,r.useMemo)((function(){return(0,c.Nx)(p)}),[p]),m=(0,r.useMemo)((function(){return(0,c.en)(d)}),[d]);return(0,r.useEffect)((function(){var e=d.find((function(e){return e.slug===n.pathname}));if(null!=e&&e.categories){var t=e.categories.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=!0,n))}),{});f((function(e){return Object.assign({},e,t)}))}}),[d,n]),r.createElement("aside",{className:"sidebar"},r.createElement("div",{className:"categories"},m.map((function(e){return r.createElement(r.Fragment,{key:e},r.createElement("button",{className:"category",onClick:function(){return function(e){s[e]?f((function(t){var n;return Object.assign({},t,((n={})[e]=!1,n))})):f((function(t){var n;return Object.assign({},t,((n={})[e]=!0,n))}))}(e)}},r.createElement(u,{position:s[e]?"down":"right"}),r.createElement("span",null,e)),r.createElement("nav",{className:s[e]?"":"collapsed"},d.filter((function(t){return(t.categories||[]).includes(e)})).map((function(e){return r.createElement(a.rU,{key:e.title,to:e.slug,activeClassName:"active",onClick:function(){return t(!0)}},r.createElement(l,null),r.createElement("span",null,e.title))}))))}))))},f=function(){return r.createElement("svg",{viewBox:"0 0 100 80",width:"20",height:"12"},r.createElement("rect",{width:"100",height:"10"}),r.createElement("rect",{y:"30",width:"100",height:"10"}),r.createElement("rect",{y:"60",width:"100",height:"10"}))},p=[{url:"/blog",label:"Articles"}],d=[{url:"https://github.com/astridx",label:"GitHub"},{url:"https://fimidi.com/@astrid",label:"Mastodon"},{url:"https://codeberg.org/astrid",label:"Codeberg"},{url:"https://twitter.com/astridguenther",label:"Twitter"}],m=function(e){var t=e.setCollapsed,n=e.onUpdateTheme;e.theme;return r.createElement("header",{className:"navigation"},r.createElement("div",{className:"navigation-inner"},r.createElement("nav",{className:"brand-section"},r.createElement("button",{onClick:function(){return t((function(e){return!e}))},className:"desktop-only collapse-button",title:"Collapse Sidebar"},r.createElement(f,null)),r.createElement(a.rU,{to:"/",className:"brand"},r.createElement("span",null,"Astrid Günther"))),r.createElement("div",null,r.createElement("nav",null,p.map((function(e){return r.createElement(a.rU,{to:e.url,key:e.label,activeClassName:"active"},r.createElement("div",{className:"tooltip"},e.label))}))),r.createElement("nav",null,d.map((function(e){return r.createElement("a",{rel:"me",href:e.url,key:e.label},e.label)})))),r.createElement("button",{onClick:n,className:"theme-switcher"},"Dark/Light")))},h=function(){return r.createElement("footer",{className:"footer"},r.createElement("section",null,r.createElement("nav",null,r.createElement("small",null,"Donate via "),r.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KQMKUVAX5SPVS&source=url",rel:"nofollow"},"Paypal"),r.createElement("small",null," or via IBAN: DE96 5001 0517 5416 BIC: INGDDEFFXXX")),r.createElement("nav",{className:"footer-links"},r.createElement(a.rU,{to:"/blog"},"Blog"),r.createElement(a.rU,{to:"https://astrid-guenther.de/impressum"},"Impressum"),r.createElement(a.rU,{to:"https://astrid-guenther.de/datenschutzerklaerung"},"Datenschutz")),r.createElement("nav",null,r.createElement("span",null,"Made by Me"))))};function g(e){localStorage.setItem("theme","dark"),e("dark"),document.body.style.backgroundColor="#252525"}function b(e){localStorage.setItem("theme","light"),e("light"),document.body.style.backgroundColor="white"}function y(e,t){var n=e;return t&&(n+=" collapsed"),n}var E=function(e){var t=e.children,n=(0,i.useLocation)(),a=(0,r.useState)("light"),c=a[0],u=a[1],l=(0,r.useState)(!0),f=l[0],p=l[1];n.pathname;return(0,r.useEffect)((function(){var e=localStorage.getItem("theme");"dark"===e&&g(u),"sepia"===e&&function(e){localStorage.setItem("theme","sepia"),e("sepia"),document.body.style.backgroundColor="#f1e2c0"}(u),"light"===e&&b(u)}),[]),r.createElement(r.Fragment,null,r.createElement(o.Z,null,r.createElement("link",{rel:"shortcut icon",type:"image/png",href:"data:image/png;base64,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"})),r.createElement("div",{className:y(c,f)},r.createElement(s,{setCollapsed:p}),r.createElement(m,{setCollapsed:p,onUpdateTheme:function(){return function(e){"dark"===e?b(u):"light"===e&&g(u)}(c)},theme:c}),r.createElement("main",null,t),r.createElement(h,null)))}},2248:function(e,t,n){"use strict";n.d(t,{H:function(){return a}});var r=n(7294),i=n(5414),o=n(5501),a=function(e){var t,n,a,c=e.postNode,u=e.postPath,l=e.postSEO,s=e.customDescription,f=o.Z.siteLogo;if(l){var p=c.frontmatter;t=p.title,n=c.excerpt,p.thumbnail&&(f=p.thumbnail.childImageSharp.fixed.src),a=""+o.Z.siteUrl+u}else t=o.Z.siteTitle,n=s||o.Z.description;f=""+o.Z.siteUrl+f;var d=[{"@context":"http://schema.org","@type":"WebSite",url:o.Z.siteUrl,name:t,alternateName:t}];return l&&d.push({"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":a,name:t,image:f}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:o.Z.siteUrl,name:t,alternateName:t,headline:t,image:{"@type":"ImageObject",url:f},description:n}),r.createElement(i.Z,null,r.createElement("meta",{name:"description",content:n}),r.createElement("meta",{name:"image",content:f}),r.createElement("script",{type:"application/ld+json"},JSON.stringify(d)),r.createElement("meta",{property:"og:url",content:l?a:o.Z.siteUrl}),l&&r.createElement("meta",{property:"og:type",content:"article"}),r.createElement("meta",{property:"og:title",content:t}),r.createElement("meta",{property:"og:description",content:n}),r.createElement("meta",{property:"og:image",content:f}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:title",content:t}),r.createElement("meta",{name:"twitter:description",content:n}),r.createElement("meta",{name:"twitter:image",content:f}))}},5501:function(e,t){"use strict";t.Z={siteTitle:"Astrid Günther",siteUrl:"https://blog.astrid-guenther.de",siteLogo:"/logo.png",description:"Software engineer and open source creator. This is my digital garden."}},8415:function(e,t,n){"use strict";n.d(t,{Nx:function(){return i},en:function(){return o},lV:function(){return a},jk:function(){return c}});var r=n(5785);function i(e,t){return void 0===t&&(t={}),e.map((function(e){var n,r,i;return Object.assign({id:e.node.id,date:e.node.frontmatter.date,slug:e.node.fields.slug,tags:e.node.frontmatter.tags,categories:e.node.frontmatter.categories,title:t.shortTitle?e.node.frontmatter.shortTitle:e.node.frontmatter.title,description:e.node.frontmatter.description},t.thumbnails&&{thumbnail:null===(n=e.node.frontmatter)||void 0===n||null===(r=n.thumbnail)||void 0===r||null===(i=r.childImageSharp)||void 0===i?void 0:i.fixed})}))}function o(e){return e.reduce((function(e,t){return(0,r.Z)(new Set([].concat((0,r.Z)(e),(0,r.Z)(t.categories||[]))))}),[]).sort()}function a(e){return e&&e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-")}function c(e){var t=document.createElement("script"),n=function(){var e=localStorage.getItem("theme");return"dark"===e?"github-dark":"sepia"===e?"gruvbox-dark":"github-light"}();t.async=!0,t.src="https://utteranc.es/client.js",t.setAttribute("repo","astridx/meinblog"),t.setAttribute("issue-term","pathname"),t.setAttribute("id","utterances"),t.setAttribute("theme",n),t.setAttribute("crossorigin","anonymous"),e&&e.current?e.current.appendChild(t):console.log("Error adding utterances comments on: "+e)}}}]);
//# sourceMappingURL=commons-711ca7686977bac14a85.js.map