import React from "react";

class Image extends React.Component {

    render() {
        return (
            <div>
                <img src={this.props.src} alt={this.props.alt} style={this.props.style} />
            </div>
        );
    }
}

export default Image;