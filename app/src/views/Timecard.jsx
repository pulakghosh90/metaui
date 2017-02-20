import React from "react";
import { TimecardFilter, Row, Col, GriddleGrid, Message, Button } from "constants/Components";
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
    },
    addRow: {
        labelText: "",
        htmlAttrs: {},
        styles: { label: { className: "" }, icon: "fa fa-plus-square-o" },
        handlers: {}
    },
    deleteRow: {
        labelText: "",
        htmlAttrs: {},
        styles: { label: { className: "" }, icon: "fa fa-plus-square-o" },
        handlers: {}
    }
};
const timePairTemplate = {
    "OUTTIME": "",
    "EMPLOYEEID": "",
    "SYSTEMID": "",
    "INTIME": "",
}
const rowMetadata = {
    bodyCssClassName: rowData => { if (rowData.dirty) return "row-dirty"; }
};

class Timecard extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this._onTimePairChange = this.onTimePairChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onFilterChange = this.onFilterChange.bind(this);
        this._fetchTimePair = this.fetchTimePair.bind(this);
        this._addRow = this.addRow.bind(this);
        this._deleteRow = this.deleteRow.bind(this);
        this._onReprocess = this.onReprocess.bind(this);

        this.commonProps = commonFieldProps;
        this.commonProps.textBox.handlers = { onChange: this._onTimePairChange };
        this.commonProps.action.handlers = {
            onSave: this._onSave,
            onCancel: this._onCancel
        };
        this.commonProps.addRow.handlers = {
            onClick: this._addRow
        };
        this.commonProps.deleteRow.handlers = {
            onClick: this._deleteRow
        };
        var response = ServiceManager.getViewDef("TIMEPAIR", "EDITOR");
        var {columnMetadata, columns, actions} = ReactTableRenderer.render(response.data.rows, this.commonProps);
        this.columnMetadata = columnMetadata;
        this.columns = columns;
        this.actions = actions;
        this.componentId = response.data.name;
        this.modelEntity = response.data.modelEntity;

        this.state = { timePairs: [], filter: { employees: [] }, message: {}, showReprocess: false };
    }
    componentDidMount() {
        debugger;
        var _this = this;
        var employees;
        ServiceManager.getEntityLookupList("EMPLOYEE")
            .then(response => {
                employees = [{ value: "", label: "Select an employee" }].concat(response.data);
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
                        <div style={{ fontSize: "30px", paddingBottom: "10px" }}>Individual Timecard</div>
                    </Col>
                </Row>
                {this.state.message !== {} && <Message {...this.state.message} />}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TimecardFilter {...this.state.filter} onFilterChange={this._onFilterChange}
                            onReprocess={this._onReprocess} showReprocess={this.state.showReprocess} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <GriddleGrid results={this.state.timePairs} columnMetadata={this.columnMetadata} rowMetadata={rowMetadata}
                            columns={this.columns} tableClassName="table table-hover"
                            useGriddleStyles={false} showPager={false} resultsPerPage={this.state.timePairs.length} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} key="btns" style={{ textAlign: "right" }}>
                        {
                            this.state.showReprocess &&
                            <Button labelText="Reprocess" htmlAttrs={{}} styles={{ label: { className: "btn btn-primary" } }}
                                handlers={{ onClick: this._onReprocess }} />
                        }
                        {this.actions}
                    </Col>
                </Row>
            </div>
        );
    }
    fetchTimePair(fieldName, value) {
        var _this = this;
        if (fieldName && value) {
            var filter = {
                filters: [
                    {
                        "fieldName": fieldName,
                        "operator": "=",
                        "value": value,
                    }]
            };
            var blankTP = [Object.assign({}, timePairTemplate)];
            blankTP[0][fieldName] = value;
            ServiceManager.getEntityList(this.modelEntity, filter)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        _this.setState({ timePairs: AppUtil.timePairDateFormat(response.data), showReprocess: true });
                    } else {
                        _this.setState({ timePairs: blankTP, showReprocess: false });
                    }
                })
                .catch(error => console.log(error));
        } else {
            _this.setState({ timePairs: [], showReprocess: false });
        }
    }
    onFilterChange(val) {
        this._fetchTimePair(Object.keys(val)[0], Object.values(val)[0]);
    }
    onTimePairChange(timePair) {
        var timePairs = this.state.timePairs.map(tp => {
            if (tp.SYSTEMID === timePair.SYSTEMID) {
                return timePair;
            } else {
                return tp;
            }
        });
        this.setState({ timePairs });
    }
    onSave() {
        debugger;
        var _this = this;
        var EMPLOYEEID;
        var timepairs = this.state.timePairs.map(tp => {
            EMPLOYEEID = tp.EMPLOYEEID;
            return Object.assign({},
                { INTIME: moment(tp.INTIME).format("YYYY-MM-DD HH:mm:ss") },
                { OUTTIME: moment(tp.OUTTIME).format("YYYY-MM-DD HH:mm:ss") },
                { EMPLOYEEID: tp.EMPLOYEEID },
                { SYSTEMID: tp.SYSTEMID }
            );
        });
        ServiceManager.saveEntityList(this.modelEntity, timepairs)
            .then(response => {
                this._fetchTimePair("EMPLOYEEID", EMPLOYEEID);
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
    addRow(row) {
        debugger;
        var newTP = Object.assign({}, timePairTemplate);
        newTP.EMPLOYEEID = row.EMPLOYEEID;
        this.state.timePairs.push(newTP);
        this.setState({ timePairs: this.state.timePairs });
    }
    deleteRow(row) {
        debugger;
        var _this = this;
        var timePairs = this.state.timePairs.filter(tp => tp.SYSTEMID !== row.SYSTEMID);
        ServiceManager.saveEntityList(this.modelEntity, timePairs)
            .then(response => {
                _this.setState({ timePairs });
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
    onReprocess(evt) {
        debugger;
        var _this = this;
        var EMPLOYEEID;
        var timepairs = this.state.timePairs.map(tp => {
            EMPLOYEEID = tp.EMPLOYEEID;
            return Object.assign({},
                { INTIME: moment(tp.INTIME).format("YYYY-MM-DDTHH:mm:ss") },
                { OUTTIME: moment(tp.OUTTIME).format("YYYY-MM-DDTHH:mm:ss") },
                { EMPLOYEEID: tp.EMPLOYEEID },
                { SYSTEMID: tp.SYSTEMID }
            );
        });
        ServiceManager.saveEntityList(this.modelEntity, timepairs)
            .then(response => {
                this._fetchTimePair("EMPLOYEEID", EMPLOYEEID);
                _this.setState({
                    message: {
                        type: response.status,
                        message: "Reprocessed successfully!"
                    }
                });
            })
            .catch(error => {
                _this.setState({
                    message: {
                        type: "error",
                        message: "Error occured while reprocessing!"
                    }
                });
            });
    }
}

export default Timecard;