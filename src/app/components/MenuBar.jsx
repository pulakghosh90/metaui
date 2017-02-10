import React from "react";
import Link from "components/Link.jsx";
import { URLS } from "constants/Constants";

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link href={URLS.HOME} className="navbar-brand active" value="Home" onClick={this.props.onSelectClick}
                        style={{ fontSize: "14px" }} />
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li><Link href={URLS.EMPLOYEES} value="Employees" onClick={this.props.onSelectClick} /></li>
                        <li><Link href={URLS.TIMECARD} value="Timecard" onClick={this.props.onSelectClick} /></li>
                        <li><Link href={URLS.SETTINGS} value="Settings" onClick={this.props.onSelectClick} /></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MenuBar;