(function(){"use strict";var e={4649:function(e,t,n){var o=n(9242),l=n(3396),s=n(7139),a=n(4870),i=n(9999),c=n.n(i);const r=new Map;function u(e=null){let t=!1;while(!t){const n=("0000"+(Math.random()*Math.pow(36,4)|0).toString(36)).slice(-4);if(e||(e=r),!e.get(n))return t=!0,e.set(n,!0),n}}class v{constructor(){this.connection={host:"c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud",port:8884,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:10,clientId:"client-id-"+u()+"-"+u(),username:"testuser",password:"password"},this.subscription={topic:"TELEMETRY",qos:0},this.receivedMessages="",this.qosList=[{label:0,value:0},{label:1,value:1},{label:2,value:2}],this.client={connected:!1},this.subscribeSuccess=!1,this.data=new Map}onConnectionLost(){console.log("onConnectionLost")}createConnection(e,t){const{host:n,port:o,endpoint:l,...s}=this.connection,a=`wss://${n}:${o}${l}`;try{this.client=c().connect(a,s),c().onConnectionLost=this.onConnectionLost}catch(i){console.log("mqtt.connect error",i)}this.client.on("connect",(()=>{"function"==typeof t&&t("orange"),console.log("Connection succeeded!")})),this.client.on("onConnectionLost",(()=>{console.log("Connection lost!!")})),this.client.on("error",(e=>{console.log("Connection failed",e)})),this.client.on("message",((n,o)=>{let l=(new TextDecoder).decode(o);"function"==typeof e&&e(l),"function"==typeof t&&t("green")}))}doSubscribe(){const{topic:e,qos:t}=this.subscription;this.client.subscribe(e,t,((e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))}))}doUnSubscribe(){const{topic:e}=this.subscription;this.client.unsubscribe(e,(e=>{e&&console.log("Unsubscribe error",e)}))}doPublish(){const{topic:e,qos:t,payload:n}=this.publish;this.client.publish(e,n,t,(e=>{e&&console.log("Publish error",e)}))}destroyConnection(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(e){console.log("Disconnect failed",e.toString())}}}const p=new v;var d=p;n(6699);function f(e,t){var n=0,o=e.length;while(n<o&&e[n]===t)++n;while(o>n&&e[o-1]===t)--o;return n>0||o<e.length?e.substring(n,o):e}class h{constructor(){}static extract(e,t="events"){console.log("\n\nReceived message"),console.log(e);const n=f(e,'"').split(",");if("events"==t&&n[0]&&n[0]==t){const e=n.some((e=>e.includes("eventName=TEMP_C")));if(e){const e={};return n.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(2),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e}}return null}static coordinates(e){const t=new Map;if(!e)return t;const n=e.replace(/\r\n/g,"\n").split("\n");return n.forEach((e=>{const n=e.split(",");if("ID"!=n[0]){const e=n[0].replace("tagId=",""),o=n[1],l=n[2];t.set(e,{x:o,y:l})}})),t}}class m{constructor(){this.id=u(),this.x=0,this.y=0,this.created=Date.now(),this.size=128,this.colored=!1,this.debug=!1,this.event={tag:"",name:"",value:"",timestamp:""}}inject(e){e&&(this.x=e.x?e.x:0,this.y=e.y?e.y:0)}}class b extends m{constructor(){super(),this.type="wavelet",this.color="rgb(255,255,255)",this.options={fadein:!1,fadeout:!1}}}const w="TEMP_C",g="DBUG",y="ACTV",_="LOCH",x="GEOLOC",k={eventsTypes:[{name:w,enabled:!0},{name:g,enabled:!0},{name:y,enabled:!0},{name:_,enabled:!0},{name:x,enabled:!0}]};function C(e){const t=20,n=30;let o=370,l=250,s=o-l,a=n-t,i=n-e,c=s/a;return 360-(i*c-(o-360))}function z(e){const t=C(e);let n=100,o=50;t>280&&t<325&&(o=50,n=30),n/=100,o/=100;const l=e=>(e+t/30)%12,s=n*Math.min(o,1-o),a=e=>o-s*Math.max(-1,Math.min(l(e)-3,Math.min(9-l(e),1)));return[255*a(0),255*a(8),255*a(4)]}function j(e){const t=new Date(e),n=t.getHours(),o=t.getMinutes(),l=t.getSeconds();return(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)+":"+(l<10?"0"+l:l)+"."+t.getMilliseconds()}var M={__name:"WaveletComponent",props:{wavelet:b},setup(e){return(t,n)=>e.wavelet.event.name==(0,a.SU)(w)?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[(0,l._)("div",{class:(0,s.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,s.j5)("left:"+(e.wavelet.x-1*e.wavelet.size/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.size/2)+"px;width: "+1*e.wavelet.size+"px;height: "+1*e.wavelet.size+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.size/5+"px)")},null,6),(0,l._)("div",{class:(0,s.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")),style:(0,s.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,l._)("span",{class:(0,s.C_)("wavelet__value"+(e.wavelet.options.fadeout?" d-none":"")),style:(0,s.j5)(`color: ${e.wavelet.color}; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,s.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",7),e.wavelet.colored?((0,l.wg)(),(0,l.iD)("div",{key:0,class:"wavelet-coloring",style:(0,s.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,l.kq)("",!0)],6)],64)):((0,l.wg)(),(0,l.iD)("div",{key:1,class:(0,s.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")),style:(0,s.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.debug?((0,l.wg)(),(0,l.iD)("span",{key:0,class:"wavelet__value",style:(0,s.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,s.zw)(e.wavelet.event.name?e.wavelet.event.name:"-"),5)):(0,l.kq)("",!0)],6))}},S=n(89);const D=(0,S.Z)(M,[["__scopeId","data-v-faaa5620"]]);var U=D,H={__name:"GridWaveletComponent",props:{size:Number,map:Object},setup(e){return(t,n)=>((0,l.wg)(),(0,l.iD)("div",{class:"wavelet wavelet_eternal",style:(0,s.j5)("left:"+(e.map.x-e.size/2)+"px; top:"+(e.map.y-e.size/2)+"px;width: "+e.size+"px;height: "+e.size+"px;")},null,4))}};const T=(0,S.Z)(H,[["__scopeId","data-v-1a34151f"]]);var V=T;class O{constructor(){}static parse(e,t){const n=f(e,'"').split(",");if(n[0]&&"events"==n[0]){let e=!1;if(t.forEach((t=>{const o=n.some((e=>e.includes("eventName="+t.name)));t.enabled&&o&&(e=!0)})),e){const e={};return n.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(2),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e}}return null}static coordinates(e){const t=new Map;if(!e)return t;const n=e.replace(/\r\n/g,"\n").split("\n");return n.forEach((e=>{const n=e.split(",");if("ID"!=n[0]){const e=n[0].replace("tagId=",""),o=n[1],l=n[2];t.set(e,{x:o,y:l})}})),t}}const I=e=>((0,l.dD)("data-v-26541d6a"),e=e(),(0,l.Cn)(),e),E={class:"me-3"},q=I((()=>(0,l._)("span",{class:"fw-lighter opacity-75"},"X:",-1))),L=I((()=>(0,l._)("span",{class:"fw-lighter opacity-75"},"Y:",-1))),N={class:"mb-3"},$={for:"map-file-upload",class:"form-label small"},P=I((()=>(0,l._)("span",{class:"text-white-50"},"Upload map CSV",-1))),Y=(0,l.Uk)(" ("),F=(0,l.Uk)(")"),R=I((()=>(0,l._)("hr",null,null,-1))),G={class:"form-check form-switch mb-3"},A=I((()=>(0,l._)("label",{class:"form-check-label",for:"grid-checkbox",style:{color:"white"}}," Grid mode ",-1))),K={class:"form-check form-switch mb-3"},W=I((()=>(0,l._)("label",{class:"form-check-label",for:"crosshair-checkbox",style:{color:"white"}}," Crosshair cursor ",-1))),X=I((()=>(0,l._)("hr",null,null,-1))),Z={class:"form-check form-switch mb-3"},B=I((()=>(0,l._)("label",{class:"form-check-label",for:"sim-checkbox",style:{color:"white"}}," Enable simulation ",-1))),J=I((()=>(0,l._)("hr",null,null,-1))),Q={class:"form-check form-switch mb-3"},ee=I((()=>(0,l._)("label",{class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}}," Colorize wavelets ",-1))),te=I((()=>(0,l._)("hr",null,null,-1))),ne=I((()=>(0,l._)("span",{class:"text-white-50 me-3"},"Wavelet size",-1))),oe=I((()=>(0,l._)("hr",null,null,-1))),le=I((()=>(0,l._)("span",{class:"text-white-50 me-1"},"Handle events",-1))),se=["onUpdate:modelValue"],ae={class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}},ie={class:"form-check form-switch mb-1"},ce=I((()=>(0,l._)("label",{class:"form-check-label",for:"debug-wavelets-checkbox",style:{color:"rosybrown"}}," Debug mode ",-1))),re=I((()=>(0,l._)("hr",null,null,-1))),ue=I((()=>(0,l._)("span",{class:"text-white-50 me-3"},"UI position",-1))),ve=I((()=>(0,l._)("hr",null,null,-1)));var pe={__name:"DisplayComponent",setup(e){const t=(0,a.iH)(new Map),n=(0,a.iH)(new Map),i=(0,a.iH)(!1);function c(){d.createConnection(v,y),d.doSubscribe()}function r(){d.doUnSubscribe(),d.destroyConnection()}const u=(0,a.qj)(k.eventsTypes);function v(e){if(!0===i.value)return!1;if("string"==typeof e){const o=O.parse(e,u);if(o){const e=new b;e.event=o;const l=z(e.event.value);e.color=`rgb(${l[0]},${l[1]},${l[2]})`,e.size=D.value,e.colored=S.value,e.debug=M.value,console.log(e.event);const s=e.event.timestamp,a=n.value.get(e.event.tag);a?(console.log("Tag "+e.event.tag+" ("+s+" / "+j(s)+") is in map. Render."),e.inject(a),t.value.set(e.event.tag,e)):console.log("Tag "+e.event.tag+" ("+s+" / "+j(s)+") is not in map!")}else console.log("Skip message "+e)}}function p(e){let t=e.target;const o=new FileReader;o.onload=function(){n.value=h.coordinates(o.result),console.log("Uploaded CSV:"),console.log(o.result.substring(0,200))},o.readAsText(t.files[0])}const f=(0,a.iH)(!1);function m(){!0===f.value?(r(),g.value="green",x()):(g.value="red",c())}(0,l.bv)((()=>{!0===f.value?(g.value="green",x()):(g.value="red",c()),C(),n.value=h.coordinates()}));const w=(0,a.iH)(!0),g=(0,a.iH)("red");function y(e){w.value=!w.value,g.value=e}function _(){const e=4e3,t=5026,n=15,o=27,l="(01)00850027865010(21)00oeT"+Math.floor(Math.random()*(t-e)+e).toString(),s=(Math.random()*(o-n)+n).toFixed(4),a=u[Math.floor(Math.random()*u.length)];let i="events,tagId="+l+",eventName="+a.name+",eventValue="+s+",timestamp="+Date.now();return i}function x(){if(!1===f.value)return!1;w.value=!w.value;const e=_();v(e),setTimeout(x,Math.floor(10*Math.random())+1)}function C(){const e=10,n=Date.now();t.value.forEach((o=>{const l=n-o.created,s=Math.floor(l/1e3);o.options.fadein||(console.log("Time to fadein for #"+o.id),o.options.fadein=!0),s>=e-1&&!o.options.fadeout&&(console.log("Time to fadeout for #"+o.id),o.options.fadeout=!0),s>=e&&(console.log("Lifetime exceeded "+e+"s for #"+o.id+" – removing"),t.value.delete(o.event.tag))})),setTimeout(C,100)}const M=(0,a.iH)(!1),S=(0,a.iH)(!1),D=(0,a.iH)(128),H=(0,a.iH)(0),T=(0,a.iH)(0),I=(0,a.qj)({position:{x:0,y:0}});function pe(e){i.value&&(H.value=e.clientX,T.value=e.clientY,I.position.x=e.clientX,I.position.y=e.clientY)}const de=(0,a.iH)(!1),fe=(0,a.iH)(0),he=(0,a.qj)({positions:[{style:"left: 0; top: 0;"},{style:"right: 0; top: 0;"}]});return(e,c)=>((0,l.wg)(),(0,l.iD)("div",{class:"display",onMousemove:pe,style:(0,s.j5)((i.value&&de.value?"cursor: crosshair;":"")+(i.value?"box-shadow: inset 0 0 0 2px wheat;":""))},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.value,(([e,t])=>((0,l.wg)(),(0,l.j4)((0,a.SU)(U),{key:e,wavelet:t},null,8,["wavelet"])))),128)),i.value?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(n.value,(([e,t])=>((0,l.wg)(),(0,l.j4)((0,a.SU)(V),{key:e,size:D.value,map:t},null,8,["size","map"])))),128)),(0,l._)("div",{class:"mouse-coordinates-tooltip",style:(0,s.j5)("top: "+I.position.y+"px; left: "+I.position.x+"px;")},[(0,l._)("span",E,[q,(0,l.Uk)(" "+(0,s.zw)(H.value),1)]),(0,l._)("span",null,[L,(0,l.Uk)(" "+(0,s.zw)(T.value),1)])],4)],64)):(0,l.kq)("",!0),(0,l._)("div",{class:"ui-wrapper mb-3",style:(0,s.j5)(he.positions[fe.value].style)},[(0,l._)("div",{class:"ui-container-toggle",style:(0,s.j5)(0==n.value.size?"display: block !important; ":"")},[(0,l._)("div",{class:(0,s.C_)(["connection-status mb-3",g.value]),style:(0,s.j5)("background-color:"+g.value+"; opacity: "+(w.value?1:.4)+";")},null,6),(0,l._)("div",N,[(0,l._)("label",$,[P,Y,(0,l._)("span",{style:(0,s.j5)(0==n.value.size?"color: red":"color: green")},(0,s.zw)(n.value.size)+" ids loaded",5),F]),(0,l._)("input",{class:"form-control form-control-sm",id:"map-file-upload",type:"file",onChange:p},null,32)]),R,(0,l._)("div",G,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":c[0]||(c[0]=e=>i.value=e),id:"grid-checkbox"},null,512),[[o.e8,i.value]]),A]),(0,l._)("div",K,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":c[1]||(c[1]=e=>de.value=e),id:"crosshair-checkbox"},null,512),[[o.e8,de.value]]),W]),X,(0,l._)("div",Z,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":c[2]||(c[2]=e=>f.value=e),id:"sim-checkbox",onChange:m},null,544),[[o.e8,f.value]]),B]),J,(0,l._)("div",Q,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":c[3]||(c[3]=e=>S.value=e),id:"color-wavelets-checkbox"},null,512),[[o.e8,S.value]]),ee]),te,(0,l._)("div",null,[ne,(0,l.wy)((0,l._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":c[4]||(c[4]=e=>D.value=e)},null,512),[[o.nr,D.value]]),(0,l._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:c[5]||(c[5]=e=>D.value=32)},"32"),(0,l._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:c[6]||(c[6]=e=>D.value=64)},"64"),(0,l._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:c[7]||(c[7]=e=>D.value=128)},"128 "),(0,l._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:c[8]||(c[8]=e=>D.value=196)},"196 "),(0,l._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:c[9]||(c[9]=e=>D.value=256)},"256 ")]),oe,(0,l._)("div",null,[le,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(u,(e=>((0,l.wg)(),(0,l.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:"color-wavelets-checkbox"},null,8,se),[[o.e8,e.enabled]]),(0,l._)("label",ae,(0,s.zw)(e.name),1)])))),128)),(0,l._)("div",ie,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":c[10]||(c[10]=e=>M.value=e),id:"debug-wavelets-checkbox"},null,512),[[o.e8,M.value]]),ce])]),re,(0,l._)("div",null,[ue,(0,l._)("button",{type:"button",class:"btn btn-outline-light btn-sm me-2",onClick:c[11]||(c[11]=e=>fe.value=0)},"↖ Left"),(0,l._)("button",{type:"button",class:"btn btn-outline-light btn-sm",onClick:c[12]||(c[12]=e=>fe.value=1)},"Right ↗")]),ve],4)],4)],36))}};const de=(0,S.Z)(pe,[["__scopeId","data-v-26541d6a"]]);var fe=de,he={__name:"App",setup(e){return(e,t)=>((0,l.wg)(),(0,l.j4)(fe))}};const me=he;var be=me;n(8937);(0,o.ri)(be).mount("#app")}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,o,l,s){if(!o){var a=1/0;for(u=0;u<e.length;u++){o=e[u][0],l=e[u][1],s=e[u][2];for(var i=!0,c=0;c<o.length;c++)(!1&s||a>=s)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(i=!1,s<a&&(a=s));if(i){e.splice(u--,1);var r=l();void 0!==r&&(t=r)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[o,l,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var l,s,a=o[0],i=o[1],c=o[2],r=0;if(a.some((function(t){return 0!==e[t]}))){for(l in i)n.o(i,l)&&(n.m[l]=i[l]);if(c)var u=c(n)}for(t&&t(o);r<a.length;r++)s=a[r],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(u)},o=self["webpackChunkwavelets"]=self["webpackChunkwavelets"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(4649)}));o=n.O(o)})();
//# sourceMappingURL=app.5b72183a.js.map