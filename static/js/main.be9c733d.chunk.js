(this.webpackJsonpstreamflow=this.webpackJsonpstreamflow||[]).push([[0],{103:function(e,t){},11:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"f",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"j",(function(){return d})),n.d(t,"k",(function(){return b})),n.d(t,"i",(function(){return j})),n.d(t,"g",(function(){return m})),n.d(t,"h",(function(){return f}));var r,a=n(23),c=10,s="https://www.sollet.io",i=1e3,o=0,l=1,u=2,d="scheduled",b="streaming",j="complete",m="canceled",f=(r={},Object(a.a)(r,d,"gray"),Object(a.a)(r,b,"green"),Object(a.a)(r,j,"blue"),Object(a.a)(r,m,"red"),r)},119:function(e,t){},139:function(e,t){},140:function(e,t){},162:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(46),s=n.n(c),i=(n(98),n(10)),o=n(23),l=n(2),u=n.n(l),d=n(5),b=n(7),j=n(12),m=n(8),f=n(165),h=n(166),x=n(163),p=n(35),O=n(19),g=n(32),y=n(3);function w(e){return Object(y.jsxs)("div",{className:"col-span-full",children:[Object(y.jsx)("label",{htmlFor:"account",className:"block font-medium text-gray-100",children:"Recipient Account"}),Object(y.jsx)("div",{className:"mt-1",children:Object(y.jsx)("input",{type:"text",name:"account",id:"account",defaultValue:e.value,onChange:function(t){return e.onChange(t.target.value)},pattern:"[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}",className:"text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary",placeholder:"Please double check the address","aria-describedby":"account-description",required:!0})})]})}function v(){return Object(y.jsxs)("div",{className:"col-span-2 sm:col-span-1",children:[Object(y.jsx)("label",{htmlFor:"token",className:"block font-medium text-gray-100",children:"Token"}),Object(y.jsxs)("select",{id:"token",name:"token",className:"mt-1 text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary",defaultValue:"SOL",children:[Object(y.jsx)("option",{children:"SOL"}),Object(y.jsx)("option",{disabled:!0,children:"ETH - Coming soon\ufe0f\u2122"}),Object(y.jsx)("option",{disabled:!0,children:"BTC - Coming soon\u2122"}),Object(y.jsx)("option",{disabled:!0,children:"USDC - Coming soon\u2122"}),Object(y.jsx)("option",{disabled:!0,children:"Other tokens..."})]})]})}var N=n(16),k=n(17),S=n(27),C=n(28),D=function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(){var e;Object(N.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={hidden:!1},e}return Object(k.a)(n,[{key:"render",value:function(){var e=this;return Object(y.jsx)("div",{className:"relative bg-primary ".concat(this.state.hidden&&"hidden"),children:Object(y.jsxs)("div",{className:"max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8",children:[Object(y.jsx)("div",{className:"pr-16 sm:text-center sm:px-16",children:Object(y.jsxs)("p",{className:"font-small text-white",children:[Object(y.jsxs)("span",{children:["This is the ",Object(y.jsx)("b",{children:"Devnet"})," version. Go wild and test freely! "]}),Object(y.jsx)("span",{className:"inline-block ml-2",children:Object(y.jsxs)("a",{href:"https://streamflow.finance",rel:"noopener noreferrer",target:"_blank",className:"text-white underline",children:["Live version coming soon",Object(y.jsx)("span",{"aria-hidden":"true",children:"\u2192"})]})})]})}),Object(y.jsx)("div",{className:"absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start",children:Object(y.jsxs)("button",{type:"button",onClick:function(){return e.setState({hidden:!0})},className:"flex p-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white",children:[Object(y.jsx)("span",{className:"sr-only",children:"Dismiss"}),Object(y.jsx)(g.b,{className:"h-6 w-6 text-white"})]})})]})})}}]),n}(r.Component);function B(e){return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{className:"col-span-3 sm:col-span-1",children:[Object(y.jsxs)("label",{htmlFor:e.title,className:"block font-medium text-gray-100 capitalize",children:[e.title," Date"]}),Object(y.jsx)("div",{className:"mt-1",children:Object(y.jsx)("input",{type:"date",name:e.title,id:e.title,value:e.date,min:Object(f.a)(new Date,"yyyy-MM-dd"),max:Object(f.a)(Object(h.a)(new Date,{years:1}),"yyyy-MM-dd"),onChange:e.updateDate,className:"text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary",placeholder:"","aria-describedby":e.title+"-description",required:!0})})]}),Object(y.jsxs)("div",{className:"col-span-2 sm:col-span-1",children:[Object(y.jsxs)("label",{htmlFor:e.title+"_time",className:"block font-medium text-gray-100 capitalize",children:[e.title," time"]}),Object(y.jsx)("div",{className:"mt-1",children:Object(y.jsx)("input",{type:"time",name:e.title+"_time",id:e.title+"_time",value:e.time,onChange:e.updateTime,className:"text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary",placeholder:"","aria-describedby":e.title+"_time-description",required:!0})})]})]})}function T(e){return Object(y.jsxs)("div",{className:"col-span-3 sm:col-span-1",children:[Object(y.jsx)("label",{htmlFor:"amount",className:"block font-medium text-gray-100",children:"Amount"}),Object(y.jsx)("div",{className:"mt-1",children:Object(y.jsx)("input",{step:.001,autoFocus:!0,type:"number",name:"amount",id:"amount",defaultValue:e.value,onChange:function(t){return e.onChange(t.target.value)},className:"text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary",min:0,max:e.max||Number.MAX_SAFE_INTEGER,placeholder:"0.00","aria-describedby":"amount-description",required:!0})})]})}function F(e){return Object(y.jsx)("div",{className:"fixed top-0 bottom-0 left-0 right-0 bg-white opacity-90 z-10 ".concat(e.visible?"block":"hidden"),children:Object(y.jsx)("div",{className:"loader",children:" "})})}function E(e){var t=e.type,n=e.color;return Object(y.jsx)("div",{className:"inline",children:Object(y.jsxs)("span",{className:"align-top px-2.5 py-0.5 rounded-full text-xs font-medium bg-".concat(n,"-100 text-").concat(n,"-800 capitalize"),children:[Object(y.jsx)("svg",{className:"mr-1 -ml-1 inline align-baseline h-2 w-2 text-".concat(n,"-400"),fill:"currentColor",viewBox:"0 0 8 8",children:Object(y.jsx)("circle",{cx:4,cy:4,r:3})}),t]})})}var L=n(164);function M(e){return console.log("logged"),Object(y.jsxs)("dt",{className:"col-span-full text-center",children:[Object(f.a)(Object(L.a)(e.start),"yyyy-MM-dd HH:mm")," \u2013 ",Object(f.a)(Object(L.a)(e.end),"yyyy-MM-dd HH:mm")]})}var U=Object(r.memo)(M);function I(e){var t=e.title,n=e.value,r=e.max,a=e.rtl;return n=Number(n).toFixed(2),r=Number(r).toFixed(2),Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("dt",{children:t}),Object(y.jsx)("div",{className:"rounded-sm h-3 bg-gray-900 w-full my-auto",children:Object(y.jsx)("div",{className:"bg-gradient-to-r from-primary to-secondary rounded-sm h-full "+(a?"float-right":""),style:{width:n/r*100+"%"}})}),Object(y.jsxs)("label",{className:"ml-2 text-right truncate",children:["\u25ce",n,Object(y.jsxs)("small",{className:"text-gray-400",children:["/",r]})]})]})}var A=n(25),W=n(11);function _(e){var t=e.data,n=t.start,a=t.end,c=t.withdrawn,s=t.amount,i=t.receiver,o=t.sender,l=t.status,u=e.myAddress,d=e.removeStream,b=e.onStatusUpdate,m=e.onCancel,f=e.onWithdraw,h=e.id,p=W.h[l],O=Object(r.useState)(K(n,a,s)),w=Object(j.a)(O,2),v=w[0],N=w[1],k=Object(r.useState)(v-c),S=Object(j.a)(k,2),C=S[0],D=S[1],B=l===W.k||l===W.i&&c<s,T=(l===W.k||l===W.j)&&u===o;return Object(r.useEffect)((function(){var e=setInterval((function(){N(K(n,a,s)),D(v-c);var e=function(e,t,n){var r=Object(x.a)(new Date);return e===W.j&&r>=t?W.k:e===W.k&&r>=n?W.i:e}(l,n,a);e!==l&&b(e)}),100);return function(){return clearInterval(e)}})),Object(y.jsxs)("dl",{className:"text-white my-4 grid gap-y-4 gap-x-2 grid-cols-3 p-4 bg-".concat(p,"-300 bg-opacity-10 hover:bg-opacity-20 shadow rounded-lg"),children:[Object(y.jsxs)("div",{className:"col-span-full",children:[Object(y.jsx)(E,{className:"inline",type:l,color:p}),Object(y.jsx)("button",{onClick:d,className:"p-1.5 h-6 w-6 float-right align-top rounded-sm hover:bg-".concat(p,"-100 focus:outline-none focus:ring-1"),children:Object(y.jsx)(g.b,{className:"float-right w-3 h-3"})})]}),Object(y.jsx)(U,{start:n,end:a}),Object(y.jsx)("dt",{children:"ID"}),Object(y.jsx)("dd",{className:"col-span-2 text-sm text-gray-400 truncate",children:h}),Object(y.jsx)("dt",{children:"Recipient"}),Object(y.jsx)("dd",{className:"col-span-2 text-sm text-gray-400 truncate",children:i}),l===W.g?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(I,{title:"Withdrawn",value:c,max:s}),Object(y.jsx)(I,{title:"Returned",value:s-c,max:s,rtl:!0})]}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(I,{title:"Streamed",value:v,max:s}),Object(y.jsx)(I,{title:"Withdrawn",value:c,max:s}),u===i&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("dt",{children:["Available",Object(y.jsx)("br",{}),Object(y.jsx)("sup",{className:"text-xs text-gray-300 align-top",children:"for withdrawal"})]}),Object(y.jsxs)("dd",{className:"col-span-2",children:["\u25ce",C.toFixed(2)]}),B&&Object(y.jsx)("button",{onClick:f,className:"rounded-md text-sm bg-green-500 hover:bg-green-700 active:bg-green text-white py-1 px-2",children:"Withdraw"})]}),T&&Object(y.jsx)("button",{onClick:m,className:"rounded-md text-sm bg-red-400 hover:bg-red-600 active:bg-red text-white py-1 px-2",children:"Cancel"})]})]})}function K(e,t,n,r){return(r=r||Object(x.a)(new Date))<e?0:r>t?n:(r-e)/(t-e)*n}function H(){return Object(y.jsxs)("footer",{className:"mt-40 text-center text-sm font-mono text-gray-400",children:[Object(y.jsx)("img",{src:"https://solana.com/branding/horizontal/logo-horizontal-gradient-dark.png",className:"w-40 mx-auto my-2",alt:"Solana logo"}),Object(y.jsx)("small",{children:Object(y.jsxs)("code",{children:["BUIDLed by ",Object(y.jsx)("a",{href:"https://streamflow.finance",className:"text-gray-300",rel:"noopener noreferrer",target:"_blank",children:"StreamFlow"}),Object(y.jsx)("br",{}),"during ",Object(y.jsx)("a",{href:"https://solana.com/solanaszn",target:"_blank",className:"text-gray-300",rel:"noopener noreferrer",children:"SOLANASZN"})]})})]})}function q(e){return Object(y.jsxs)("div",{className:"mb-8 text-white",children:[Object(y.jsx)("img",{src:e.src,alt:"StreamFlow Finance logo",className:"w-24 mx-auto"}),Object(y.jsxs)("h1",{className:"text-6xl text-center",children:["Stream",Object(y.jsx)("strong",{children:"Flow"})]})]})}var z=n(89),R=n(90),V=n(91);function P(e){var t=e.text,n=e.action,r=e.className,a=e.submit,c=e.disabled;return Object(y.jsx)("button",{type:a?"submit":"button",onClick:n,className:"block mx-auto px-8 py-4 bg-gradient-to-br from-primary via-primary to-secondary border-transparent font-medium rounded shadow-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "+r,disabled:c,children:t})}n(161);var J=n.p+"static/media/logo.c4294b7c.png";function G(e){return Object(y.jsxs)("div",{className:"max-w-lg mx-auto",children:[Object(y.jsx)("iframe",{width:"100%",height:270,src:"https://www.youtube.com/embed/KMU0tzLwhbE",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,children:"\xa0"}),Object(y.jsx)(P,{text:"Connect",className:"font-bold text-2xl my-5",action:e.action})]})}var Z=function(){var e="http://localhost:8899",t=new Date,n=m.b.generate(),a=Object(r.useState)(W.f),c=Object(j.a)(a,1)[0],s=Object(r.useState)(void 0),l=Object(j.a)(s,2),N=l[0],k=l[1],S=Object(r.useState)(!1),C=Object(j.a)(S,2),E=C[0],L=C[1],M=Object(r.useState)(void 0),U=Object(j.a)(M,2),I=U[0],Z=U[1],Y=Object(r.useState)(void 0),X=Object(j.a)(Y,2),Q=X[0],$=X[1],ee=Object(r.useState)(void 0),te=Object(j.a)(ee,2),ne=te[0],re=te[1],ae=Object(r.useState)(Object(f.a)(t,"yyyy-MM-dd")),ce=Object(j.a)(ae,2),se=ce[0],ie=ce[1],oe=Object(r.useState)(Object(f.a)(Object(h.a)(t,{minutes:W.b}),"HH:mm")),le=Object(j.a)(oe,2),ue=le[0],de=le[1],be=Object(r.useState)(se),je=Object(j.a)(be,2),me=je[0],fe=je[1],he=Object(r.useState)(ue),xe=Object(j.a)(he,2),pe=xe[0],Oe=xe[1],ge=Object(r.useState)(!1),ye=Object(j.a)(ge,2),we=ye[0],ve=ye[1],Ne=Object(r.useState)(localStorage.streams?JSON.parse(localStorage.streams):{}),ke=Object(j.a)(Ne,2),Se=ke[0],Ce=ke[1],De=Object(r.useMemo)((function(){return new m.a(e)}),[e]),Be=Object(r.useMemo)((function(){return new p.a(c,e)}),[c,e]);function Te(e){var t,n=e.name,r=e.value,a="";switch(n){case"start":a=(t=new Date(r+"T"+ue))<new Date?"Cannot start the stream in the past.":"";break;case"start_time":t=new Date(se+"T"+r),console.log("now",new Date),a=t<new Date?"Cannot start the stream in the past.":"";break;case"end":a=new Date(r)<new Date(se)?"Umm... end date before the start date?":"";break;case"end_time":t=new Date(se+"T"+ue),a=new Date(me+"T"+r)<t?"Err... end time before the start time?":""}e.setCustomValidity(a)}function Fe(){return Ee.apply(this,arguments)}function Ee(){return(Ee=Object(d.a)(u.a.mark((function t(){var r,a,c,s,l,d,j,f;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=document.getElementById("form"),a=Object(i.a)(r.elements);try{for(a.s();!(c=a.n()).done;)Te(c.value)}catch(u){a.e(u)}finally{a.f()}if(r.checkValidity()){t.next=6;break}return r.reportValidity(),t.abrupt("return",!1);case 6:return s=Object(x.a)(new Date(se+"T"+ue)),(l=Object(x.a)(new Date(me+"T"+pe)))===s&&(l=s+1),ve(!0),d=new A.a(N.publicKey.toBase58(),ne,Q,s,l),t.next=13,Object(z.a)(d,De,N,e,n);case 13:if(j=t.sent,ve(!1),!j){t.next=22;break}return Object(A.e)(n.publicKey.toBase58()),Ce(Object(b.a)(Object(b.a)({},Se),{},Object(o.a)({},n.publicKey.toBase58(),d))),t.next=20,De.getBalance(N.publicKey);case 20:f=t.sent,Z(f/m.c);case 22:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Le(){return(Le=Object(d.a)(u.a.mark((function t(n){var r,a,c,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Se[n],a=r.start,c=r.end,s=r.amount,t.next=3,Object(R.a)(n,Se[n],De,N,e);case 3:t.sent&&Ce(Object(b.a)(Object(b.a)({},Se),{},Object(o.a)({},n,Object(b.a)(Object(b.a)({},Se[n]),{},{withdrawn:K(a,c,s)}))));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Me(){return(Me=Object(d.a)(u.a.mark((function t(n){var r,a,c,s,i,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Se[n],a=r.start,c=r.end,s=r.amount,i=new Date,l=K(a,c,s),t.next=5,Object(V.a)(n,Se[n],De,N,e);case 5:t.sent&&Ce(Object(b.a)(Object(b.a)({},Se),{},Object(o.a)({},n,Object(b.a)(Object(b.a)({},Se[n]),{},{withdrawn:l,canceled_at:Object(x.a)(i),status:W.g}))));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Ue(e,t){return Ie.apply(this,arguments)}function Ie(){return(Ie=Object(d.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=!n,!e.t0){e.next=5;break}return e.next=4,Object(A.b)();case 4:e.t0=e.sent;case 5:if(!e.t0){e.next=9;break}delete(r=Object(b.a)({},Se))[t],Ce(r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){if(N)return N.on("connect",(function(){L(!0),De.getBalance(N.publicKey).then((function(e){return Z(e/m.c)})),O.b.success("Connected to wallet!")})),N.on("disconnect",(function(){L(!1),k(void 0),O.b.info("Disconnected from wallet")})),N.connect(),function(){N.disconnect()}}),[De,N]),Object(r.useEffect)((function(){var e=Object(b.a)({},Se),t=window.location.hash.substring(1);if(t)try{new m.d(t),e[t]=void 0}catch(a){O.b.error("Stream URL not valid. Please double check with the sender.")}var n=function(n){if(e.hasOwnProperty(n)){var r=void 0;try{r=new m.d(n)}catch(a){O.b.error(a.message+n),Ue(n,!0)}r&&De.getAccountInfo(new m.d(n)).then((function(e){var r=Object(b.a)({},Se);(null===e||void 0===e?void 0:e.data)?r[n]=Object(A.c)(e.data):(n===t&&O.b.error("Stream URL not valid. Please double check with the sender."),delete r[n]),Ce(r)}))}};for(var r in e)n(r)}),[]),Object(r.useEffect)((function(){localStorage.streams=JSON.stringify(Se)}),[Se]),Object(y.jsxs)("div",{children:[Object(y.jsx)(D,{}),Object(y.jsxs)("div",{className:"mx-auto bg-blend-darken px-4 my-4",children:[Object(y.jsx)(q,{src:J}),E?Object(y.jsxs)("div",{className:"mx-auto grid grid-cols-1 gap-16 max-w-lg xl:grid-cols-2 xl:max-w-5xl",children:[Object(y.jsxs)("div",{className:"mb-8",children:[Object(y.jsx)(F,{visible:we}),Object(y.jsxs)("div",{className:"mb-4 text-white",children:[Object(y.jsx)("strong",{className:"text-gray-400 hover:text-white",children:Object(y.jsxs)("a",{href:Object(A.d)("address",N.publicKey.toBase58(),e),target:"_blank",rel:"noopener noreferrer",children:["My Wallet Account ",Object(y.jsx)(g.a,{className:"ml-1 w-4 h-4 inline"}),":"]})}),Object(y.jsx)("span",{className:"block truncate",children:N.publicKey.toBase58()})]}),Object(y.jsxs)("div",{className:"mb-4 clearfix text-white",children:[Object(y.jsx)("strong",{className:"block",children:"Balance:"}),Object(y.jsxs)("span",{children:["\u25ce",I]}),Object(y.jsx)("button",{type:"button",onClick:function(){return N.disconnect()},className:"float-right items-center px-2.5 py-1.5 shadow-sm text-xs  font-medium rounded bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:"Disconnect"}),Object(y.jsx)(P,{text:"Airdrop",action:function(){ve(!0),Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,De.requestAirdrop(N.publicKey,W.a*m.c);case 2:return t=e.sent,e.next=5,De.confirmTransaction(t,"confirmed");case 5:e.sent.value.err?O.b.error("Error requesting airdrop"):(ve(!1),Z(I+W.a),O.b.success("Huge airdrop for you!"));case 7:case"end":return e.stop()}}),e)})))()},className:"float-right mr-2 px-2.5 py-1.5 text-xs my-0 rounded active:bg-white",disabled:we})]}),Object(y.jsx)("hr",{}),Object(y.jsxs)("form",{onSubmit:Fe,id:"form",children:[Object(y.jsxs)("div",{className:"my-4 grid gap-4 grid-cols-5 sm:grid-cols-2",children:[Object(y.jsx)(T,{onChange:$,value:Q,max:I}),Object(y.jsx)(v,{}),Object(y.jsx)(w,{onChange:re,value:ne}),Object(y.jsx)(B,{title:"start",date:se,updateDate:function(e){return ie(e.target.value)},time:ue,updateTime:function(e){de(e.target.value),Te(e.target)}}),Object(y.jsx)(B,{title:"end",date:me,updateDate:function(e){return fe(e.target.value)},time:pe,updateTime:function(e){Oe(e.target.value),Te(e.target)}})]}),Object(y.jsx)(P,{text:"Stream!",className:"font-bold text-2xl my-5",action:function(){return Fe()}})]})]}),Object(y.jsxs)("div",{children:[Object(y.jsx)("strong",{className:"text-white text-center text-2xl block",children:"My Streams"}),Object.keys(Se).length>0?Object.entries(Se).sort((function(e,t){var n=Object(j.a)(e,2)[1];return Object(j.a)(t,2)[1].start-n.start})).map((function(e){var t=Object(j.a)(e,2),n=t[0],r=t[1];return Object(y.jsx)(_,{onStatusUpdate:function(e){return Ce(Object(b.a)(Object(b.a)({},Se),{},Object(o.a)({},n,Object(b.a)(Object(b.a)({},Se[n]),{},{status:e}))))},onWithdraw:function(){return function(e){return Le.apply(this,arguments)}(n)},onCancel:function(){return function(e){return Me.apply(this,arguments)}(n)},id:n,data:r,myAddress:N.publicKey.toBase58(),removeStream:function(){return Ue(n)}},n)})):Object(y.jsxs)("div",{className:"mx-auto my-10 text-white text-center",children:[Object(y.jsx)("span",{children:"Your streams will appear here."}),Object(y.jsx)("br",{}),Object(y.jsx)("span",{children:"Start streaming!"})]})]})]}):Object(y.jsx)(G,{action:function(){return k(Be)}})]}),Object(y.jsx)(O.a,{hideProgressBar:!0,position:"bottom-left",limit:4}),Object(y.jsx)(H,{})]})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,167)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(Z,{})}),document.getElementById("root")),Y()},25:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"e",(function(){return b}));var r=n(11),a=n(8),c=n(163),s=n(52),i=n.n(s);function o(e){var t=Number(e.readBigUInt64LE(0)),n=Number(e.readBigUInt64LE(8)),s=Number(e.readBigUInt64LE(16))/a.c,i=Number(e.readBigUInt64LE(24))/a.c;return new u(new a.d(e.slice(32,64)).toBase58(),new a.d(e.slice(64,96)).toBase58(),s,t,n,i,function(e,t,n){return n<e?r.j:n<t?r.k:r.i}(Number(t),Number(n),Object(c.a)(new Date)))}function l(e,t,n){return n=n||Object(a.h)("mainnet-beta"),"https://explorer.solana.com/".concat(e,"/").concat(t,"?cluster=custom&customUrl=").concat(n)}function u(e,t,n,a,c,s,i,o){this.sender=e,this.receiver=t,this.amount=n,this.start=a,this.end=c,this.withdrawn=s||0,this.status=o?r.g:i||r.j,this.canceled_at=o}function d(){return i()({text:"Are you sure?",icon:"warning",buttons:!0})}function b(e){var t=window.location.origin+"#"+e;i()({button:"Copy Stream URL",icon:"success",title:"Stream created!",content:{element:"a",attributes:{className:"text-primary block truncate max-w-full",href:t,target:"_blank",innerHTML:t}}}).then((function(e){e&&(!function(e){var t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}(t),i()("Link copied to clipboard!","Send it to the recipient!","success"))}))}},34:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));var r="B5bTusk3e66yj394hpHtVTgK2JrzgPcuheqdchgtdZ95",a="Ht5G1RhkcKnpLVLMhqJc5aqZ4wYUEbxbtZwGCVbgU7DL"},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n(2),a=n.n(r),c=n(5),s=n(19),i=(n(8),n(32)),o=n(3);function l(e){return Object(o.jsxs)("span",{children:[e.nonUrlText,Object(o.jsx)("br",{}),Object(o.jsxs)("a",{className:"font-bold",href:e.url,rel:"noopener noreferrer",target:"_blank",children:[e.urlText,Object(o.jsx)(i.a,{className:"ml-1 w-4 h-4 inline"})]})]})}n(35);var u=n(11);function d(e,t,n,r,a,c){return b.apply(this,arguments)}function b(){return(b=Object(c.a)(a.a.mark((function e(t,n,r,c,i,d){var b,j,m;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.getRecentBlockhash();case 3:return n.recentBlockhash=e.sent.blockhash,s.b.info("Sending request to wallet..."),n.feePayer=c.publicKey,t===u.d&&n.partialSign(d),e.next=9,c.signTransaction(n);case 9:return b=e.sent,e.next=12,r.sendRawTransaction(b.serialize());case 12:return j=e.sent,s.b.info("Submitted transaction. Awaiting confirmation..."),e.next=16,r.confirmTransaction(j,"confirmed");case 16:return m="https://explorer.solana.com/tx/".concat(j,"?cluster=custom&customUrl=").concat(i),s.b.success(Object(o.jsx)(l,{url:m,urlText:"View on explorer",nonUrlText:"Transaction confirmed!"}),{autoClose:3e4,closeOnClick:!1}),e.abrupt("return",!0);case 21:return e.prev=21,e.t0=e.catch(0),console.warn(e.t0),s.b.error("Error: "+e.t0.message),e.abrupt("return",!1);case 26:case"end":return e.stop()}}),e,null,[[0,21]])})))).apply(this,arguments)}},89:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return b}));var r=n(2),a=n.n(r),c=n(5),s=n(8),i=n(34),o=n(4),l=n.n(o),u=n(11),d=(n(25),n(37));n(35);function b(e,t,n,r,a){return j.apply(this,arguments)}function j(){return(j=Object(c.a)(a.a.mark((function e(t,n,r,c,i){var o,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=m(t,i.publicKey),l=(new s.f).add(o),e.next=4,Object(d.a)(u.d,l,n,r,c,i);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t){var n=e.sender,r=e.receiver;return new s.g({keys:[{pubkey:new s.d(n),isSigner:!0,isWritable:!0},{pubkey:new s.d(r),isSigner:!1,isWritable:!0},{pubkey:t,isSigner:!0,isWritable:!0},{pubkey:s.e.programId,isSigner:!1,isWritable:!1}],programId:new s.d(i.a),data:f(e)})}function f(t){var n=t.amount,r=t.start,a=t.end,c=l.a.struct([l.a.u8("instruction"),l.a.u32("start"),l.a.u32("end"),l.a.nu64("amount")]),i=e.alloc(c.span);return c.encode({instruction:u.d,start:r,end:a,amount:Math.trunc(n*s.c)},i),i}}).call(this,n(6).Buffer)},90:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return b}));var r=n(2),a=n.n(r),c=n(5),s=n(4),i=n.n(s),o=n(11),l=n(8),u=(n(25),n(34)),d=n(37);n(35);function b(e,t,n,r,a){return j.apply(this,arguments)}function j(){return(j=Object(c.a)(a.a.mark((function e(t,n,r,c,s){var i,u,b;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.receiver,u=m(t,i),b=(new l.f).add(u),e.next=5,Object(d.a)(o.e,b,r,c,s);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t){return new l.g({keys:[{pubkey:new l.d(t),isSigner:!0,isWritable:!0},{pubkey:new l.d(e),isSigner:!1,isWritable:!0},{pubkey:new l.d(u.b),isSigner:!1,isWritable:!0},{pubkey:l.e.programId,isSigner:!1,isWritable:!1}],programId:new l.d(u.a),data:f()})}function f(){var t=i.a.struct([i.a.u8("instruction"),i.a.nu64("amount")]),n=e.alloc(t.span);return t.encode({instruction:o.e,amount:0},n),console.log("buffer",e.toString(n)),n}}).call(this,n(6).Buffer)},91:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return b}));var r=n(2),a=n.n(r),c=n(5),s=n(4),i=n.n(s),o=n(11),l=n(8),u=(n(25),n(34)),d=n(37);n(35);function b(e,t,n,r,a){return j.apply(this,arguments)}function j(){return(j=Object(c.a)(a.a.mark((function e(t,n,r,c,s){var i,u,b;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.sender,u=m(t,i),b=(new l.f).add(u),e.next=5,Object(d.a)(o.c,b,r,c,s);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t){return new l.g({keys:[{pubkey:new l.d(t),isSigner:!0,isWritable:!0},{pubkey:new l.d(e),isSigner:!1,isWritable:!0},{pubkey:l.e.programId,isSigner:!1,isWritable:!1}],programId:new l.d(u.a),data:f()})}function f(){var t=i.a.struct([i.a.u8("instruction")]),n=e.alloc(t.span);return t.encode({instruction:o.c},n),n}}).call(this,n(6).Buffer)},98:function(e,t,n){},99:function(e,t){}},[[162,1,2]]]);
//# sourceMappingURL=main.be9c733d.chunk.js.map