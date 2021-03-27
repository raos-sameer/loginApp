import axios from "axios";
import React from "react";
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
  Alert,
} from "reactstrap";
import AppMenu from "../common/AppMenu";
import "./styles.css";
import { isValidLoginDetails } from "../common/validate";

class ForgotPwd extends React.Component {
  state = {
    showNewPasswordSection: false,
    email: "",
    login: {
      email: "",
      password: "",
    },
  };
  handleClick = (button) => {
    const { login } = this.state;
    const me = this;

    if (!login.email) {
      axios
        .get("/api/login?email=" + login.email)
        .then((response) => {
          me.setState({
            showNewPasswordSection: true,
            email: login.email,
          });
        })
        .catch(() => {
          console.log("Some error occurred");
        });
    } else {
    }
  };
  handleChange = (component) => {
    let { login } = this.state;
    login[component.target.name] = component.target.value;
    this.setState({
      login: login,
    });
  };

  render() {
    const { showNewPasswordSection, email } = this.state;
    return (
      <div>
        <AppMenu></AppMenu>

        <Container>
          <Row>
            <Col xs="6">
              <div className="headersection">
                <h3>Forgot Password</h3>
                <div className="mainsection">
                  <Form>
                    {!showNewPasswordSection && (
                      <div>
                        <FormGroup>
                          <Label for="email">
                            Enter your email to get started
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            placeholder="Enter email address"
                          />
                        </FormGroup>
                      </div>
                    )}
                    {showNewPasswordSection && (
                      <div>
                        <FormGroup>
                          <Badge color="primary">{email}</Badge>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">
                            Choose a password with atleast 8 characters
                          </Label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.handleChange}
                            placeholder="Enter password"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="confirmPwd">Confirm password</Label>
                          <Input
                            type="confirmPwd"
                            name="confirmPwd"
                            id="confirmPwd"
                            onChange={this.handleChange}
                            placeholder="Enter password again"
                          />
                        </FormGroup>
                      </div>
                    )}
                    <FormGroup>
                      <Button onClick={this.handleClick.bind(this)}>
                        Submit
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPwd;
