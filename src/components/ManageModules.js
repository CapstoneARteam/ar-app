import React, { Component } from "react";
import { Form, FormGroup, Input, Row, Col, Button } from "reactstrap";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

export default class ManageModules extends Component {
    constructor(props) {
        super(props);
        this.state = { modules: [] };

        this.list_modules = this.list_modules.bind(this);
        this.load_modules = this.load_modules.bind(this);
        this.delete_module = this.delete_module.bind(this);
        this.add_module = this.add_module.bind(this);
        this.save_modules = this.save_modules.bind(this);

        // Setting up DB with Stitch
        const appId = "capstonear_app-xkqng";
        this.client = Stitch.hasAppClient(appId)
            ? Stitch.getAppClient(appId)
            : Stitch.initializeDefaultAppClient(appId);
        const mongodb = this.client.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        this.db = mongodb.db("APP");

        this.load_modules();
    }

    list_modules() {
        return this.state.modules.map((module, idx) => {
            return (
                <div key={idx}>
                    <Row form>
                        <Col xs="6">
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={this.state.modules[idx].title}
                                    onChange={(event) => {
                                        event.preventDefault();

                                        var modules = [...this.state.modules];
                                        modules[idx].title = event.target.value;
                                        this.setState({ modules });
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button
                                color="link"
                                onClick={(event) => {
                                    event.preventDefault();

                                    // How should we navigate to "Edit Module" view?
                                    // How do you convert an ObjectID to a usable String?
                                    //var id = this.state.modules[idx]._id
                                    //this.props.history.push("#/editmodule/module?id=" + id)
                                }}
                            >
                                Edit
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                color="danger"
                                onClick={(event) => {
                                    event.preventDefault();
                                    var del = window.confirm(
                                        'Are you sere you want to delete "' +
                                            module.title +
                                            '"?'
                                    );
                                    if (del) this.delete_module(idx);
                                }}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        });
    }

    load_modules() {
        this.db
            .collection("MODULES")
            .find()
            .toArray()
            .then((res) => {
                console.log("Load response: ", res);

                this.setState({ modules: res });
            })
            .catch(console.error);
    }

    delete_module(idx) {
        const query = { _id: this.state.modules[idx]._id };
        this.db
            .collection("MODULES")
            .deleteOne(query)
            .then((res) => {
                console.log("Delete response: ", res);

                // Update module list
                var modules = [...this.state.modules];
                modules.splice(idx, 1);
                this.setState({ modules });
            })
            .catch(console.error);
    }

    add_module() {
        const query = {
            title: "title",
            owner_id: this.client.auth.authInfo.userId,
            owner_name: this.client.auth.authInfo.userProfile.name,
            owner_email: this.client.auth.authInfo.userProfile.email,
            description: "",
            pins: [],
            shared_with: [],
            public: false,
        };

        this.db
            .collection("MODULES")
            .insertOne(query)
            .then((res) => {
                console.log("Add response: ", res);

                // Update module list
                var modules = [...this.state.modules];
                modules.push(query);
                this.setState({ modules });

                // How should we navigate to "Edit Module" view?
                // How do you convert an ObjectID to a usable String?
                //var id = res.insertedId._id
                //this.props.history.push("#/editmodule/module?id=" + id)
            })
            .catch(console.error);
    }

    save_modules() {
        Promise.all(
            this.state.modules.map((module) => {
                const query = { _id: module._id };
                const update = {
                    $set: {
                        title: module.title,
                    },
                };
                const options = { upsert: false };

                return this.db
                    .collection("MODULES")
                    .updateOne(query, update, options);
            })
        )
            .then((res) => {
                console.log("Save response: ", res);
            })
            .catch(console.error);
    }

    render() {
        return (
            <div
                style={{
                    top: "10px",
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="container"
            >
                <div
                    style={{
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    <Form
                        style={{ height: "100%" }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            this.save_modules();
                        }}
                    >
                        <div
                            style={{
                                height: "60%",
                                overflowY: "scroll",
                                overflowX: "hidden",
                            }}
                        >
                            {this.list_modules()}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <Button
                                color="primary"
                                size="lg"
                                block
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.add_module();
                                }}
                            >
                                Add Module
                            </Button>
                            <Button
                                color="secondary"
                                size="lg"
                                block
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.save_modules();
                                    window.location.assign("#/");
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
