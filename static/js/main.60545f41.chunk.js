(this["webpackJsonpar-app"]=this["webpackJsonpar-app"]||[]).push([[0],{38:function(e,t,a){e.exports=a(57)},43:function(e,t,a){},44:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(19),r=a.n(i),o=(a(43),a(44),a(20)),s=a(21),c=a(12),u=a(28),m=a(27),h=a(59),d=a(60),p=a(61),g=a(62),f=(a(45),a(7)),E=a.n(f);delete E.a.Icon.Default.prototype._getIconUrl,E.a.Icon.Default.mergeOptions({iconRetinaUrl:a(46),iconUrl:a(47),shadowUrl:a(48)});var b=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={currentLocation:{lat:45.51,lng:-122.68},zoom:13,userLocation:[],userLocationFound:!1},n.getUserPosition=n.getUserPosition.bind(Object(c.a)(n)),n}return Object(s.a)(a,[{key:"getUserPosition",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.setState({userLocation:[t.coords.latitude,t.coords.longitude],userLocationFound:!0,currentLocation:[t.coords.latitude,t.coords.longitude]}),console.log(e.state)}))}},{key:"componentDidMount",value:function(){this.getUserPosition()}},{key:"render",value:function(){var e=this.state.userLocationFound?l.a.createElement(h.a,{position:this.state.userLocation},l.a.createElement(d.a,null,"Your location")):null;return l.a.createElement(p.a,{center:this.state.currentLocation,zoom:13,maxZoom:18},l.a.createElement(g.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),e)}}]),a}(n.Component),v=a(18),y=a.n(v),k=a(32),I=a(16),O=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).state={username:"",useremail:"",userID:"",stitch_res:[]},e.login=e.login.bind(Object(c.a)(e)),e.logout=e.logout.bind(Object(c.a)(e)),e.addamodule=e.addamodule.bind(Object(c.a)(e)),e.listmymodules=e.listmymodules.bind(Object(c.a)(e)),e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="capstonear_app-xkqng";this.client=I.c.hasAppClient(t)?I.c.getAppClient(t):I.c.initializeDefaultAppClient(t);var a=this.client.getServiceClient(I.b.factory,"mongodb-atlas");this.db=a.db("APP"),this.client.auth.hasRedirectResult()&&(this.client.auth.handleRedirectResult().then((function(t){e.setState({username:e.client.auth.authInfo.userProfile.data.name,useremail:e.client.auth.authInfo.userProfile.data.email,userID:e.client.auth.authInfo.userId})})),console.log(this.state))}},{key:"login",value:function(){var e=Object(k.a)(y.a.mark((function e(){var t,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.client.auth.isLoggedIn?(t=this.client.auth.user,this.setState({currentUser:t}),this.setState({username:this.client.auth.authInfo.userProfile.data.name,useremail:this.client.auth.authInfo.userProfile.data.email,userID:this.client.auth.authInfo.userId})):(a=new I.a,this.client.auth.loginWithRedirect(a),console.log(this.state));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.client.auth.logout();case 2:this.setState({username:"",useremail:"",userID:""});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addamodule",value:function(){this.db.collection("MODULES").insertOne({userID:this.state.userID,name:this.state.temp_module_name,owner:this.state.useremail}).catch(console.error)}},{key:"listmymodules",value:function(){var e=this;this.client.auth.isLoggedIn&&this.db.collection("MODULES").find({}).asArray().then((function(t){e.setState({stitch_res:t}),console.log(e.state.stitch_res[0])}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("p",null,"username:   ",this.state.username," "),l.a.createElement("p",null,"email:   ",this.state.useremail),l.a.createElement("p",null,"userid:   ",this.state.userID),l.a.createElement("button",{onClick:this.login}," Login with Google"),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.logout}," Log out "),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("input",{type:"text",id:"createmodule",placeholder:"module name?",onChange:function(t){return e.setState({temp_module_name:t.target.value})}}),l.a.createElement("button",{onClick:this.addamodule},"Add a Module"),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.listmymodules},"List my modules"),l.a.createElement("ul",null,this.state.stitch_res.map((function(e,t){return l.a.createElement("li",{key:t},e.name,", created by ",e.owner)}))))}}]),a}(n.Component),w=a(15),L=a(5);var j=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(b,null))},x=function(){return l.a.createElement("h2",null,"Admin")},D=function(){return l.a.createElement("h2",null,"Student")},S=function(){return l.a.createElement(w.a,{basename:"/"},l.a.createElement("div",{className:""},l.a.createElement("nav",{className:"bg-dark",style:{zIndex:1500}},l.a.createElement("ul",{className:"list-inline text-center",style:{marginBottom:0}},l.a.createElement("li",{className:"list-inline-item"},l.a.createElement(w.b,{className:"text-light",to:"/"},"Home")),l.a.createElement("li",{className:"list-inline-item"},l.a.createElement(w.b,{className:"text-light",to:"/admin"},"Admin")),l.a.createElement("li",{className:"list-inline-item"},l.a.createElement(w.b,{className:"text-light",to:"/student"},"Student")),l.a.createElement("li",{className:"list-inline-item"},l.a.createElement(w.b,{className:"text-light",to:"/menu"},"Menu")))),l.a.createElement(L.c,null,l.a.createElement(L.a,{path:"/menu"},l.a.createElement(O,null)),l.a.createElement(L.a,{path:"/admin"},l.a.createElement(x,null)),l.a.createElement(L.a,{path:"/student"},l.a.createElement(D,null)),l.a.createElement(L.a,{path:"/"},l.a.createElement(j,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.60545f41.chunk.js.map