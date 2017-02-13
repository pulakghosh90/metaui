import React from "react";
import { TimecardFilter, Row, Col, GriddleGrid } from "constants/Components";
import ReactTableRenderer from "renderer/ReactTableRenderer.jsx";
import ServiceManager from "service/ServiceManager";

class Timecard extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this.state = {};
        var fieldDef = ServiceManager.getTimecardGridFiledDef();
        this.griddleColumnMetaData = ReactTableRenderer.render(fieldDef);
    }
    render() {
        debugger;
        var results = [{
            ASSOCIATEOID: 1,
            FIRSTNAME: "Pulak",
            LASTNAME: "Ghosh",
            FULLNAME: "Pulak Ghosh",
            PAYCLASSID: "pay"
        }];
        var columns = ["ASSOCIATEOID", "FIRSTNAME", "LASTNAME", "FULLNAME", "PAYCLASSID"];
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TimecardFilter />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <GriddleGrid results={results} columnMetadata={this.griddleColumnMetaData} columns={columns} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Timecard;