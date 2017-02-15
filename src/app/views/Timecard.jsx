import React from "react";
import { TimecardFilter, Row, Col, GriddleGrid, Message } from "constants/Components";
import ReactTableRenderer from "renderer/ReactTableRenderer.jsx";
import ServiceManager from "service/ServiceManager";
import AppUtil from "util/AppUtil";
import ReactCommon from "common/ReactCommon";
import moment from "moment";

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

        this.state = { timePairs: [], filter: { employees: [], payPeriods: [] }, message: {} };
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
                {this.state.message !== {} && <Message {...this.state.message} />}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TimecardFilter {...this.state.filter} onFilterChange={this._onFilterChange} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <GriddleGrid results={this.state.timePairs} columnMetadata={this.columnMetadata}
                            columns={this.columns} tableClassName="table table-hover"
                            useGriddleStyles={false} showPager={false} resultsPerPage={this.state.timePairs.length} />
                    </Col>
                </Row>
                <Row>
                    {this.actions}
                </Row>
            </div>
        );
    }
    onFilterChange(val) {
        var _this = this;
        var filter = {
            filters: [
                {
                    "fieldName": Object.keys(val)[0],
                    "operator": "=",
                    "value": Object.values(val)[0],
                }]
        };
        ServiceManager.getEntityList(this.modelEntity, filter)
            .then(response => _this.setState({ timePairs: AppUtil.timePairDateFormat(response.data) }))
            .catch(error => console.log(error));
    }
    onTimePairChange(timePair) {
        var timePairs = this.state.timePairs.map(tp => {
            if (tp.SYSTEMID === timePair.SYSTEMID) {
                return timePair;
            } else {
                return tp;
            }
        });
        this.setState({ timePairs: timePairs });
    }
    onSave() {
        debugger;
        var _this = this;
        var timepairs = this.state.timePairs.map(tp => {
            return Object.assign({},
                { INTIME: moment(tp.INTIME).format("YYYY-MM-DDTHH:mm:ss") },
                { OUTTIME: moment(tp.OUTTIME).format("YYYY-MM-DDTHH:mm:ss") },
                { EMPLOYEEID: tp.EMPLOYEEID },
                { SYSTEMID: tp.SYSTEMID }
            );
        });
        ServiceManager.saveEntityList(this.modelEntity, timepairs)
            .then(response => {
                _this.setState({
                    message: {
                        type: response.status,
                        message: "Save successful!"
                    }
                });
            })
            .catch(error => {
                _this.setState({
                    message: {
                        type: "error",
                        message: "Error occured while save!"
                    }
                });
            });
    }
    onCancel() {
        ReactCommon.goBack();
    }
}

export default Timecard;