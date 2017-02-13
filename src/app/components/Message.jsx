import React from "react";
import { Row, Col } from "constants/Components";

class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var className;
        if (this.props.type === "error") {
            className = "alert alert-danger " + this.props.className;
        } else if (this.props.type === "success") {
            className = "alert alert-success " + this.props.className;
        }
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={className}>{this.props.message}</div>
                </Col>
            </Row>
        );
    }
}

export default Message;