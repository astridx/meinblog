"use strict";(self.webpackChunkblog_astrid_guenther_de=self.webpackChunkblog_astrid_guenther_de||[]).push([[883],{2786:function(e,t,n){n.d(t,{A:function(){return v}});var r=n(7294),a=n(9499),i=n(5414),l=n(5444),c=n(8415),o=function(e){var t=e.position,n=void 0===t?"down":t;return r.createElement("svg",{width:"10",height:"5",viewBox:"-2.5 -5 75 60",preserveAspectRatio:"none",style:"right"===n?{transform:"rotate(-90deg)"}:{}},r.createElement("path",{d:"M0,0 l35,50 l35,-50",fill:"none",strokeLinecap:"round",strokeWidth:"5"}))},s=function(){return r.createElement("svg",{viewBox:"0 0 20 20",width:"18",height:"20"},r.createElement("path",{fill:"var(--primary)",d:"M15.475,6.692l-4.084-4.083C11.32,2.538,11.223,2.5,11.125,2.5h-6c-0.413,0-0.75,0.337-0.75,0.75v13.5c0,0.412,0.337,0.75,0.75,0.75h9.75c0.412,0,0.75-0.338,0.75-0.75V6.94C15.609,6.839,15.554,6.771,15.475,6.692 M11.5,3.779l2.843,2.846H11.5V3.779z M14.875,16.75h-9.75V3.25h5.625V7c0,0.206,0.168,0.375,0.375,0.375h3.75V16.75z"}))},u=function(e){var t=e.setCollapsed,n=(0,a.useLocation)(),i=(0,r.useState)({}),u=i[0],m=i[1],d=(0,l.K2)("352937542").allMarkdownRemark.edges,E=(0,r.useMemo)((function(){return(0,c.Nx)(d)}),[d]),g=(0,r.useMemo)((function(){return(0,c.en)(E)}),[E]);return(0,r.useEffect)((function(){var e=E.find((function(e){return e.slug===n.pathname}));if(null!=e&&e.categories){var t=e.categories.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=!0,n))}),{});m((function(e){return Object.assign({},e,t)}))}}),[E,n]),r.createElement("aside",{className:"sidebar"},r.createElement("div",{className:"categories"},g.map((function(e){return r.createElement(r.Fragment,{key:e},r.createElement("button",{className:"category",onClick:function(){return function(e){u[e]?m((function(t){var n;return Object.assign({},t,((n={})[e]=!1,n))})):m((function(t){var n;return Object.assign({},t,((n={})[e]=!0,n))}))}(e)}},r.createElement(o,{position:u[e]?"down":"right"}),r.createElement("span",null,e)),r.createElement("nav",{className:u[e]?"":"collapsed"},E.filter((function(t){return(t.categories||[]).includes(e)})).map((function(e){return r.createElement(l.rU,{key:e.title,to:e.slug,activeClassName:"active",onClick:function(){return t(!0)}},r.createElement(s,null),r.createElement("span",null,e.title))}))))}))))},m=function(){return r.createElement("svg",{viewBox:"0 0 100 80",width:"20",height:"12"},r.createElement("rect",{width:"100",height:"10"}),r.createElement("rect",{y:"30",width:"100",height:"10"}),r.createElement("rect",{y:"60",width:"100",height:"10"}))},d=[{url:"/blog",label:"Articles"}],E=[{url:"https://github.com/astridx",label:"GitHub"},{url:"https://fimidi.com/@astrid",label:"Mastodon"},{url:"https://codeberg.org/astrid",label:"Codeberg"},{url:"https://twitter.com/astridguenther",label:"Twitter"}],g=function(e){var t=e.setCollapsed,n=e.onUpdateTheme;e.theme;return r.createElement("header",{className:"navigation"},r.createElement("div",{className:"navigation-inner"},r.createElement("nav",{className:"brand-section"},r.createElement("button",{onClick:function(){return t((function(e){return!e}))},className:"desktop-only collapse-button",title:"Collapse Sidebar"},r.createElement(m,null)),r.createElement(l.rU,{to:"/",className:"brand"},r.createElement("span",null,"Astrid Günther"))),r.createElement("div",null,r.createElement("nav",null,d.map((function(e){return r.createElement(l.rU,{to:e.url,key:e.label,activeClassName:"active"},r.createElement("div",{className:"tooltip"},e.label))}))),r.createElement("nav",null,E.map((function(e){return r.createElement("a",{rel:"me",href:e.url,key:e.label},e.label)})))),r.createElement("button",{onClick:n,className:"theme-switcher"},"Dark/Light")))},h=function(){return r.createElement("footer",{className:"footer"},r.createElement("section",null,r.createElement("nav",null,r.createElement("small",null,"Donate via "),r.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KQMKUVAX5SPVS&source=url",rel:"nofollow"},"Paypal"),r.createElement("small",null," or via IBAN: DE96 5001 0517 5416 BIC: INGDDEFFXXX")),r.createElement("nav",{className:"footer-links"},r.createElement(l.rU,{to:"/blog"},"Blog"),r.createElement(l.rU,{to:"https://astrid-guenther.de/impressum"},"Impressum"),r.createElement(l.rU,{to:"https://astrid-guenther.de/datenschutzerklaerung"},"Datenschutz")),r.createElement("nav",null,r.createElement("span",null,"Made by Me"))))};function p(e){localStorage.setItem("theme","dark"),e("dark"),document.body.style.backgroundColor="#252525"}function A(e){localStorage.setItem("theme","light"),e("light"),document.body.style.backgroundColor="white"}function f(e,t){var n=e;return t&&(n+=" collapsed"),n}var v=function(e){var t=e.children,n=(0,a.useLocation)(),l=(0,r.useState)("light"),c=l[0],o=l[1],s=(0,r.useState)(!0),m=s[0],d=s[1];n.pathname;return(0,r.useEffect)((function(){var e=localStorage.getItem("theme");"dark"===e&&p(o),"sepia"===e&&function(e){localStorage.setItem("theme","sepia"),e("sepia"),document.body.style.backgroundColor="#f1e2c0"}(o),"light"===e&&A(o)}),[]),r.createElement(r.Fragment,null,r.createElement(i.Z,null,r.createElement("link",{rel:"shortcut icon",type:"image/png",href:"data:image/png;base64,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"})),r.createElement("div",{className:f(c,m)},r.createElement(u,{setCollapsed:d}),r.createElement(g,{setCollapsed:d,onUpdateTheme:function(){return function(e){"dark"===e?A(o):"light"===e&&p(o)}(c)},theme:c}),r.createElement("main",null,t),r.createElement(h,null)))}},2248:function(e,t,n){n.d(t,{H:function(){return l}});var r=n(7294),a=n(5414),i=n(5501),l=function(e){var t,n,l,c=e.postNode,o=e.postPath,s=e.postSEO,u=e.customDescription,m=i.Z.siteLogo;if(s){var d=c.frontmatter;t=d.title,n=c.excerpt,d.thumbnail&&(m=d.thumbnail.childImageSharp.fixed.src),l=""+i.Z.siteUrl+o}else t=i.Z.siteTitle,n=u||i.Z.description;m=""+i.Z.siteUrl+m;var E=[{"@context":"http://schema.org","@type":"WebSite",url:i.Z.siteUrl,name:t,alternateName:t}];return s&&E.push({"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":l,name:t,image:m}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:i.Z.siteUrl,name:t,alternateName:t,headline:t,image:{"@type":"ImageObject",url:m},description:n}),r.createElement(a.Z,null,r.createElement("meta",{name:"description",content:n}),r.createElement("meta",{name:"image",content:m}),r.createElement("script",{type:"application/ld+json"},JSON.stringify(E)),r.createElement("meta",{property:"og:url",content:s?l:i.Z.siteUrl}),s&&r.createElement("meta",{property:"og:type",content:"article"}),r.createElement("meta",{property:"og:title",content:t}),r.createElement("meta",{property:"og:description",content:n}),r.createElement("meta",{property:"og:image",content:m}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:title",content:t}),r.createElement("meta",{name:"twitter:description",content:n}),r.createElement("meta",{name:"twitter:image",content:m}))}},9616:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(7294),a=n(5414),i=n(2786),l=n(2248),c=n(5501);function o(){return r.createElement(r.Fragment,null,r.createElement(a.Z,{title:"404 | "+c.Z.siteTitle}),r.createElement(l.H,null),r.createElement("article",null,r.createElement("header",null,r.createElement("div",{className:"container"},r.createElement("h1",null,"404"),r.createElement("p",{className:"description"},"Dies war wahrscheinlich ein Fehler. ",r.createElement("br",null),"This was probably a mistake.")))))}o.Layout=i.A},5501:function(e,t){t.Z={siteTitle:"Astrid Günther",siteUrl:"https://blog.astrid-guenther.de",siteLogo:"/logo.png",description:"Software engineer and open source creator. This is my digital garden."}},8415:function(e,t,n){n.d(t,{Nx:function(){return a},en:function(){return i},lV:function(){return l},jk:function(){return c}});var r=n(5785);function a(e,t){return void 0===t&&(t={}),e.map((function(e){var n,r,a;return Object.assign({id:e.node.id,date:e.node.frontmatter.date,slug:e.node.fields.slug,tags:e.node.frontmatter.tags,categories:e.node.frontmatter.categories,title:t.shortTitle?e.node.frontmatter.shortTitle:e.node.frontmatter.title,description:e.node.frontmatter.description},t.thumbnails&&{thumbnail:null===(n=e.node.frontmatter)||void 0===n||null===(r=n.thumbnail)||void 0===r||null===(a=r.childImageSharp)||void 0===a?void 0:a.fixed})}))}function i(e){return e.reduce((function(e,t){return(0,r.Z)(new Set([].concat((0,r.Z)(e),(0,r.Z)(t.categories||[]))))}),[]).sort()}function l(e){return e&&e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-")}function c(e){var t=document.createElement("script"),n=function(){var e=localStorage.getItem("theme");return"dark"===e?"github-dark":"sepia"===e?"gruvbox-dark":"github-light"}();t.async=!0,t.src="https://utteranc.es/client.js",t.setAttribute("repo","astridx/meinblog"),t.setAttribute("issue-term","pathname"),t.setAttribute("id","utterances"),t.setAttribute("theme",n),t.setAttribute("crossorigin","anonymous"),e&&e.current?e.current.appendChild(t):console.log("Error adding utterances comments on: "+e)}}}]);
//# sourceMappingURL=component---src-pages-404-js-f76f5288c4d2bb942653.js.map