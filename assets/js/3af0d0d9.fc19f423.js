"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[5268],{5680:(e,t,n)=>{n.d(t,{xA:()=>l,yg:()=>f});var r=n(6540);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),h=s,f=u["".concat(c,".").concat(h)]||u[h]||d[h]||o;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,a=new Array(o);a[0]=h;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:s,a[1]=i;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7966:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(8168),s=(n(6540),n(5680));const o={id:"this",title:"this"},a="Webhooks class",i={unversionedId:"api-reference/webhooks/this",id:"api-reference/webhooks/this",title:"this",description:"This is the webhooks class that is instantiated by the WhatsApp class. The webhooks class object can be referenced with >.webhooks to access the member functions.",source:"@site/docs/api-reference/webhooks/this.md",sourceDirName:"api-reference/webhooks",slug:"/api-reference/webhooks/this",permalink:"/Wpp-SDK/api-reference/webhooks/this",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/webhooks/this.md",tags:[],version:"current",frontMatter:{id:"this",title:"this"},sidebar:"mainSidebar",previous:{title:".setPin",permalink:"/Wpp-SDK/api-reference/twoStepVerification/setPin"},next:{title:".isStarted",permalink:"/Wpp-SDK/api-reference/webhooks/isStarted"}},c={},p=[{value:"Example:",id:"example",level:2},{value:"Arguments",id:"arguments",level:2},{value:"Returns",id:"returns",level:2}],l={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,s.yg)(u,(0,r.A)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"webhooks-class"},"Webhooks class"),(0,s.yg)("p",null,"This is the webhooks class that is instantiated by the WhatsApp class. The webhooks class object can be referenced with <<SDK_NAMESPACE>>.webhooks to access the member functions."),(0,s.yg)("h2",{id:"example"},"Example:"),(0,s.yg)("p",null,"Start the web server and print out the response status code, request headers, and if it exists, the body."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-js"},'import WhatsApp from \'whatsapp\';\n\nconst senderNumber = 12345678901234567890;\nconst wa = new WhatsApp( senderNumber );\n\nasync function custom_callback( statusCode, reqHeaders, body, resp, err )\n{\n    console.log(\n        `Incoming webhook response status code: ${ statusCode }\\n\\nHeaders:\n        ${ JSON.stringify( reqHeaders ) }`\n    );\n\n    // Send a 200 so the webhooks service knows you received the message\n    if( resp )\n    {\n        if( body )\n            console.log( `Body: ${ JSON.stringify( body ) }` );\n\n        resp.writeHead( statusCode, { "Content-Type": "text/plain" } );\n        resp.end();\n    }\n\n    if( err )\n    {\n        console.log( `ERROR: ${ err }` );\n        resp.end();\n    }\n}\n\nwa.webhooks.start( custom_callback );\n')),(0,s.yg)("h2",{id:"arguments"},"Arguments"),(0,s.yg)("ol",null,(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("inlineCode",{parentName:"li"},"config")," : ",(0,s.yg)("a",{parentName:"li",href:"../types/WAConfigType"},"WAConfigType")," \u2014 SDK configuration object."),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("inlineCode",{parentName:"li"},"userAgent")," : string \u2014 the user-agent header parameter to send in responses.")),(0,s.yg)("h2",{id:"returns"},"Returns"),(0,s.yg)("p",null,"Object \u2014 Webhooks class instance."))}d.isMDXComponent=!0}}]);