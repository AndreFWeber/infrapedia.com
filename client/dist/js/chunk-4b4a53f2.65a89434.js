(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b4a53f2"],{"1b83":function(e,t,r){"use strict";var a="6LftgdoUAAAAAFsue2KOClJ7QLBnV2GAI28DRbTt";t["a"]=a},"8a53":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{visible:e.isVisible,width:"80%",top:"28vh","custom-class":e.customDialogClass,"close-on-click-modal":!1},on:{"update:visible":function(t){e.isVisible=t}}},[r("header",{staticClass:"header p0 no-selectable",attrs:{slot:"title"},slot:"title"},[r("h1",{staticClass:"inline-block font-semibold fs-xlarge"},[e._v("Report your issue")])]),r("el-form",{ref:"form",staticClass:"pr6 pl6",attrs:{model:e.form,rules:e.formRules}},[r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"Full Name",prop:"name"}},[r("el-input",{class:{dark:e.dark},model:{value:e.form.fullname,callback:function(t){e.$set(e.form,"fullname",t)},expression:"form.fullname"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"Phone number"}},[r("div",{staticClass:"el-input"},[r("i-phone-input",{staticClass:"m0 p0 el-input__inner",attrs:{inputClasses:"el-input__inner issues-dialog"},on:{onInput:e.validatePhoneNumber},model:{value:e.form.phone.num,callback:function(t){e.$set(e.form.phone,"num",t)},expression:"form.phone.num"}})],1),r("el-collapse-transition",[e.form.phone.num&&!e.form.phone.valid?r("el-alert",{staticClass:"mt2 h8",attrs:{type:"error","show-icon":"",title:"This phone number is not valid",closable:!1}}):e._e()],1)],1)],1)],1),r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"Email",prop:"email"}},[r("el-input",{class:{dark:e.dark},attrs:{type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"Issue",prop:"issue"}},[r("el-input",{class:{dark:e.dark},attrs:{type:"textarea"},model:{value:e.form.issue,callback:function(t){e.$set(e.form,"issue",t)},expression:"form.issue"}})],1)],1),r("el-col",{attrs:{span:24}},[r("vue-recaptcha",{ref:"catpcha",attrs:{sitekey:e.siteKey,loadRecaptchaScript:!0},on:{verify:e.handleCatchaVerification,error:function(){return e.catchaVerified=!1},expired:function(){return e.catchaVerified=!1}}})],1)],1)],1),r("footer",{staticClass:"footer flex justify-content-space-between pr0 pl6 mt4"},[r("small",{staticClass:"inline-block mt2"},[r("span",{staticClass:"text-red"},[e._v("*")]),e._v(" indicates required field ")]),r("div",[r("el-button",{staticClass:"mr2",attrs:{plain:"",type:"info"},on:{click:e.closeDialog}},[e._v("Cancel")]),r("el-button",{staticClass:"w24",attrs:{disabled:e.isFormUncomplete,type:"primary",plain:"",loading:e.isSendingData},on:{click:function(t){return e.submitForm("form")},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.submitForm("form")}}},[e._v("Report")])],1)])],1)},i=[],n=(r("4de4"),r("d81d"),r("b0c0"),r("b64b"),r("4c53"),r("5530")),s=(r("96cf"),r("1da1")),o=r("0316"),l=r("5484"),c=r("9a1e"),u=r("ceaf"),d=r("e096"),f=r("1b83"),p=r("ddbf"),m={components:{VueRecaptcha:d["a"]},data:function(){return{siteKey:f["a"],loading:!1,isSendingData:!1,catchaVerified:null,form:{email:"",issue:"",phone:{num:"",valid:null},fullname:""},formRules:{phone:[],lastname:[{required:!0,message:"Please input your full name",trigger:"blur"}],email:[{required:!0,message:"Please input your email",trigger:"blur"},{type:"email",required:!0,message:"Please input a valid email",trigger:"change"}],issue:[{required:!0,message:"Please input the issue",trigger:["blur","change"]},{min:10,message:"Issue length should be at least 10",trigger:"blur"}]}}},computed:{isVisible:{get:function(){return this.$store.state.isIssueDialog},set:function(){return this.closeDialog()}},dark:function(){return this.$store.state.isDark},isFormUncomplete:function(){var e=this,t=Object.keys(this.form).filter((function(t){return!e.form[t]}));return!(!t.length&&this.catchaVerified)},customDialogClass:function(){return this.dark?"custom-dialog dark":"custom-dialog light"}},watch:{isVisible:function(e){if(!e)return this.$refs.catpcha.reset();this.setUserData()}},methods:{handleCatchaVerification:function(e){e&&(this.catchaVerified=!0)},setUserData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$auth.user){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,t.next=5,Object(c["a"])(e.$auth.user.sub);case 5:r=t.sent,r&&(a=r.user_metadata,e.form.fullname=a&&a.name?a.name:Object(p["a"])(r.name)?"":r.name,e.form.email=a&&a.email?a.email:r.email,e.form.phone=a&&a.phonenumber?a.phonenumber:{num:"",valid:null}),e.loading=!1;case 8:case"end":return t.stop()}}),t)})))()},sendIssueRequest:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$store.state.map.focus,e.isSendingData=!0,t.next=4,Object(l["a"])(Object(n["a"])({user_id:e.$auth.user.sub},e.form,{elemnt:r.id,t:Object(u["a"])(r.type)}));case 4:a=t.sent,e.isSendingData=!1,a&&"error"!==a.t&&e.closeDialog();case 7:case"end":return t.stop()}}),t)})))()},validatePhoneNumber:function(e){var t=e.number,r=e.isValid;this.form.phone={num:t,valid:r}},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.sendIssueRequest()}))},closeDialog:function(){this.$store.commit("".concat(o["l"]),!1),this.$refs.form.resetFields(),this.form={email:"",issue:"",phone:{num:"",valid:null},fullname:""}}}},h=m,g=r("2877"),b=Object(g["a"])(h,a,i,!1,null,null,null);t["default"]=b.exports},ddbf:function(e,t,r){"use strict";function a(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())}r.d(t,"a",(function(){return a}))},e096:function(e,t,r){"use strict";function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},a.apply(this,arguments)}var i=function(){var e=!1,t=[],r=function(r){if(!e){e=!0;for(var a=0,i=t.length;a<i;a++)t[a](r)}},a=function(r){e?r():t.push(r)},i={resolved:function(){return e},resolve:r,promise:{then:a}};return i},n=Object.prototype.hasOwnProperty;function s(){var e=i();return{notify:function(){e.resolve()},wait:function(){return e.promise},render:function(e,t,r){this.wait().then((function(){r(window.grecaptcha.render(e,t))}))},reset:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(e)})))},execute:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(e)})))},checkRecaptchaLoad:function(){n.call(window,"grecaptcha")&&n.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!e.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var o=s();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=o.notify);var l={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var e=document.createElement("script");e.id=this.recaptchaScriptId,e.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,e.async=!0,e.defer=!0,document.head.appendChild(e)}},mounted:function(){var e=this;o.checkRecaptchaLoad();var t=a({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),r=this.$slots["default"]?this.$el.children[0]:this.$el;o.render(r,t,(function(t){e.$widgetId=t,e.$emit("render",t)}))},methods:{reset:function(){o.reset(this.$widgetId)},execute:function(){o.execute(this.$widgetId)},emitVerify:function(e){this.$emit("verify",e)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(e){return e("div",{},this.$slots["default"])}};t["a"]=l}}]);
//# sourceMappingURL=chunk-4b4a53f2.65a89434.js.map