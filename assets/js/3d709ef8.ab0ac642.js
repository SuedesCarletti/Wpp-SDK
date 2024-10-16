"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[8359],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>f});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),l=c(r),m=o,f=l["".concat(i,".").concat(m)]||l[m]||d[m]||a;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[l]="string"==typeof e?e:o,s[1]=p;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7556:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var n=r(8168),o=(r(6540),r(5680));const a={id:"requestCode",title:".requestCode"},s="WhatsApp.phoneNumbers.requestCode()",p={unversionedId:"api-reference/phoneNumbers/requestCode",id:"api-reference/phoneNumbers/requestCode",title:".requestCode",description:"Requests a verification code to be sent to number configured in the current WhatsApp client instance. Phone numbers can be verified using a code sent via either SMS or voice call in a specified language.",source:"@site/docs/api-reference/phoneNumbers/requestCode.md",sourceDirName:"api-reference/phoneNumbers",slug:"/api-reference/phoneNumbers/requestCode",permalink:"/Wpp-SDK/api-reference/phoneNumbers/requestCode",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/phoneNumbers/requestCode.md",tags:[],version:"current",frontMatter:{id:"requestCode",title:".requestCode"},sidebar:"mainSidebar",previous:{title:"this",permalink:"/Wpp-SDK/api-reference/phoneNumbers/this"},next:{title:".verifyCode",permalink:"/Wpp-SDK/api-reference/phoneNumbers/verifyCode"}},i={},c=[{value:"Example:",id:"example",level:2},{value:"Typescript",id:"typescript",level:3},{value:"Javascript",id:"javascript",level:3},{value:"Arguments",id:"arguments",level:2},{value:"Returns",id:"returns",level:2}],u={toc:c},l="wrapper";function d(e){let{components:t,...r}=e;return(0,o.yg)(l,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"whatsappphonenumbersrequestcode"},"WhatsApp.phoneNumbers.requestCode()"),(0,o.yg)("p",null,"Requests a verification code to be sent to number configured in the current WhatsApp client instance. Phone numbers can be verified using a code sent via either SMS or voice call in a specified language."),(0,o.yg)("h2",{id:"example"},"Example:"),(0,o.yg)("p",null,"Request a phone number verification code to be sent via SMS in the english language."),(0,o.yg)("h3",{id:"typescript"},"Typescript"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'import WhatsApp from \'whatsapp\';\n\nconst senderNumberId = 12345678901234567890;\nconst wa = new WhatsApp( senderNumberId );\n\nconst body : RequestCodeObject = {\n    "code_method" : WhatsApp.Enum.RequestCodeMethodsEnum.Sms,\n    "language" : WhatsApp.Enum.English\n}\n\nwa.phoneNumbers.requestCode( body );\n')),(0,o.yg)("h3",{id:"javascript"},"Javascript"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'import WhatsApp from \'whatsapp\';\n\nconst senderNumberId = 12345678901234567890;\nconst wa = new WhatsApp( senderNumberId );\n\nconst body = {\n    "code_method" : "SMS",\n    "language" : "en"\n}\n\nwa.phoneNumbers.requestCode( body );\n')),(0,o.yg)("h2",{id:"arguments"},"Arguments"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},"body")," : ",(0,o.yg)("a",{parentName:"li",href:"../types/RequestCodeObject"},"RequestCodeObject"),' \u2014 Object specifying the method to receive the verification code ("SMS" or "VOICE") and the language.')),(0,o.yg)("h2",{id:"returns"},"Returns"),(0,o.yg)("p",null,"Promise \u2014 Server response object on success. A successful response body JSON will be of type ",(0,o.yg)("a",{parentName:"p",href:"../types/PhoneNumbersResponseObject"},"PhoneNumbersResponseObject"),"."))}d.isMDXComponent=!0}}]);