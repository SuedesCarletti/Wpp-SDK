"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[8193],{5680:(e,t,n)=>{n.d(t,{xA:()=>l,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,g=m["".concat(i,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(g,s(s({ref:t},l),{},{components:n})):r.createElement(g,s({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[m]="string"==typeof e?e:a,s[1]=p;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9165:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var r=n(8168),a=(n(6540),n(5680));const o={id:"document",title:".document"},s="WhatsApp.messages.document()",p={unversionedId:"api-reference/messages/document",id:"api-reference/messages/document",title:".document",description:"Send an existing self-hosted or Meta hosted document. Supported document formats:",source:"@site/docs/api-reference/messages/document.md",sourceDirName:"api-reference/messages",slug:"/api-reference/messages/document",permalink:"/Wpp-SDK/api-reference/messages/document",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/messages/document.md",tags:[],version:"current",frontMatter:{id:"document",title:".document"},sidebar:"mainSidebar",previous:{title:".contacts",permalink:"/Wpp-SDK/api-reference/messages/contacts"},next:{title:".image",permalink:"/Wpp-SDK/api-reference/messages/image"}},i={},c=[{value:"Example:",id:"example",level:2},{value:"Arguments",id:"arguments",level:2},{value:"Returns",id:"returns",level:2}],l={toc:c},m="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,r.A)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"whatsappmessagesdocument"},"WhatsApp.messages.document()"),(0,a.yg)("p",null,"Send an existing self-hosted or Meta hosted document. Supported document formats:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"TXT"),(0,a.yg)("li",{parentName:"ul"},"PDF"),(0,a.yg)("li",{parentName:"ul"},"PPT or PPTX"),(0,a.yg)("li",{parentName:"ul"},"DOC or DOCX"),(0,a.yg)("li",{parentName:"ul"},"XLS or XLSX"),(0,a.yg)("li",{parentName:"ul"},"ODF or FODT"),(0,a.yg)("li",{parentName:"ul"},"ODP or FODP"),(0,a.yg)("li",{parentName:"ul"},"ODS or FODS")),(0,a.yg)("h2",{id:"example"},"Example:"),(0,a.yg)("p",null,"Send a Meta-hosted message and then send an externally hosted document to the phone number ",(0,a.yg)("inlineCode",{parentName:"p"},"12345678901"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import WhatsApp from \'whatsapp\';\n\nconst senderNumber = 12345678901234567890;\nconst wa = new WhatsApp( senderNumber );\n\nconst meta_hosted_document =\n{\n    "id" : "123456abcde",\n    "caption" : "My important document",\n    "filename" : "example.pdf"\n};\n\nconst self_hosted_document =\n{\n    "link" : new URL( "https://example.com/example_1234.pdf" ).href,\n    "caption" : "My important document",\n    "filename" : "example.pdf"\n};\n\nawait wa.messages.document( meta_hosted_document, 12345678901 );\nwa.messages.document( self_hosted_document, 12345678901 );\n')),(0,a.yg)("h2",{id:"arguments"},"Arguments"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"body")," : ",(0,a.yg)("a",{parentName:"li",href:"../types/DocumentMediaObject"},"DocumentMediaObject")," \u2014 the object describing the document to send."),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"recipient")," : number \u2014 the recipient's phone number with country code."),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("inlineCode",{parentName:"li"},"replyMessageId")," : string (optional) \u2014 the received WhatsApp message Id to reply back to.")),(0,a.yg)("h2",{id:"returns"},"Returns"),(0,a.yg)("p",null,"Promise \u2014 Server response object on success."))}u.isMDXComponent=!0}}]);