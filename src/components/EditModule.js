import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Button, Modal, FormControl, Alert } from "react-bootstrap";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { ObjectId } from "mongodb";

export default class EditModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            module_info: {
                title: "",
                owner_email: "",
                owner_id: "",
                owner_name: "",
                description: "",
                pins: [],
                shared_with: [],
                public: false,
            },
            //modal for share popup
            email: "",
            shared: [],
            modal: false,
            idx: -1,
        };

        this.fetch_userinfo = this.fetch_userinfo.bind(this);
        this.save_module = this.save_module.bind(this);

        // share pop up modals
        this.show_modal = this.show_modal.bind(this);
        this.hide_modal = this.hide_modal.bind(this);
        this.modal_component = this.modal_component.bind(this);
        this.list_shared = this.list_shared.bind(this);
        this.add_email = this.add_email.bind(this);
        this.delete_email = this.delete_email.bind(this);

        const appId = "capstonear_app-xkqng";
        this.client = Stitch.hasAppClient(appId)
            ? Stitch.getAppClient(appId)
            : Stitch.initializeDefaultAppClient(appId);
        const mongodb = this.client.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        this.db = mongodb.db("APP");
    }

    componentDidMount() {
        this.fetch_userinfo();
        const appId = "capstonear_app-xkqng";
        if (Stitch.hasAppClient(appId)) {
            this.client = Stitch.getAppClient(appId);
            const mongodb = this.client.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            //select the db in our mongdb atlas cluster
            this.db = mongodb.db("APP");
            console.log("client");
        } else {
            this.client = Stitch.initializeAppClient(appId);
            console.log("client init");
        }
    }

    async fetch_userinfo() {
        await this.db
            .collection("MODULES")
            .find({
                _id: ObjectId(this.props.match.params.id),
            })
            .asArray()
            .then((module_info) => {
                if (module_info === undefined || module_info.length === 0) {
                    console.log(module_info);
                    return;
                }
                this.setState({ module_info: module_info[0] });
                console.log(module_info);
            })
            .catch((err) => {
                this.setState({ error: err });
                console.log(err);
            });
    }

    save_module() {
        const query = { _id: this.state.module_info._id };
        const update = {
            $set: this.state.module_info,
        };
        const options = { upsert: false };

        this.db
            .collection("MODULES")
            .updateOne(query, update, options)
            .then((res) => {
                console.log("Save response: ", res);

                // Go back to Manage Module view
                window.location.assign("#/modules/edit/");
            })
            .catch(console.error);
    }

    // show and hide modal 
    show_modal() {
        this.setState({ modal: true });
    }

    hide_modal() {
        this.setState({ modal: false });
    }

    add_email() {
        const query = { _id: this.state.module_info._id };
        const update = {
            $addToSet: { shared_with: this.state.email }
        };
        const options = { upsert: false };

        this.db
            .collection("MODULES")
            .findOneAndUpdate(query, update, options)
            .then((res) => {
                console.log("Save response: ", res);
                var module_info = this.state.module_info;
                this.setState({module_info: module_info})
            })
            .catch(console.error);
    }

    delete_email(idx) {
        const query = { _id: this.state.module_info._id };
        const update = {
            $pull: { shared_with: this.state.module_info.shared_with[idx] }
        };
        const options = { multi: false };

        this.db
            .collection("MODULES")
            .findOneAndUpdate(query, update, options)
            .then((res) => {
                console.log("Save response: ", res);
                var module_info = this.state.module_info;
                this.setState({module_info: this.state.module_info})
            })
            .catch(console.error);
    }

    list_shared() {
        return this.state.module_info.shared_with.map((module_info, idx) => {
            return (
                <div key={idx}>
                    <Row form>
                        <Col xs="8">
                            <FormGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.module_info.shared_with[idx]}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        var module_info = this.state.module_info;
                                        module_info.shared_with[idx] = event.target.value;
                                        this.setState({ module_info: this.state.module_info, idx: this.state.idx});
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.delete_email(idx);
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

    // modal componenet
    modal_component() {
        return (
            <Modal 
            sz="lg"
                show={this.state.modal}
                onHide={(event) => {
                    this.hide_modal();
                }}
                style={{
                    marginTop: "50px",
                }}
            >
                <Modal.Header closeButton>Shared With</Modal.Header>
                <Modal.Body>
                <div
                    style={{
                        maxHeight: 'calc(100vh - 320px)',
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    {this.list_shared()}
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                        <FormControl
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={(e) => {
                                var email = this.state.email;
                                email = e.target.value;
                                this.setState({ email: email });
                            }}
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            block
                            onClick={(event) => {
                                event.preventDefault();
                                this.add_email();
                            }}
                        >
                            Add
                        </Button>
                        <Button 
                            variant="primary"
                            size="lg"
                            block
                            onClick={(event) => {
                                event.preventDefault();
                                this.hide_modal();
                            }}
                        >
                            Done
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Modal>
        );
    }


    render() {
        return (
            <div
                style={{
                    top: "10px",
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                className="container"
            >
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="title"
                            id="title"
                            value={this.state.module_info.title}
                            onChange={(e) => {
                                var module_info = this.state.module_info;
                                module_info.title = e.target.value;
                                this.setState({ module_info });
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            id="description"
                            value={this.state.module_info.description}
                            onChange={(e) => {
                                var module_info = this.state.module_info;
                                module_info.description = e.target.value;
                                this.setState({ module_info: module_info });
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        as={Row}
                    >
                        <Col xs={4}>
                            <Form.Check
                                type="radio"
                                label="Public"
                                name="formHorizontalRadios"
                                id="true"
                                checked={this.state.module_info.public}
                                onChange={(e) => {
                                    var module_info = this.state.module_info;
                                    module_info.public = true;
                                    this.setState({
                                        module_info: module_info,
                                    });
                                }}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Check
                                type="radio"
                                label="Private"
                                name="formHorizontalRadios"
                                id="false"
                                checked={!this.state.module_info.public}
                                onChange={(e) => {
                                    var module_info = this.state.module_info;
                                    module_info.public = false;
                                    this.setState({
                                        module_info: module_info,
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="lg" block>
                            Add Pins
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            block
                            onClick={(event) => {
                                event.preventDefault();
                                this.save_module();
                            }}
                        >
                            Save
                        </Button>
                        <Button 
                            variant="primary"
                            size="sm"
                            block
                            onClick={(event) => {
                                event.preventDefault();
                                this.show_modal();
                            }}
                        >
                            Share
                        </Button>
                    </Form.Group>
                </Form>
                {this.modal_component()}
            </div>
        );
    }
}
