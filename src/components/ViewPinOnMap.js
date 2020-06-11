import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer,Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {Stitch, RemoteMongoClient, GoogleRedirectCredential} from "mongodb-stitch-browser-sdk"
import { ObjectId } from 'mongodb'



delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var myIcon = new L.divIcon({
  className: 'my-div-icon',
  html: '<span  class="my-div-span">YOU ARE HERE </span>'+
        '<img class="my-div-image" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"/>'
})

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
      pins:[],
      pins_line:[]
    }
  this.getUserPosition = this.getUserPosition.bind(this)
  this.drawpins = this.drawpins.bind(this)
  this.drawlines = this.drawlines.bind(this)
  this.openGoogle = this.openGoogle.bind(this)

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

  componentDidMount(){
    this.getUserPosition()
  }

  drawpins() {
    if(!this.client.auth.isLoggedIn){
        return
    }
    this.db.collection("PINS").find({_id: ObjectId("5ebed1bc5992681f357d7948")} )
    .asArray()
    .then((pins) => {this.setState({pins})
    //console.log(this.state.pins)
    var temp_array =[]
    for (var i =0; i< this.state.pins.length;++i)
    {
      temp_array.push([this.state.pins[i].lat,this.state.pins[i].long]);
    }
    //console.log(this.state.pins_line)
    this.setState ({ pins_line: temp_array} ) 
    }
    )
  }
  drawlines(){
    //console.log(this.state.pins_line)
    //console.log(this.state.pins_line.length)
    if(this.state.pins_line.length>0)
    {
      //console.log("If statement in drawlines")
      return (
        <Polyline positions={this.state.pins_line} color ={'red'}>
      </Polyline>
      )
    }
    return
  } 
  openGoogle(lat,long)
  {
    //console.log(lat,long)
    var url= "http://maps.google.com?q="+lat+","+long
    var win = window.open(url, '_blank');
    //var win = window.location.assign(url);
    return
  }
  render(){
    const userLocation = this.state.userLocationFound ? (
      <Marker onClick={()=>this.openGoogle(this.state.userLocation[0],this.state.userLocation[1])} position={this.state.userLocation}  icon= {myIcon} >
        <Popup>Your location</Popup>
      </Marker>
    ) : null
   
    
    return (
      <div>
      {this.drawpins()}
      <Map center={this.state.currentLocation} zoom={13} maxZoom={18} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {userLocation} 
        {this.state.pins.map((info,idx) => {
            return <Marker onClick={()=>this.openGoogle(info.lat,info.long)} 
                           key = {idx} position={[info.lat,info.long]} 
                           icon= {new L.divIcon({
                                                  className: 'my-div-icon',
                                                  html: '<span  class="my-div-span">'+(idx+1)+'</span>'+
                                                        '<img class="my-div-image" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"/>'
                                                })} >
                        <Popup>Pin location</Popup>
                    </Marker>
          })}
          {this.drawlines()}
      </Map>
      </div>
    );
    }
}

export default ViewPinOnMap;

//this.db.collection("PINS").find({_id: ObjectId("5ebed1bc5992681f357d7948")} )
//this.db.collection("PINS").find({owner_id: this.client.auth.authInfo.userId} )