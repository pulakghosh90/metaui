import React from "react";

class Select extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = this.onClick.bind(this);
    }
    onClick(evt) {
    }
    render() {
        var key = this.props.key ? this.props.key : this.props.id;
        var className = this.props.className ? this.props.className : "";
        var options = this.props.options;
        var optionId = -1;
        return (
            <div>
                <select key={key} id={this.props.id} className={className} onClick={this._onClick}>
                    {
                        options.map((option) => {
                            optionId++;
                            return <option key={optionId} value={option.value}>{option.label}</option>;
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Select;