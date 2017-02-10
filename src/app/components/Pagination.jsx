import React from "react";
import Link from "components/Link.jsx";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this._onSelect = this.onSelect.bind(this);
    }
    onSelect(evt) {
        this.props.onSelect(evt);
    }
    render() {
        var key = this.props.key ? this.props.key : this.props.id;
        var className = this.props.className ? this.props.className : "pagination";

        var pagination = (
            <div class="pagination">
                <ul>
                    <li className={this.state.disabled}><Link value="First">First</Link></li>
                    <li className={}><Link value="Prev">Prev</Link></li>
                    <li className={}><Link value="Next">Next</Link></li>
                    <li className={}><Link value="Last">Last</Link></li>
                </ul>
            </div>
        );
        return pagination;
    }
}

export default Pagination;