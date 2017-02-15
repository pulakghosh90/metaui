import React from "react";

class Link extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = this.onClick.bind(this);
    }
    onClick(evt) {
        this.props.onClick(evt);
    }
    render() {
        var className = this.props.className || "";
        var href = this.props.href || "#";
        return (
            <a href={href} id={this.props.id} className={className} onClick={this._onClick}
                style={this.props.style} data-toggle={this.props.dataToggle} role={this.props.role}
                aria-haspopup={this.props.ariaHaspopup} aria-expanded={this.props.ariaExpanded}>
                {this.props.value}
                {this.props.children}
            </a>
        );
    }
}

export default Link;