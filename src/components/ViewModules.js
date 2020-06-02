import React, { Component } from 'react'
import {Card, CardGroup, CardDeck} from 'react-bootstrap'
import {Stitch, } from "mongodb-stitch-browser-sdk"
import {AwsServiceClient, AwsRequest} from 'mongodb-stitch-browser-services-aws'

export default class ViewModules extends Component{

    constructor(props){
        super(props)
        this.state ={
            modules : [{name:'OMSI'},{name:'PSU'},{name:'DOWNTOWN'}, {name:'DOWNTOWN2'},{name:'OMSI'},{name:'PSU'},{name:'DOWNTOWN'}, {name:'DOWNTOWN2'},{name:'OMSI'},{name:'PSU'},{name:'DOWNTOWN'}, {name:'DOWNTOWN2'},],
            img1:''
        }
        this.add_module_cards = this.add_module_cards.bind(this)
        this.get_image = this.get_image.bind(this)

        const appId = "capstonear_app-xkqng"
        if (Stitch.hasAppClient(appId)) {
            this.client = Stitch.getAppClient(appId)
            console.log("client")
        }
        else{
            this.client = Stitch.initializeAppClient(appId)
            console.log("client init")
        }
        
    }

    componentDidMount(){
        this.get_image()
        console.log(this.state)
    }

    async get_image(){
       


      

    }


    add_module_cards(){
        
        const mds= this.state.modules.map(function(module,idx) {
          
            return (
           
            <Card style={{
                display:'block',
                maxHeight: '25rem',
                margin : '.5rem',
                
                maxWidth:'23rem',
                
            }} key={idx}>
                <Card.Body>
                    <Card.Img variant="top" src= "https://capstoneusercontent.s3.amazonaws.com/ar.png" />
                    <Card.Title>{module.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">by someone</Card.Subtitle>
                    <Card.Text>
                        this is the description of this OMSI module
                    </Card.Text>
                    <button className="btn btn-primary">View Module</button>
                </Card.Body>
            </Card>
           
            )
        })
        return(
            <div style={{
                left : '10px',
                right : '10px',
                top: '50px',
                bottom: '0px',
                position: 'absolute',
            }}>
            <CardDeck style={{
                top : '10px',
                width : '100%',
                justifyContent : 'flex-start',
                position: 'relative',
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'stretch'
            }}>
                {mds}
            </CardDeck>
            </div>
               
        )
    }

    render(){
        return(
            this.add_module_cards()
        )
    }

}