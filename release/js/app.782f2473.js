(function(){"use strict";var e={2232:function(e,t,l){var n=l(9242),o=l(3396),a=(l(6699),l(7139)),s=l(4870);function i(){const e=(0,s.iH)(!1),t=(0,s.iH)(),l=(0,s.iH)(!1),n=(0,s.iH)(),o=function(e){let l=e.target;l.files.length&&(t.value=URL.createObjectURL(l.files[0]))},a=function(e){let t=e.target;t.files.length&&(n.value=URL.createObjectURL(t.files[0]))};return{backgroundImageEnabled:e,backgroundImage:t,uploadBackgroundImage:o,backgroundVideoEnabled:l,backgroundVideo:n,uploadBackgroundVideo:a}}var c=l(9999),r=l.n(c);const u=new Map;function d(e=null){let t=!1;while(!t){const l=("0000"+(Math.random()*Math.pow(36,4)|0).toString(36)).slice(-4);if(e||(e=u),!e.get(l))return t=!0,e.set(l,!0),l}}class v{constructor(){this.connection={host:"c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud",port:8884,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:10,clientId:"client-id-"+d()+"-"+d(),username:"testuser",password:"password"},this.subscription={topic:"TELEMETRY",qos:0},this.receivedMessages="",this.qosList=[{label:0,value:0},{label:1,value:1},{label:2,value:2}],this.client={connected:!1},this.subscribeSuccess=!1,this.data=new Map}onConnectionLost(){console.log("onConnectionLost")}createConnection(e,t){const{host:l,port:n,endpoint:o,...a}=this.connection,s=`wss://${l}:${n}${o}`;try{this.client=r().connect(s,a),r().onConnectionLost=this.onConnectionLost}catch(i){console.log("mqtt.connect error",i)}this.client.on("connect",(()=>{"function"==typeof t&&t("orange"),console.log("Connection succeeded!")})),this.client.on("onConnectionLost",(()=>{console.log("Connection lost!!")})),this.client.on("error",(e=>{console.log("Connection failed",e)})),this.client.on("message",((l,n)=>{let o=(new TextDecoder).decode(n);"function"==typeof e&&e(o),"function"==typeof t&&t("green")}))}doSubscribe(){const{topic:e,qos:t}=this.subscription;this.client.subscribe(e,t,((e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))}))}doUnSubscribe(){const{topic:e}=this.subscription;this.client.unsubscribe(e,(e=>{e&&console.log("Unsubscribe error",e)}))}doPublish(){const{topic:e,qos:t,payload:l}=this.publish;this.client.publish(e,l,t,(e=>{e&&console.log("Publish error",e)}))}destroyConnection(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(e){console.log("Disconnect failed",e.toString())}}}const p=new v;var m=p;class h{constructor(){this.id=null,this.x=0,this.y=0,this.created=Date.now(),this.size=128,this.basicSize=128,this.diskSize=128,this.colored=!1,this.debug=!1,this.event={tag:"",name:"",value:"",raw:"",timestamp:""},this.predecessor=null,this.rendering={}}inject(e){e&&(this.x=e.x?e.x:0,this.y=e.y?e.y:0)}}class b extends h{constructor(){super(),this.type="wavelet",this.color="rgb(255,255,255)",this.options={fadein:!1,fadeout:!1,ringsFadeout:!1}}}const f="TEMP_C",w="DBUG",g="ACTV",y="LOCH",k="GEOLOC",_="RSSI",x={eventsTypes:[{name:f,enabled:!0},{name:w,enabled:!0},{name:g,enabled:!0},{name:y,enabled:!0},{name:k,enabled:!0},{name:_,enabled:!0}]},S="SVG",z="GIF",U="WEBGL",C={types:[{name:S,description:"transp, mid perf",enabled:!0},{name:U,description:"dsbld, transp, higher perf, β",enabled:!1},{name:z,description:"non-transp. high perf",enabled:!1}]};function H(e,t,l){let n=370,o=250,a=n-o,s=l-t,i=l-e,c=a/s;return 360-(i*c-(n-360))}function M(e,t,l){const n=H(e,t,l);let o=100,a=50;n>280&&n<325&&(a=50,o=30),o/=100,a/=100;const s=e=>(e+n/30)%12,i=o*Math.min(a,1-a),c=e=>a-i*Math.max(-1,Math.min(s(e)-3,Math.min(9-s(e),1)));return[255*c(0),255*c(8),255*c(4)]}function j(e){const t=new Date(e),l=t.getHours(),n=t.getMinutes(),o=t.getSeconds();return(l<10?"0"+l:l)+":"+(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)+"."+t.getMilliseconds()}var D={__name:"WaveletComponent",props:{wavelet:b},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[e.wavelet.event.name==(0,s.SU)(f)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-1*e.wavelet.diskSize/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.diskSize/2)+"px;width: "+1*e.wavelet.diskSize+"px;height: "+1*e.wavelet.diskSize+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.diskSize/5+"px)")},null,6)):e.wavelet.predecessor&&e.wavelet.predecessor.event.name==(0,s.SU)(f)?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("shine"+(e.wavelet.predecessor.options.fadein?" shine_fadein":"")+(e.wavelet.predecessor.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.predecessor.x-1*e.wavelet.predecessor.diskSize/2)+"px; top:"+(e.wavelet.predecessor.y-1*e.wavelet.predecessor.diskSize/2)+"px;width: "+1*e.wavelet.predecessor.diskSize+"px;height: "+1*e.wavelet.predecessor.diskSize+"px;background-color:"+e.wavelet.predecessor.color+";-webkit-filter: blur("+e.wavelet.predecessor.diskSize/5+"px)")},null,6)):(0,o.kq)("",!0),(0,o._)("div",{class:(0,a.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")+(e.wavelet.options.ringsFadeout?" wavelet_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.event.name==(0,s.SU)(f)?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,a.C_)("wavelet__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5)):(0,o.kq)("",!0),e.wavelet.debug&&e.wavelet.event.name!=(0,s.SU)(f)?((0,o.wg)(),(0,o.iD)("span",{key:1,class:"wavelet__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-")+(0,a.zw)(e.wavelet.event.value?" "+e.wavelet.event.value:""),5)):(0,o.kq)("",!0),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:2,class:"wavelet-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)],64))}};const I=D;var V=I,E={__name:"GridWaveletComponent",props:{size:Number,map:Object},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)("div",{class:"wavelet-gr wavelet-gr_eternal",style:(0,a.j5)("left:"+(e.map.x-e.size/2)+"px; top:"+(e.map.y-e.size/2)+"px;width: "+e.size+"px;height: "+e.size+"px;")},[(0,o._)("div",{class:"wavelet-gr__value",style:(0,a.j5)(`font-size: ${e.size/10<6?6:e.size/10}px;`)},(0,a.zw)(e.map.tag.slice(-4)),5)],4))}},T=l(89);const q=(0,T.Z)(E,[["__scopeId","data-v-06f2dc5c"]]);var O=q,R={__name:"GifWaveletComponent",props:{wavelet:b},setup(e){return(t,l)=>e.wavelet.event.name==(0,s.SU)(f)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,o._)("span",{class:(0,a.C_)("wavelet-gif__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"wavelet-gif-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)):((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.debug?((0,o.wg)(),(0,o.iD)("span",{key:0,class:"wavelet-gif__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-"),5)):(0,o.kq)("",!0)],6))}};const F=(0,T.Z)(R,[["__scopeId","data-v-73db6dd4"]]);var L=F;function $(e,t){var l=0,n=e.length;while(l<n&&e[l]===t)++l;while(n>l&&e[n-1]===t)--n;return l>0||n<e.length?e.substring(l,n):e}class Y{constructor(){}static parse(e,t){const l=$(e,'"').split(",");if(l[0]&&"events"==l[0]){let e=!1;if(t.forEach((t=>{const n=l.some((e=>e.includes("eventName="+t.name)));t.enabled&&n&&(e=!0)})),e){const e={};return l.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(1),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e.name===g&&0===parseInt(e.value)?null:e}}return null}}function N(e){const t=new Map;if(!e)return t;const l=e.replace(/\r\n/g,"\n").split("\n");return l.forEach((e=>{const l=e.split(",");if("ID"!=l[0]){const e=l[0].replace("tagId=",""),n=parseInt(l[1]),o=parseInt(l[2]),a={x:n,y:o};a.tag=e;const s=parseFloat(l[3]);s&&(a.size=s),t.set(e,a)}})),t}const P={files:["beep.mp3","beeps.mp3","beept.mp3","bell-clean.mp3","bell-deep.mp3","bell-high.mp3","bell-little.mp3","bell-ok.mp3","bell-small-cut.mp3","bell-soft.mp3","bellllll.mp3","bip.mp3","bleep.mp3","string.mp3","twit.mp3"]};var A=l(5670);function B(e,t,l,n){return n*(l/10)*(e/t)}const G={resizeEvents:[{event:_,enabled:!0},{event:f,enabled:!0},{event:w,enabled:!0},{event:g,enabled:!0},{event:y,enabled:!0},{event:k,enabled:!0}]};function W(e){return G.resizeEvents.find((t=>t.event===e&&!0===t.enabled))}const K=e=>((0,o.dD)("data-v-5f20b6f0"),e=e(),(0,o.Cn)(),e),J={key:0,autoplay:"",muted:"",loop:"",id:"video"},X=["src"],Z={key:1,id:"canvas-container"},Q={class:"me-3"},ee=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"X:",-1))),te=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"Y:",-1))),le={class:"mb-3"},ne={for:"map-file-upload",class:"form-label small"},oe=K((()=>(0,o._)("span",{class:"text-white-50"},"Upload map CSV",-1))),ae=(0,o.Uk)(" ("),se=(0,o.Uk)(")"),ie=K((()=>(0,o._)("hr",null,null,-1))),ce=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Simulation",-1))),re={class:"form-check form-switch mb-3"},ue=K((()=>(0,o._)("label",{class:"form-check-label",for:"sim-checkbox",style:{color:"white"}}," Enable ",-1))),de=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2 small"},"Events per second",-1))),ve=K((()=>(0,o._)("hr",null,null,-1))),pe=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Grid",-1))),me={class:"form-check form-switch mb-3"},he=K((()=>(0,o._)("label",{class:"form-check-label",for:"grid-checkbox",style:{color:"white"}}," Enable ",-1))),be={class:"form-check form-switch mb-3"},fe=K((()=>(0,o._)("label",{class:"form-check-label",for:"crosshair-checkbox",style:{color:"white"}}," Crosshair cursor ",-1))),we=K((()=>(0,o._)("hr",null,null,-1))),ge=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Background",-1))),ye={class:"form-check form-switch mb-3"},ke=K((()=>(0,o._)("label",{class:"form-check-label",for:"background-image-enable-checkbox",style:{color:"white"}}," Image ",-1))),_e={key:0,class:"mb-3"},xe=K((()=>(0,o._)("label",{for:"background-image-upload",class:"form-label small"},[(0,o._)("span",{class:"text-white-50"},"Upload image")],-1))),Se={class:"form-check form-switch mb-3"},ze=K((()=>(0,o._)("label",{class:"form-check-label",for:"background-video-enable-checkbox",style:{color:"white"}}," Video ",-1))),Ue={key:1,class:"mb-3"},Ce=K((()=>(0,o._)("label",{for:"background-video-upload",class:"form-label small"},[(0,o._)("span",{class:"text-white-50"},"Upload video")],-1))),He=K((()=>(0,o._)("hr",null,null,-1))),Me={class:"form-check form-switch mb-3 d-none"},je=K((()=>(0,o._)("label",{class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}}," Colorize wavelets ",-1))),De=K((()=>(0,o._)("hr",{class:"d-none"},null,-1))),Ie=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Sound",-1))),Ve={class:"form-check form-switch mb-3"},Ee=K((()=>(0,o._)("label",{class:"form-check-label",for:"sound-on-checkbox",style:{color:"white"}}," Enable 🔉 ",-1))),Te={class:"form-check form-switch mb-3"},qe=K((()=>(0,o._)("label",{class:"form-check-label",for:"sound-simultaneous-checkbox",style:{color:"white"}}," Play simultaneous ",-1))),Oe=K((()=>(0,o._)("div",{class:"text-white-50 small mb-2"},"Select mp3",-1))),Re=["value"],Fe={class:"mb-3"},Le=K((()=>(0,o._)("label",{for:"mp3-upload",class:"form-label small"},[(0,o._)("span",{class:"text-white-50"},"Or upload mp3")],-1))),$e=K((()=>(0,o._)("hr",null,null,-1))),Ye=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Basic wavelet size ↔",-1))),Ne=K((()=>(0,o._)("hr",null,null,-1))),Pe=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Disk size ↔",-1))),Ae=K((()=>(0,o._)("hr",null,null,-1))),Be=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"RSSI scale factor",-1))),Ge=(0,o.Uk)(),We={class:"text-muted small ms-3"},Ke=K((()=>(0,o._)("div",{class:"text-muted mt-1 font-monospace",style:{"font-size":"9px"}},"ui size * (scale/10) * (average rssi/rssi) ",-1))),Je=K((()=>(0,o._)("hr",null,null,-1))),Xe=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Color disk timeout, s",-1))),Ze=K((()=>(0,o._)("hr",null,null,-1))),Qe={class:"row"},et={class:"col"},tt=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Min t",-1))),lt={class:"col"},nt=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Max t",-1))),ot=K((()=>(0,o._)("hr",null,null,-1))),at=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Rendering type",-1))),st=["onUpdate:modelValue","value","id"],it=["for"],ct={class:"small text-white-50"},rt=K((()=>(0,o._)("hr",null,null,-1))),ut=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Handle events",-1))),dt=["onUpdate:modelValue","id"],vt=["for"],pt={class:"form-check form-switch mb-1"},mt=K((()=>(0,o._)("label",{class:"form-check-label",for:"debug-wavelets-checkbox",style:{color:"rosybrown"}}," Debug mode ",-1))),ht=K((()=>(0,o._)("hr",null,null,-1))),bt=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"RSSI-based size",-1))),ft=["onUpdate:modelValue","id"],wt=["for"],gt=K((()=>(0,o._)("hr",null,null,-1))),yt=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Console log",-1))),kt=["onUpdate:modelValue","id"],_t=["for"],xt=K((()=>(0,o._)("hr",null,null,-1))),St=K((()=>(0,o._)("span",{class:"text-white-50 me-3"},"UI position",-1))),zt=K((()=>(0,o._)("hr",null,null,-1)));var Ut={__name:"DisplayComponent",setup(e){let t={};localStorage.getItem("appSettings")?t=JSON.parse(localStorage.getItem("appSettings")):localStorage.setItem("appSettings",JSON.stringify(t));const l=(0,s.iH)(new Map),c=(0,s.iH)(new Map),r=(0,s.iH)(new Map),u=(0,s.iH)(1),d=(0,s.iH)(15),{backgroundImageEnabled:v,backgroundImage:p,uploadBackgroundImage:h,backgroundVideoEnabled:w,backgroundVideo:y,uploadBackgroundVideo:k}=i(),H=(0,s.iH)(!1),D=(0,s.iH)(!1),I=(0,s.iH)(!1),E=(0,s.iH)(!1),T=(0,s.iH)(!1);let q=[{state:D,name:"Events"},{state:I,name:"Rendering"},{state:E,name:"Lifetime"},{state:T,name:"Fading"}];function R(){m.createConnection(jt,Rt),m.doSubscribe()}function F(){m.doUnSubscribe(),m.destroyConnection()}const $=t.renderingTypes?(0,s.qj)(t.renderingTypes):(0,s.qj)(C.types),K=t.rssiResizeEvents?(0,s.qj)(t.rssiResizeEvents):(0,s.qj)(G.resizeEvents),Ut=t.eventsTypes?(0,s.qj)(t.eventsTypes):(0,s.qj)(x.eventsTypes);(0,o.YP)(Ut,(e=>{e.forEach((e=>{e.name!=_||e.enabled||(r.value.clear(),Mt.value=70)}))}));const Ct=(0,s.iH)(20),Ht=(0,s.iH)(30),Mt=(0,s.iH)(70);function jt(e){if(!0===H.value)return!1;if(D.value&&console.log(e),"string"==typeof e){const t=Y.parse(e,Ut);if(t){t.name===_&&r.value.set(t.tag,t.raw),D.value&&console.log(t);const e=c.value.get(t.tag);if(e){const n=new b;if(n.event=t,n.id=t.tag,t.name!==f&&l.value.has(t.tag)){const e=l.value.get(t.tag);e.event.name===f?n.predecessor=e:e.predecessor&&e.predecessor.event.name===f&&(n.predecessor=e.predecessor),n.predecessor&&n.predecessor.event.timestamp>n.event.timestamp&&(n.event.timestamp=n.predecessor.event.timestamp)}const o=M(n.event.value,Ct.value,Ht.value);n.color=`rgb(${o[0]},${o[1]},${o[2]})`;let a=Xt.value;r.value.has(t.tag)&&W(t.name)?a=B(Mt.value,r.value.get(t.tag),u.value,Xt.value):e.size&&(a=e.size),n.size=a,n.basicSize=Xt.value,n.diskSize=Zt.value,n.colored=Yt.value,n.debug=$t.value,n.inject(e),l.value.set(t.tag,n),I.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+j(t.timestamp)+") is in map. Render."),Nt.value&&(Pt.value&&(Wt=new Audio(Gt)),Wt.play()),ul.value===U&&rl(n)}else I.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+j(t.timestamp)+") is not in map!")}else D.value&&console.log('Skip message "'+e+"\" (disabled or can't parse)")}}function Dt(e){let t=e.target;const l=new FileReader;l.onload=function(){c.value=N(l.result),console.log("Uploaded CSV:"),console.log(l.result.substring(0,200))},l.readAsText(t.files[0])}const It=(0,s.iH)(!1);function Vt(){!0===It.value?(F(),Ot.value="green",Tt()):(Ot.value="red",R())}const Et=(0,s.iH)(1);function Tt(){if(!1===It.value)return!1;qt.value=!qt.value;const e=Ft();jt(e);const t=Et.value>0?Et.value:1;setTimeout(Tt,1e3/t)}const qt=(0,s.iH)(!0),Ot=(0,s.iH)("red");function Rt(e){qt.value=!qt.value,Ot.value=e}function Ft(){const e=4e3,t=5026,l=15,n=27,o="(01)00850027865010(21)00oeT"+Math.floor(Math.random()*(t-e)+e).toString();let a=(Math.random()*(n-l)+l).toFixed(4);const s=Ut[Math.floor(Math.random()*Ut.length)];s.name===g&&(a=Math.round(Math.random()));let i="events,tagId="+o+",eventName="+s.name+",eventValue="+a+",timestamp="+Date.now();return i}function Lt(){const e=Date.now();l.value.forEach((t=>{let n=10;const o=n;if(t.event.name===f||t.predecessor&&t.predecessor.event.name===f){const e=d.value;n=n<e?e:n}const a=e-t.created,s=Math.floor(a/1e3);t.options.fadein||(T.value&&console.log("Time to fadein for #"+t.event.tag),t.options.fadein=!0),(t.event.name===f||t.predecessor&&t.predecessor.event.name===f)&&s>=o-1&&!t.options.ringsFadeout&&(T.value&&console.log("Time to fadeout rings for #"+t.event.tag),t.options.ringsFadeout=!0),s>=n-1&&!t.options.fadeout&&(T.value&&console.log("Time to fadeout for #"+t.event.tag),t.options.fadeout=!0),s>=n&&(E.value&&console.log("Lifetime exceeded "+n+"s for #"+t.event.tag+" – removing"),l.value.delete(t.event.tag),il.children.forEach((e=>{t.event.tag===e.wavelet.event.tag&&il.removeChild(e)})))})),setTimeout(Lt,100)}const $t=(0,s.iH)(!1),Yt=(0,s.iH)(!1),Nt=(0,s.iH)(!1),Pt=(0,s.iH)(!1),At="static/sound/",Bt=t.soundFileName&&t.soundFileName.includes(".mp3")?(0,s.iH)(t.soundFileName):(0,s.iH)("bell-high.mp3");let Gt=At+Bt.value,Wt=new Audio(Gt);function Kt(){Gt=At+Bt.value,Wt=new Audio(Gt)}function Jt(e){let t=e.target;t.files.length&&(Gt=URL.createObjectURL(t.files[0]),Wt=new Audio(Gt))}const Xt=(0,s.iH)(128),Zt=(0,s.iH)(128),Qt=(0,s.iH)(0),el=(0,s.iH)(0),tl=(0,s.qj)({position:{x:0,y:0}});function ll(e){H.value&&(Qt.value=e.clientX,el.value=e.clientY,tl.position.x=e.clientX,tl.position.y=e.clientY)}const nl=(0,s.iH)(!1),ol=(0,s.iH)(0),al=(0,s.qj)({positions:[{style:"left: 0; top: 0;"},{style:"right: 0; top: 0;"}]}),sl=new A.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundAlpha:!0}),il=new A.W20;function cl(){sl.ticker.add((()=>{ul.value==U&&il.children.forEach((e=>{e.wavelet.options.fadein&&e.alpha<1&&(e.alpha+=.03),e.wavelet.options.fadeout&&e.alpha>0&&(e.alpha-=.03),e.children.forEach((e=>{e.scale.x<.3&&e.alpha<1&&(e.alpha+=.02),e.scale.x>.8&&(e.alpha-=.01),e.scale.x<1&&e.scale.set(e.scale.x+.025,e.scale.y+.025)}))}))}))}function rl(e){const t=new A.W20;t.width=Xt.value,t.height=Xt.value,t.x=e.x,t.y=e.y,t.pivot.x=t.width/2,t.pivot.y=t.height/2,t.wavelet=e,t.alpha=0;let l=new A.TCu;l.lineStyle(3,16777215,1),l.drawCircle(0,0,.1*Xt.value),l.pivot.x=t.width/2,l.pivot.y=t.height/2,l.position.set(t.width/2,t.height/2),l.scale.set(.1,.1),t.addChild(l),il.addChild(t)}il.x=0,il.y=0,il.width=window.innerWidth,il.height=window.innerHeight,il.pivot.x=0,il.pivot.y=0,sl.stage.addChild(il);const ul=(0,s.iH)(S);function dl(e){const t=e.target.value;$.forEach((e=>{e.name!=t&&(e.enabled=!1)})),ul.value=t}return(0,o.wF)((()=>{t&&(t.selectedRenderingType&&(ul.value=t.selectedRenderingType),t.basicSize&&(Xt.value=t.basicSize),t.diskSize&&(Zt.value=t.diskSize),t.rssiScaleFactor&&(u.value=t.rssiScaleFactor),t.temperatureDiskTimeout&&(d.value=t.temperatureDiskTimeout),t.minCelsius&&(Ct.value=t.minCelsius),t.maxCelsius&&(Ht.value=t.maxCelsius),t.simulationMode&&(It.value=t.simulationMode),t.gridMode&&(H.value=t.gridMode),t.crosshairCursor&&(nl.value=t.crosshairCursor),t.isSoundOn&&(Nt.value=t.isSoundOn),t.isSoundSimultaneous&&(Pt.value=t.isSoundSimultaneous),t.idsMap&&t.idsMap.length&&t.idsMap.forEach((e=>{c.value.set(e.tag,e)})),t.debugMode&&($t.value=t.debugMode),t.consoleEvents&&(D.value=t.consoleEvents),t.consoleRenderingInfo&&(I.value=t.consoleRenderingInfo),t.consoleLifetimeInfo&&(E.value=t.consoleLifetimeInfo),t.consoleFadingInfo&&(T.value=t.consoleFadingInfo))})),(0,o.bv)((()=>{!0===It.value?(Ot.value="green",Tt()):(Ot.value="red",R()),Lt();const e=document.getElementById("canvas-container");e.appendChild(sl.view),cl()})),(0,o.YP)([ul,Xt,Zt,u,d,Ct,Ht,c,It,H,nl,Nt,Pt,Bt,$,Ut,$t,K,D,I,E,T],(([e,l,n,o,a,s,i,c,r,u,d,v,p,m,h,b,f,w,g,y,k,_])=>{if(t||(t={}),t.selectedRenderingType=e,t.basicSize=l,t.diskSize=n,t.rssiScaleFactor=o,t.temperatureDiskTimeout=a,t.minCelsius=s,t.maxCelsius=i,t.simulationMode=r,t.gridMode=u,t.crosshairCursor=d,t.isSoundOn=v,t.isSoundSimultaneous=p,m.includes(".mp3")&&(t.soundFileName=m),c.size){const e=[...c.values()];e.length&&(t.idsMap=e)}t.renderingTypes=h,t.eventsTypes=b,t.debugMode=f,t.rssiResizeEvents=w,t.consoleEvents=g,t.consoleRenderingInfo=y,t.consoleLifetimeInfo=k,t.consoleFadingInfo=_,localStorage.setItem("appSettings",JSON.stringify(t))})),(e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,a.C_)("display"+((0,s.SU)(v)?" display_bg":"")),onMousemove:ll,style:(0,a.j5)((H.value&&nl.value?"cursor: crosshair;":"")+(H.value?"box-shadow: inset 0 0 0 2px wheat;":"")+((0,s.SU)(v)&&(0,s.SU)(p)?"background-image: url("+(0,s.SU)(p)+")":""))},[(0,s.SU)(w)&&(0,s.SU)(y)?((0,o.wg)(),(0,o.iD)("video",J,[(0,o._)("source",{src:(0,s.SU)(y),type:"video/mp4"},null,8,X)])):(0,o.kq)("",!0),ul.value===(0,s.SU)(U)?((0,o.wg)(),(0,o.iD)("div",Z)):(0,o.kq)("",!0),ul.value!==(0,s.SU)(U)?((0,o.wg)(!0),(0,o.iD)(o.HY,{key:2},(0,o.Ko)(l.value,(([e,t])=>((0,o.wg)(),(0,o.iD)(o.HY,{key:e},[ul.value===(0,s.SU)(S)?((0,o.wg)(),(0,o.j4)((0,s.SU)(V),{key:0,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0),ul.value===(0,s.SU)(z)?((0,o.wg)(),(0,o.j4)((0,s.SU)(L),{key:1,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0)],64)))),128)):(0,o.kq)("",!0),H.value?((0,o.wg)(),(0,o.iD)(o.HY,{key:3},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(c.value,(([e,t])=>((0,o.wg)(),(0,o.j4)((0,s.SU)(O),{key:e,size:Xt.value,map:t},null,8,["size","map"])))),128)),(0,o._)("div",{class:"mouse-coordinates-tooltip",style:(0,a.j5)("top: "+tl.position.y+"px; left: "+tl.position.x+"px;")},[(0,o._)("span",Q,[ee,(0,o.Uk)(" "+(0,a.zw)(Qt.value),1)]),(0,o._)("span",null,[te,(0,o.Uk)(" "+(0,a.zw)(el.value),1)])],4)],64)):(0,o.kq)("",!0),(0,o._)("div",{class:"ui-wrapper mb-3",style:(0,a.j5)(al.positions[ol.value].style)},[(0,o._)("div",{class:"ui-container-toggle",style:(0,a.j5)(0===c.value.size?"display: block !important; ":"")},[(0,o._)("div",{class:(0,a.C_)(["connection-status mb-3",Ot.value]),style:(0,a.j5)("background-color:"+Ot.value+"; opacity: "+(qt.value?1:.4)+";")},null,6),(0,o._)("div",le,[(0,o._)("label",ne,[oe,ae,(0,o._)("span",{style:(0,a.j5)(0===c.value.size?"color: red":"color: green")},(0,a.zw)(c.value.size)+" ids loaded",5),se]),(0,o._)("input",{class:"form-control form-control-sm",id:"map-file-upload",type:"file",onChange:Dt},null,32)]),ie,(0,o._)("div",null,[ce,(0,o._)("div",re,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=e=>It.value=e),id:"sim-checkbox",onChange:Vt},null,544),[[n.e8,It.value]]),ue]),(0,o._)("div",null,[de,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Set amount",style:{"max-width":"110px"},"onUpdate:modelValue":t[1]||(t[1]=e=>Et.value=e)},null,512),[[n.nr,Et.value]])])]),ve,(0,o._)("div",null,[pe,(0,o._)("div",me,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=e=>H.value=e),id:"grid-checkbox"},null,512),[[n.e8,H.value]]),he]),(0,o._)("div",be,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[3]||(t[3]=e=>nl.value=e),id:"crosshair-checkbox"},null,512),[[n.e8,nl.value]]),fe])]),we,(0,o._)("div",null,[ge,(0,o._)("div",ye,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=e=>(0,s.dq)(v)?v.value=e:null),id:"background-image-enable-checkbox"},null,512),[[n.e8,(0,s.SU)(v)]]),ke]),(0,s.SU)(v)?((0,o.wg)(),(0,o.iD)("div",_e,[xe,(0,o._)("input",{class:"form-control form-control-sm",id:"background-image-upload",type:"file",onChange:t[5]||(t[5]=(...e)=>(0,s.SU)(h)&&(0,s.SU)(h)(...e))},null,32)])):(0,o.kq)("",!0),(0,o._)("div",Se,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=e=>(0,s.dq)(w)?w.value=e:null),id:"background-video-enable-checkbox"},null,512),[[n.e8,(0,s.SU)(w)]]),ze]),(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",Ue,[Ce,(0,o._)("input",{class:"form-control form-control-sm",id:"background-video-upload",type:"file",onChange:t[7]||(t[7]=(...e)=>(0,s.SU)(k)&&(0,s.SU)(k)(...e))},null,32)])):(0,o.kq)("",!0)]),He,(0,o._)("div",Me,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[8]||(t[8]=e=>Yt.value=e),id:"color-wavelets-checkbox"},null,512),[[n.e8,Yt.value]]),je]),De,(0,o._)("div",null,[Ie,(0,o._)("div",Ve,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[9]||(t[9]=e=>Nt.value=e),id:"sound-on-checkbox"},null,512),[[n.e8,Nt.value]]),Ee]),(0,o._)("div",Te,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[10]||(t[10]=e=>Pt.value=e),id:"sound-simultaneous-checkbox"},null,512),[[n.e8,Pt.value]]),qe]),Oe,(0,o.wy)((0,o._)("select",{class:"form-select form-select-sm mb-1","aria-label":"","onUpdate:modelValue":t[11]||(t[11]=e=>(0,s.dq)(Bt)?Bt.value=e:null),onChange:Kt},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(P).files,(e=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:e},(0,a.zw)(e),9,Re)))),128))],544),[[n.bM,(0,s.SU)(Bt)]]),(0,o._)("div",Fe,[Le,(0,o._)("input",{class:"form-control form-control-sm",id:"mp3-upload",type:"file",onChange:Jt},null,32)])]),$e,(0,o._)("div",null,[Ye,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[12]||(t[12]=e=>Xt.value=e)},null,512),[[n.nr,Xt.value]]),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[13]||(t[13]=e=>Xt.value=32)},"32"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[14]||(t[14]=e=>Xt.value=64)},"64"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[15]||(t[15]=e=>Xt.value=128)},"128 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[16]||(t[16]=e=>Xt.value=196)},"196 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[17]||(t[17]=e=>Xt.value=256)},"256 ")]),Ne,(0,o._)("div",null,[Pe,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[18]||(t[18]=e=>Zt.value=e)},null,512),[[n.nr,Zt.value]]),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[19]||(t[19]=e=>Zt.value=32)},"32"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[20]||(t[20]=e=>Zt.value=64)},"64"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[21]||(t[21]=e=>Zt.value=128)},"128 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[22]||(t[22]=e=>Zt.value=196)},"196 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[23]||(t[23]=e=>Zt.value=256)},"256 ")]),Ae,(0,o._)("div",null,[Be,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2 d-inline-block",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[24]||(t[24]=e=>u.value=e)},null,512),[[n.nr,u.value]]),Ge,(0,o._)("span",We," Average RSSI "+(0,a.zw)(Mt.value),1),Ke]),Je,(0,o._)("div",null,[Xe,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Amount in seconds",style:{"max-width":"80px"},"onUpdate:modelValue":t[25]||(t[25]=e=>d.value=e)},null,512),[[n.nr,d.value]])]),Ze,(0,o._)("div",Qe,[(0,o._)("div",et,[tt,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Min t","onUpdate:modelValue":t[26]||(t[26]=e=>Ct.value=e)},null,512),[[n.nr,Ct.value]])]),(0,o._)("div",lt,[nt,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Max t","onUpdate:modelValue":t[27]||(t[27]=e=>Ht.value=e)},null,512),[[n.nr,Ht.value]])])]),ot,(0,o._)("div",null,[at,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)($),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,onChange:dl,value:e.name,id:`rendering-type-checkbox-${e.name}`},null,40,st),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rendering-type-checkbox-${e.name}`,style:{color:"white"}},[(0,o.Uk)((0,a.zw)(e.name)+" ",1),(0,o._)("sup",null,[(0,o._)("span",ct,(0,a.zw)(e.description),1)])],8,it)])))),128))]),rt,(0,o._)("div",null,[ut,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(Ut),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`handle-wavelets-checkbox-${e.name}`},null,8,dt),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`handle-wavelets-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,vt)])))),128)),(0,o._)("div",pt,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[28]||(t[28]=e=>$t.value=e),id:"debug-wavelets-checkbox"},null,512),[[n.e8,$t.value]]),mt])]),ht,(0,o._)("div",null,[bt,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(K),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.event},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`rssi-event-size-checkbox-${e.event}`},null,8,ft),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rssi-event-size-checkbox-${e.event}`,style:{color:"white"}},(0,a.zw)(e.event),9,wt)])))),128))]),gt,(0,o._)("div",null,[yt,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(q),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.state.value=t,id:`console-log-checkbox-${e.name}`},null,8,kt),[[n.e8,e.state.value]]),(0,o._)("label",{class:"form-check-label",for:`console-log-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,_t)])))),128))]),xt,(0,o._)("div",null,[St,(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm me-2",onClick:t[29]||(t[29]=e=>ol.value=0)},"↖ Left"),(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm",onClick:t[30]||(t[30]=e=>ol.value=1)},"Right ↗")]),zt],4)],4)],38))}};const Ct=(0,T.Z)(Ut,[["__scopeId","data-v-5f20b6f0"]]);var Ht=Ct,Mt={__name:"App",setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(Ht))}};const jt=Mt;var Dt=jt;l(8937);(0,n.ri)(Dt).mount("#app")}},t={};function l(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,l),a.loaded=!0,a.exports}l.m=e,function(){var e=[];l.O=function(t,n,o,a){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],a=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||s>=a)&&Object.keys(l.O).every((function(e){return l.O[e](n[c])}))?n.splice(c--,1):(i=!1,a<s&&(s=a));if(i){e.splice(u--,1);var r=o();void 0!==r&&(t=r)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,a,s=n[0],i=n[1],c=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var u=c(l)}for(t&&t(n);r<s.length;r++)a=s[r],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return l.O(u)},n=self["webpackChunkwavelets"]=self["webpackChunkwavelets"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(2232)}));n=l.O(n)})();
//# sourceMappingURL=app.782f2473.js.map