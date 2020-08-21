import React, { Component } from "react";
import {
    Stitch,
    RemoteMongoClient,
    GoogleRedirectCredential,
} from "mongodb-stitch-browser-sdk";
import { ObjectId } from "mongodb";
import { db } from "../clientdb";
import styled from "styled-components";
import { userMode, toggle_usermode } from "../mode";
import './toggle.css';
 
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            useremail: "",
            userID: "",
            stitch_res: [],
            menuOpen: this.props.open,
            usermode: userMode, //usermode  true = viewer, false = creator
        };

        console.log(props);
        const appId = "capstonear_app-xkqng";
        if (Stitch.hasAppClient(appId)) {
            this.client = Stitch.getAppClient(appId);
            const mongodb = this.client.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            //select the db in our mongdb atlas cluster
            this.db = mongodb.db("APP");
        }
    }

    async componentDidMount() {
        //init mongodb stitch

        if (
            this.client.auth.isLoggedIn &&
            this.client.auth.authInfo.userProfile
        ) {
            const username = this.client.auth.authInfo.userProfile.data.first_name;
            const userID = this.client.auth.authInfo.userId;
            this.setState({
                username,
                userID,
                useremail: this.client.auth.authInfo.userProfile.data.email,
                userID: this.client.auth.authInfo.userId,
                userImg: this.client.auth.authInfo.userProfile.data.picture,
            });
            db.collection("USERS")
                .findOne({ $and: [ { user_id: userID }, { username }] })
                .then((data)=> {
                    if(data) return;
                    db.collection("USERS")
                        .findOneAndUpdate({ user_id: userID }, { $set: { username } })
                })
            console.log(this.client.auth.authInfo.userProfile.data);
        }
    }

    //login button handler
    async login() {
        //login using google redirect
        const credential = new GoogleRedirectCredential();
        this.client.auth.loginWithRedirect(credential);
        console.log(this.state);
    }
 


    addamodule() {
        this.db
            .collection("MODULES")
            .insertOne({
                owner_id: this.state.userID,
                name: this.state.temp_module_name,
                owner: this.state.useremail,
            })
            .catch(console.error);
    }

    listmymodules() {
        if (!this.client.auth.isLoggedIn) {
            return;
        }
        this.db
            .collection("PINS")
            .find({ _id: ObjectId("5ebed1bc5992681f357d7948") })
            .asArray()
            .then((stitch_res) => {
                this.setState({ stitch_res });
                console.log(this.state.stitch_res[0]);
            });
    }

    set_usermode() {
        this.setState({usermode: toggle_usermode()})
    }

    render() {
        return (
            <StyledMenu
                open={this.props.open}
                setOpen={this.props.setOpen}
                center_container={this.props.center_container}
                style={{}}
            >
                <div style={{marginBottom: "2rem", marginTop: "1rem"}}>
                    <img
                        src={this.state.userImg}
                        alt="test"
                        style={{
                            maxHeigh: "40px",
                            maxWidth: "40px",
                            borderRadius: "50%",
                            top: "1rem",
                        }}
                    />
                    <span
                        style={{
                            position: "relative",
                            top: "5px",
                            marginLeft: "1rem",
                            fontSize: "1.5rem",
                            color: "white",
                        }}
                    >
                        {this.state.username}
                    </span>
                </div>
                <ul
                    style={{ listStyleType: "none", paddingLeft: 0}}
                    onClick={() => {
                        this.props.center_container.center_container.current.style.opacity = 1;
                        this.props.setOpen(!this.props.open);
                    }}
                >
                    <li>
                        <a href="#/">Home</a>
                    </li>
                    <li>
                        <a href={`#/modules/${this.state.usermode ? "student": "instructor"}`}>View </a>
                    </li>
                    <li 
                        style={{
                            display: "flex",
                            transition: "transform 0.3s ease-in-out",
                            flexDirection: "column",
                            transform: this.state.usermode ? "translateX(150%)" : "translateX(0%)",
                        }}
                    >
                        <a style={{ paddingTop: "0rem"}} href="#/modules/edit">Create</a>
                    </li>
                    <li>
                        <a
                            href="#/logout"
                            onClick={() => {
                                this.client.auth.logout()
                                    .then(() => {
                                        this.setState({
                                            username: "",
                                            useremail: "",
                                            userID: "",
                                        });
                                        window.location.reload();
                                    })
                            }}
                            style={{ fontSize: "1rem" }}
                        >
                            Log Out
                        </a>
                    </li>
                </ul>

                <div style={{ position: "absolute", bottom: "1rem" }}>
                    <button type="button" 
                        className={`btn btn-md btn-toggle ${this.state.usermode || "active"}`} 
                        data-toggle="button" aria-pressed={this.state.usermode || "true"} 
                        autoComplete="off"
                        onClick={()=>this.set_usermode()}
                    >
                        <div className="handle" />
                    </button>
                </div>
            </StyledMenu>
        );
    }
}

// menu style sheet
// tutorial from https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ with modified styles
const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    background: #343a40;
    transform: ${({ open }) => open ? "translateX(-100)" : "translateX(100%)"};
    height: ${window.innerHeight - (window.innerHeight*.02)}px;
    text-align: left;
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s ease-in-out;
    z-index: 1501;
    min-width: 300px;
    @media (max-width: 150px) {
        width: 100%;
    }
    a {
        font-size: 1.5rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: Light;
        letter-spacing: 0.5rem;
        color: #FFFFF;
        text-decoration: none;
        transition: color 0.3s linear;
        @media (max-width: 150px) {
            font-size: 1rem;
            text-align: center;
        }
        &:hover {
            color: #343078;
        }
    }
`;

export default Menu;