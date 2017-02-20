import React from "react";
import { TableGrid, Row, Col, MenuBar, Link, Image } from "constants/Components";
import SimpleEditor from "views/SimpleEditor.jsx";
import RouteManager from "common/RouteManager";
import ReactCommon from "common/ReactCommon";
import { URLS } from "constants/Constants";
import AppContext from "common/AppContext";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentView: this.props.View,
            currentViewUrl: this.props.ViewUrl,
            previousViewUrl: URLS.HOME,
            param: {}
        };
        this._onSelectClick = this.onSelectClick.bind(this);
        this._changeView = this.changeView.bind(this);
        this._logout = this.logout.bind(this);
    }
    componentDidMount() {
        ReactCommon.setContainer(this);
    }
    componentWillUnmount() {
        ReactCommon.setContainer(null);
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ textAlign: "left" }}>
                        <Image src="static/images/adp-logo.png" style={{ width: "20%" }} />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ textAlign: "right" }}>
                        <div style={{ paddingTop: "32px" }}>
                            CLIENT NAME: <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{this.props.loggedInUser.name}</span>
                            <span>
                                <Link href="/" onClick={this._logout} style={{ paddingLeft: "10px" }}>Logout</Link>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <MenuBar onSelectClick={this._onSelectClick} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <this.state.CurrentView param={this.state.param} />
                    </Col>
                </Row>
            </div>
        );
    }
    onSelectClick(evt) {
        if (this.state.currentViewUrl !== evt.target.hash) {
            var ViewObj = RouteManager.getView(evt.target.hash);
            if (ViewObj) {
                this._changeView(ViewObj);
            }
        }
    }
    changeView(ViewObj) {
        if (ViewObj && ViewObj.View) {
            this.setState({
                CurrentView: ViewObj.View,
                previousViewUrl: this.state.currentViewUrl,
                currentViewUrl: ViewObj.url,
                param: ViewObj.param
            });
        }
    }
    back() {
        var PrevView = RouteManager.getView(this.state.previousViewUrl);
        this._changeView(PrevView);
    }
    logout() {
        AppContext.logout();
        RouteManager.goToLogin();
    }
}

export default Container;
