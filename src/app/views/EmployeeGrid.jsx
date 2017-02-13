import React from "react";
import { TableGrid, Row, Col } from "constants/Components";
import ServiceManager from "service/ServiceManager";
import ReactCommon from "common/ReactCommon";
import RouteManager from "common/RouteManager";

class EmployeeGrid extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this.handleClick.bind(this);
    }
    handleClick(evt) {
        debugger;
        var data = {
            selectedId: evt.target.innerHTML
        };
        var EditorObj = RouteManager.getView(evt.target.hash);
        EditorObj.param = data;
        ReactCommon.changeView(EditorObj);
    }
    render() {
        debugger;
        // var fakeEmployees = ServiceManager.getFakeData();
        var headers = [
            { label: "EMPLOYEEID", bind: "EMPLOYEEID", type: "LINK" },
            { label: "FIRSTNAME", bind: "FIRSTNAME", type: "TEXT_STATIC" },
            { label: "LASTNAME", bind: "LASTNAME", type: "TEXT_STATIC" },
            { label: "EMAIL", bind: "EMAIL", type: "TEXT_STATIC" }
        ];
        var rows = ServiceManager.getEntityList("EMPLOYEE");
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div style={{ fontSize: "30px" }}>Select employee to edit</div>
                    <TableGrid headers={headers} rows={rows} onClick={this._handleClick} />
                </Col>
            </Row>
        );
    }
}

export default EmployeeGrid;