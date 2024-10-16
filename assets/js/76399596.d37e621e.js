"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[7047],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>d});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=l(r),h=a,d=u["".concat(p,".").concat(h)]||u[h]||m[h]||i;return r?n.createElement(d,s(s({ref:t},c),{},{components:r})):n.createElement(d,s({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,s=new Array(i);s[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[u]="string"==typeof e?e:a,s[1]=o;for(var l=2;l<i;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},9393:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var n=r(8168),a=(r(6540),r(5680));const i={id:"this",title:"this"},s="WhatsApp class",o={unversionedId:"api-reference/whatsapp/this",id:"api-reference/whatsapp/this",title:"this",description:"This is the main class that is instantiated to create a client for the SDK. Configuration is set via environmental variables. Applications that are built in development mode can use a .env file located in the root of their project, but production applications must have these environmental variables set through other mechanisms before runtime.",source:"@site/docs/api-reference/whatsapp/this.md",sourceDirName:"api-reference/whatsapp",slug:"/api-reference/whatsapp/this",permalink:"/Wpp-SDK/api-reference/whatsapp/this",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/whatsapp/this.md",tags:[],version:"current",frontMatter:{id:"this",title:"this"},sidebar:"mainSidebar",previous:{title:"Project setup",permalink:"/Wpp-SDK/projectSetup"},next:{title:".version",permalink:"/Wpp-SDK/api-reference/whatsapp/version"}},p={},l=[{value:"Example:",id:"example",level:2},{value:"Arguments",id:"arguments",level:2},{value:"Returns",id:"returns",level:2}],c={toc:l},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"whatsapp-class"},"WhatsApp class"),(0,a.yg)("p",null,"This is the main class that is instantiated to create a client for the SDK. Configuration is set via environmental variables. Applications that are built in development mode can use a ",(0,a.yg)("em",{parentName:"p"},".env")," file located in the root of their project, but production applications must have these environmental variables set through other mechanisms before runtime."),(0,a.yg)("h2",{id:"example"},"Example:"),(0,a.yg)("p",null,"Create a new SDK client for the WhatsApp sender phone number Id ",(0,a.yg)("inlineCode",{parentName:"p"},"12345678901234567890"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},"import WhatsApp from 'whatsapp';\n\nconst senderNumber = 12345678901234567890;\nconst wa = new WhatsApp( senderNumber );\n")),(0,a.yg)("h2",{id:"arguments"},"Arguments"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"senderNumberId")," : number (optional) \u2014 The phone number Id of the sender registered in the Cloud API, including the country code (without any symbols). This is not required if ",(0,a.yg)("inlineCode",{parentName:"li"},"WA_PHONE_NUMBER_ID")," is available as an environmental variable (e.g. set in your ",(0,a.yg)("em",{parentName:"li"},".env")," file), but is required if it is omitted there. This allows a single app to send using multiple registered numbers.")),(0,a.yg)("h2",{id:"returns"},"Returns"),(0,a.yg)("p",null,"Object \u2014 WhatsApp class instance."))}m.isMDXComponent=!0}}]);