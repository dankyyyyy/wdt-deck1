import{_ as y}from"./LogoInverted.5939c69c.js";import{_ as C}from"./nuxt-link.891a4dd6.js";import{e as a}from"./WindTurbineGeneratorStore.eb0d735d.js";import{i as p}from"./chartUtils.2ab73b6e.js";import{s as h}from"./globalErrorHandling.ddcb321a.js";import{_ as b,o as i,c as u,a as e,n as r,v as c,b as _,w as S,x as W,u as g,F as w,s as V}from"./entry.03847b27.js";import{_ as T}from"./WtgCard.8393a8cd.js";import{_ as L}from"./SubmitButton.e22d1f2f.js";const D={name:"CreateAssetModal",data(){return{wtg:{name:""}}},methods:{handleCancelClick(){this.$emit("hideModal")},async handleSaveClick(){await this.validateWtg(this.wtg)},async isADupe(s){const t=await a().getAll();var m=!1;for(let d=0;d<t.length;d++)if(t[d].name===s.name){m=!0;break}return m},async validateWtg(s){await this.isADupe(s)?h("Name already taken, please select a different one."):!p(s.windSpeedLimit)||!p(s.plannedMaintenance)||!p(s.troubleshootVisits)||!p(s.averageTsHours)?h("Please make sure all attributes except for name are numerical."):s.name===""||s.windSpeedLimit===null||s.plannedMaintenance===null||s.troubleshootVisits===null||s.averageTsHours===null?h("Please make sure all fields are filled in."):(await a().post(s),this.$emit("hideModal"))}}},N={class:"modal rounded-lg flex-col",style:{"max-height":"80%","overflow-y":"scroll","overflow-x":"hidden"}},A=e("h3",{class:"font-semibold box-title"},"WTG Creation",-1),H={class:"py-5 flex flex-col flex-wrap content-normal"},G={class:"create-input"},B=e("label",{for:"name"},"Name: ",-1),P={class:"create-input whitespace-nowrap"},U=e("label",{for:"windSpeedLimit"},"Wind Speed Limit: ",-1),E=e("label",{for:"windSpeedLimit"}," m/s",-1),F={class:"create-input whitespace-nowrap"},I=e("label",{for:"limit"},"Planned Maintenance: ",-1),j=e("label",{for:"plannedMaintenance"}," h/WTG",-1),q={class:"create-input whitespace-nowrap"},z=e("label",{for:"limit"},"Troubleshoot Visits: ",-1),J=e("label",{for:"troubleshootVisits"}," /WTG",-1),K={class:"create-input whitespace-nowrap"},O=e("label",{for:"limit"},"Average TS hours: ",-1),Q=e("label",{for:"averageTsHours"}," h",-1),R={class:"flex w-full justify-end"};function X(s,t,m,d,o,l){return i(),u("div",{class:"overlay",onClick:t[7]||(t[7]=(...n)=>s.hideModal&&s.hideModal(...n))},[e("div",N,[A,e("div",H,[e("div",G,[B,r(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=n=>o.wtg.name=n),class:"border-2 rounded-md text-center"},null,512),[[c,o.wtg.name]])]),e("div",P,[U,r(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=n=>o.wtg.windSpeedLimit=n),class:"border-2 rounded-md text-center"},null,512),[[c,o.wtg.windSpeedLimit]]),E]),e("div",F,[I,r(e("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=n=>o.wtg.plannedMaintenance=n),class:"border-2 rounded-md text-center"},null,512),[[c,o.wtg.plannedMaintenance]]),j]),e("div",q,[z,r(e("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=n=>o.wtg.troubleshootVisits=n),class:"border-2 rounded-md text-center"},null,512),[[c,o.wtg.troubleshootVisits]]),J]),e("div",K,[O,r(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=n=>o.wtg.averageTsHours=n),class:"border-2 rounded-md text-center"},null,512),[[c,o.wtg.averageTsHours]]),Q])]),e("div",R,[e("button",{type:"submit",class:"border-2 rounded-md px-2",onClick:t[5]||(t[5]=(...n)=>l.handleCancelClick&&l.handleCancelClick(...n))}," Cancel "),e("button",{type:"submit",class:"rounded-md px-2 ml-2 dialog-button",onClick:t[6]||(t[6]=(...n)=>l.handleSaveClick&&l.handleSaveClick(...n))}," Save ")])])])}const Y=b(D,[["render",X]]),Z={name:"WTGList",data(){return{wtgs:[],isModalVisible:!1,loading:!1,isSelected:!1}},async mounted(){this.wtgs=await a().getAll(),this.wtgs.length==0||(this.loading=!1)},async updated(){this.wtgs=await a().getAll(),this.wtgs.length==0||(this.loading=!1)},methods:{showModal(){this.isModalVisible=!0},hideModal(){this.isModalVisible=!1},handleWtgSelected(s){a().setSelectedWtg(s)},handleWtgDeselected(){a().setSelectedWtg(null)},navigateToNextPage(){this.$router.push("/presetSummary")}}},$=e("div",{class:"heading-container"},[e("h1",{class:"generic-header"},"Wind Turbine Generators")],-1),ee={"deck-frame-translucent-container":""},te={key:0,class:"grid deck-frame-translucent"};function se(s,t,m,d,o,l){const n=y,v=C,x=Y,k=T,M=L;return i(),u(w,null,[_(v,{to:"/"},{default:S(()=>[_(n,{class:"inline-block align-middle w-full"})]),_:1}),$,o.isModalVisible?(i(),W(x,{key:0,onHideModal:l.hideModal},null,8,["onHideModal"])):g("",!0),e("div",ee,[o.wtgs!==void 0?(i(),u("div",te,[(i(!0),u(w,null,V(o.wtgs,f=>(i(),u("div",{key:f.id,class:"p-5"},[_(k,{wtg:f,onWtgSelected:l.handleWtgSelected,onWtgDeselected:l.handleWtgDeselected},null,8,["wtg","onWtgSelected","onWtgDeselected"])]))),128))])):g("",!0)]),_(M,{onClick:l.navigateToNextPage},null,8,["onClick"])],64)}const ue=b(Z,[["render",se]]);export{ue as default};
