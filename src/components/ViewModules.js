import React, { Component } from "react";
import { Card, Tab, Tabs, CardDeck, Form, Button } from "react-bootstrap";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { ObjectId } from "mongodb";
import { waitForElementToBeRemoved } from "@testing-library/react";
//import {AwsServiceClient, AwsRequest} from 'mongodb-stitch-browser-services-aws'

export default class ViewModules extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.module_results = null;
        

        //refs
        this.goto_module_id = React.createRef();

        this.add_module_cards = this.add_module_cards.bind(this);
        this.fetch_modules = this.fetch_modules.bind(this);
        this.goto_module = this.goto_module.bind(this);

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
            //console.log("client init")
        }
    }

    componentDidMount() {
        this.fetch_modules();

    }

    async fetch_modules() {
        await this.db
            .collection("MODULES")
            .find({
                owner_id: this.client.auth.authInfo.userId,
            })
            .asArray()
            .then((my_modules) => {
                this.setState({
                    my_modules: my_modules,
                    modules: {
                        0: my_modules,
                        1: this.state.shared_modules,
                        2: this.state.accessed_modules,
                    },
                });

                console.log(this.state.my_modules);
            });

        //fetch shared modules
        await this.db
            .collection("MODULES")
            .find({
                shared_with: this.client.auth.authInfo.userProfile.data.email,
            })
            .asArray()
            .then((shared_modules) => {
                this.setState({
                    shared_modules: shared_modules,
                    modules: {
                        0: this.state.my_modules,
                        1: shared_modules,
                        2: this.state.accessed_modules,
                    },
                });
                console.log(shared_modules);
            });
        console.log(this.state.modules);

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
        await this.db
            .collection("USERS")
            .findOneAndUpdate(query, update, options)
            .then((res) => {
                console.log("User: ", res);
                this.setState({ user: res });
            })
            .catch(console.error);

        // fetch accessed links and set accessed modules
        await this.db
            .collection("MODULES")
            .find({
                shared_with: { $ne: this.client.auth.authInfo.userProfile.data.email},
                _id: { $in: [...this.state.user.accessed_links]},
                public: true,
            })
            .asArray()
            .then((accessed_modules) => {
                this.setState({
                    accessed_modules: accessed_modules,
                    modules: {
                        0: this.state.my_modules,
                        1: this.state.shared_modules,
                        2: accessed_modules,
                    },
                });
                console.log("Accessed: ",accessed_modules);
            });
        console.log(this.state.accessed_modules);
    }

    goto_module(id) {
        window.location.assign("#/module/" + id);
    }

    module_card (module, idx) {
        const userid = this.state.user.user_id; 
        return (
            <div className="col-md-6 col-lg-4 " key={idx} style={{marginTop: "1rem"}}>
                <Card
                    className="h-100"
                    style={{
                        Width: "25rem",
                        margin: "0.25rem",
                        textAlign: "center",
                    }}
                >
                    <Card.Body>
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
                        <div
                            className="btn-toolbar"
                            style={{
                                justifyContent: "center",
                            }}
                        >
                            <div className="btn-group mr-1" style={{paddingTop: "10px"}}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => window.location.assign(`#/module/${module._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                            <div className="btn-group mr-1" style={{paddingTop: "10px"}}>
                                <button className="btn btn-primary"
                                    onClick={() =>{
                                        window.location.assign(`#/module/${module._id}/pins/?user=${userid}`)
                                    }
                                }>
                                    Start Module
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    add_module_cards(type) {
        if (this.state.modules.length === 0) return;
        console.log(this.state.modules[type])
        const mds = this.state.modules[type].map(this.module_card, this);
        return mds;
    }

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
                        this.module_results = docs.map(this.module_card, this);
                        this.forceUpdate();
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
                                    <Button
                                        variant="primary"
                                        style={{marginBottom: "10px"}}
                                        onClick={query_modules}
                                    >
                                        Search
                                    </Button>
                                </Form>
                                <div className="row">
                                    {this.module_results}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}