(function(){"use strict";var e={1889:function(e,t,l){var n=l(9242),o=l(3396),a=l(7139),s=l(4870),i=l(9999),c=l.n(i);const r=new Map;function u(e=null){let t=!1;while(!t){const l=("0000"+(Math.random()*Math.pow(36,4)|0).toString(36)).slice(-4);if(e||(e=r),!e.get(l))return t=!0,e.set(l,!0),l}}class v{constructor(){this.connection={host:"c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud",port:8884,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:10,clientId:"client-id-"+u()+"-"+u(),username:"testuser",password:"password"},this.subscription={topic:"TELEMETRY",qos:0},this.receivedMessages="",this.qosList=[{label:0,value:0},{label:1,value:1},{label:2,value:2}],this.client={connected:!1},this.subscribeSuccess=!1,this.data=new Map}onConnectionLost(){console.log("onConnectionLost")}createConnection(e,t){const{host:l,port:n,endpoint:o,...a}=this.connection,s=`wss://${l}:${n}${o}`;try{this.client=c().connect(s,a),c().onConnectionLost=this.onConnectionLost}catch(i){console.log("mqtt.connect error",i)}this.client.on("connect",(()=>{"function"==typeof t&&t("orange"),console.log("Connection succeeded!")})),this.client.on("onConnectionLost",(()=>{console.log("Connection lost!!")})),this.client.on("error",(e=>{console.log("Connection failed",e)})),this.client.on("message",((l,n)=>{let o=(new TextDecoder).decode(n);"function"==typeof e&&e(o),"function"==typeof t&&t("green")}))}doSubscribe(){const{topic:e,qos:t}=this.subscription;this.client.subscribe(e,t,((e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))}))}doUnSubscribe(){const{topic:e}=this.subscription;this.client.unsubscribe(e,(e=>{e&&console.log("Unsubscribe error",e)}))}doPublish(){const{topic:e,qos:t,payload:l}=this.publish;this.client.publish(e,l,t,(e=>{e&&console.log("Publish error",e)}))}destroyConnection(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(e){console.log("Disconnect failed",e.toString())}}}const d=new v;var p=d;class h{constructor(){this.id=u(),this.x=0,this.y=0,this.created=Date.now(),this.size=128,this.basicSize=128,this.colored=!1,this.debug=!1,this.event={tag:"",name:"",value:"",raw:"",timestamp:""},this.predecessor=null,this.rendering={}}inject(e){e&&(this.x=e.x?e.x:0,this.y=e.y?e.y:0)}}class m extends h{constructor(){super(),this.type="wavelet",this.color="rgb(255,255,255)",this.options={fadein:!1,fadeout:!1,ringsFadeout:!1}}}const w="TEMP_C",f="DBUG",b="ACTV",g="LOCH",y="GEOLOC",_="RSSI",x={eventsTypes:[{name:w,enabled:!0},{name:f,enabled:!0},{name:b,enabled:!0},{name:g,enabled:!0},{name:y,enabled:!0},{name:_,enabled:!0}]},k="SVG",z="GIF",S="WEBGL",C={types:[{name:k,description:"transp, mid perf",enabled:!0},{name:S,description:"transp, higher perf, β",enabled:!1},{name:z,description:"non-transp. high perf",enabled:!1}]};function U(e,t,l){let n=370,o=250,a=n-o,s=l-t,i=l-e,c=a/s;return 360-(i*c-(n-360))}function H(e,t,l){const n=U(e,t,l);let o=100,a=50;n>280&&n<325&&(a=50,o=30),o/=100,a/=100;const s=e=>(e+n/30)%12,i=o*Math.min(a,1-a),c=e=>a-i*Math.max(-1,Math.min(s(e)-3,Math.min(9-s(e),1)));return[255*c(0),255*c(8),255*c(4)]}function j(e){const t=new Date(e),l=t.getHours(),n=t.getMinutes(),o=t.getSeconds();return(l<10?"0"+l:l)+":"+(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)+"."+t.getMilliseconds()}var D={__name:"WaveletComponent",props:{wavelet:m},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-1*e.wavelet.basicSize/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.basicSize/2)+"px;width: "+1*e.wavelet.basicSize+"px;height: "+1*e.wavelet.basicSize+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.basicSize/5+"px)")},null,6)):e.wavelet.predecessor&&e.wavelet.predecessor.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("shine"+(e.wavelet.predecessor.options.fadein?" shine_fadein":"")+(e.wavelet.predecessor.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-1*e.wavelet.basicSize/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.basicSize/2)+"px;width: "+1*e.wavelet.basicSize+"px;height: "+1*e.wavelet.basicSize+"px;background-color:"+e.wavelet.predecessor.color+";-webkit-filter: blur("+e.wavelet.basicSize/5+"px)")},null,6)):(0,o.kq)("",!0),(0,o._)("div",{class:(0,a.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")+(e.wavelet.options.ringsFadeout?" wavelet_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,a.C_)("wavelet__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5)):(0,o.kq)("",!0),e.wavelet.debug&&e.wavelet.event.name!=(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("span",{key:1,class:"wavelet__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.basicSize/10<6?6:e.wavelet.basicSize/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-")+(0,a.zw)(e.wavelet.event.value?" "+e.wavelet.event.value:""),5)):(0,o.kq)("",!0),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:2,class:"wavelet-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)],64))}};const M=D;var V=M,E={__name:"GridWaveletComponent",props:{size:Number,map:Object},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)("div",{class:"wavelet-gr wavelet-gr_eternal",style:(0,a.j5)("left:"+(e.map.x-e.size/2)+"px; top:"+(e.map.y-e.size/2)+"px;width: "+e.size+"px;height: "+e.size+"px;")},null,4))}},q=l(89);const T=(0,q.Z)(E,[["__scopeId","data-v-e33a8370"]]);var $=T,I={__name:"GifWaveletComponent",props:{wavelet:m},setup(e){return(t,l)=>e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,o._)("span",{class:(0,a.C_)("wavelet-gif__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"wavelet-gif-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)):((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.debug?((0,o.wg)(),(0,o.iD)("span",{key:0,class:"wavelet-gif__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-"),5)):(0,o.kq)("",!0)],6))}};const O=(0,q.Z)(I,[["__scopeId","data-v-73db6dd4"]]);var F=O;l(6699);function Y(e,t){var l=0,n=e.length;while(l<n&&e[l]===t)++l;while(n>l&&e[n-1]===t)--n;return l>0||n<e.length?e.substring(l,n):e}class L{constructor(){}static parse(e,t){const l=Y(e,'"').split(",");if(l[0]&&"events"==l[0]){let e=!1;if(t.forEach((t=>{const n=l.some((e=>e.includes("eventName="+t.name)));t.enabled&&n&&(e=!0)})),e){const e={};return l.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(1),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e}}return null}}function R(e){const t=new Map;if(!e)return t;const l=e.replace(/\r\n/g,"\n").split("\n");return l.forEach((e=>{const l=e.split(",");if("ID"!=l[0]){const e=l[0].replace("tagId=",""),n=parseInt(l[1]),o=parseInt(l[2]),a={x:n,y:o},s=parseFloat(l[3]);s&&(a.size=s),t.set(e,a)}})),t}var P=l(5670);function G(e,t,l,n){return n*(l/10)*(e/t)}function W(e){let t=0;e.forEach((e=>{t+=Number.parseFloat(e)}));const l=(t/e.size).toFixed(1);return console.log(l),l}const A={resizeEvents:[{event:_,enabled:!0},{event:w,enabled:!1},{event:f,enabled:!1},{event:b,enabled:!1},{event:g,enabled:!1},{event:y,enabled:!1}]};function N(e){return A.resizeEvents.find((t=>t.event===e&&!0===t.enabled))}const K=e=>((0,o.dD)("data-v-34955f2f"),e=e(),(0,o.Cn)(),e),B=K((()=>(0,o._)("div",{id:"canvas-container"},null,-1))),X={class:"me-3"},Z=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"X:",-1))),J=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"Y:",-1))),Q={class:"mb-3"},ee={for:"map-file-upload",class:"form-label small"},te=K((()=>(0,o._)("span",{class:"text-white-50"},"Upload map CSV",-1))),le=(0,o.Uk)(" ("),ne=(0,o.Uk)(")"),oe=K((()=>(0,o._)("hr",null,null,-1))),ae={class:"form-check form-switch mb-3"},se=K((()=>(0,o._)("label",{class:"form-check-label",for:"sim-checkbox",style:{color:"white"}}," Enable simulation ",-1))),ie=K((()=>(0,o._)("hr",null,null,-1))),ce={class:"form-check form-switch mb-3"},re=K((()=>(0,o._)("label",{class:"form-check-label",for:"grid-checkbox",style:{color:"white"}}," Grid mode ",-1))),ue={class:"form-check form-switch mb-3"},ve=K((()=>(0,o._)("label",{class:"form-check-label",for:"crosshair-checkbox",style:{color:"white"}}," Crosshair cursor ",-1))),de=K((()=>(0,o._)("hr",null,null,-1))),pe={class:"form-check form-switch mb-3 d-none"},he=K((()=>(0,o._)("label",{class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}}," Colorize wavelets ",-1))),me=K((()=>(0,o._)("hr",{class:"d-none"},null,-1))),we={class:"form-check form-switch mb-3"},fe=K((()=>(0,o._)("label",{class:"form-check-label",for:"sound-on-checkbox",style:{color:"white"}}," Sound ",-1))),be=K((()=>(0,o._)("hr",null,null,-1))),ge=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Disk size",-1))),ye=K((()=>(0,o._)("hr",null,null,-1))),_e=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"RSSI scale factor",-1))),xe=(0,o.Uk)(),ke={class:"text-muted small ms-3"},ze=K((()=>(0,o._)("div",{class:"text-muted mt-1 font-monospace",style:{"font-size":"9px"}},"ui size * (scale/10) * (average rssi/rssi)",-1))),Se=K((()=>(0,o._)("hr",null,null,-1))),Ce=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Color disk timeout, s",-1))),Ue=K((()=>(0,o._)("hr",null,null,-1))),He={class:"row"},je={class:"col"},De=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Min t",-1))),Me={class:"col"},Ve=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Max t",-1))),Ee=K((()=>(0,o._)("hr",null,null,-1))),qe=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Rendering type",-1))),Te=["onUpdate:modelValue","value","id"],$e=["for"],Ie={class:"small text-white-50"},Oe=K((()=>(0,o._)("hr",null,null,-1))),Fe=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Handle events",-1))),Ye=["onUpdate:modelValue","id"],Le=["for"],Re={class:"form-check form-switch mb-1"},Pe=K((()=>(0,o._)("label",{class:"form-check-label",for:"debug-wavelets-checkbox",style:{color:"rosybrown"}}," Debug mode ",-1))),Ge=K((()=>(0,o._)("hr",null,null,-1))),We=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"RSSI-based size",-1))),Ae=["onUpdate:modelValue","id"],Ne=["for"],Ke=K((()=>(0,o._)("hr",null,null,-1))),Be=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Console log",-1))),Xe=["onUpdate:modelValue","id"],Ze=["for"],Je=K((()=>(0,o._)("hr",null,null,-1))),Qe=K((()=>(0,o._)("span",{class:"text-white-50 me-3"},"UI position",-1))),et=K((()=>(0,o._)("hr",null,null,-1)));var tt={__name:"DisplayComponent",setup(e){const t=(0,s.iH)(new Map),l=(0,s.iH)(new Map),i=(0,s.iH)(new Map),c=(0,s.iH)(1),r=(0,s.iH)(15),u=(0,s.iH)(!1),v=(0,s.iH)(!1),d=(0,s.iH)(!1),h=(0,s.iH)(!1),f=(0,s.iH)(!1),b=[{state:v,name:"Events"},{state:d,name:"Rendering"},{state:h,name:"Lifetime"},{state:f,name:"Fading"}];function g(){p.createConnection(O,ot),p.doSubscribe()}function y(){p.doUnSubscribe(),p.destroyConnection()}const U=(0,s.qj)(x.eventsTypes);(0,o.YP)(U,(e=>{e.forEach((e=>{e.name!=_||e.enabled||(i.value.clear(),T.value=65)}))}));const D=(0,s.qj)(C.types),M=(0,s.qj)(A.resizeEvents),E=(0,s.iH)(20),q=(0,s.iH)(30),T=(0,s.iH)(65);let I=0;function O(e){if(!0===u.value)return!1;if(v.value&&console.log(e),"string"==typeof e){const n=L.parse(e,U);if(n){if(n.name==_){i.value.set(n.tag,n.raw);const e=Math.floor((new Date-I)/1e3);(0===I||e>5)&&(T.value=W(i.value),I=new Date)}v.value&&console.log(n);const e=l.value.get(n.tag);if(e){const l=new m;if(l.event=n,n.name!=w&&t.value.has(n.tag)){const e=t.value.get(n.tag);e.event.name==w?l.predecessor=e:e.predecessor&&e.predecessor.event.name==w&&(l.predecessor=e.predecessor),l.predecessor&&l.predecessor.event.timestamp>l.event.timestamp&&(l.event.timestamp=l.predecessor.event.timestamp)}const o=H(l.event.value,E.value,q.value);l.color=`rgb(${o[0]},${o[1]},${o[2]})`;let a=vt.value;if(i.value.has(n.tag)&&N(n.name)?a=G(T.value,i.value.get(n.tag),c.value,vt.value):e.size&&(a=e.size),l.size=a,l.basicSize=vt.value,l.colored=rt.value,l.debug=ct.value,l.inject(e),t.value.set(l.event.tag,l),d.value&&console.log("Tag "+l.event.tag+" ("+n.timestamp+" / "+j(n.timestamp)+") is in map. Render."),ut.value){const e=new Audio("static/sound/bell-high.mp3");e.play()}kt.value==S&&xt(l)}else d.value&&console.log("Tag "+n.tag+" ("+n.timestamp+" / "+j(n.timestamp)+") is not in map!")}else v.value&&console.log('Skip message "'+e+"\" (can't parse)")}}function Y(e){let t=e.target;const n=new FileReader;n.onload=function(){l.value=R(n.result),console.log("Uploaded CSV:"),console.log(n.result.substring(0,200))},n.readAsText(t.files[0])}const K=(0,s.iH)(!1);function tt(){!0===K.value?(y(),nt.value="green",st()):(nt.value="red",g())}const lt=(0,s.iH)(!0),nt=(0,s.iH)("red");function ot(e){lt.value=!lt.value,nt.value=e}function at(){const e=4e3,t=5026,l=15,n=27,o="(01)00850027865010(21)00oeT"+Math.floor(Math.random()*(t-e)+e).toString(),a=(Math.random()*(n-l)+l).toFixed(4),s=U[Math.floor(Math.random()*U.length)];let i="events,tagId="+o+",eventName="+s.name+",eventValue="+a+",timestamp="+Date.now();return i}function st(){if(!1===K.value)return!1;lt.value=!lt.value;const e=at();O(e),setTimeout(st,Math.floor(10*Math.random())+1)}function it(){const e=Date.now();t.value.forEach((l=>{let n=10;const o=n;if(l.event.name==w||l.predecessor&&l.predecessor.event.name==w){const e=r.value;n=n<e?n+e-n:n}const a=e-l.created,s=Math.floor(a/1e3);l.options.fadein||(f.value&&console.log("Time to fadein for #"+l.id),l.options.fadein=!0),(l.event.name==w||l.predecessor&&l.predecessor.event.name==w)&&s>=o-1&&!l.options.ringsFadeout&&(f.value&&console.log("Time to fadeout rings for #"+l.id),l.options.ringsFadeout=!0),s>=n-1&&!l.options.fadeout&&(f.value&&console.log("Time to fadeout for #"+l.id),l.options.fadeout=!0),s>=n&&(h.value&&console.log("Lifetime exceeded "+n+"s for #"+l.id+" – removing"),t.value.delete(l.event.tag),yt.children.forEach((e=>{l.event.tag==e.wavelet.event.tag&&yt.removeChild(e)})))})),setTimeout(it,100)}const ct=(0,s.iH)(!1),rt=(0,s.iH)(!1),ut=(0,s.iH)(!1),vt=(0,s.iH)(128),dt=(0,s.iH)(0),pt=(0,s.iH)(0),ht=(0,s.qj)({position:{x:0,y:0}});function mt(e){u.value&&(dt.value=e.clientX,pt.value=e.clientY,ht.position.x=e.clientX,ht.position.y=e.clientY)}const wt=(0,s.iH)(!1),ft=(0,s.iH)(0),bt=(0,s.qj)({positions:[{style:"left: 0; top: 0;"},{style:"right: 0; top: 0;"}]}),gt=new P.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundAlpha:!0}),yt=new P.W20;function _t(){gt.ticker.add((()=>{kt.value==S&&yt.children.forEach((e=>{e.wavelet.options.fadein&&e.alpha<1&&(e.alpha+=.03),e.wavelet.options.fadeout&&e.alpha>0&&(e.alpha-=.03),e.children.forEach((e=>{e.scale.x<.3&&e.alpha<1&&(e.alpha+=.02),e.scale.x>.8&&(e.alpha-=.01),e.scale.x<1&&e.scale.set(e.scale.x+.025,e.scale.y+.025)}))}))}))}function xt(e){const t=new P.W20;t.width=vt.value,t.height=vt.value,t.x=e.x,t.y=e.y,t.pivot.x=t.width/2,t.pivot.y=t.height/2,t.wavelet=e,t.alpha=0;let l=new P.TCu;l.lineStyle(3,16777215,1),l.drawCircle(0,0,.1*vt.value),l.pivot.x=t.width/2,l.pivot.y=t.height/2,l.position.set(t.width/2,t.height/2),l.scale.set(.1,.1),t.addChild(l),yt.addChild(t)}yt.x=0,yt.y=0,yt.width=window.innerWidth,yt.height=window.innerHeight,yt.pivot.x=0,yt.pivot.y=0,gt.stage.addChild(yt);const kt=(0,s.iH)(k);function zt(e){const t=e.target.value;D.forEach((e=>{e.name!=t&&(e.enabled=!1)})),kt.value=t}return(0,o.bv)((()=>{!0===K.value?(nt.value="green",st()):(nt.value="red",g()),it(),l.value=new Map;const e=document.getElementById("canvas-container");e.appendChild(gt.view),_t()})),(e,i)=>((0,o.wg)(),(0,o.iD)("div",{class:"display",onMousemove:mt,style:(0,a.j5)((u.value&&wt.value?"cursor: crosshair;":"")+(u.value?"box-shadow: inset 0 0 0 2px wheat;":""))},[B,kt.value!=(0,s.SU)(S)?((0,o.wg)(!0),(0,o.iD)(o.HY,{key:0},(0,o.Ko)(t.value,(([e,t])=>((0,o.wg)(),(0,o.iD)(o.HY,{key:e},[kt.value==(0,s.SU)(k)?((0,o.wg)(),(0,o.j4)((0,s.SU)(V),{key:0,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0),kt.value==(0,s.SU)(z)?((0,o.wg)(),(0,o.j4)((0,s.SU)(F),{key:1,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0)],64)))),128)):(0,o.kq)("",!0),u.value?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.value,(([e,t])=>((0,o.wg)(),(0,o.j4)((0,s.SU)($),{key:e,size:vt.value,map:t},null,8,["size","map"])))),128)),(0,o._)("div",{class:"mouse-coordinates-tooltip",style:(0,a.j5)("top: "+ht.position.y+"px; left: "+ht.position.x+"px;")},[(0,o._)("span",X,[Z,(0,o.Uk)(" "+(0,a.zw)(dt.value),1)]),(0,o._)("span",null,[J,(0,o.Uk)(" "+(0,a.zw)(pt.value),1)])],4)],64)):(0,o.kq)("",!0),(0,o._)("div",{class:"ui-wrapper mb-3",style:(0,a.j5)(bt.positions[ft.value].style)},[(0,o._)("div",{class:"ui-container-toggle",style:(0,a.j5)(0==l.value.size?"display: block !important; ":"")},[(0,o._)("div",{class:(0,a.C_)(["connection-status mb-3",nt.value]),style:(0,a.j5)("background-color:"+nt.value+"; opacity: "+(lt.value?1:.4)+";")},null,6),(0,o._)("div",Q,[(0,o._)("label",ee,[te,le,(0,o._)("span",{style:(0,a.j5)(0==l.value.size?"color: red":"color: green")},(0,a.zw)(l.value.size)+" ids loaded",5),ne]),(0,o._)("input",{class:"form-control form-control-sm",id:"map-file-upload",type:"file",onChange:Y},null,32)]),oe,(0,o._)("div",ae,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=e=>K.value=e),id:"sim-checkbox",onChange:tt},null,544),[[n.e8,K.value]]),se]),ie,(0,o._)("div",ce,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[1]||(i[1]=e=>u.value=e),id:"grid-checkbox"},null,512),[[n.e8,u.value]]),re]),(0,o._)("div",ue,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[2]||(i[2]=e=>wt.value=e),id:"crosshair-checkbox"},null,512),[[n.e8,wt.value]]),ve]),de,(0,o._)("div",pe,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[3]||(i[3]=e=>rt.value=e),id:"color-wavelets-checkbox"},null,512),[[n.e8,rt.value]]),he]),me,(0,o._)("div",we,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[4]||(i[4]=e=>ut.value=e),id:"sound-on-checkbox"},null,512),[[n.e8,ut.value]]),fe]),be,(0,o._)("div",null,[ge,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":i[5]||(i[5]=e=>vt.value=e)},null,512),[[n.nr,vt.value]]),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:i[6]||(i[6]=e=>vt.value=32)},"32"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:i[7]||(i[7]=e=>vt.value=64)},"64"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:i[8]||(i[8]=e=>vt.value=128)},"128 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:i[9]||(i[9]=e=>vt.value=196)},"196 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:i[10]||(i[10]=e=>vt.value=256)},"256 ")]),ye,(0,o._)("div",null,[_e,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2 d-inline-block",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":i[11]||(i[11]=e=>c.value=e)},null,512),[[n.nr,c.value]]),xe,(0,o._)("span",ke," Average RSSI "+(0,a.zw)(T.value),1),ze]),Se,(0,o._)("div",null,[Ce,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Amount in seconds",style:{"max-width":"80px"},"onUpdate:modelValue":i[12]||(i[12]=e=>r.value=e)},null,512),[[n.nr,r.value]])]),Ue,(0,o._)("div",He,[(0,o._)("div",je,[De,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Min t","onUpdate:modelValue":i[13]||(i[13]=e=>E.value=e)},null,512),[[n.nr,E.value]])]),(0,o._)("div",Me,[Ve,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Max t","onUpdate:modelValue":i[14]||(i[14]=e=>q.value=e)},null,512),[[n.nr,q.value]])])]),Ee,(0,o._)("div",null,[qe,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(D,(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,onChange:zt,value:e.name,id:`rendering-type-checkbox-${e.name}`},null,40,Te),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rendering-type-checkbox-${e.name}`,style:{color:"white"}},[(0,o.Uk)((0,a.zw)(e.name)+" ",1),(0,o._)("sup",null,[(0,o._)("span",Ie,(0,a.zw)(e.description),1)])],8,$e)])))),128))]),Oe,(0,o._)("div",null,[Fe,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(U,(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`handle-wavelets-checkbox-${e.name}`},null,8,Ye),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`handle-wavelets-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,Le)])))),128)),(0,o._)("div",Re,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":i[15]||(i[15]=e=>ct.value=e),id:"debug-wavelets-checkbox"},null,512),[[n.e8,ct.value]]),Pe])]),Ge,(0,o._)("div",null,[We,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(M,(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.event},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`rssi-event-size-checkbox-${e.event}`},null,8,Ae),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rssi-event-size-checkbox-${e.event}`,style:{color:"white"}},(0,a.zw)(e.event),9,Ne)])))),128))]),Ke,(0,o._)("div",null,[Be,((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)(b,(e=>(0,o._)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.state.value=t,id:`console-log-checkbox-${e.name}`},null,8,Xe),[[n.e8,e.state.value]]),(0,o._)("label",{class:"form-check-label",for:`console-log-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,Ze)]))),64))]),Je,(0,o._)("div",null,[Qe,(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm me-2",onClick:i[16]||(i[16]=e=>ft.value=0)},"↖ Left"),(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm",onClick:i[17]||(i[17]=e=>ft.value=1)},"Right ↗")]),et],4)],4)],36))}};const lt=(0,q.Z)(tt,[["__scopeId","data-v-34955f2f"]]);var nt=lt,ot={__name:"App",setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(nt))}};const at=ot;var st=at;l(8937);(0,n.ri)(st).mount("#app")}},t={};function l(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,l),a.loaded=!0,a.exports}l.m=e,function(){var e=[];l.O=function(t,n,o,a){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],a=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||s>=a)&&Object.keys(l.O).every((function(e){return l.O[e](n[c])}))?n.splice(c--,1):(i=!1,a<s&&(s=a));if(i){e.splice(u--,1);var r=o();void 0!==r&&(t=r)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,a,s=n[0],i=n[1],c=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var u=c(l)}for(t&&t(n);r<s.length;r++)a=s[r],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return l.O(u)},n=self["webpackChunkwavelets"]=self["webpackChunkwavelets"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(1889)}));n=l.O(n)})();
//# sourceMappingURL=app.ffd68414.js.map