var c=Object.defineProperty,p=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var i=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,l=(o,e)=>{for(var t in e||(e={}))f.call(e,t)&&i(o,t,e[t]);if(s)for(var t of s(e))_.call(e,t)&&i(o,t,e[t]);return o},d=(o,e)=>p(o,g(e));import{_ as w,u as b,m as S,j as k,r as v,o as y,c as E,a as u,b as n,w as C}from"./entry-cf580ef6.mjs";const N={name:"Login",data(){return{authStore:b(),loginData:{email:"korneel.eeckhout@gmail.com",password:"JNbEj27usbGzUhvZlAwh"}}},watch:{authStore:{handler(o){o.isLoggedIn&&this.$router.push("/profile")},deep:!0}},methods:d(l({},S(k,["addError","addMessage"])),{login(o){fetch("https://margot.fullstacksyntra.be/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(!e.ok)throw new Error("Can't login");return e.json()}).then(e=>{this.authStore.login(e.data.access_token,e.data.refresh_token).then(t=>{this.addMessage(`Logged in as ${t.first_name}`)})}).catch(e=>{console.error(e),this.addError("Could not login, check email and password"),this.authStore.logout()})}})},V=u("h1",null,"Login",-1);function j(o,e,t,x,r,h){const a=v("FormKit");return y(),E("div",null,[V,u("div",null,[n(a,{modelValue:r.loginData,"onUpdate:modelValue":e[0]||(e[0]=m=>r.loginData=m),type:"form","submit-label":"login",onSubmit:h.login},{default:C(()=>[n(a,{type:"email",name:"email",label:"E-mail",validation:"required"}),n(a,{type:"password",name:"password",label:"Password",validation:"required"})]),_:1},8,["modelValue","onSubmit"])])])}var B=w(N,[["render",j]]);export{B as default};