(function(){"use strict";var e={529:function(e,t,l){var n=l(9242),a=l(3396),o=(l(6699),l(7139)),s=l(4870);function i(){const e=(0,s.iH)(!1),t=(0,s.iH)(),l=(0,s.iH)(!1),n=(0,s.iH)(),a=function(e){let l=e.target;l.files.length&&(t.value=URL.createObjectURL(l.files[0]))},o=function(e){let t=e.target;t.files.length&&(n.value=URL.createObjectURL(t.files[0]))};return{backgroundImageEnabled:e,backgroundImage:t,uploadBackgroundImage:a,backgroundVideoEnabled:l,backgroundVideo:n,uploadBackgroundVideo:o}}var c=l(9999),r=l.n(c);const u=new Map;function d(e=null){let t=!1;while(!t){const l=("0000"+(Math.random()*Math.pow(36,4)|0).toString(36)).slice(-4);if(e||(e=u),!e.get(l))return t=!0,e.set(l,!0),l}}class v{constructor(){this.connection={host:"c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud",port:8884,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:10,clientId:"client-id-"+d()+"-"+d(),username:"testuser",password:"password"},this.subscription={topic:"TELEMETRY",qos:0},this.receivedMessages="",this.qosList=[{label:0,value:0},{label:1,value:1},{label:2,value:2}],this.client={connected:!1},this.subscribeSuccess=!1,this.data=new Map}onConnectionLost(){console.log("onConnectionLost")}createConnection(e,t){const{host:l,port:n,endpoint:a,...o}=this.connection,s=`wss://${l}:${n}${a}`;try{this.client=r().connect(s,o),r().onConnectionLost=this.onConnectionLost}catch(i){console.log("mqtt.connect error",i)}this.client.on("connect",(()=>{"function"==typeof t&&t("orange"),console.log("Connection succeeded!")})),this.client.on("onConnectionLost",(()=>{console.log("Connection lost!!")})),this.client.on("error",(e=>{console.log("Connection failed",e)})),this.client.on("message",((l,n)=>{let a=(new TextDecoder).decode(n);"function"==typeof e&&e(a),"function"==typeof t&&t("green")}))}doSubscribe(){const{topic:e,qos:t}=this.subscription;this.client.subscribe(e,t,((e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))}))}doUnSubscribe(){const{topic:e}=this.subscription;this.client.unsubscribe(e,(e=>{e&&console.log("Unsubscribe error",e)}))}doPublish(){const{topic:e,qos:t,payload:l}=this.publish;this.client.publish(e,l,t,(e=>{e&&console.log("Publish error",e)}))}destroyConnection(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(e){console.log("Disconnect failed",e.toString())}}}const p=new v;var m=p;class w{constructor(){this.id=null,this.x=0,this.y=0,this.created=Date.now(),this.size=128,this.basicSize=128,this.diskSize=128,this.colored=!1,this.debug=!1,this.event={tag:"",name:"",value:"",raw:"",timestamp:""},this.predecessor=null,this.rendering={}}inject(e){e&&(this.x=e.x?e.x:0,this.y=e.y?e.y:0)}}class h extends w{constructor(){super(),this.type="wavelet",this.color="rgb(255,255,255)",this.options={fadein:!1,fadeout:!1,ringsFadeout:!1}}}const b="PACKET",f="TEMP_C",g="DBUG",y="ACTV",k="LOCH",_="GEOLOC",x="RSSI",S={eventsTypes:[{name:b,enabled:!0},{name:f,enabled:!0},{name:g,enabled:!0},{name:y,enabled:!0},{name:k,enabled:!0},{name:_,enabled:!0},{name:x,enabled:!0}]},z="SVG",U="GIF",C="WEBGL",M={types:[{name:z,description:"transp, mid perf",enabled:!0},{name:C,description:"dsbld, transp, higher perf, β",enabled:!1},{name:U,description:"non-transp. high perf",enabled:!1}]};function j(e,t,l){let n=370,a=250,o=n-a,s=l-t,i=l-e,c=o/s;return 360-(i*c-(n-360))}function D(e,t,l){const n=j(e,t,l);let a=100,o=50;n>280&&n<325&&(o=50,a=30),a/=100,o/=100;const s=e=>(e+n/30)%12,i=a*Math.min(o,1-o),c=e=>o-i*Math.max(-1,Math.min(s(e)-3,Math.min(9-s(e),1)));return[255*c(0),255*c(8),255*c(4)]}function H(e){const t=new Date(e),l=t.getHours(),n=t.getMinutes(),a=t.getSeconds();return(l<10?"0"+l:l)+":"+(n<10?"0"+n:n)+":"+(a<10?"0"+a:a)+"."+t.getMilliseconds()}var I={__name:"WaveletComponent",props:{wavelet:h},setup(e){return(t,l)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[e.wavelet.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,o.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-1*e.wavelet.diskSize/2)+"px; top:"+(e.wavelet.y-1*e.wavelet.diskSize/2)+"px;width: "+1*e.wavelet.diskSize+"px;height: "+1*e.wavelet.diskSize+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.diskSize/5+"px)")},null,6)):e.wavelet.predecessor&&e.wavelet.predecessor.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,o.C_)("shine"+(e.wavelet.predecessor.options.fadein?" shine_fadein":"")+(e.wavelet.predecessor.options.fadeout?" shine_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.predecessor.x-1*e.wavelet.predecessor.diskSize/2)+"px; top:"+(e.wavelet.predecessor.y-1*e.wavelet.predecessor.diskSize/2)+"px;width: "+1*e.wavelet.predecessor.diskSize+"px;height: "+1*e.wavelet.predecessor.diskSize+"px;background-color:"+e.wavelet.predecessor.color+";-webkit-filter: blur("+e.wavelet.predecessor.diskSize/5+"px)")},null,6)):(0,a.kq)("",!0),(0,a._)("div",{class:(0,o.C_)("wavelet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")+(e.wavelet.options.ringsFadeout?" wavelet_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("span",{key:0,class:(0,o.C_)("wavelet__value"),style:(0,o.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5)):(0,a.kq)("",!0),e.wavelet.debug&&e.wavelet.event.name!=(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("span",{key:1,class:"wavelet__value",style:(0,o.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.name?e.wavelet.event.name:"-")+(0,o.zw)(e.wavelet.event.value?" "+e.wavelet.event.value:""),5)):(0,a.kq)("",!0),e.wavelet.colored?((0,a.wg)(),(0,a.iD)("div",{key:2,class:"wavelet-coloring",style:(0,o.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,a.kq)("",!0)],6)],64))}};const T=I;var V=T;const E=["stroke-width"],q=["from","to"],O=(0,a._)("animate",{attributeType:"CSS",attributeName:"opacity",values:"0;1;1;1;1;0",dur:".8",begin:"0s",repeatCount:"1",fill:"freeze"},null,-1);var $={__name:"WaveletPacketComponent",props:{wavelet:h},setup(e){return(t,l)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[e.wavelet.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,o.C_)("shine"+(e.wavelet.options.fadein?" shine_fadein":"")+(e.wavelet.options.fadeout?" shine_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.diskSize/2)+"px; top:"+(e.wavelet.y-e.wavelet.diskSize/2)+"px;width: "+1*e.wavelet.diskSize+"px;height: "+1*e.wavelet.diskSize+"px;background-color:"+e.wavelet.color+";-webkit-filter: blur("+e.wavelet.diskSize/5+"px)")},null,6)):e.wavelet.predecessor&&e.wavelet.predecessor.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,o.C_)("shine"+(e.wavelet.predecessor.options.fadein?" shine_fadein":"")+(e.wavelet.predecessor.options.fadeout?" shine_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.predecessor.x-e.wavelet.predecessor.diskSize/2)+"px; top:"+(e.wavelet.predecessor.y-e.wavelet.predecessor.diskSize/2)+"px;width: "+e.wavelet.predecessor.diskSize+"px;height: "+e.wavelet.predecessor.diskSize+"px;background-color:"+e.wavelet.predecessor.color+";-webkit-filter: blur("+e.wavelet.predecessor.diskSize/5+"px)")},null,6)):(0,a.kq)("",!0),(0,a._)("div",{class:(0,o.C_)("wavelet wavelet_packet"+(e.wavelet.options.fadein?" wavelet_fadein":"")+(e.wavelet.options.fadeout?" wavelet_fadeout":"")+(e.wavelet.options.ringsFadeout?" wavelet_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[((0,a.wg)(),(0,a.iD)("svg",{xmlns:"http://www.w3.org/2000/svg",style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,a._)("circle",{r:"10",stroke:"#fff","stroke-width":e.wavelet.size/64*2,fill:"none",cx:"50%",cy:"50%"},[(0,a._)("animate",{attributeType:"XML",attributeName:"r",from:e.wavelet.size/20,to:e.wavelet.size/2,dur:"1",begin:"0",repeatCount:"1",keySplines:"0,.69,.16,1",calcMode:"spline"},null,8,q),O],8,E)],4)),e.wavelet.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("span",{key:0,class:(0,o.C_)("wavelet__value"),style:(0,o.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5)):(0,a.kq)("",!0),e.wavelet.debug&&e.wavelet.event.name!=(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("span",{key:1,class:"wavelet__value",style:(0,o.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.name?e.wavelet.event.name:"-")+(0,o.zw)(e.wavelet.event.value?" "+e.wavelet.event.value:""),5)):(0,a.kq)("",!0),e.wavelet.colored?((0,a.wg)(),(0,a.iD)("div",{key:2,class:"wavelet-coloring",style:(0,o.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,a.kq)("",!0)],6)],64))}};const R=$;var F=R,L={__name:"SvgWaveletComponent",props:{wavelet:h},setup(e){return(t,l)=>e.wavelet.event.name===(0,s.SU)(b)?((0,a.wg)(),(0,a.j4)((0,s.SU)(F),{key:0,wavelet:e.wavelet},null,8,["wavelet"])):((0,a.wg)(),(0,a.j4)((0,s.SU)(V),{key:1,wavelet:e.wavelet},null,8,["wavelet"]))}};const Y=L;var N=Y,P={__name:"GridWaveletComponent",props:{size:Number,map:Object},setup(e){return(t,l)=>((0,a.wg)(),(0,a.iD)("div",{class:"wavelet-gr wavelet-gr_eternal",style:(0,o.j5)("left:"+(e.map.x-e.size/2)+"px; top:"+(e.map.y-e.size/2)+"px;width: "+e.size+"px;height: "+e.size+"px;")},[(0,a._)("div",{class:"wavelet-gr__value",style:(0,o.j5)(`font-size: ${e.size/10<6?6:e.size/10}px;`)},(0,o.zw)(e.map.tag.slice(-4)),5)],4))}},A=l(89);const W=(0,A.Z)(P,[["__scopeId","data-v-06f2dc5c"]]);var B=W,G={__name:"GifWaveletComponent",props:{wavelet:h},setup(e){return(t,l)=>e.wavelet.event.name==(0,s.SU)(f)?((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,o.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[(0,a._)("span",{class:(0,o.C_)("wavelet-gif__value"),style:(0,o.j5)(`font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.value?e.wavelet.event.value:"-")+"°",5),e.wavelet.colored?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"wavelet-gif-coloring",style:(0,o.j5)(`background-color: ${e.wavelet.color}`)},null,4)):(0,a.kq)("",!0)],6)):((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,o.C_)("wavelet-gif"+(e.wavelet.options.fadein?" wavelet-gif_fadein":"")+(e.wavelet.options.fadeout?" wavelet-gif_fadeout":"")),style:(0,o.j5)("left:"+(e.wavelet.x-e.wavelet.size/2)+"px; top:"+(e.wavelet.y-e.wavelet.size/2)+"px;width: "+e.wavelet.size+"px;height: "+e.wavelet.size+"px;")},[e.wavelet.debug?((0,a.wg)(),(0,a.iD)("span",{key:0,class:"wavelet-gif__value",style:(0,o.j5)(`color: green; font-size: ${e.wavelet.size/10<6?6:e.wavelet.size/10}px;`)},(0,o.zw)(e.wavelet.event.name?e.wavelet.event.name:"-"),5)):(0,a.kq)("",!0)],6))}};const K=(0,A.Z)(G,[["__scopeId","data-v-73db6dd4"]]);var J=K;function X(e,t){var l=0,n=e.length;while(l<n&&e[l]===t)++l;while(n>l&&e[n-1]===t)--n;return l>0||n<e.length?e.substring(l,n):e}class Z{constructor(){}static parse(e,t){const l=X(e,'"').split(",");if(l[0]&&"events"==l[0]){let e=!1;if(t.forEach((t=>{const n=l.some((e=>e.includes("eventName="+t.name)));t.enabled&&n&&(e=!0)})),e){const e={};return l.forEach((t=>{t.includes("tagId")&&(e.tag=t.replace("tagId=","")),t.includes("eventName")&&(e.name=t.replace("eventName=","")),t.includes("eventValue")&&(e.name==b?e.value=JSON.parse(t.replace("eventValue=","").replace("&#44;",",")):e.value=Number.parseFloat(t.replace("eventValue=","")).toFixed(1),e.raw=t.replace("eventValue=","")),t.includes("timestamp")&&(e.timestamp=parseInt(t.replace("timestamp=","")))})),e.name===y&&0===parseInt(e.value)?null:e}}return null}}function Q(e,t,l,n){return n*(l/10)*(e/t)}const ee={resizeEvents:[{event:x,enabled:!0},{event:f,enabled:!0},{event:g,enabled:!0},{event:y,enabled:!0},{event:k,enabled:!0},{event:_,enabled:!0}]};function te(e){return ee.resizeEvents.find((t=>t.event===e&&!0===t.enabled))}function le(e){const t=new Map;if(!e)return t;const l=e.replace(/\r\n/g,"\n").split("\n");return l.forEach((e=>{const l=e.split(",");if("ID"!=l[0]){const e=l[0].replace("tagId=",""),n=parseInt(l[1]),a=parseInt(l[2]),o={x:n,y:a};o.tag=e;const s=parseFloat(l[3]);s&&(o.size=s),t.set(e,o)}})),t}function ne(){const e=function(e,t){console.log(t);const l=4e3,n=5026,a=15,o=27;let s;if(t&&t.size){const e=Array.from(t);s=e[Math.floor(Math.random()*e.length)]}else s="(01)00850027865010(21)00oeT"+Math.floor(Math.random()*(n-l)+l).toString();let i=(Math.random()*(o-a)+a).toFixed(4);const c=e[Math.floor(Math.random()*e.length)];return c.name===y&&(i=Math.round(Math.random())),c.name===b&&(i='{"TEMP":"'+(Math.random()*(o-a)+a).toFixed(4)+'"&#44;"RSSI":"70"}',console.log(i)),"events,tagId="+s+",eventName="+c.name+",eventValue="+i+",timestamp="+Date.now()};return{generateMessage:e}}const ae={files:["beep.mp3","beeps.mp3","beept.mp3","bell-clean.mp3","bell-deep.mp3","bell-high.mp3","bell-little.mp3","bell-ok.mp3","bell-small-cut.mp3","bell-soft.mp3","bellllll.mp3","bip.mp3","bleep.mp3","string.mp3","twit.mp3"]};var oe=l(5670);const se=new oe.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundAlpha:!0}),ie=new oe.W20;function ce(e){se.ticker.add((()=>{e.value==C&&ie.children.forEach((e=>{e.wavelet.options.fadein&&e.alpha<1&&(e.alpha+=.03),e.wavelet.options.fadeout&&e.alpha>0&&(e.alpha-=.03),e.children.forEach((e=>{e.scale.x<.3&&e.alpha<1&&(e.alpha+=.02),e.scale.x>.8&&(e.alpha-=.01),e.scale.x<1&&e.scale.set(e.scale.x+.025,e.scale.y+.025)}))}))}))}function re(e,t){const l=new oe.W20;l.width=t.value,l.height=t.value,l.x=e.x,l.y=e.y,l.pivot.x=l.width/2,l.pivot.y=l.height/2,l.wavelet=e,l.alpha=0;let n=new oe.TCu;n.lineStyle(3,16777215,1),n.drawCircle(0,0,.1*t.value),n.pivot.x=l.width/2,n.pivot.y=l.height/2,n.position.set(l.width/2,l.height/2),n.scale.set(.1,.1),l.addChild(n),ie.addChild(l)}ie.x=0,ie.y=0,ie.width=window.innerWidth,ie.height=window.innerHeight,ie.pivot.x=0,ie.pivot.y=0,se.stage.addChild(ie);const ue=e=>((0,a.dD)("data-v-873d02a2"),e=e(),(0,a.Cn)(),e),de={key:0,autoplay:"",muted:"",loop:"",id:"video"},ve=["src"],pe={key:1,id:"canvas-container"},me={class:"me-3"},we=ue((()=>(0,a._)("span",{class:"fw-lighter opacity-75"},"X:",-1))),he=ue((()=>(0,a._)("span",{class:"fw-lighter opacity-75"},"Y:",-1))),be={class:"mb-3"},fe={for:"map-file-upload",class:"form-label small"},ge=ue((()=>(0,a._)("span",{class:"text-white-50"},"Upload map CSV",-1))),ye=(0,a.Uk)(" ("),ke=(0,a.Uk)(")"),_e=ue((()=>(0,a._)("hr",null,null,-1))),xe=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Simulation",-1))),Se={class:"form-check form-switch mb-3"},ze=ue((()=>(0,a._)("label",{class:"form-check-label",for:"sim-checkbox",style:{color:"white"}}," Enable ",-1))),Ue=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2 small"},"Events per second",-1))),Ce=ue((()=>(0,a._)("hr",null,null,-1))),Me=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Grid",-1))),je={class:"form-check form-switch mb-3"},De=ue((()=>(0,a._)("label",{class:"form-check-label",for:"grid-checkbox",style:{color:"white"}}," Enable ",-1))),He={class:"form-check form-switch mb-3"},Ie=ue((()=>(0,a._)("label",{class:"form-check-label",for:"crosshair-checkbox",style:{color:"white"}}," Crosshair cursor ",-1))),Te=ue((()=>(0,a._)("hr",null,null,-1))),Ve=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Background",-1))),Ee={class:"form-check form-switch mb-3"},qe=ue((()=>(0,a._)("label",{class:"form-check-label",for:"background-image-enable-checkbox",style:{color:"white"}}," Image ",-1))),Oe={key:0,class:"mb-3"},$e=ue((()=>(0,a._)("label",{for:"background-image-upload",class:"form-label small"},[(0,a._)("span",{class:"text-white-50"},"Upload image")],-1))),Re={class:"form-check form-switch mb-3"},Fe=ue((()=>(0,a._)("label",{class:"form-check-label",for:"background-video-enable-checkbox",style:{color:"white"}}," Video ",-1))),Le={key:1,class:"mb-3"},Ye=ue((()=>(0,a._)("label",{for:"background-video-upload",class:"form-label small"},[(0,a._)("span",{class:"text-white-50"},"Upload video")],-1))),Ne=ue((()=>(0,a._)("hr",null,null,-1))),Pe={class:"form-check form-switch mb-3 d-none"},Ae=ue((()=>(0,a._)("label",{class:"form-check-label",for:"color-wavelets-checkbox",style:{color:"white"}}," Colorize wavelets ",-1))),We=ue((()=>(0,a._)("hr",{class:"d-none"},null,-1))),Be=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Sound",-1))),Ge={class:"form-check form-switch mb-3"},Ke=ue((()=>(0,a._)("label",{class:"form-check-label",for:"sound-on-checkbox",style:{color:"white"}}," Enable 🔉 ",-1))),Je={class:"form-check form-switch mb-3"},Xe=ue((()=>(0,a._)("label",{class:"form-check-label",for:"sound-simultaneous-checkbox",style:{color:"white"}}," Play simultaneous ",-1))),Ze=ue((()=>(0,a._)("div",{class:"text-white-50 small mb-2"},"Select mp3",-1))),Qe=["value"],et={class:"mb-3"},tt=ue((()=>(0,a._)("label",{for:"mp3-upload",class:"form-label small"},[(0,a._)("span",{class:"text-white-50"},"Or upload mp3")],-1))),lt=ue((()=>(0,a._)("hr",null,null,-1))),nt=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Basic wavelet size ↔",-1))),at=ue((()=>(0,a._)("hr",null,null,-1))),ot=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Disk size ↔",-1))),st=ue((()=>(0,a._)("hr",null,null,-1))),it=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"RSSI scale factor",-1))),ct=(0,a.Uk)(),rt={class:"text-muted small ms-3"},ut=ue((()=>(0,a._)("div",{class:"text-muted mt-1 font-monospace",style:{"font-size":"9px"}},"ui size * (scale/10) * (average rssi/rssi) ",-1))),dt=ue((()=>(0,a._)("hr",null,null,-1))),vt=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Color disk timeout, s",-1))),pt=ue((()=>(0,a._)("hr",null,null,-1))),mt={class:"row"},wt={class:"col"},ht=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Min t",-1))),bt={class:"col"},ft=ue((()=>(0,a._)("div",{class:"text-white-50 me-3 mb-2"},"Max t",-1))),gt=ue((()=>(0,a._)("hr",null,null,-1))),yt=ue((()=>(0,a._)("span",{class:"text-white-50 me-1"},"Rendering type",-1))),kt=["onUpdate:modelValue","value","id"],_t=["for"],xt={class:"small text-white-50"},St=ue((()=>(0,a._)("hr",null,null,-1))),zt=ue((()=>(0,a._)("span",{class:"text-white-50 me-1"},"Handle events",-1))),Ut=["onUpdate:modelValue","id"],Ct=["for"],Mt={class:"form-check form-switch mb-1"},jt=ue((()=>(0,a._)("label",{class:"form-check-label",for:"debug-wavelets-checkbox",style:{color:"rosybrown"}}," Debug mode ",-1))),Dt=ue((()=>(0,a._)("hr",null,null,-1))),Ht=ue((()=>(0,a._)("span",{class:"text-white-50 me-1"},"RSSI-based size",-1))),It=["onUpdate:modelValue","id"],Tt=["for"],Vt=ue((()=>(0,a._)("hr",null,null,-1))),Et=ue((()=>(0,a._)("span",{class:"text-white-50 me-1"},"Console log",-1))),qt=["onUpdate:modelValue","id"],Ot=["for"],$t=ue((()=>(0,a._)("hr",null,null,-1))),Rt=ue((()=>(0,a._)("span",{class:"text-white-50 me-3"},"UI position",-1))),Ft=ue((()=>(0,a._)("hr",null,null,-1)));var Lt={__name:"DisplayComponent",setup(e){let t={};localStorage.getItem("appSettings")?t=JSON.parse(localStorage.getItem("appSettings")):localStorage.setItem("appSettings",JSON.stringify(t));const l=(0,s.iH)(new Map),c=(0,s.iH)(new Map),r=(0,s.iH)(new Map),u=(0,s.iH)(1),d=(0,s.iH)(15),{backgroundImageEnabled:v,backgroundImage:p,uploadBackgroundImage:w,backgroundVideoEnabled:g,backgroundVideo:y,uploadBackgroundVideo:k}=i(),_=(0,s.iH)(!1),j=(0,s.iH)(!1),I=(0,s.iH)(!1),T=(0,s.iH)(!1),V=(0,s.iH)(!1);let E=[{state:j,name:"Events"},{state:I,name:"Rendering"},{state:T,name:"Lifetime"},{state:V,name:"Fading"}];function q(){m.createConnection(A,Nt),m.doSubscribe()}function O(){m.doUnSubscribe(),m.destroyConnection()}const $=t.renderingTypes?(0,s.qj)(t.renderingTypes):(0,s.qj)(M.types),R=t.rssiResizeEvents?(0,s.qj)(t.rssiResizeEvents):(0,s.qj)(ee.resizeEvents);let F=(0,s.qj)(t.eventsTypes);t.eventsTypes&&t.eventsTypes.length!=S.eventsTypes.length&&(F=(0,s.qj)(S.eventsTypes)),(0,a.YP)(F,(e=>{e.forEach((e=>{e.name!=x||e.enabled||(r.value.clear(),P.value=70)}))}));const L=(0,s.iH)(20),Y=(0,s.iH)(30),P=(0,s.iH)(70);function A(e){if(!0===_.value)return!1;if(j.value&&console.log(e),"string"==typeof e){const t=Z.parse(e,F);if(t){t.name===x&&r.value.set(t.tag,t.raw),j.value&&console.log(t);const e=c.value.get(t.tag);if(e){const n=new h;if(n.event=t,n.id=t.tag,t.name!==f&&l.value.has(t.tag)){const e=l.value.get(t.tag);e.event.name===f?n.predecessor=e:e.predecessor&&e.predecessor.event.name===f&&(n.predecessor=e.predecessor),n.predecessor&&n.predecessor.event.timestamp>n.event.timestamp&&(n.event.timestamp=n.predecessor.event.timestamp)}const a=D(n.event.value,L.value,Y.value);n.color=`rgb(${a[0]},${a[1]},${a[2]})`;let o=tl.value;r.value.has(t.tag)&&te(t.name)?o=Q(P.value,r.value.get(t.tag),u.value,tl.value):e.size&&(o=e.size),n.size=o,n.basicSize=tl.value,n.diskSize=ll.value,n.colored=Wt.value,n.debug=At.value,n.inject(e),l.value.set(t.tag,n),I.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+H(t.timestamp)+") is in map. Render."),Bt.value&&(Gt.value&&(Zt=new Audio(Xt)),Zt.play()),ul.value===C&&re(n,tl)}else I.value&&console.log("Tag "+t.tag+" ("+t.timestamp+" / "+H(t.timestamp)+") is not in map!")}else j.value&&console.log('Skip message "'+e+"\" (disabled or can't parse)")}}function W(e){let t=e.target;const l=new FileReader;l.onload=function(){c.value=le(l.result),console.log("Uploaded CSV:"),console.log(l.result.substring(0,200))},l.readAsText(t.files[0])}const G=(0,s.iH)(!1);function K(){!0===G.value?(O(),Yt.value="green",ue()):(Yt.value="red",q())}const X=(0,s.iH)(1),{generateMessage:oe}=ne();function ue(){if(!1===G.value)return!1;Lt.value=!Lt.value;const e=oe(F,c.value);A(e);const t=X.value>0?X.value:1;setTimeout(ue,1e3/t)}const Lt=(0,s.iH)(!0),Yt=(0,s.iH)("red");function Nt(e){Lt.value=!Lt.value,Yt.value=e}function Pt(){const e=Date.now();l.value.forEach((t=>{let n=10,a=1.2,o=1,s=1,i=n;if(t.event.name===b&&(n=a,i=a,o=.1,s=.1,t.predecessor&&t.predecessor.event.name===f)){t.predecessor.event.value=t.event.value.TEMP;const e=D(t.predecessor.event.value,L.value,Y.value);t.predecessor.color=`rgb(${e[0]},${e[1]},${e[2]})`}if(t.event.name===f||t.predecessor&&t.predecessor.event.name===f){const e=d.value;n=n<e?e:n}const c=e-t.created,r=Math.floor(c/1e3);t.options.fadein||(V.value&&console.log("Time to fadein for #"+t.event.tag),t.options.fadein=!0),(t.event.name===f||t.predecessor&&t.predecessor.event.name===f)&&r>=i-o&&!t.options.ringsFadeout&&(V.value&&console.log("Time to fadeout rings for #"+t.event.tag),t.options.ringsFadeout=!0),r>=n-s&&!t.options.fadeout&&(V.value&&console.log("Time to fadeout for #"+t.event.tag),t.options.fadeout=!0),r>=n&&(T.value&&console.log("Lifetime exceeded "+n+"s for #"+t.event.tag+" – removing"),l.value.delete(t.event.tag),ie.children.forEach((e=>{t.event.tag===e.wavelet.event.tag&&ie.removeChild(e)})))})),setTimeout(Pt,40)}const At=(0,s.iH)(!1),Wt=(0,s.iH)(!1),Bt=(0,s.iH)(!1),Gt=(0,s.iH)(!1),Kt="static/sound/",Jt=t.soundFileName&&t.soundFileName.includes(".mp3")?(0,s.iH)(t.soundFileName):(0,s.iH)("bell-high.mp3");let Xt=Kt+Jt.value,Zt=new Audio(Xt);function Qt(){Xt=Kt+Jt.value,Zt=new Audio(Xt)}function el(e){let t=e.target;t.files.length&&(Xt=URL.createObjectURL(t.files[0]),Zt=new Audio(Xt))}const tl=(0,s.iH)(128),ll=(0,s.iH)(128),nl=(0,s.iH)(0),al=(0,s.iH)(0),ol=(0,s.qj)({position:{x:0,y:0}});function sl(e){_.value&&(nl.value=e.clientX,al.value=e.clientY,ol.position.x=e.clientX,ol.position.y=e.clientY)}const il=(0,s.iH)(!1),cl=(0,s.iH)(0),rl=(0,s.qj)({positions:[{style:"left: 0; top: 0;"},{style:"right: 0; top: 0;"}]}),ul=(0,s.iH)(z);function dl(e){const t=e.target.value;$.forEach((e=>{e.name!=t&&(e.enabled=!1)})),ul.value=t}return(0,a.wF)((()=>{t&&(t.selectedRenderingType&&(ul.value=t.selectedRenderingType),t.basicSize&&(tl.value=t.basicSize),t.diskSize&&(ll.value=t.diskSize),t.rssiScaleFactor&&(u.value=t.rssiScaleFactor),t.temperatureDiskTimeout&&(d.value=t.temperatureDiskTimeout),t.minCelsius&&(L.value=t.minCelsius),t.maxCelsius&&(Y.value=t.maxCelsius),t.simulationMode&&(G.value=t.simulationMode),t.gridMode&&(_.value=t.gridMode),t.crosshairCursor&&(il.value=t.crosshairCursor),t.isSoundOn&&(Bt.value=t.isSoundOn),t.isSoundSimultaneous&&(Gt.value=t.isSoundSimultaneous),t.idsMap&&t.idsMap.length&&t.idsMap.forEach((e=>{c.value.set(e.tag,e)})),t.debugMode&&(At.value=t.debugMode),t.consoleEvents&&(j.value=t.consoleEvents),t.consoleRenderingInfo&&(I.value=t.consoleRenderingInfo),t.consoleLifetimeInfo&&(T.value=t.consoleLifetimeInfo),t.consoleFadingInfo&&(V.value=t.consoleFadingInfo))})),(0,a.bv)((()=>{!0===G.value?(Yt.value="green",ue()):(Yt.value="red",q()),Pt();const e=document.getElementById("canvas-container");e&&(e.appendChild(se.view),ce(ul))})),(0,a.YP)([ul,tl,ll,u,d,L,Y,c,G,_,il,Bt,Gt,Jt,$,F,At,R,j,I,T,V],(([e,l,n,a,o,s,i,c,r,u,d,v,p,m,w,h,b,f,g,y,k,_])=>{if(t||(t={}),t.selectedRenderingType=e,t.basicSize=l,t.diskSize=n,t.rssiScaleFactor=a,t.temperatureDiskTimeout=o,t.minCelsius=s,t.maxCelsius=i,t.simulationMode=r,t.gridMode=u,t.crosshairCursor=d,t.isSoundOn=v,t.isSoundSimultaneous=p,m.includes(".mp3")&&(t.soundFileName=m),c.size){const e=[...c.values()];e.length&&(t.idsMap=e)}t.renderingTypes=w,t.eventsTypes=h,t.debugMode=b,t.rssiResizeEvents=f,t.consoleEvents=g,t.consoleRenderingInfo=y,t.consoleLifetimeInfo=k,t.consoleFadingInfo=_,localStorage.setItem("appSettings",JSON.stringify(t))})),(e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,o.C_)("display"+((0,s.SU)(v)?" display_bg":"")),onMousemove:sl,style:(0,o.j5)((_.value&&il.value?"cursor: crosshair;":"")+(_.value?"box-shadow: inset 0 0 0 2px wheat;":"")+((0,s.SU)(v)&&(0,s.SU)(p)?"background-image: url("+(0,s.SU)(p)+")":""))},[(0,s.SU)(g)&&(0,s.SU)(y)?((0,a.wg)(),(0,a.iD)("video",de,[(0,a._)("source",{src:(0,s.SU)(y),type:"video/mp4"},null,8,ve)])):(0,a.kq)("",!0),ul.value===(0,s.SU)(C)?((0,a.wg)(),(0,a.iD)("div",pe)):(0,a.kq)("",!0),ul.value!==(0,s.SU)(C)?((0,a.wg)(!0),(0,a.iD)(a.HY,{key:2},(0,a.Ko)(l.value,(([e,t])=>((0,a.wg)(),(0,a.iD)(a.HY,{key:e},[ul.value===(0,s.SU)(z)?((0,a.wg)(),(0,a.j4)((0,s.SU)(N),{key:0,wavelet:t},null,8,["wavelet"])):(0,a.kq)("",!0),ul.value===(0,s.SU)(U)?((0,a.wg)(),(0,a.j4)((0,s.SU)(J),{key:1,wavelet:t},null,8,["wavelet"])):(0,a.kq)("",!0)],64)))),128)):(0,a.kq)("",!0),_.value?((0,a.wg)(),(0,a.iD)(a.HY,{key:3},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.value,(([e,t])=>((0,a.wg)(),(0,a.j4)((0,s.SU)(B),{key:e,size:tl.value,map:t},null,8,["size","map"])))),128)),(0,a._)("div",{class:"mouse-coordinates-tooltip",style:(0,o.j5)("top: "+ol.position.y+"px; left: "+ol.position.x+"px;")},[(0,a._)("span",me,[we,(0,a.Uk)(" "+(0,o.zw)(nl.value),1)]),(0,a._)("span",null,[he,(0,a.Uk)(" "+(0,o.zw)(al.value),1)])],4)],64)):(0,a.kq)("",!0),(0,a._)("div",{class:"ui-wrapper mb-3",style:(0,o.j5)(rl.positions[cl.value].style)},[(0,a._)("div",{class:"ui-container-toggle",style:(0,o.j5)(0===c.value.size?"display: block !important; ":"")},[(0,a._)("div",{class:(0,o.C_)(["connection-status mb-3",Yt.value]),style:(0,o.j5)("background-color:"+Yt.value+"; opacity: "+(Lt.value?1:.4)+";")},null,6),(0,a._)("div",be,[(0,a._)("label",fe,[ge,ye,(0,a._)("span",{style:(0,o.j5)(0===c.value.size?"color: red":"color: green")},(0,o.zw)(c.value.size)+" ids loaded",5),ke]),(0,a._)("input",{class:"form-control form-control-sm",id:"map-file-upload",type:"file",onChange:W},null,32)]),_e,(0,a._)("div",null,[xe,(0,a._)("div",Se,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=e=>G.value=e),id:"sim-checkbox",onChange:K},null,544),[[n.e8,G.value]]),ze]),(0,a._)("div",null,[Ue,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Set amount",style:{"max-width":"110px"},"onUpdate:modelValue":t[1]||(t[1]=e=>X.value=e)},null,512),[[n.nr,X.value]])])]),Ce,(0,a._)("div",null,[Me,(0,a._)("div",je,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=e=>_.value=e),id:"grid-checkbox"},null,512),[[n.e8,_.value]]),De]),(0,a._)("div",He,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[3]||(t[3]=e=>il.value=e),id:"crosshair-checkbox"},null,512),[[n.e8,il.value]]),Ie])]),Te,(0,a._)("div",null,[Ve,(0,a._)("div",Ee,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=e=>(0,s.dq)(v)?v.value=e:null),id:"background-image-enable-checkbox"},null,512),[[n.e8,(0,s.SU)(v)]]),qe]),(0,s.SU)(v)?((0,a.wg)(),(0,a.iD)("div",Oe,[$e,(0,a._)("input",{class:"form-control form-control-sm",id:"background-image-upload",type:"file",onChange:t[5]||(t[5]=(...e)=>(0,s.SU)(w)&&(0,s.SU)(w)(...e))},null,32)])):(0,a.kq)("",!0),(0,a._)("div",Re,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=e=>(0,s.dq)(g)?g.value=e:null),id:"background-video-enable-checkbox"},null,512),[[n.e8,(0,s.SU)(g)]]),Fe]),(0,s.SU)(g)?((0,a.wg)(),(0,a.iD)("div",Le,[Ye,(0,a._)("input",{class:"form-control form-control-sm",id:"background-video-upload",type:"file",onChange:t[7]||(t[7]=(...e)=>(0,s.SU)(k)&&(0,s.SU)(k)(...e))},null,32)])):(0,a.kq)("",!0)]),Ne,(0,a._)("div",Pe,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[8]||(t[8]=e=>Wt.value=e),id:"color-wavelets-checkbox"},null,512),[[n.e8,Wt.value]]),Ae]),We,(0,a._)("div",null,[Be,(0,a._)("div",Ge,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[9]||(t[9]=e=>Bt.value=e),id:"sound-on-checkbox"},null,512),[[n.e8,Bt.value]]),Ke]),(0,a._)("div",Je,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[10]||(t[10]=e=>Gt.value=e),id:"sound-simultaneous-checkbox"},null,512),[[n.e8,Gt.value]]),Xe]),Ze,(0,a.wy)((0,a._)("select",{class:"form-select form-select-sm mb-1","aria-label":"","onUpdate:modelValue":t[11]||(t[11]=e=>(0,s.dq)(Jt)?Jt.value=e:null),onChange:Qt},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(ae).files,(e=>((0,a.wg)(),(0,a.iD)("option",{value:e,key:e},(0,o.zw)(e),9,Qe)))),128))],544),[[n.bM,(0,s.SU)(Jt)]]),(0,a._)("div",et,[tt,(0,a._)("input",{class:"form-control form-control-sm",id:"mp3-upload",type:"file",onChange:el},null,32)])]),lt,(0,a._)("div",null,[nt,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[12]||(t[12]=e=>tl.value=e)},null,512),[[n.nr,tl.value]]),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[13]||(t[13]=e=>tl.value=32)},"32"),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[14]||(t[14]=e=>tl.value=64)},"64"),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[15]||(t[15]=e=>tl.value=128)},"128 "),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[16]||(t[16]=e=>tl.value=196)},"196 "),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[17]||(t[17]=e=>tl.value=256)},"256 ")]),at,(0,a._)("div",null,[ot,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[18]||(t[18]=e=>ll.value=e)},null,512),[[n.nr,ll.value]]),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[19]||(t[19]=e=>ll.value=32)},"32"),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[20]||(t[20]=e=>ll.value=64)},"64"),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[21]||(t[21]=e=>ll.value=128)},"128 "),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[22]||(t[22]=e=>ll.value=196)},"196 "),(0,a._)("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-2",onClick:t[23]||(t[23]=e=>ll.value=256)},"256 ")]),st,(0,a._)("div",null,[it,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2 d-inline-block",type:"number",placeholder:"Size in pixels",style:{"max-width":"80px"},"onUpdate:modelValue":t[24]||(t[24]=e=>u.value=e)},null,512),[[n.nr,u.value]]),ct,(0,a._)("span",rt," Average RSSI "+(0,o.zw)(P.value),1),ut]),dt,(0,a._)("div",null,[vt,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Amount in seconds",style:{"max-width":"80px"},"onUpdate:modelValue":t[25]||(t[25]=e=>d.value=e)},null,512),[[n.nr,d.value]])]),pt,(0,a._)("div",mt,[(0,a._)("div",wt,[ht,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Min t","onUpdate:modelValue":t[26]||(t[26]=e=>L.value=e)},null,512),[[n.nr,L.value]])]),(0,a._)("div",bt,[ft,(0,a.wy)((0,a._)("input",{class:"form-control form-control-sm mb-2",type:"number",placeholder:"Max t","onUpdate:modelValue":t[27]||(t[27]=e=>Y.value=e)},null,512),[[n.nr,Y.value]])])]),gt,(0,a._)("div",null,[yt,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)($),(e=>((0,a.wg)(),(0,a.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,onChange:dl,value:e.name,id:`rendering-type-checkbox-${e.name}`},null,40,kt),[[n.e8,e.enabled]]),(0,a._)("label",{class:"form-check-label",for:`rendering-type-checkbox-${e.name}`,style:{color:"white"}},[(0,a.Uk)((0,o.zw)(e.name)+" ",1),(0,a._)("sup",null,[(0,a._)("span",xt,(0,o.zw)(e.description),1)])],8,_t)])))),128))]),St,(0,a._)("div",null,[zt,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(F),(e=>((0,a.wg)(),(0,a.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`handle-wavelets-checkbox-${e.name}`},null,8,Ut),[[n.e8,e.enabled]]),(0,a._)("label",{class:"form-check-label",for:`handle-wavelets-checkbox-${e.name}`,style:{color:"white"}},(0,o.zw)(e.name),9,Ct)])))),128)),(0,a._)("div",Mt,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[28]||(t[28]=e=>At.value=e),id:"debug-wavelets-checkbox"},null,512),[[n.e8,At.value]]),jt])]),Dt,(0,a._)("div",null,[Ht,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(R),(e=>((0,a.wg)(),(0,a.iD)("div",{class:"form-check form-switch mb-1",key:e.event},[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.enabled=t,id:`rssi-event-size-checkbox-${e.event}`},null,8,It),[[n.e8,e.enabled]]),(0,a._)("label",{class:"form-check-label",for:`rssi-event-size-checkbox-${e.event}`,style:{color:"white"}},(0,o.zw)(e.event),9,Tt)])))),128))]),Vt,(0,a._)("div",null,[Et,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(E),(e=>((0,a.wg)(),(0,a.iD)("div",{class:"form-check form-switch mb-1",key:e.name},[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t=>e.state.value=t,id:`console-log-checkbox-${e.name}`},null,8,qt),[[n.e8,e.state.value]]),(0,a._)("label",{class:"form-check-label",for:`console-log-checkbox-${e.name}`,style:{color:"white"}},(0,o.zw)(e.name),9,Ot)])))),128))]),$t,(0,a._)("div",null,[Rt,(0,a._)("button",{type:"button",class:"btn btn-outline-light btn-sm me-2",onClick:t[29]||(t[29]=e=>cl.value=0)},"↖ Left"),(0,a._)("button",{type:"button",class:"btn btn-outline-light btn-sm",onClick:t[30]||(t[30]=e=>cl.value=1)},"Right ↗")]),Ft],4)],4)],38))}};const Yt=(0,A.Z)(Lt,[["__scopeId","data-v-873d02a2"]]);var Nt=Yt,Pt={__name:"App",setup(e){return(e,t)=>((0,a.wg)(),(0,a.j4)(Nt))}};const At=Pt;var Wt=At;l(8937);(0,n.ri)(Wt).mount("#app")}},t={};function l(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,l),o.loaded=!0,o.exports}l.m=e,function(){var e=[];l.O=function(t,n,a,o){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&o||s>=o)&&Object.keys(l.O).every((function(e){return l.O[e](n[c])}))?n.splice(c--,1):(i=!1,o<s&&(s=o));if(i){e.splice(u--,1);var r=a();void 0!==r&&(t=r)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,s=n[0],i=n[1],c=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(a in i)l.o(i,a)&&(l.m[a]=i[a]);if(c)var u=c(l)}for(t&&t(n);r<s.length;r++)o=s[r],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(u)},n=self["webpackChunkwavelets"]=self["webpackChunkwavelets"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(529)}));n=l.O(n)})();
//# sourceMappingURL=app.8d37fa6b.js.map