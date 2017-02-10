import React from "react";
import { TableGrid, Row, Col, MenuBar } from "constants/Components";
import SimpleEditor from "views/SimpleEditor.jsx";
import RouteManager from "common/RouteManager";
import ReactCommon from "common/ReactCommon";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentView: this.props.View,
            CurrentViewUrl: this.props.ViewUrl,
            PreviousViewUrl: null,
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
    onSelectClick(evt) {
        var ViewObj = RouteManager.getView(evt.target.hash);
        if (ViewObj) {
            this._changeView(ViewObj, null);
        }
    }
    changeView(ViewObj) {
        this.setState({
            CurrentView: ViewObj.View,
            PreviousViewUrl: this.state.CurrentViewUrl,
            CurrentViewUrl: ViewObj.url,
            param: ViewObj.param
        });
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
}

export default Container;
