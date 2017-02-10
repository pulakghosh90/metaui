import React from "react";
import { TextBox, Row, Col, Link } from "constants/Components";

//this is used to hold dynamically created component from json metadata
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {

    }
    componentWillUpdate() {

    }
    render() {
        debugger;
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Container;