import{I as r}from"./entry.03847b27.js";import{d as o}from"./WindTurbineGeneratorStore.eb0d735d.js";const n=r("WeatherdataStore",{state:()=>({currentData:[],allFetchedData:{}}),actions:{async checkByLocationId(a){try{return await $fetch(`/api/weatherdata/find/${a}`)}catch(t){console.error(t)}},async getByLocationId(a){try{let t=this.allFetchedData[a];return t||(t=await $fetch(`/api/weatherdata/${a}`),this.allFetchedData[a]=t),this.currentData=t,t}catch(t){console.error(t)}},async postData(a,t){a.forEach(e=>{e.location=t});try{console.log("Starting to register weather data in database");const e=await o.post("/api/weatherdata/create",a);return console.log(e.data.message),!0}catch(e){return console.error(e),!1}},setCurrentData(a){this.currentData=a},getCurrentData(){return this.currentData}}});export{n as u};
