import React from "react";
import { Button, Checkbox, Label, TextBox, Row, Col, Message } from "constants/Components";
import LoginManager from "common/LoginManager";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this._onSubmit = this.onSubmit.bind(this);
        this._onChange = this.onChange.bind(this);

        this.state = {
            orgId: "",
            userName: "",
            pwd: "",
            remeberMe: false,
            errorMsg: null
        };
        this.commonFieldProps = {
            labelText: null,
            htmlAttrs: { password: false },
            styles: {
                input: { className: "form-control" }
            },
            handlers: { onChange: this._onChange }
        };
    }

    render() {
        debugger;
        var orgOidFieldProps = Object.assign({}, this.commonFieldProps,
            {
                htmlAttrs: {
                    placeholder: "Enter orgid",
                    id: "login:orgid"
                },
                bindAttr: "orgId"
            });
        var userNameFieldProps = Object.assign({}, this.commonFieldProps,
            {
                htmlAttrs: {
                    placeholder: "Enter username",
                    id: "login:username"
                },
                bindAttr: "userName"
            });
        var passwordFieldProps = Object.assign({}, this.commonFieldProps,
            {
                htmlAttrs: {
                    password: true,
                    placeholder: "Enter password",
                    id: "login:pwd"
                },
                bindAttr: "pwd"
            });

        var checkBoxProps = {
            labelText: "Remember me",
            htmlAttrs: { id: "login:checkbox" },
            styles: {
                label: {}
            },
            handlers: { onChange: this._onChange },
            value: "remember",
            bindAttr: "remeberMe"
        };

        var labelProps = {
            labelText: "Please login",
            htmlAttrs: { id: "login:label" },
            styles: {
                label: { className: "form-signin-heading", inlineStyle: { fontSize: "35px" } }
            }
        };
        var buttonProps = {
            labelText: "Login",
            htmlAttrs: { id: "login:btn" },
            styles: {
                label: { className: "btn btn-lg btn-primary btn-block" }
            },
            handlers: { onClick: this._onSubmit }
        };

        var message = {
            type: "error",
            message: this.state.errorMsg
        };
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    {this.state.errorMsg &&
                        <Message {...message} className="form-signin" />
                    }
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <form className="form-signin">
                                <Label {...labelProps} />
                                <TextBox {...orgOidFieldProps} />
                                <TextBox {...userNameFieldProps} />
                                <TextBox {...passwordFieldProps} />
                                <Checkbox {...checkBoxProps} />
                                <Button {...buttonProps} />
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    onChange(value) {
        this.setState(Object.assign({}, value));
    }
    onSubmit(evt) {
        evt.preventDefault();
        if (this.state.orgId && this.state.orgId !== "") {
            var result = LoginManager.verifyAndProceed(this.state);
            if (result && result.status === "error") {
                this.setState({ errorMsg: result.msg })
            }
        } else {
            this.setState({ errorMsg: "OrgId missing!" });
        }
    }
}

export default Login;