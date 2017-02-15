import React from "react";
import { TableGrid, Row, Col, MenuBar } from "constants/Components";
import SimpleEditor from "views/SimpleEditor.jsx";
import RouteManager from "common/RouteManager";
import ReactCommon from "common/ReactCommon";
import { URLS } from "constants/Constants";

class Container extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this.state = {
            CurrentView: this.props.View,
            currentViewUrl: this.props.ViewUrl,
            previousViewUrl: URLS.HOME,
            param: {}
        };
        this._onSelectClick = this.onSelectClick.bind(this);
        this._changeView = this.changeView.bind(this);
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
        debugger;
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
}

export default Container;
