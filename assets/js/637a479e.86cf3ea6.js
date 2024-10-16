"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[5579],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>y});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),m=i,y=u["".concat(l,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(y,o(o({ref:t},p),{},{components:r})):n.createElement(y,o({ref:t},p))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:i,o[1]=c;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5139:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var n=r(8168),i=(r(6540),r(5680));const a={id:"SectionObject",title:"SectionObject"},o="Section Object",c={unversionedId:"api-reference/types/SectionObject",id:"api-reference/types/SectionObject",title:"SectionObject",description:"The object describing individual sections for list messages and multi-product messages. The two types have different object requirements.",source:"@site/docs/api-reference/types/SectionObject.md",sourceDirName:"api-reference/types",slug:"/api-reference/types/SectionObject",permalink:"/Wpp-SDK/api-reference/types/SectionObject",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/api-reference/types/SectionObject.md",tags:[],version:"current",frontMatter:{id:"SectionObject",title:"SectionObject"},sidebar:"mainSidebar",previous:{title:"RowObject",permalink:"/Wpp-SDK/api-reference/types/RowObject"},next:{title:"SetPinResponseObject",permalink:"/Wpp-SDK/api-reference/types/SetPinResponseObject"}},l={},s=[{value:"List messages",id:"list-messages",level:2},{value:"Example",id:"example",level:3},{value:"Properties",id:"properties",level:3},{value:"Multi-product messages",id:"multi-product-messages",level:3},{value:"Example",id:"example-1",level:3},{value:"Properties",id:"properties-1",level:3}],p={toc:s},u="wrapper";function d(e){let{components:t,...r}=e;return(0,i.yg)(u,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"section-object"},"Section Object"),(0,i.yg)("p",null,"The object describing individual sections for list messages and multi-product messages. The two types have different object requirements."),(0,i.yg)("h2",{id:"list-messages"},"List messages"),(0,i.yg)("h3",{id:"example"},"Example"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "title": "SECTION_1_TITLE",\n    "rows": [\n    {\n        "id": "SECTION_1_ROW_1_ID",\n        "title": "SECTION_1_ROW_1_TITLE",\n        "description": "SECTION_1_ROW_1_DESCRIPTION"\n    },\n    {\n        "id": "SECTION_1_ROW_2_ID",\n        "title": "SECTION_1_ROW_2_TITLE",\n        "description": "SECTION_1_ROW_2_DESCRIPTION"\n    }\n    ]\n}\n')),(0,i.yg)("h3",{id:"properties"},"Properties"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"rows")," : ",(0,i.yg)("a",{parentName:"li",href:"RowObject"},"RowObject")," or undefined \u2014 array of ",(0,i.yg)("em",{parentName:"li"},"RowObject")," for list message."),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"title")," : string (optional) \u2014 contact's last name.")),(0,i.yg)("h3",{id:"multi-product-messages"},"Multi-product messages"),(0,i.yg)("h3",{id:"example-1"},"Example"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "title": "section-title",\n    "product_items": [\n        { "product_retailer_id": "product-SKU-in-catalog" },\n        { "product_retailer_id": "product-SKU-in-catalog" }\n    ]\n}\n')),(0,i.yg)("h3",{id:"properties-1"},"Properties"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"product_items")," : ",(0,i.yg)("a",{parentName:"li",href:"ProductObject"},"ProductObject")," or undefined \u2014 array of ",(0,i.yg)("em",{parentName:"li"},"ProductObject")," for multi-product message."),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"title")," : string (optional) \u2014 contact's last name.")))}d.isMDXComponent=!0}}]);