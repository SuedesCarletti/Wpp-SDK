"use strict";(self.webpackChunkwhatsapp_sdk_docs=self.webpackChunkwhatsapp_sdk_docs||[]).push([[9008],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||s;return n?a.createElement(g,o(o({ref:t},c),{},{components:n})):a.createElement(g,o({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4061:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const s={id:"quickstart",title:"Quickstart",slug:"/",tags:["Getting started"]},o="WhatsApp Business Platform Node.js SDK Quickstart",i={unversionedId:"quickstart",id:"quickstart",title:"Quickstart",description:"Learn how to quickly set up and use the Cloud API, hosted by Meta, Node.js SDK to send a message. In this quickstart, you'll only be sending messages via the Cloud API. Receiving messages involves setting up webhooks. For a more comprehensive baseline example to start from, you can use the WhatsApp Node.js Project Template instead of this quickstart.",source:"@site/docs/gettingStarted.md",sourceDirName:".",slug:"/",permalink:"/Wpp-SDK/",draft:!1,editUrl:"https://github.com/SuedesCarletti/Wpp-SDK/tree/main/docs/gettingStarted.md",tags:[{label:"Getting started",permalink:"/Wpp-SDK/tags/getting-started"}],version:"current",frontMatter:{id:"quickstart",title:"Quickstart",slug:"/",tags:["Getting started"]},sidebar:"mainSidebar",next:{title:"Receiving Messages",permalink:"/Wpp-SDK/receivingMessages"}},l={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create",id:"create",level:2},{value:"Configure",id:"configure",level:2},{value:"Code",id:"code",level:2},{value:"Anatomy",id:"anatomy",level:2},{value:"Run",id:"run",level:2}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"whatsapp-business-platform-nodejs-sdk-quickstart"},"WhatsApp Business Platform Node.js SDK Quickstart"),(0,r.yg)("p",null,"Learn how to quickly set up and use the Cloud API, hosted by Meta, Node.js SDK to send a message. In this quickstart, you'll only be sending messages via the Cloud API. Receiving messages involves setting up webhooks. For a more comprehensive baseline example to start from, you can use the ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/WhatsApp/WhatsApp-Nodejs-Project-Template"},"WhatsApp Node.js Project Template")," instead of this quickstart."),(0,r.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.yg)("p",null,"Before you begin:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"Install ",(0,r.yg)("a",{parentName:"li",href:"https://nodejs.org/"},"Node.js")," version 16 or later."),(0,r.yg)("li",{parentName:"ol"},"Complete the steps in the ",(0,r.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/whatsapp/cloud-api/get-started#set-up-developer-assets"},"official docs")," for getting started with the Cloud API. Stop once you've ",(0,r.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/whatsapp/cloud-api/get-started#sent-test-message"},"sent a test message"),"."),(0,r.yg)("li",{parentName:"ol"},"Respond to that message with anything. This puts the conversation into a ",(0,r.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/whatsapp/conversation-types"},"user-initiated conversations")," session, which allows other messages to be received via API calls for 24-hours.")),(0,r.yg)("h2",{id:"create"},"Create"),(0,r.yg)("p",null,"Open a new terminal window. Create a new directory for your project and then go to that directory."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"mkdir wa_quickstart\ncd ./wa_quickstart\n")),(0,r.yg)("p",null,"Use the npm command to create a simple project definition file (package.json)."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm init --yes\n")),(0,r.yg)("p",null,"Install the WhatsApp Business Platform Node.js SDK for the Cloud API, hosted by Meta."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install whatsapp\n")),(0,r.yg)("h2",{id:"configure"},"Configure"),(0,r.yg)("p",null,"Create a ",(0,r.yg)("em",{parentName:"p"},".env")," file in the root directory, add the values for the following variables, and save after you're done."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("strong",{parentName:"li"},"WA_PHONE_NUMBER_ID")," - Your phone number Id, located in the App Dashboard in the ",(0,r.yg)("em",{parentName:"li"},"WhatsApp")," dropdown menu > ",(0,r.yg)("em",{parentName:"li"},"Getting started")," > ",(0,r.yg)("em",{parentName:"li"},"Phone number ID"),"."),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("strong",{parentName:"li"},"CLOUD_API_ACCESS_TOKEN")," - You can use the readily provided temporary access token or ",(0,r.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/whatsapp/business-management-api/get-started/#system-user-access-tokens"},"system user access token")," for this exercise. This is also located in the App Dashboard in the ",(0,r.yg)("em",{parentName:"li"},"WhatsApp")," dropdown menu > ",(0,r.yg)("em",{parentName:"li"},"Getting started")," > ",(0,r.yg)("em",{parentName:"li"},"Temporary access token"),"."),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("strong",{parentName:"li"},"CLOUD_API_VERSION")," - Set this to the ",(0,r.yg)("a",{parentName:"li",href:"https://developers.facebook.com/docs/graph-api/guides/versioning#latest"},"latest version")," of the graph API.")),(0,r.yg)("p",null,"The ",(0,r.yg)("em",{parentName:"p"},".env")," file should look like"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"# Your WhatsApp phone number Id (sender).\nWA_PHONE_NUMBER_ID=\n\n# System user access token. Recommended: Do not use a temporary access token.\nCLOUD_API_ACCESS_TOKEN=\n\n# Cloud API version number.\nCLOUD_API_VERSION=v16.0\n")),(0,r.yg)("h2",{id:"code"},"Code"),(0,r.yg)("p",null,"In your project directory, create a file named ",(0,r.yg)("em",{parentName:"p"},"start.js")," with the following content with the sender number and recipient number:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},'import WhatsApp from \'whatsapp\';\n\n// Your test sender phone number\nconst wa = new WhatsApp( <<SENDER_NUMBER>> );\n\n// Enter the recipient phone number\nconst recipient_number = <<RECIPIENT_NUMBER>>;\n\nasync function send_message()\n{\n    try{\n        const sent_text_message = wa.messages.text( { "body" : "Hello world" }, recipient_number );\n\n        await sent_text_message.then( ( res ) =>\n        {\n            console.log( res.rawResponse() );\n        } );\n    }\n    catch( e )\n    {\n        console.log( JSON.stringify( e ) );\n    }\n}\n\nsend_message();\n')),(0,r.yg)("h2",{id:"anatomy"},"Anatomy"),(0,r.yg)("p",null,"What the code above is doing is:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"Creating a new instance of the WhatsApp class. This automatically reads from the ",(0,r.yg)("em",{parentName:"li"},".env")," file that was edited."),(0,r.yg)("li",{parentName:"ol"},'Sending a text type message with the text "Hello world" to the WhatsApp recipient.'),(0,r.yg)("li",{parentName:"ol"},"After the message is sent, it logs the raw response body from the response object to stdout."),(0,r.yg)("li",{parentName:"ol"},'If there was an error in the request, it will log those to stdout. Look for the "details" value for a human-readable explanation for the error if the Cloud API sent a response.')),(0,r.yg)("h2",{id:"run"},"Run"),(0,r.yg)("p",null,"Run your application by putting in the following command into terminal:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm start.js\n")),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},"Verify that the test recipient has received the message and the Cloud API shows a ",(0,r.yg)("em",{parentName:"p"},"statusCode")," of ",(0,r.yg)("inlineCode",{parentName:"p"},"200")," response. If you received a ",(0,r.yg)("inlineCode",{parentName:"p"},"200")," from the Cloud API, but did not receive the message in WhatsApp, your conversation may have gone beyond the 24-hour user-initiated conversation session. Simply resend a message from the recipient WhatsApp app and then restart your quickstart app to send a new message to the recipient.")))}d.isMDXComponent=!0}}]);