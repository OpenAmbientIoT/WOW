(function(){"use strict";var e={9538:function(e,t,l){var n=l(9242),o=l(3396),a=(l(6699),l(7139)),s=l(4870),i=l(9999),c=l.n(i);const r=new Map;function u(e=null){let t=!1;while(!t){const l=("0000"+(Math.random()*Math.pow(36,4)|0).toString(36)).slice(-4);if(e||(e=r),!e.get(l))return t=!0,e.set(l,!0),l}}class d{constructor(){this.connection={host:"c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud",port:8884,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:10,clientId:"client-id-"+u()+"-"+u(),username:"testuser",password:"password"},this.subscription={topic:"TELEMETRY",qos:0},this.receivedMessages="",this.qosList=[{label:0,value:0},{label:1,value:1},{label:2,value:2}],this.client={connected:!1},this.subscribeSuccess=!1,this.data=new Map}onConnectionLost(){console.log("onConnectionLost")}createConnection(e,t){const{host:l,port:n,endpoint:o,...a}=this.connection,s=`wss://${l}:${n}${o}`;try{this.client=c().connect(s,a),c().onConnectionLost=this.onConnectionLost}catch(i){console.log("mqtt.connect error",i)}this.client.on("connect",(()=>{"function"==typeof t&&t("orange"),console.log("Connection succeeded!")})),this.client.on("onConnectionLost",(()=>{console.log("Connection lost!!")})),this.client.on("error",(e=>{console.log("Connection failed",e)})),this.client.on("message",((l,n)=>{let o=(new TextDecoder).decode(n);"function"==typeof e&&e(o),"function"==typeof t&&t("green")}))}doSubscribe(){const{topic:e,qos:t}=this.subscription;this.client.subscribe(e,t,((e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))}))}doUnSubscribe(){const{topic:e}=this.subscription;this.client.unsubscribe(e,(e=>{e&&console.log("Unsubscribe error",e)}))}doPublish(){const{topic:e,qos:t,payload:l}=this.publish;this.client.publish(e,l,t,(e=>{e&&console.log("Publish error",e)}))}destroyConnection(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(e){console.log("Disconnect failed",e.toString())}}}const v=new d;var p=v;class m{constructor(){this.id=null,this.x=0,this.y=0,this.created=Date.now(),this.size=128,this.basicSize=128,this.diskSize=128,this.colored=!1,this.debug=!1,this.event={tag:"",name:"",value:"",raw:"",timestamp:""},this.predecessor=null,this.rendering={}}inject(e){e&&(this.x=e.x?e.x:0,this.y=e.y?e.y:0)}}class h extends m{constructor(){super(),this.type="wavelet",this.color="rgb(255,255,255)",this.options={fadein:!1,fadeout:!1,ringsFadeout:!1}}}const w="TEMP_C",f="DBUG",b="ACTV",g="LOCH",y="GEOLOC",_="RSSI",k={eventsTypes:[{name:w,enabled:!0},{name:f,enabled:!0},{name:b,enabled:!0},{name:g,enabled:!0},{name:y,enabled:!0},{name:_,enabled:!0}]},x="SVG",S="GIF",z="WEBGL",C={types:[{name:x,description:"transp, mid perf",enabled:!0},{name:z,description:"transp, higher perf, β",enabled:!1},{name:S,description:"non-transp. high perf",enabled:!1}]};function U(e,t,l){let n=370,o=250,a=n-o,s=l-t,i=l-e,c=a/s;return 360-(i*c-(n-360))}function M(e,t,l){const n=U(e,t,l);let o=100,a=50;n>280&&n<325&&(a=50,o=30),o/=100,a/=100;const s=e=>(e+n/30)%12,i=o*Math.min(a,1-a),c=e=>a-i*Math.max(-1,Math.min(s(e)-3,Math.min(9-s(e),1)));return[255*c(0),255*c(8),255*c(4)]}function H(e){const t=new Date(e),l=t.getHours(),n=t.getMinutes(),o=t.getSeconds();return(l<10?"0"+l:l)+":"+(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)+"."+t.getMilliseconds()}var j={__name:"WaveletComponent",props:{wavelet:h},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-1*e.wavelet.diskSize/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.diskSize/2)+"px;width: "+1*e.wavelet.diskSize+"px;height: "+1*e.wavelet.diskSize+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.diskSize/5+"px)")},null,6)):e.wavelet.predecessor&&e.wavelet.predecessor.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("shine"+(e.wavelet.predecessor.options.fadein?" shine_fadein":"")+(e.wavelet.predecessor.options.fadeout?" shine_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.predecessor.x-1*e.wavelet.predecessor.diskSize/2)+"px; top:"+(e.wavelet.predecessor.y-1*e.wavelet.predecessor.diskSize/2)+"px;width: "+1*e.wavelet.predecessor.diskSize+"px;height: "+1*e.wavelet.predecessor.diskSize+"px;background-color:"+e.wavelet.predecessor.color+";-webkit-filter: blur("+e.wavelet.predecessor.diskSize/5+"px)")},null,6)):(0,o.kq)("",!0),(0,o._)("div",{class:(0,a.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")+(e.wavelet.options.ringsFadeout?" wavelet_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,a.C_)("wavelet__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5)):(0,o.kq)("",!0),e.wavelet.debug&&e.wavelet.event.name!=(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("span",{key:1,class:"wavelet__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-")+(0,a.zw)(e.wavelet.event.value?" "+e.wavelet.event.value:""),5)):(0,o.kq)("",!0),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:2,class:"wavelet-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)],64))}};const D=j;var T=D,I={__name:"GridWaveletComponent",props:{size:Number,map:Object},setup(e){return(t,l)=>((0,o.wg)(),(0,o.iD)("div",{class:"wavelet-gr wavelet-gr_eternal",style:(0,a.j5)("left:"+(e.map.x-e.size/2)+"px; top:"+(e.map.y-e.size/2)+"px;width: "+e.size+"px;height: "+e.size+"px;")},null,4))}},V=l(89);const E=(0,V.Z)(I,[["__scopeId","data-v-e33a8370"]]);var q=E,O={__name:"GifWaveletComponent",props:{wavelet:h},setup(e){return(t,l)=>e.wavelet.event.name==(0,s.SU)(w)?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,o._)("span",{class:(0,a.C_)("wavelet-gif__value"),style:(0,a.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5),e.wavelet.colored?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"wavelet-gif-coloring",style:(0,a.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,o.kq)("",!0)],6)):((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,a.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,a.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.debug?((0,o.wg)(),(0,o.iD)("span",{key:0,class:"wavelet-gif__value",style:(0,a.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,a.zw)(e.wavelet.event.name?e.wavelet.event.name:"-"),5)):(0,o.kq)("",!0)],6))}};const F=(0,V.Z)(O,[["__scopeId","data-v-73db6dd4"]]);var R=F;function $(e,t){var l=0,n=e.length;while(l<n&&e[l]===t)++l;while(n>l&&e[n-1]===t)--n;return l>0||n<e.length?e.substring(l,n):e}class L{constructor(){}static parse(e,t){const l=$(e,'"').split(",");if(l[0]&&"events"==l[0]){let e=!1;if(t.forEach((t=>{const n=l.some((e=>e.includes("eventName="+t.name)));t.enabled&&n&&(e=!0)})),e){const e={};return l.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(1),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e.name===b&&0===parseInt(e.value)?null:e}}return null}}function Y(e){const t=new Map;if(!e)return t;const l=e.replace(/\r\n/g,"\n").split("\n");return l.forEach((e=>{const l=e.split(",");if("ID"!=l[0]){const e=l[0].replace("tagId=",""),n=parseInt(l[1]),o=parseInt(l[2]),a={x:n,y:o};a.tag=e;const s=parseFloat(l[3]);s&&(a.size=s),t.set(e,a)}})),t}const N={files:["beep.mp3","beeps.mp3","beept.mp3","bell-clean.mp3","bell-deep.mp3","bell-high.mp3","bell-little.mp3","bell-ok.mp3","bell-small-cut.mp3","bell-soft.mp3","bellllll.mp3","bip.mp3","bleep.mp3","string.mp3","twit.mp3"]};var A=l(5670);function P(e,t,l,n){return n*(l/10)*(e/t)}const G={resizeEvents:[{event:_,enabled:!0},{event:w,enabled:!0},{event:f,enabled:!0},{event:b,enabled:!0},{event:g,enabled:!0},{event:y,enabled:!0}]};function W(e){return G.resizeEvents.find((t=>t.event===e&&!0===t.enabled))}const K=e=>((0,o.dD)("data-v-39584333"),e=e(),(0,o.Cn)(),e),B=K((()=>(0,o._)("div",{id:"canvas-container"},null,-1))),J={class:"me-3"},X=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"X:",-1))),Z=K((()=>(0,o._)("span",{class:"fw-lighter opacity-75"},"Y:",-1))),Q={class:"mb-3"},ee={for:"map-file-upload",class:"form-label small"},te=K((()=>(0,o._)("span",{class:"text-white-50"},"Upload map CSV",-1))),le=(0,o.Uk)(" ("),ne=(0,o.Uk)(")"),oe=K((()=>(0,o._)("hr",null,null,-1))),ae={class:"form-check form-switch mb-3"},se=K((()=>(0,o._)("label",{class:"form-check-label",for:"sim-checkbox",style:{color:"white"}}," Enable simulation ▹ ",-1))),ie=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Average events per second",-1))),ce=K((()=>(0,o._)("hr",null,null,-1))),re={class:"form-check form-switch mb-3"},ue=K((()=>(0,o._)("label",{class:"form-check-label",for:"grid-checkbox",style:{color:"white"}}," Grid mode ܍ ",-1))),de={class:"form-check form-switch mb-3"},ve=K((()=>(0,o._)("label",{class:"form-check-label",for:"crosshair-checkbox",style:{color:"white"}}," Crosshair cursor ",-1))),pe=K((()=>(0,o._)("hr",null,null,-1))),me={class:"form-check form-switch mb-3 d-none"},he=K((()=>(0,o._)("label",{class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}}," Colorize wavelets ",-1))),we=K((()=>(0,o._)("hr",{class:"d-none"},null,-1))),fe={class:"form-check form-switch mb-3"},be=K((()=>(0,o._)("label",{class:"form-check-label",for:"sound-on-checkbox",style:{color:"white"}}," Sound 🔉 ",-1))),ge={class:"form-check form-switch mb-3"},ye=K((()=>(0,o._)("label",{class:"form-check-label",for:"sound-simultaneous-checkbox",style:{color:"white"}}," Play simultaneous ",-1))),_e=K((()=>(0,o._)("div",{class:"text-white-50 small mb-2"},"Select mp3",-1))),ke=["value"],xe={class:"mb-3"},Se=K((()=>(0,o._)("label",{for:"mp3-upload",class:"form-label small"},[(0,o._)("span",{class:"text-white-50"},"Or upload mp3")],-1))),ze=K((()=>(0,o._)("hr",null,null,-1))),Ce=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Basic wavelet size ↔",-1))),Ue=K((()=>(0,o._)("hr",null,null,-1))),Me=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Disk size ↔",-1))),He=K((()=>(0,o._)("hr",null,null,-1))),je=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"RSSI scale factor",-1))),De=(0,o.Uk)(),Te={class:"text-muted small ms-3"},Ie=K((()=>(0,o._)("div",{class:"text-muted mt-1 font-monospace",style:{"font-size":"9px"}},"ui size * (scale/10) * (average rssi/rssi) ",-1))),Ve=K((()=>(0,o._)("hr",null,null,-1))),Ee=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Color disk timeout, s",-1))),qe=K((()=>(0,o._)("hr",null,null,-1))),Oe={class:"row"},Fe={class:"col"},Re=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Min t",-1))),$e={class:"col"},Le=K((()=>(0,o._)("div",{class:"text-white-50 me-3 mb-2"},"Max t",-1))),Ye=K((()=>(0,o._)("hr",null,null,-1))),Ne=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Rendering type",-1))),Ae=["onUpdate:modelValue","value","id"],Pe=["for"],Ge={class:"small text-white-50"},We=K((()=>(0,o._)("hr",null,null,-1))),Ke=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Handle events",-1))),Be=["onUpdate:modelValue","id"],Je=["for"],Xe={class:"form-check form-switch mb-1"},Ze=K((()=>(0,o._)("label",{class:"form-check-label",for:"debug-wavelets-checkbox",style:{color:"rosybrown"}}," Debug mode ",-1))),Qe=K((()=>(0,o._)("hr",null,null,-1))),et=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"RSSI-based size",-1))),tt=["onUpdate:modelValue","id"],lt=["for"],nt=K((()=>(0,o._)("hr",null,null,-1))),ot=K((()=>(0,o._)("span",{class:"text-white-50 me-1"},"Console log",-1))),at=["onUpdate:modelValue","id"],st=["for"],it=K((()=>(0,o._)("hr",null,null,-1))),ct=K((()=>(0,o._)("span",{class:"text-white-50 me-3"},"UI position",-1))),rt=K((()=>(0,o._)("hr",null,null,-1)));var ut={__name:"DisplayComponent",setup(e){let t={};localStorage.getItem("appSettings")?t=JSON.parse(localStorage.getItem("appSettings")):localStorage.setItem("appSettings",JSON.stringify(t));const l=(0,s.iH)(new Map),i=(0,s.iH)(new Map),c=(0,s.iH)(new Map),r=(0,s.iH)(1),u=(0,s.iH)(15),d=(0,s.iH)(!1),v=(0,s.iH)(!1),m=(0,s.iH)(!1),f=(0,s.iH)(!1),g=(0,s.iH)(!1);let y=[{state:v,name:"Events"},{state:m,name:"Rendering"},{state:f,name:"Lifetime"},{state:g,name:"Fading"}];function U(){p.createConnection($,wt),p.doSubscribe()}function j(){p.doUnSubscribe(),p.destroyConnection()}const D=t.renderingTypes?(0,s.qj)(t.renderingTypes):(0,s.qj)(C.types),I=t.rssiResizeEvents?(0,s.qj)(t.rssiResizeEvents):(0,s.qj)(G.resizeEvents),V=t.eventsTypes?(0,s.qj)(t.eventsTypes):(0,s.qj)(k.eventsTypes);(0,o.YP)(V,(e=>{e.forEach((e=>{e.name!=_||e.enabled||(c.value.clear(),F.value=70)}))}));const E=(0,s.iH)(20),O=(0,s.iH)(30),F=(0,s.iH)(70);function $(e){if(!0===d.value)return!1;if(v.value&&console.log(e),"string"==typeof e){const t=L.parse(e,V);if(t){t.name===_&&c.value.set(t.tag,t.raw),v.value&&console.log(t);const e=i.value.get(t.tag);if(e){const n=new h;if(n.event=t,n.id=t.tag,t.name!==w&&l.value.has(t.tag)){const e=l.value.get(t.tag);e.event.name===w?n.predecessor=e:e.predecessor&&e.predecessor.event.name===w&&(n.predecessor=e.predecessor),n.predecessor&&n.predecessor.event.timestamp>n.event.timestamp&&(n.event.timestamp=n.predecessor.event.timestamp)}const o=M(n.event.value,E.value,O.value);n.color=`rgb(${o[0]},${o[1]},${o[2]})`;let a=Ht.value;c.value.has(t.tag)&&W(t.name)?a=P(F.value,c.value.get(t.tag),r.value,Ht.value):e.size&&(a=e.size),n.size=a,n.basicSize=Ht.value,n.diskSize=jt.value,n.colored=yt.value,n.debug=gt.value,n.inject(e),l.value.set(t.tag,n),m.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+H(t.timestamp)+") is in map. Render."),_t.value&&(kt.value&&(Ct=new Audio(zt)),Ct.play()),Yt.value===z&&Lt(n)}else m.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+H(t.timestamp)+") is not in map!")}else v.value&&console.log('Skip message "'+e+"\" (disabled or can't parse)")}}function K(e){let t=e.target;const l=new FileReader;l.onload=function(){i.value=Y(l.result),console.log("Uploaded CSV:"),console.log(l.result.substring(0,200))},l.readAsText(t.files[0])}const ut=(0,s.iH)(!1);function dt(){!0===ut.value?(j(),ht.value="green",pt()):(ht.value="red",U())}const vt=(0,s.iH)(1);function pt(){if(!1===ut.value)return!1;mt.value=!mt.value;const e=ft();$(e);const t=vt.value>0?vt.value:1;setTimeout(pt,1e3/t)}const mt=(0,s.iH)(!0),ht=(0,s.iH)("red");function wt(e){mt.value=!mt.value,ht.value=e}function ft(){const e=4e3,t=5026,l=15,n=27,o="(01)00850027865010(21)00oeT"+Math.floor(Math.random()*(t-e)+e).toString();let a=(Math.random()*(n-l)+l).toFixed(4);const s=V[Math.floor(Math.random()*V.length)];s.name===b&&(a=Math.round(Math.random()));let i="events,tagId="+o+",eventName="+s.name+",eventValue="+a+",timestamp="+Date.now();return i}function bt(){const e=Date.now();l.value.forEach((t=>{let n=10;const o=n;if(t.event.name===w||t.predecessor&&t.predecessor.event.name===w){const e=u.value;n=n<e?e:n}const a=e-t.created,s=Math.floor(a/1e3);t.options.fadein||(g.value&&console.log("Time to fadein for #"+t.event.tag),t.options.fadein=!0),(t.event.name===w||t.predecessor&&t.predecessor.event.name===w)&&s>=o-1&&!t.options.ringsFadeout&&(g.value&&console.log("Time to fadeout rings for #"+t.event.tag),t.options.ringsFadeout=!0),s>=n-1&&!t.options.fadeout&&(g.value&&console.log("Time to fadeout for #"+t.event.tag),t.options.fadeout=!0),s>=n&&(f.value&&console.log("Lifetime exceeded "+n+"s for #"+t.event.tag+" – removing"),l.value.delete(t.event.tag),Rt.children.forEach((e=>{t.event.tag===e.wavelet.event.tag&&Rt.removeChild(e)})))})),setTimeout(bt,100)}const gt=(0,s.iH)(!1),yt=(0,s.iH)(!1),_t=(0,s.iH)(!1),kt=(0,s.iH)(!1),xt="static/sound/",St=t.soundFileName&&t.soundFileName.includes(".mp3")?(0,s.iH)(t.soundFileName):(0,s.iH)("bell-high.mp3");let zt=xt+St.value,Ct=new Audio(zt);function Ut(){zt=xt+St.value,Ct=new Audio(zt)}function Mt(e){let t=e.target;t.files.length&&(zt=URL.createObjectURL(t.files[0]),Ct=new Audio(zt))}const Ht=(0,s.iH)(128),jt=(0,s.iH)(128),Dt=(0,s.iH)(0),Tt=(0,s.iH)(0),It=(0,s.qj)({position:{x:0,y:0}});function Vt(e){d.value&&(Dt.value=e.clientX,Tt.value=e.clientY,It.position.x=e.clientX,It.position.y=e.clientY)}const Et=(0,s.iH)(!1),qt=(0,s.iH)(0),Ot=(0,s.qj)({positions:[{style:"left: 0; top: 0;"},{style:"right: 0; top: 0;"}]}),Ft=new A.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundAlpha:!0}),Rt=new A.W20;function $t(){Ft.ticker.add((()=>{Yt.value==z&&Rt.children.forEach((e=>{e.wavelet.options.fadein&&e.alpha<1&&(e.alpha+=.03),e.wavelet.options.fadeout&&e.alpha>0&&(e.alpha-=.03),e.children.forEach((e=>{e.scale.x<.3&&e.alpha<1&&(e.alpha+=.02),e.scale.x>.8&&(e.alpha-=.01),e.scale.x<1&&e.scale.set(e.scale.x+.025,e.scale.y+.025)}))}))}))}function Lt(e){const t=new A.W20;t.width=Ht.value,t.height=Ht.value,t.x=e.x,t.y=e.y,t.pivot.x=t.width/2,t.pivot.y=t.height/2,t.wavelet=e,t.alpha=0;let l=new A.TCu;l.lineStyle(3,16777215,1),l.drawCircle(0,0,.1*Ht.value),l.pivot.x=t.width/2,l.pivot.y=t.height/2,l.position.set(t.width/2,t.height/2),l.scale.set(.1,.1),t.addChild(l),Rt.addChild(t)}Rt.x=0,Rt.y=0,Rt.width=window.innerWidth,Rt.height=window.innerHeight,Rt.pivot.x=0,Rt.pivot.y=0,Ft.stage.addChild(Rt);const Yt=(0,s.iH)(x);function Nt(e){const t=e.target.value;D.forEach((e=>{e.name!=t&&(e.enabled=!1)})),Yt.value=t}return(0,o.wF)((()=>{t&&(t.selectedRenderingType&&(Yt.value=t.selectedRenderingType),t.basicSize&&(Ht.value=t.basicSize),t.diskSize&&(jt.value=t.diskSize),t.rssiScaleFactor&&(r.value=t.rssiScaleFactor),t.temperatureDiskTimeout&&(u.value=t.temperatureDiskTimeout),t.minCelsius&&(E.value=t.minCelsius),t.maxCelsius&&(O.value=t.maxCelsius),t.simulationMode&&(ut.value=t.simulationMode),t.gridMode&&(d.value=t.gridMode),t.crosshairCursor&&(Et.value=t.crosshairCursor),t.isSoundOn&&(_t.value=t.isSoundOn),t.isSoundSimultaneous&&(kt.value=t.isSoundSimultaneous),t.idsMap&&t.idsMap.length&&t.idsMap.forEach((e=>{i.value.set(e.tag,e)})),t.debugMode&&(gt.value=t.debugMode),t.consoleEvents&&(v.value=t.consoleEvents),t.consoleRenderingInfo&&(m.value=t.consoleRenderingInfo),t.consoleLifetimeInfo&&(f.value=t.consoleLifetimeInfo),t.consoleFadingInfo&&(g.value=t.consoleFadingInfo))})),(0,o.bv)((()=>{!0===ut.value?(ht.value="green",pt()):(ht.value="red",U()),bt();const e=document.getElementById("canvas-container");e.appendChild(Ft.view),$t()})),(0,o.YP)([Yt,Ht,jt,r,u,E,O,i,ut,d,Et,_t,kt,St,D,V,gt,I,v,m,f,g],(([e,l,n,o,a,s,i,c,r,u,d,v,p,m,h,w,f,b,g,y,_,k])=>{if(t||(t={}),t.selectedRenderingType=e,t.basicSize=l,t.diskSize=n,t.rssiScaleFactor=o,t.temperatureDiskTimeout=a,t.minCelsius=s,t.maxCelsius=i,t.simulationMode=r,t.gridMode=u,t.crosshairCursor=d,t.isSoundOn=v,t.isSoundSimultaneous=p,m.includes(".mp3")&&(t.soundFileName=m),c.size){const e=[...c.values()];e.length&&(t.idsMap=e)}t.renderingTypes=h,t.eventsTypes=w,t.debugMode=f,t.rssiResizeEvents=b,t.consoleEvents=g,t.consoleRenderingInfo=y,t.consoleLifetimeInfo=_,t.consoleFadingInfo=k,localStorage.setItem("appSettings",JSON.stringify(t))})),(e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:"display",onMousemove:Vt,style:(0,a.j5)((d.value&&Et.value?"cursor: crosshair;":"")+(d.value?"box-shadow: inset 0 0 0 2px wheat;":""))},[B,Yt.value!==(0,s.SU)(z)?((0,o.wg)(!0),(0,o.iD)(o.HY,{key:0},(0,o.Ko)(l.value,(([e,t])=>((0,o.wg)(),(0,o.iD)(o.HY,{key:e},[Yt.value===(0,s.SU)(x)?((0,o.wg)(),(0,o.j4)((0,s.SU)(T),{key:0,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0),Yt.value===(0,s.SU)(S)?((0,o.wg)(),(0,o.j4)((0,s.SU)(R),{key:1,wavelet:t},null,8,["wavelet"])):(0,o.kq)("",!0)],64)))),128)):(0,o.kq)("",!0),d.value?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.value,(([e,t])=>((0,o.wg)(),(0,o.j4)((0,s.SU)(q),{key:e,size:Ht.value,map:t},null,8,["size","map"])))),128)),(0,o._)("div",{class:"mouse-coordinates-tooltip",style:(0,a.j5)("top: "+It.position.y+"px; left: "+It.position.x+"px;")},[(0,o._)("span",J,[X,(0,o.Uk)(" "+(0,a.zw)(Dt.value),1)]),(0,o._)("span",null,[Z,(0,o.Uk)(" "+(0,a.zw)(Tt.value),1)])],4)],64)):(0,o.kq)("",!0),(0,o._)("div",{class:"ui-wrapper mb-3",style:(0,a.j5)(Ot.positions[qt.value].style)},[(0,o._)("div",{class:"ui-container-toggle",style:(0,a.j5)(0===i.value.size?"display: block !important; ":"")},[(0,o._)("div",{class:(0,a.C_)(["connection-status mb-3",ht.value]),style:(0,a.j5)("background-color:"+ht.value+"; opacity: "+(mt.value?1:.4)+";")},null,6),(0,o._)("div",Q,[(0,o._)("label",ee,[te,le,(0,o._)("span",{style:(0,a.j5)(0===i.value.size?"color: red":"color: green")},(0,a.zw)(i.value.size)+" ids loaded",5),ne]),(0,o._)("input",{class:"form-control form-control-sm",id:"map-file-upload",type:"file",onChange:K},null,32)]),oe,(0,o._)("div",ae,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=e=>ut.value=e),id:"sim-checkbox",onChange:dt},null,544),[[n.e8,ut.value]]),se]),(0,o._)("div",null,[ie,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Amount",style:{"max-width":"80px"},"onUpdate:modelValue":t[1]||(t[1]=e=>vt.value=e)},null,512),[[n.nr,vt.value]])]),ce,(0,o._)("div",re,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=e=>d.value=e),id:"grid-checkbox"},null,512),[[n.e8,d.value]]),ue]),(0,o._)("div",de,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[3]||(t[3]=e=>Et.value=e),id:"crosshair-checkbox"},null,512),[[n.e8,Et.value]]),ve]),pe,(0,o._)("div",me,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=e=>yt.value=e),id:"color-wavelets-checkbox"},null,512),[[n.e8,yt.value]]),he]),we,(0,o._)("div",fe,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[5]||(t[5]=e=>_t.value=e),id:"sound-on-checkbox"},null,512),[[n.e8,_t.value]]),be]),(0,o._)("div",ge,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=e=>kt.value=e),id:"sound-simultaneous-checkbox"},null,512),[[n.e8,kt.value]]),ye]),_e,(0,o.wy)((0,o._)("select",{class:"form-select form-select-sm mb-1","aria-label":"","onUpdate:modelValue":t[7]||(t[7]=e=>(0,s.dq)(St)?St.value=e:null),onChange:Ut},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(N).files,(e=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:e},(0,a.zw)(e),9,ke)))),128))],544),[[n.bM,(0,s.SU)(St)]]),(0,o._)("div",xe,[Se,(0,o._)("input",{class:"form-control form-control-sm",id:"mp3-upload",type:"file",onChange:Mt},null,32)]),ze,(0,o._)("div",null,[Ce,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[8]||(t[8]=e=>Ht.value=e)},null,512),[[n.nr,Ht.value]]),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[9]||(t[9]=e=>Ht.value=32)},"32"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[10]||(t[10]=e=>Ht.value=64)},"64"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[11]||(t[11]=e=>Ht.value=128)},"128 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[12]||(t[12]=e=>Ht.value=196)},"196 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[13]||(t[13]=e=>Ht.value=256)},"256 ")]),Ue,(0,o._)("div",null,[Me,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[14]||(t[14]=e=>jt.value=e)},null,512),[[n.nr,jt.value]]),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[15]||(t[15]=e=>jt.value=32)},"32"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[16]||(t[16]=e=>jt.value=64)},"64"),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[17]||(t[17]=e=>jt.value=128)},"128 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[18]||(t[18]=e=>jt.value=196)},"196 "),(0,o._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[19]||(t[19]=e=>jt.value=256)},"256 ")]),He,(0,o._)("div",null,[je,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2 d-inline-block",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[20]||(t[20]=e=>r.value=e)},null,512),[[n.nr,r.value]]),De,(0,o._)("span",Te," Average RSSI "+(0,a.zw)(F.value),1),Ie]),Ve,(0,o._)("div",null,[Ee,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Amount in seconds",style:{"max-width":"80px"},"onUpdate:modelValue":t[21]||(t[21]=e=>u.value=e)},null,512),[[n.nr,u.value]])]),qe,(0,o._)("div",Oe,[(0,o._)("div",Fe,[Re,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Min t","onUpdate:modelValue":t[22]||(t[22]=e=>E.value=e)},null,512),[[n.nr,E.value]])]),(0,o._)("div",$e,[Le,(0,o.wy)((0,o._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Max t","onUpdate:modelValue":t[23]||(t[23]=e=>O.value=e)},null,512),[[n.nr,O.value]])])]),Ye,(0,o._)("div",null,[Ne,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(D),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,onChange:Nt,value:e.name,id:`rendering-type-checkbox-${e.name}`},null,40,Ae),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rendering-type-checkbox-${e.name}`,style:{color:"white"}},[(0,o.Uk)((0,a.zw)(e.name)+" ",1),(0,o._)("sup",null,[(0,o._)("span",Ge,(0,a.zw)(e.description),1)])],8,Pe)])))),128))]),We,(0,o._)("div",null,[Ke,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(V),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`handle-wavelets-checkbox-${e.name}`},null,8,Be),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`handle-wavelets-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,Je)])))),128)),(0,o._)("div",Xe,[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[24]||(t[24]=e=>gt.value=e),id:"debug-wavelets-checkbox"},null,512),[[n.e8,gt.value]]),Ze])]),Qe,(0,o._)("div",null,[et,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(I),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.event},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`rssi-event-size-checkbox-${e.event}`},null,8,tt),[[n.e8,e.enabled]]),(0,o._)("label",{class:"form-check-label",for:`rssi-event-size-checkbox-${e.event}`,style:{color:"white"}},(0,a.zw)(e.event),9,lt)])))),128))]),nt,(0,o._)("div",null,[ot,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(y),(e=>((0,o.wg)(),(0,o.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,o.wy)((0,o._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.state.value=t,id:`console-log-checkbox-${e.name}`},null,8,at),[[n.e8,e.state.value]]),(0,o._)("label",{class:"form-check-label",for:`console-log-checkbox-${e.name}`,style:{color:"white"}},(0,a.zw)(e.name),9,st)])))),128))]),it,(0,o._)("div",null,[ct,(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm me-2",onClick:t[25]||(t[25]=e=>qt.value=0)},"↖ Left"),(0,o._)("button",{type:"button",class:"btn btn-outline-light btn-sm",onClick:t[26]||(t[26]=e=>qt.value=1)},"Right ↗")]),rt],4)],4)],36))}};const dt=(0,V.Z)(ut,[["__scopeId","data-v-39584333"]]);var vt=dt,pt={__name:"App",setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(vt))}};const mt=pt;var ht=mt;l(8937);(0,n.ri)(ht).mount("#app")}},t={};function l(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,l),a.loaded=!0,a.exports}l.m=e,function(){var e=[];l.O=function(t,n,o,a){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],a=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||s>=a)&&Object.keys(l.O).every((function(e){return l.O[e](n[c])}))?n.splice(c--,1):(i=!1,a<s&&(s=a));if(i){e.splice(u--,1);var r=o();void 0!==r&&(t=r)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,a,s=n[0],i=n[1],c=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var u=c(l)}for(t&&t(n);r<s.length;r++)a=s[r],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return l.O(u)},n=self["webpackChunkwavelets"]=self["webpackChunkwavelets"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(9538)}));n=l.O(n)})();
//# sourceMappingURL=app.32a5f648.js.map