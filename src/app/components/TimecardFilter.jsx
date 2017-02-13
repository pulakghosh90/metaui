import React from "react";
import { Label, Select, Row, Col } from "constants/Components";

const commonProps = {
    labelText: "",
    htmlAttrs: {},
    styles: {
        select: { className: "", inlineStyle: { width: "100px" } },
        label: { className: "", inlineStyle: {} }
    },
    options: [{ label: "pulak10", value: "pulak10" }, { label: "pulak1", value: "pulak1" }, { label: "pulak2", value: "pulak2" }],
    value: "pulak",
    bindAttr: "EMPLOYEENAME",
    handlers: {}
};
const timeCardProps = {
    labelText: {},
    htmlAttrs: {},
    styles: {
        label: { className: "", inlineStyle: {} }
    }
};

class TimecardFilter extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
        this.employeeProps = Object.assign({}, commonProps);
        this.employeeProps.handlers.onChange = this._onChange;
        this.employeeProps.labelText = "Employee:";
        this.payPeriodProps = Object.assign({}, commonProps);
        this.payPeriodProps.handlers.onChange = this._onChange;
        this.payPeriodProps.labelText = "Pay Period:";
        this.timecardProps = Object.assign({}, timeCardProps);
        this.timecardProps.labelText = "Timecard";
    }
    onChange(val) {
        debugger;
        console.log(val);
    }
    render() {
        debugger;
        return (
            <Row>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Label {...this.timecardProps} />
                </Col>
                <Col xs={5} sm={5} md={5} lg={5}>
                    <Select {...this.payPeriodProps} />
                </Col>
                <Col xs={5} sm={5} md={5} lg={5}>
                    <Select {...this.employeeProps} />
                </Col>
            </Row>
        );
    }
}

export default TimecardFilter;