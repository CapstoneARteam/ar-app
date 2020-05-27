(this["webpackJsonpar-app"]=this["webpackJsonpar-app"]||[]).push([[0],{139:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=139},279:function(e,t,n){e.exports=n(495)},284:function(e,t,n){},285:function(e,t,n){},303:function(e,t){},305:function(e,t){},315:function(e,t){},317:function(e,t){},343:function(e,t){},345:function(e,t){},346:function(e,t){},352:function(e,t){},354:function(e,t){},372:function(e,t){},375:function(e,t){},391:function(e,t){},394:function(e,t){},434:function(e,t){},436:function(e,t){},494:function(e,t,n){},495:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(63),i=n.n(r),c=(n(284),n(53)),l=n(54),s=n(34),u=n(56),m=n(55),d=(n(285),n(286),n(497)),p=n(501),h=n(502),f=n(503),g=(n(174),n(28)),b=n.n(g);delete b.a.Icon.Default.prototype._getIconUrl,b.a.Icon.Default.mergeOptions({iconRetinaUrl:n(287),iconUrl:n(288),shadowUrl:n(289)});var v=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={currentLocation:{lat:45.51,lng:-122.68},zoom:13,userLocation:[],userLocationFound:!1},a.getUserPosition=a.getUserPosition.bind(Object(s.a)(a)),a}return Object(l.a)(n,[{key:"getUserPosition",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.setState({userLocation:[t.coords.latitude,t.coords.longitude],userLocationFound:!0,currentLocation:[t.coords.latitude,t.coords.longitude]}),console.log(e.state)}))}},{key:"componentDidMount",value:function(){this.getUserPosition()}},{key:"render",value:function(){var e=this.state.userLocationFound?o.a.createElement(d.a,{position:this.state.userLocation},o.a.createElement(p.a,null,"Your location")):null;return o.a.createElement("div",{id:"leaflet-container"},o.a.createElement(h.a,{center:this.state.currentLocation,zoom:13,maxZoom:18},o.a.createElement(f.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),e))}}]),n}(a.Component),E=n(119),O=n(48),x=n.n(O),y=n(85),j=n(43),w=n(167),k=n(121),I=n(23);function _(){var e=Object(E.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #343a40;\n  transform: ",";\n  height: 100vh;\n  text-align: left;\n  padding: 2rem;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom:0;\n  transition: transform 0.3s ease-in-out;\n  z-index: 1501;\n\n  @media (max-width: 150px) {\n      width: 100%;\n    }\n\n  a {\n    font-size: 1.5rem;\n    text-transform: uppercase;\n    padding: 2rem 0;\n    font-weight: Light;\n    letter-spacing: 0.5rem;\n    color: #FFFFF;\n    text-decoration: none;\n    transition: color 0.3s linear;\n  \n    \n    @media (max-width: 150px) {\n      font-size: 1rem;\n      text-align: center;\n    }\n\n    &:hover {\n      color: #343078;\n    }\n  }\n"]);return _=function(){return e},e}var C=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={username:"",useremail:"",userID:"",stitch_res:[],menuOpen:a.props.open},a.login=a.login.bind(Object(s.a)(a)),a.logout=a.logout.bind(Object(s.a)(a)),a.addamodule=a.addamodule.bind(Object(s.a)(a)),a.listmymodules=a.listmymodules.bind(Object(s.a)(a)),console.log(e),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(y.a)(x.a.mark((function e(){var t,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="capstonear_app-xkqng",j.c.hasAppClient(t)&&(this.client=j.c.getAppClient(t),n=this.client.getServiceClient(j.b.factory,"mongodb-atlas"),this.db=n.db("APP"),this.client.auth.isLoggedIn&&this.client.auth.authInfo.userProfile&&(this.setState({username:this.client.auth.authInfo.userProfile.data.first_name,useremail:this.client.auth.authInfo.userProfile.data.email,userID:this.client.auth.authInfo.userId,userImg:this.client.auth.authInfo.userProfile.data.picture}),console.log(this.client.auth.authInfo.userProfile.data)));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"login",value:function(){var e=Object(y.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new j.a,this.client.auth.loginWithRedirect(t),console.log(this.state);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(y.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.client.auth.logout();case 2:this.setState({username:"",useremail:"",userID:""}),window.location.reload();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addamodule",value:function(){this.db.collection("MODULES").insertOne({userID:this.state.userID,name:this.state.temp_module_name,owner:this.state.useremail}).catch(console.error)}},{key:"listmymodules",value:function(){var e=this;this.client.auth.isLoggedIn&&this.db.collection("PINS").find({_id:Object(w.ObjectId)("5ebed1bc5992681f357d7948")}).asArray().then((function(t){e.setState({stitch_res:t}),console.log(e.state.stitch_res[0])}))}},{key:"render",value:function(){var e=this;return o.a.createElement(S,{open:this.props.open,setOpen:this.props.setOpen,center_container:this.props.center_container},o.a.createElement("div",{style:{position:"absolute",top:"2rem"}},o.a.createElement("img",{src:this.state.userImg,style:{maxHeigh:"80px",maxWidth:"80px",borderRadius:"50%",top:"1rem"}}),o.a.createElement("p",{style:{fontSize:"1.5rem",top:"4rem",color:"white",zIndex:1002}}," Welcome, ",o.a.createElement("br",null)," ",this.state.username," ")),o.a.createElement("ul",{style:{listStyleType:"none",paddingLeft:0},onClick:function(){e.props.center_container.center_container.current.style.opacity=1,e.props.setOpen(!e.props.open)}},o.a.createElement("li",null,o.a.createElement("a",{href:"#/"},"Home")),o.a.createElement("br",null),o.a.createElement("li",null,o.a.createElement("a",{href:"#/droppin"},"Drop pin")),o.a.createElement("br",null),o.a.createElement("li",null,o.a.createElement("a",{href:"#/viewmodules"},"My Modules"))),o.a.createElement("a",{href:"#",onClick:this.logout,style:{position:"absolute",fontSize:"1rem",fontColor:"#00000",bottom:"10rem"}},"Log Out "))}}]),n}(a.Component),S=k.a.nav(_(),(function(e){return e.open?"translateX(-100)":"translateX(100%)"})),L=Object(I.f)(C),D=(n(494),function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(c.a)(this,n);return(e=t.call(this)).client=j.c.getAppClient("capstonear_app-xkqng"),e.login=e.login.bind(Object(s.a)(e)),e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.client.auth.hasRedirectResult()&&(console.log("has results"),this.client.auth.handleRedirectResult().then((function(t){e.setState({username:e.client.auth.authInfo.userProfile.data.name,useremail:e.client.auth.authInfo.userProfile.data.email,userID:e.client.auth.authInfo.userId}),window.location.replace("#/")})))}},{key:"login",value:function(){var e=Object(y.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new j.a,e.next=3,this.client.auth.loginWithRedirect(t);case 3:console.log(this.state);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.a.createElement("div",{class:"row justify-content-center",style:{position:"fixed",margin:"auto",left:0,right:0,top:0,bottom:0,height:"50px"}},o.a.createElement("button",{class:"btn btn-primary",onClick:this.login},"Login with Google"))}}]),n}(a.Component)),P=n(275),F=n(86),M={position:"fixed",width:"60px",height:"60px",bottom:"40px",right:"40px",backgroundColor:"#0C9",color:"#FFF",borderRadius:"50px",textAlign:"center",boxShadow:"2px 2px 3px #999",zIndex:1500},z=function(){var e=Object(a.useState)([45,45]),t=Object(F.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),c=Object(F.a)(i,2),l=c[0],s=c[1],u=Object(a.useState)(!1),m=Object(F.a)(u,2),g=m[0],b=m[1];return Object(a.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,a=t.longitude;r([n,a]),console.log(e.coords)}))}),[]),o.a.createElement(h.a,{center:n,zoom:13,onClick:function(e){g&&(s([].concat(Object(P.a)(l),[o.a.createElement(d.a,{position:[e.latlng.lat,e.latlng.lng]},o.a.createElement(p.a,null,"testing"))])),b(!g))}},o.a.createElement("button",{style:M,onClick:function(){return b(!g)}},o.a.createElement("div",{style:{fontSize:"40px"}},"+")),o.a.createElement(f.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),o.a.createElement(d.a,{position:n},o.a.createElement(p.a,null,"Your location")),l)};function N(){var e=Object(E.a)(["\n  position: fixed;\n  top: 10px;\n  right: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  width: 2rem;\n  height: 2rem;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  z-index: 1502;\n\n  &:focus {\n    outline: none;\n  }\n\n  div {\n    width: 2rem;\n    height: 0.25rem;\n    background: ",";\n    border-radius: 10px;\n    transition: all 0.3s linear;\n    position: relative;\n    transform-origin: 1px;\n\n    :first-child {\n      transform: ",";\n    }\n\n    :nth-child(2) {\n      opacity: ",";\n      transform: ",";\n    }\n\n    :nth-child(3) {\n      transform: ",";\n    }\n  }\n"]);return N=function(){return e},e}var R=k.a.button(N(),(function(e){e.open;return"#FFFFFF"}),(function(e){return e.open?"rotate(45deg)":"rotate(0)"}),(function(e){return e.open?"0":"1"}),(function(e){return e.open?"translateX(20px)":"translateX(0)"}),(function(e){return e.open?"rotate(-45deg)":"rotate(0)"})),U=function(e){var t=e.open,n=e.setOpen,a=e.center_container;return console.log(a.center_container.current),o.a.createElement(R,{open:t,onClick:function(){n(!t),a.center_container.current.style.opacity=t?1:.5}},o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null))},W=function(e){var t=o.a.useState(!1),n=Object(F.a)(t,2),a=n[0],r=n[1];return o.a.createElement("div",null,o.a.createElement(U,{open:a,setOpen:r,center_container:e}),o.a.createElement(L,{open:a,setOpen:r,center_container:e}))},A=n(499),T=n(500),B=n(498),H=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={modules:[{name:"OMSI"},{name:"PSU"},{name:"DOWNTOWN"},{name:"DOWNTOWN2"}]},a.add_module_cards=a.add_module_cards.bind(Object(s.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"add_module_cards",value:function(){var e=this.state.modules.map((function(e){return o.a.createElement(T.a,{style:{top:"60px",margin:".25rem",maxWidth:"23rem"}},o.a.createElement(T.a.Body,null,o.a.createElement(T.a.Img,{variant:"top",src:"https://www.interjet.com/images/img.jpg"}),o.a.createElement(T.a.Title,null,e.name),o.a.createElement(T.a.Subtitle,{className:"mb-2 text-muted"},"by someone"),o.a.createElement(T.a.Text,null,"this is the description of this OMSI module"),o.a.createElement("button",{className:"btn btn-primary"},"View Module")))}));return o.a.createElement("div",{style:{overflow:"visible"}},o.a.createElement(B.a,null,e))}},{key:"render",value:function(){return this.add_module_cards()}}]),n}(a.Component),X=n(272),q=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(c.a)(this,n),(e=t.call(this)).Home=function(){return e.client.auth.isLoggedIn?o.a.createElement("div",null,o.a.createElement(v,null)):o.a.createElement(D,null)},e.NavMenu=function(){if(e.client.auth.isLoggedIn)return o.a.createElement(W,{center_container:e.center_container})};var a="capstonear_app-xkqng";return e.client=j.c.hasAppClient(a)?j.c.getAppClient(a):j.c.initializeDefaultAppClient(a),e.client.auth.hasRedirectResult()&&(console.log("has results"),e.client.auth.handleRedirectResult().then((function(e){window.location.reload()}))),e.state={isLoggedIn:!1},e.center_container=o.a.createRef(),e.NavMenu=e.NavMenu.bind(Object(s.a)(e)),e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"handleStitchClient",value:function(){this.setState({stitchClient:this.client,userProfile:this.client.auth.userProfile,isLoggedIn:!0})}},{key:"render",value:function(){return o.a.createElement(X.a,{basename:"/"},o.a.createElement("div",{className:"",style:{height:"100vh"}},o.a.createElement("div",null,o.a.createElement(A.a,{className:"navbar bg-dark navbar-dark",style:{position:"fixed",width:"100%",height:"50px",zIndex:1500}},o.a.createElement(A.a.Brand,null,"CS Capstone")),this.NavMenu()),o.a.createElement("div",{ref:this.center_container,className:"myclass"},o.a.createElement(I.c,null,o.a.createElement(I.a,{exact:!0,path:"/"},this.Home),o.a.createElement(I.a,{exact:!0,path:"/menu",component:L}),o.a.createElement(I.a,{exact:!0,path:"/droppin"},o.a.createElement(z,null)),o.a.createElement(I.a,{exact:!0,path:"/create_module",component:J}),o.a.createElement(I.a,{exact:!0,path:"/viewmodules",component:H})))))}}]),n}(a.Component),J=function(){return o.a.createElement("h2",null,"Admin")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[279,1,2]]]);
//# sourceMappingURL=main.11cd2a53.chunk.js.map