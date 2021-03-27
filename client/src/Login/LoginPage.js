import axios from "axios";
import React from "react";
import { loginUser } from "../actions/loginActions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  FormFeedback,
  Badge,
} from "reactstrap";
import AppMenu from "../common/AppMenu";
import HomePage from "./HomePage";
import "./styles.css";
import { isValidLoginDetails } from "../common/validate";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidPwd: false,
      isValidLoginDetails: false,
      login: {
        email: "",
        password: "",
      },
    };
  }

  handleClick = (button) => {
    const { login } = this.state;
    const me = this;
    const queryParam = "email=" + login.email + "&&password=" + login.password;

    if (isValidLoginDetails(login)) {
      axios
        .get("/api/login?" + queryParam)
        .then((response) => {
          !response.data[0]
            ? this.setState({
                isValidLoginDetails: true,
              })
            : me.showLogin(response.data[0]);
        })
        .catch(() => {
          me.setState({
            isValidLoginDetails: true,
          });
        });
    } else {
      this.setState({
        isValidPwd: true,
      });
    }
  };
  showLogin = (data) => {
    this.props.loginUser(data);
    this.props.history.push("/home");
  };
  handleChange = (component) => {
    let { login } = this.state;
    login[component.target.name] = component.target.value;
    this.setState({
      login: login,
      isValidPwd: false,
      isValidLoginDetails: false,
    });
  };

  render() {
    const { isValidPwd, isValidLoginDetails } = this.state;
    return (
      <div>
        <AppMenu></AppMenu>

        <Container>
          <Row>
            <Col xs="6">
              <div className="headersection">
                <h3>Login</h3>
                <div className="mainsection">
                  <Form>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        onChange={this.handleChange.bind(this)}
                        placeholder="Enter email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.handleChange.bind(this)}
                        placeholder="Enter Password"
                      />
                    </FormGroup>
                    {isValidPwd && (
                      <Badge xs="1" color="danger">
                        <h4>Incorrect Email or Password..</h4>
                      </Badge>
                    )}
                    <FormGroup>
                      <a href="/forgotPwd">Forgot Password? </a>
                    </FormGroup>

                    <FormGroup>
                      <a href="/signup">Sign Up </a>
                      <Button onClick={this.handleClick.bind(this)}>
                        Submit
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </Col>

            <Col>
              {isValidLoginDetails && (
                <div className="headersection">
                  <Badge xs="3" color="danger">
                    <h4>Incorrect Email or Password..</h4>
                  </Badge>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (name) => {
      dispatch(loginUser(name));
    },
  };
};

export default withRouter(connect("", mapDispatchToProps)(LoginPage));
