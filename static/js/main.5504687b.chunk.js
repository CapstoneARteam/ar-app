(this["webpackJsonpar-app"]=this["webpackJsonpar-app"]||[]).push([[0],{19:function(t,e,o){t.exports=o(32)},24:function(t,e,o){},25:function(t,e,o){},32:function(t,e,o){"use strict";o.r(e);var n=o(0),a=o.n(n),r=o(7),i=o.n(r),c=(o(24),o(25),o(14)),s=o(15),u=o(8),l=o(18),d=o(17),p=o(34),m=o(37),h=o(35),g=o(36),f=(o(26),o(4)),v=o.n(f);delete v.a.Icon.Default.prototype._getIconUrl,v.a.Icon.Default.mergeOptions({iconRetinaUrl:o(27),iconUrl:o(28),shadowUrl:o(29)});var L=function(t){Object(l.a)(o,t);var e=Object(d.a)(o);function o(t){var n;return Object(c.a)(this,o),(n=e.call(this,t)).handleLocationFound=function(t){n.setState({userLocationFound:!0,userLocation:t.latlng})},n.handleClick=function(){var t=n.mapRef.current;null!=t&&t.leafletElement.locate()},n.state={currentLocation:{lat:45.51,lng:-122.68},zoom:13,userLocation:[],userLocationFound:!1},n.getUserPosition=n.getUserPosition.bind(Object(u.a)(n)),n}return Object(s.a)(o,[{key:"getUserPosition",value:function(){var t=this;navigator.geolocation.getCurrentPosition((function(e){t.setState({userLocation:[e.coords.latitude,e.coords.longitude],userLocationFound:!0,currentLocation:[e.coords.latitude,e.coords.longitude]}),console.log(t.state)}))}},{key:"componentDidMount",value:function(){this.getUserPosition()}},{key:"render",value:function(){var t=this.state.userLocationFound?a.a.createElement(p.a,{position:this.state.userLocation},a.a.createElement(m.a,null,"Your location")):null;return a.a.createElement(h.a,{center:this.state.currentLocation,zoom:13,maxZoom:18},a.a.createElement(g.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),t)}}]),o}(n.Component);var b=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(L,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.5504687b.chunk.js.map