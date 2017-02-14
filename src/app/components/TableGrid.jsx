import React from "react";
import Link from "components/Link.jsx";

class TableGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var key = this.props.key ? this.props.key : this.props.id;
        var headers = this.props.headers;
        var rows = this.props.rows;
        var id = -1;
        return (
            <table className="table table-hover" key={key} id={this.props.id}>
                <thead>
                    {
                        <tr key={id++}>
                            {
                                headers.map((header) => { return <th key={id++}>{header.label}</th> })
                            }
                        </tr>
                    }
                </thead>
                <tbody>

                    {
                        rows.map((row) => {
                            return <tr key={id++}>
                                {
                                    headers.map((header) => {
                                        if (header.type === "LINK") {
                                            return <td key={id++}>
                                                <Link href={"#/employees/" + row[header.bind]} value={row[header.bind]}
                                                    onClick={this.props.onClick} />
                                            </td>
                                        } else {
                                            return <td key={id++}>{row[header.bind]}</td>
                                        }
                                    })
                                }
                            </tr>
                        })
                    }

                    {rows && rows.length === 0 &&
                        <tr >
                            <td>No record found</td>
                        </tr>
                    }
                </tbody>
            </table>
        );
    }
}

export default TableGrid;