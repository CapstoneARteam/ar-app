import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer,Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {Stitch, RemoteMongoClient, GoogleRedirectCredential} from "mongodb-stitch-browser-sdk"
import { ObjectId } from 'mongodb'
//import './ViewPinOnMap.css'
import { map } from 'jquery'




delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


var myIcon = new L.divIcon({
  className: 'my-div-icon',
  html: '<img class="my-div-image" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"/>'
})

const floatStyle = {
  position: "fixed",
  width: "60px",
  height: "60px",
  bottom: "40px",
  right: "40px",
  backgroundColor: "#0C9",
  color: "#FFF",
  borderRadius: "50px",
  textAlign: "center",
  boxShadow: "2px 2px 3px #999",
  zIndex: 1500,
};
const nextButtonStyle = {
  position: "fixed",
  width: "60px",
  height: "60px",
  bottom: "40px",
  right: "120px",
  backgroundColor: "#74E4E9",
  color: "#000000",
  borderRadius: "40px",
  textAlign: "center",
  boxShadow: "2px 2px 3px #999",
  zIndex: 1500,
};
const previousButtonStyle = {
  position: "fixed",
  width: "60px",
  height: "60px",
  bottom: "40px",
  right: "240px",
  backgroundColor: "#74E4E9",
  color: "#000000",
  borderRadius: "40px",
  textAlign: "center",
  boxShadow: "2px 2px 3px #999",
  zIndex: 1500,
};
const currentButtonStyle = {
  position: "fixed",
  width: "60px",
  height: "60px",
  bottom: "40px",
  right: "180px",
  backgroundColor: "#0C9",
  color: "#FFF",
  borderRadius: "50px",
  textAlign: "center",
  boxShadow: "2px 2px 3px #999",
  zIndex: 1500,
};

class ViewPinOnMap extends Component{
  constructor(props){
    super(props)

    this.state ={
      currentLocation: {lat: 45.51, lng:-122.68},
      zoom: 13,
      userLocation:[],
      userLocationFound: false,
      username:"",
      useremail:"",
      userID:"",
      stitch_res:[],
      pin:[],
      pins_line:[],
      pins_array:[],
      current_pin_index: 0,
    }
  this.getUserPosition = this.getUserPosition.bind(this)
  this.drawpins = this.drawpins.bind(this)
  this.drawlines = this.drawlines.bind(this)
  this.openGoogle = this.openGoogle.bind(this)
  this.centerMap=this.centerMap.bind(this)
  this.nextPin=this.nextPin.bind(this)
  this.previousPin=this.previousPin.bind(this)
  this.currentPin=this.currentPin.bind(this)
  this.bounds = undefined;

  const appId = "capstonear_app-xkqng"
  this.client = Stitch.hasAppClient(appId)
  ? Stitch.getAppClient(appId)
  : Stitch.initializeDefaultAppClient(appId)
  const mongodb = this.client.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
  );
  this.db = mongodb.db("APP"); 
  }
  

  getUserPosition(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ userLocation : [position.coords.latitude, position.coords.longitude], userLocationFound:true, currentLocation : [position.coords.latitude, position.coords.longitude]})
      
      //console.log(this.state)
      
    })
  
  }

  boundingRect(coords) {
    return coords
      .reduce((acc, curr) => {
        const [lat, lng] = curr;
        acc[0][0] = lat < acc[0][0] ? lat : acc[0][0];
        acc[0][1] = lng < acc[0][1] ? lng : acc[0][1];
        acc[1][0] = lat > acc[1][0] ? lat : acc[1][0];
        acc[1][1] = lng > acc[1][1] ? lng : acc[1][1];
        return acc;
      }, [[90, 180], [-90, -180]]);
  }

  AddPaddingToRect(rect, percent=0.10){
    const [latMin, lngMin] = rect[0];
    const [latMax, lngMax] = rect[1];
    const lngPad = (lngMax - lngMin) * percent;
    const latPad = (latMax - latMin) * percent;
    return [
      [latMin - latPad, lngMin - lngPad],
      [latMax + latPad, lngMax + lngPad]
    ];
  }

  componentDidMount(){
    this.getUserPosition()
    this.drawpins()
  }

  async drawpins() {
    if(!this.client.auth.isLoggedIn){
        return
    }
    const query ={_id: ObjectId(this.props.match.params.id) };
    await this.db.collection("MODULES").findOne(query)
    .then((stitch_res) => {this.setState({stitch_res})
      const pipeline = [
        { $match: { _id: { $in: stitch_res.pins } } },
        {
            $addFields: {
                __order: { $indexOfArray: [stitch_res.pins, "$_id"] },
            },
        },
        { $sort: { __order: 1 } },
    ];
    this.db.collection("PINS").aggregate(pipeline)
      .toArray()
      .then((res) => {
        this.bounds = this.AddPaddingToRect(
          this.boundingRect([...res.map(elem => elem.coords), this.state.currentLocation]));
        this.setState({ pins_array: res })
      });

    }
    )
  }
  drawlines(){
   
    if(this.state.pins_line.length>0)
    {
      return (
        <Polyline positions={this.state.pins_line} color ={'red'}>
      </Polyline>
      )
    }
    return
  } 
  openGoogle(coords)
  {
    var url= "http://maps.google.com?q="+coords[0]+","+coords[1]
    var win = window.open(url, '_blank');
    return
  }
  centerMap(obj,coords)
  {
    const map = this.refs.map.leafletElement
    map.doubleClickZoom.disable();
    setTimeout(function() {
         map.doubleClickZoom.enable();
    }, 1000);
    map.setView(coords)
  }
  nextPin()
  {
    const map = this.refs.map.leafletElement
    map.doubleClickZoom.disable();
    setTimeout(function() {
         map.doubleClickZoom.enable();
    }, 1000);
    var temp = this.state.current_pin_index+1
    if(temp >= this.state.pins_array.length-1)
    {
      temp=this.state.pins_array.length-1
    }
    console.log("current pin index", this.state.current_pin_index)
    map.setView(this.state.pins_array[temp].coords)
    const pin =this.refs[temp].leafletElement
    pin.openPopup()
    this.setState({current_pin_index:temp})
  }
  previousPin()
  {
    const map = this.refs.map.leafletElement
    map.doubleClickZoom.disable();
    setTimeout(function() {
         map.doubleClickZoom.enable();
    }, 1000);
    var temp = this.state.current_pin_index-1
    if(temp<=0)
    {
      temp=0
    }
    map.setView(this.state.pins_array[temp].coords)
    const pin =this.refs[temp].leafletElement
    pin.openPopup()
    this.setState({current_pin_index:temp})
  }
  currentPin()
  {
    const map = this.refs.map.leafletElement
    map.doubleClickZoom.disable();
    setTimeout(function() {
         map.doubleClickZoom.enable();
    }, 1000);
    map.setView(this.state.pins_array[this.state.current_pin_index].coords)
  }
  render(){
    const userLocation = this.state.userLocationFound ? (
      <Marker  position={this.state.userLocation}  icon= {myIcon} >
        <Popup>You are here</Popup>
      </Marker>
    ) : null
   
    return (
      <div>
      <Map ref='map' center={this.state.currentLocation} zoom={13} maxBounds={this.bounds} bounds={this.bounds}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {userLocation}
         
        {this.state.pins_array.map((info,idx) => {
            var marker_icon;
            if(idx==this.state.current_pin_index)
            {
              marker_icon=new L.divIcon({
                                          className: 'my-div-icon',
                                          html: '<img class="my-div-image" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png"/>' 
              })
            }
            else
            {
              marker_icon=new L.divIcon({
                                        className: 'my-div-icon',
                                        html: '<img class="my-div-image" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"/>' 
})
            }
            return <Marker 
                           key = {idx} position={info.coords} 
                           icon= {marker_icon} 
                           ref = {idx}  >
                        <Popup >
                              <h1>{info.title}</h1>
                              <p>{info.description}</p>
                              <p>{info.hint}</p>
                              <p>{info.destination}</p>
                              <button onClick={()=>this.openGoogle(info.coords)} >Open Google Map</button>
                        </Popup>
                    </Marker>
            
          })}
          <button style={floatStyle} onClick={()=>this.centerMap(this,this.state.currentLocation)} >
                <div style={{ fontSize: "10px" }} >Center</div>
          </button>
          <button style={nextButtonStyle} onClick={()=>this.nextPin()} >
                <div style={{ fontSize: "1px" }} >Next</div>
          </button>
          <button style={previousButtonStyle} onClick={()=>this.previousPin()} >
                <div style={{ fontSize: "1px" }} >Previous</div>
          </button>
          <button style={currentButtonStyle} onClick={()=>this.currentPin()} >
        <div style={{ fontSize: "8px" }} >Current pin: {this.state.current_pin_index +1}</div>
          </button>
      </Map>
      </div>
    );
    }
}

export default ViewPinOnMap;

//this.db.collection("PINS").find({_id: ObjectId("5ebed1bc5992681f357d7948")} )
//this.db.collection("PINS").find({owner_id: this.client.auth.authInfo.userId} )
