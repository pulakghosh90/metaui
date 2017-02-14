import React from "react";
import { Label, Select, Row, Col } from "constants/Components";

const commonProps = {
    labelText: "",
    htmlAttrs: {},
    styles: {
        select: { className: "", inlineStyle: {} },
        label: { className: "", inlineStyle: {} }
    },
    bindAttr: "EMPLOYEEID",
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
        this.employeeProps = Object.assign({}, commonProps);
        this.employeeProps.handlers.onChange = this._onChange;
        this.employeeProps.labelText = "Employee:";
        this.payPeriodProps = Object.assign({}, commonProps);
        this.payPeriodProps.handlers.onChange = this._onChange;
        this.payPeriodProps.labelText = "Pay Period:";
        this.timecardProps = Object.assign({}, timeCardProps);
        this.timecardProps.labelText = "Timecard";
    }
    render() {
        debugger;
        this.employeeProps.options = this.props.employees || [];
        if (this.props.employees.length > 0)
            this.employeeProps.value = this.props.employees[0].value;
        else
            this.employeeProps.value = "";
        return (
            <Row style={{ paddingBottom: "10px" }}>
                {false &&
                    <Col xs={5} sm={5} md={5} lg={5}>
                        <Select {...this.payPeriodProps} />
                    </Col>
                }
                <Col xs={5} sm={5} md={5} lg={5}>
                    <Select {...this.employeeProps} handlers={{ onChange: this.props.onFilterChange }} />
                </Col>
            </Row>
        );
    }
}

export default TimecardFilter;