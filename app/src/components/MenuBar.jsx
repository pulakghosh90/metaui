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
                        <li><Link href={URLS.EMPLOYEES} value="Employee" onClick={this.props.onSelectClick} /></li>
                        <li><Link href={URLS.TIMECARD} value="Timecard" onClick={this.props.onSelectClick} /></li>
                        <li className="dropdown">
                            <Link href={URLS.SETTINGS} value="Configure Meta" onClick={this.props.onSelectClick}
                                className="dropdown-toggle" dataToggle="dropdown" role="button" ariaHaspopup ariaExpanded="false">
                                <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link href={URLS.ENTITY} value="Entity" onClick={this.props.onSelectClick} /></li>
                                <li><Link href={URLS.RULE} value="Rule" onClick={this.props.onSelectClick} /></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MenuBar;