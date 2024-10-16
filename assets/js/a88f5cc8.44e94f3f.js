"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[3471],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=a,g=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return n?r.createElement(g,i(i({ref:t},p),{},{components:n})):r.createElement(g,i({ref:t},p))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6571:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(8168),a=(n(6540),n(5680));const o={id:"location",title:".location"},i="WhatsApp.messages.location()",s={unversionedId:"api-reference/messages/location",id:"api-reference/messages/location",title:".location",description:"Send a location message.",source:"@site/docs/api-reference/messages/location.md",sourceDirName:"api-reference/messages",slug:"/api-reference/messages/location",permalink:"/Wpp-SDK/api-reference/messages/location",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/messages/location.md",tags:[],version:"current",frontMatter:{id:"location",title:".location"},sidebar:"mainSidebar",previous:{title:".interactive",permalink:"/Wpp-SDK/api-reference/messages/interactive"},next:{title:".status",permalink:"/Wpp-SDK/api-reference/messages/status"}},l={},c=[{value:"Example:",id:"example",level:2},{value:"Arguments",id:"arguments",level:2},{value:"Returns",id:"returns",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"whatsappmessageslocation"},"WhatsApp.messages.location()"),(0,a.yg)("p",null,"Send a location message."),(0,a.yg)("h2",{id:"example"},"Example:"),(0,a.yg)("p",null,"Send the Meta headquarter location to the phone number ",(0,a.yg)("inlineCode",{parentName:"p"},"12345678901"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import WhatsApp from \'whatsapp\';\n\nconst senderNumber = 12345678901234567890;\nconst wa = new WhatsApp( senderNumber );\n\nconst meta_hq_location =\n{\n    "longitude": "37.4850729",\n    "latitude": "-122.1527671",\n    "name": "Meta Headquarters",\n    "address": "1 Hacker Way, Menlo Park, CA 94025, USA"\n};\n\nwa.messages.location( meta_hq_location, 12345678901 );\n')),(0,a.yg)("h2",{id:"arguments"},"Arguments"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"body")," : ",(0,a.yg)("a",{parentName:"li",href:"../types/LocationObject"},"LocationObject")," \u2014 the object describing the location to send."),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"recipient")," : number \u2014 the recipient's phone number with country code."),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"replyMessageId")," : string (optional) \u2014 the received WhatsApp message Id to reply back to.")),(0,a.yg)("h2",{id:"returns"},"Returns"),(0,a.yg)("p",null,"Promise \u2014 Server response object on success."))}m.isMDXComponent=!0}}]);