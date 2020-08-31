import React, { Component } from "react";
import { Card, Tab, Tabs, Form, Button } from "react-bootstrap";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { ObjectId } from "mongodb";
import { Link } from 'react-router-dom';
import { waitForElementToBeRemoved } from "@testing-library/react";
//import {AwsServiceClient, AwsRequest} from 'mongodb-stitch-browser-services-aws'

export default class ViewModules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            module_results: null,
            modules: [],
            my_modules: [],
            shared_modules: [],
            img1: "",
            stitch_res: [],
            user: {
                _id: '',
                user_id: '',
                accessed_links: [],
            },
            accessed_modules: [],
        };
        
        //refs
        this.goto_module_id = React.createRef();

        this.add_module_cards = this.add_module_cards.bind(this);
        this.fetch_modules = this.fetch_modules.bind(this);

        const appId = "capstonear_app-xkqng";
        if (Stitch.hasAppClient(appId)) {
            this.client = Stitch.getAppClient(appId);
            const mongodb = this.client.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            //select the db in our mongdb atlas cluster
            this.db = mongodb.db("APP");
        } else {
            this.client = Stitch.initializeAppClient(appId);
        }
    }

    componentDidMount() {
        this.fetch_modules();
    }

    fetch_modules() {
        // fetch user's modules
        this.db
            .collection("MODULES")
            .find({
                owner_id: this.client.auth.authInfo.userId,
            })
            .asArray()
            .then((my_modules) => {
                this.setState({
                    my_modules: my_modules,
                    modules: [
                        my_modules,
                        this.state.shared_modules,
                        this.state.accessed_modules
                    ],
                });
                console.log("My Modules: ", this.state.my_modules);
            });

        //fetch shared modules
        this.db
            .collection("MODULES")
            .find({
                shared_with: this.client.auth.authInfo.userProfile.data.email,
            })
            .asArray()
            .then((shared_modules) => {
                this.setState({
                    shared_modules: shared_modules,
                    modules: [
                        this.state.my_modules,
                        shared_modules,
                        this.state.accessed_modules,
                    ],
                });
                console.log("Shared Modules: ", shared_modules);
            });

        // fetch user collection, create new if not found
        const query = {
            user_id: this.client.auth.authInfo.userId,
        };
        const update = {
            $setOnInsert: {accessed_links: [],}
        };
        const options = {
            returnNewDocument: true,
            upsert: true,
        };
        this.db
            .collection("USERS")
            .findOneAndUpdate(query, update, options)
            .then((res) => {
                const user = res;
                console.log("User: ", user);
                this.setState({ user });

                // fetch accessed links and set accessed modules
                this.db
                    .collection("MODULES")
                    .find({
                        shared_with: { $ne: this.client.auth.authInfo.userProfile.data.email },
                        _id: { $in: user.accessed_links },
                        public: true,
                    })
                    .asArray()
                    .then((accessed_modules) => {
                        this.setState({
                            accessed_modules: accessed_modules,
                            modules: [
                                this.state.my_modules,
                                this.state.shared_modules,
                                accessed_modules
                            ],
                        });
                        console.log("Accessed: ", accessed_modules);
                    });
            })
            .catch(console.error);
    }

    module_card (module, idx) {
        const userid = this.state.user.user_id; 
        return (
            <div className="col-md-6 col-lg-4 " key={idx} style={{marginTop: "1rem"}}>
                <Card style={{height: "100%"}}>
                    <Card.Body
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{textAlign: "center"}}>
                            <Card.Img
                                variant="top"
                                src={"https://capstoneusercontent.s3-us-west-2.amazonaws.com/" + module.pins[0] + ".jpeg?versionid=latest&date=" + Date.now()}
                                onError={(e)=>{
                                    e.target.onerror = null;
                                    e.target.src=`${process.env.PUBLIC_URL}/contextarlogo.jpg`
                                }}
                            />
                            <Card.Title>{module.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                by {module.owner_name} ({module.owner_email})
                            </Card.Subtitle>
                            <Card.Text>{module.description}</Card.Text>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                            <Link className="btn btn-primary mt-1" to={`/module/${module._id}`}>
                                View Details
                            </Link>
                            <Link className="btn btn-primary ml-1 mt-1" to={`/module/${module._id}/pins/?user=${userid}`}>
                                Start Module
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    add_module_cards = type => this.state.modules[type]?.map(this.module_card, this);

    render() {
        const url =this.props.location.pathname;
        let defaultTab = "My Modules";
        if(url == "/modules/student/view")
            defaultTab ="Shared Modules";
        else if (url == "/modules/student/search" || url == "/modules/instructor/search")
            defaultTab ="Search";

        const query_modules = () => {
            const userQuery = this.goto_module_id.current.value;
            try {
                ObjectId(userQuery);
                window.location.assign(`#/module/${userQuery}`);
            }
            catch (err) {
                this.db.collection("MODULES")
                    .find({ title: { $regex: userQuery, $options: "i" } })
                    .asArray()
                    .then(docs => {
                        this.setState({ module_results: docs.map(this.module_card, this) });
                    });
            }
        }

        return (
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    bottom: "0px",
                    width: "100%",
                    overflowY: "scroll",
                }}
            >
                <div
                    style={{
                        top: "10px",
                        position: "relative",
                        height: "max-content",
                        margin: "auto"
                    }}
                >
                    <Tabs
                        defaultActiveKey= {defaultTab}
                        transition={false}
                        style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {
                            url.includes("/modules/instructor/")
                                ? (
                                    <Tab eventKey="My Modules" title="My Modules">
                                        <div className="container">
                                            <div className="row">
                                                {this.add_module_cards(0)}
                                            </div>
                                        </div>
                                    </Tab>)
                                : null
                        }
                        <Tab eventKey="Shared Modules" title="Shared with me">
                            <div className="container">
                                <div className="row">
                                    {this.add_module_cards(1)}
                                    {this.add_module_cards(2)}
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="Search" title="Search">
                            <div className="container">
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        query_modules();
                                    }}
                                >
                                    <Form.Group controlId="formModuleId">
                                        <Form.Label>Module</Form.Label>
                                        <Form.Control
                                            required
                                            type="string"
                                            placeholder="Enter module title or id"
                                            ref={this.goto_module_id}
                                        />
                                    </Form.Group>
                                    <button className="btn btn-primary mb-1">
                                        Search
                                    </button>
                                </Form>
                                <div className="row">
                                    {this.state.module_results}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}