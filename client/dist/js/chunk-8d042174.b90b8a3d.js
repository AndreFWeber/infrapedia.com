(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8d042174"],{"8a53":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.isVisible,width:"80%",top:"28vh","custom-class":e.customDialogClass,"close-on-click-modal":!1},on:{"update:visible":function(t){e.isVisible=t}}},[a("header",{staticClass:"header p0 no-selectable",attrs:{slot:"title"},slot:"title"},[a("h1",{staticClass:"inline-block font-semibold fs-xlarge"},[e._v("Report your issue")])]),a("el-form",{ref:"form",staticClass:"pr6 pl6",attrs:{model:e.form,rules:e.formRules}},[a("el-row",{attrs:{gutter:15}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Full Name",prop:"name"}},[a("el-input",{class:{dark:e.dark},model:{value:e.form.fullname,callback:function(t){e.$set(e.form,"fullname",t)},expression:"form.fullname"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Phone number"}},[a("div",{staticClass:"el-input"},[a("i-phone-input",{staticClass:"m0 p0 el-input__inner",attrs:{inputClasses:"el-input__inner issues-dialog"},on:{onInput:e.validatePhoneNumber},model:{value:e.form.phone.num,callback:function(t){e.$set(e.form.phone,"num",t)},expression:"form.phone.num"}})],1),a("el-collapse-transition",[e.form.phone.num&&!e.form.phone.valid?a("el-alert",{staticClass:"mt2 h8",attrs:{type:"error","show-icon":"",title:"This phone number is not valid",closable:!1}}):e._e()],1)],1)],1)],1),a("el-row",{attrs:{gutter:15}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Email",prop:"email"}},[a("el-input",{class:{dark:e.dark},attrs:{type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Issue",prop:"issue"}},[a("el-input",{class:{dark:e.dark},attrs:{type:"textarea"},model:{value:e.form.issue,callback:function(t){e.$set(e.form,"issue",t)},expression:"form.issue"}})],1)],1),a("el-col",{attrs:{span:24}},[a("vue-recaptcha",{ref:"catpcha",attrs:{sitekey:e.siteKey,loadRecaptchaScript:!0},on:{verify:e.handleCatchaVerification,error:function(){return e.catchaVerified=!1},expired:function(){return e.catchaVerified=!1}}})],1)],1)],1),a("footer",{staticClass:"footer flex justify-content-space-between pr0 pl6 mt4"},[a("small",{staticClass:"inline-block mt2"},[a("span",{staticClass:"text-red"},[e._v("*")]),e._v(" indicates required field ")]),a("div",[a("el-button",{staticClass:"mr2",attrs:{plain:"",type:"info"},on:{click:e.closeDialog}},[e._v("Cancel")]),a("el-button",{staticClass:"w24",attrs:{disabled:e.isFormUncomplete,type:"primary",plain:"",loading:e.isSendingData},on:{click:function(t){return e.submitForm("form")},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.submitForm("form")}}},[e._v("Report")])],1)])],1)},r=[],n=(a("4de4"),a("d81d"),a("b0c0"),a("b64b"),a("5530")),i=(a("96cf"),a("1da1")),l=a("0316"),o=a("5484"),u=a("9a1e"),c=a("ceaf"),m=a("e096"),f=a("1b83"),p=a("ddbf"),d={components:{VueRecaptcha:m["default"]},data:function(){return{siteKey:f["a"],loading:!1,isSendingData:!1,catchaVerified:null,form:{email:"",issue:"",phone:{num:"",valid:null},fullname:""},formRules:{phone:[],lastname:[{required:!0,message:"Please input your full name",trigger:"blur"}],email:[{required:!0,message:"Please input your email",trigger:"blur"},{type:"email",required:!0,message:"Please input a valid email",trigger:"change"}],issue:[{required:!0,message:"Please input the issue",trigger:["blur","change"]},{min:10,message:"Issue length should be at least 10",trigger:"blur"}]}}},computed:{isVisible:{get:function(){return this.$store.state.isIssueDialog},set:function(){return this.closeDialog()}},dark:function(){return this.$store.state.isDark},isFormUncomplete:function(){var e=this,t=Object.keys(this.form).filter((function(t){return!e.form[t]}));return!(!t.length&&this.catchaVerified)},customDialogClass:function(){return this.dark?"custom-dialog dark":"custom-dialog light"}},watch:{isVisible:function(e){if(!e)return this.$refs.catpcha.reset();this.setUserData()}},methods:{handleCatchaVerification:function(e){e&&(this.catchaVerified=!0)},setUserData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$auth.user){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,t.t0=u["b"],t.next=6,e.$auth.getUserID();case 6:return t.t1=t.sent,t.next=9,(0,t.t0)(t.t1);case 9:a=t.sent,a&&(s=a.user_metadata,e.form.fullname=s&&s.name?s.name:Object(p["a"])(a.name)?"":a.name,e.form.email=s&&s.email?s.email:a.email,e.form.phone=s&&s.phonenumber?s.phonenumber:{num:"",valid:null}),e.loading=!1;case 12:case"end":return t.stop()}}),t)})))()},sendIssueRequest:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.$store.state.map.focus,e.isSendingData=!0,t.t0=o["a"],t.t1=n["a"],t.t2=n["a"],t.next=7,e.$auth.getUserID();case 7:return t.t3=t.sent,t.t4={user_id:t.t3},t.t5=e.form,t.t6=(0,t.t2)(t.t4,t.t5),t.t7={},t.t8={elemnt:a.id,t:Object(c["a"])(a.type)},t.t9=(0,t.t1)(t.t6,t.t7,t.t8),t.next=16,(0,t.t0)(t.t9);case 16:s=t.sent,e.isSendingData=!1,s&&"error"!==s.t&&e.closeDialog();case 19:case"end":return t.stop()}}),t)})))()},validatePhoneNumber:function(e){var t=e.number,a=e.isValid;this.form.phone={num:t,valid:a}},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.sendIssueRequest()}))},closeDialog:function(){this.$store.commit("".concat(l["l"]),!1),this.$refs.form.resetFields(),this.form={email:"",issue:"",phone:{num:"",valid:null},fullname:""}}}},h=d,b=a("2877"),g=Object(b["a"])(h,s,r,!1,null,null,null);t["default"]=g.exports},ddbf:function(e,t,a){"use strict";function s(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())}a.d(t,"a",(function(){return s}))}}]);
//# sourceMappingURL=chunk-8d042174.b90b8a3d.js.map