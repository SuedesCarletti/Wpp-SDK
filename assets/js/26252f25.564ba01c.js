"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[2351],{5680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>y});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(r),f=o,y=u["".concat(i,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(y,c(c({ref:t},l),{},{components:r})):n.createElement(y,c({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[u]="string"==typeof e?e:o,c[1]=p;for(var s=2;s<a;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1948:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>s});var n=r(8168),o=(r(6540),r(5680));const a={id:"RequestCodeObject",title:"RequestCodeObject"},c="Request Code Object",p={unversionedId:"api-reference/types/RequestCodeObject",id:"api-reference/types/RequestCodeObject",title:"RequestCodeObject",description:"Object used for requesting a verification code based on the desired method and language to the number currently being used by the API.",source:"@site/docs/api-reference/types/RequestCodeObject.md",sourceDirName:"api-reference/types",slug:"/api-reference/types/RequestCodeObject",permalink:"/Wpp-SDK/api-reference/types/RequestCodeObject",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/types/RequestCodeObject.md",tags:[],version:"current",frontMatter:{id:"RequestCodeObject",title:"RequestCodeObject"},sidebar:"mainSidebar",previous:{title:"ReplyButtonObject",permalink:"/Wpp-SDK/api-reference/types/ReplyButtonObject"},next:{title:"RowObject",permalink:"/Wpp-SDK/api-reference/types/RowObject"}},i={},s=[{value:"Example",id:"example",level:3},{value:"Properties",id:"properties",level:2}],l={toc:s},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.yg)(u,(0,n.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"request-code-object"},"Request Code Object"),(0,o.yg)("p",null,"Object used for requesting a verification code based on the desired method and language to the number currently being used by the API."),(0,o.yg)("h3",{id:"example"},"Example"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "code_method" : "SMS",\n  "language" : "en"\n}\n')),(0,o.yg)("h2",{id:"properties"},"Properties"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},"code_method"),' : "SMS" | "VOICE" \u2014 the state of updating the two-step verification pin.'),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},"language")," : string \u2014 the two-character code of the language or locale to use. For all codes, see ",(0,o.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages"},"Supported Languages"),".")))}d.isMDXComponent=!0}}]);