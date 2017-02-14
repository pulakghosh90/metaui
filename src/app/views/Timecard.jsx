import React from "react";
import { TimecardFilter, Row, Col, GriddleGrid } from "constants/Components";
import ReactTableRenderer from "renderer/ReactTableRenderer.jsx";
import ServiceManager from "service/ServiceManager";
import AppUtil from "util/AppUtil";

const commonFieldProps = {
    textBox: {
        labelText: null,
        htmlAttrs: { password: false },
        styles: {
            input: { className: "" },
            label: {
                inlineStyle: {
                    width: "200px",
                    wordWrap: "break-word"
                }
            }
        },
        handlers: {},
        rules: {},
        validator: () => { }
    },
    action: {
        labelText: "",
        htmlAttrs: {},
        styles: { label: { className: "" } },
        handlers: {}
    }
};

class Timecard extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this._onTimePairChange = this.onTimePairChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onFilterChange = this.onFilterChange.bind(this);

        this.commonProps = commonFieldProps;
        this.commonProps.textBox.handlers = { onChange: this._onTimePairChange };
        this.commonProps.action.handlers = {
            onSave: this._onSave,
            onCancel: this._onCancel,
        };
        var response = ServiceManager.getViewDef("TIMEPAIR", "EDITOR");
        var {columnMetadata, columns, actions} = ReactTableRenderer.render(response.data.rows, this.commonProps);
        this.columnMetadata = columnMetadata;
        this.columns = columns;
        this.actions = actions;
        this.componentId = response.data.name;
        this.modelEntity = response.data.modelEntity;

        this.state = { results: [], filter: { employees: [], payPeriods: [] } };
    }
    componentDidMount() {
        debugger;
        var _this = this;
        var employees;
        ServiceManager.getEntityLookupList("EMPLOYEE")
            .then(response => {
                employees = response.data.reduce((list, val) => {
                    list.push({ value: val.EMPLOYEEID, label: val.FIRSTNAME + " " + val.LASTNAME });
                    return list;
                }, [{ value: "", label: "Select an employee" }]);
                _this.setState({ filter: { employees } });
            })
            .catch(error => console.error(error));
    }
    render() {
        debugger;
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div style={{ fontSize: "30px", paddingBottom: "10px" }}>Timecard Editor</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TimecardFilter {...this.state.filter} onFilterChange={this._onFilterChange} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <GriddleGrid results={this.state.results} columnMetadata={this.columnMetadata} columns={this.columns} />
                    </Col>
                </Row>
                <Row>
                    {this.actions}
                </Row>
            </div>
        );
    }
    onFilterChange(val) {
        debugger;
        var filter = {
            filters: [
                {
                    "fieldName": Object.keys(val)[0],
                    "operator": "=",
                    "value": Object.values(val)[0],

                }]
        };
        var _this = this;
        ServiceManager.getEntityList(this.modelEntity, filter)
            .then(response => _this.setState({ results: AppUtil.timePairDateFormat(response.data) }))
            .catch(error => console.log(error));
    }
    onTimePairChange(evt) {
        debugger;
    }
    onSave() {
        debugger;
    }
    onCancel() {
        debugger;
    }
}

export default Timecard;