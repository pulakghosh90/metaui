import React from "react";
import { TableGrid, Row, Col, Link } from "constants/Components";
import ServiceManager from "service/ServiceManager";
import ReactCommon from "common/ReactCommon";
import RouteManager from "common/RouteManager";

class EmployeeGrid extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this.handleClick.bind(this);
        this._addEmployee = this.addEmployee.bind(this);
        this.state = { rows: [] };
    }
    componentDidMount() {
        var _this = this;
        ServiceManager.getEntityList("EMPLOYEE")
            .then(response => _this.setState({ rows: response.data }))
            .catch(error => console.log(error));
    }
    render() {
        debugger;
        var headers = [
            { label: "EMPLOYEEID", bind: "EMPLOYEEID", type: "LINK" },
            { label: "FIRSTNAME", bind: "FIRSTNAME", type: "TEXT_STATIC" },
            { label: "LASTNAME", bind: "LASTNAME", type: "TEXT_STATIC" },
            { label: "EMAIL", bind: "EMAIL", type: "TEXT_STATIC" }
        ];
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div style={{ fontSize: "30px" }}>Employee list</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Link value="Add Employee" className="btn btn-primary" href="#/employees/new"
                            onClick={this._addEmployee} id="addEmployee" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TableGrid headers={headers} rows={this.state.rows} onClick={this._handleClick} />
                    </Col>
                </Row>
            </div>
        );
    }

    handleClick(evt) {
        debugger;
        var data = {
            selectedId: evt.target.innerText
        };
        var EditorObj = RouteManager.getView(evt.target.hash);
        EditorObj.param = data;
        ReactCommon.changeView(EditorObj);
    }
    addEmployee(evt) {
        debugger;
        var EditorObj = RouteManager.getView(evt.target.hash);
        EditorObj.param = {
            selectedId: "new",
            mode: "new"
        };
        ReactCommon.changeView(EditorObj);
    }
}

export default EmployeeGrid;