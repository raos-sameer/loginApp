import React from "react";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Badge,
} from "reactstrap";
import AppMenu from "../common/AppMenu";
import { isValidLoginDetails } from "../common/validate";
import "./styles.css";
class SignUpPage extends React.Component {
  state = {
    isInValidLoginDetails: false,
    showText: false,
    signup: {
      email: "",
      fullName: "",
      password: "",
    },
  };
  handleChange = (event) => {
    let { signup } = this.state;
    signup[event.target.name] = event.target.value;
    this.setState({
      signup: signup,
      isInValidLoginDetails: false,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { signup } = this.state;
    const me = this;
    if (isValidLoginDetails(signup)) {
      axios({
        url: "/api/signup/",
        method: "POST",
        data: signup,
      })
        .then((response) => {
          console.log("Data saved", response.data.error);
          const showMsg = response.data.error ? "error" : "success";
          me.setState({
            showText: showMsg,
          });
        })
        .catch(() => {
          console.log("Some error occurred");
        });
    } else {
      this.setState({
        isInValidLoginDetails: true,
      });
    }
  };
  render() {
    const { isInValidLoginDetails, showText } = this.state;
    return (
      <div>
        <AppMenu></AppMenu>
        <Container>
          <Row>
            <Col xs="6">
              <div className="headersection">
                <h3>Sign Up</h3>
                <div className="mainsection">
                  <Form>
                    <FormGroup>
                      <Label for="email">Enter your email to get started</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        invalid={isInValidLoginDetails}
                        onChange={this.handleChange}
                        placeholder="Enter email address"
                      />
                      {isInValidLoginDetails && (
                        <FormFeedback>Enter proper Email id</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="fullName">Enter your full name</Label>
                      <Input
                        type="fullName"
                        name="fullName"
                        id="fullName"
                        onChange={this.handleChange}
                        placeholder="Enter fullName"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">
                        Choose a password with atleast 8 characters
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        invalid={isInValidLoginDetails}
                        onChange={this.handleChange}
                        placeholder="Enter password"
                      />
                      {isInValidLoginDetails && (
                        <FormFeedback>Enter proper passowrd</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="confirmPwd">Confirm password</Label>
                      <Input
                        type="password"
                        name="confirmPwd"
                        id="confirmPwd"
                        invalid={isInValidLoginDetails}
                        onChange={this.handleChange}
                        placeholder="Enter password again"
                      />
                      {isInValidLoginDetails && (
                        <FormFeedback>should match passowrd</FormFeedback>
                      )}
                    </FormGroup>
                    <Badge
                      xs="1"
                      color={showText === "error" ? "danger" : "success"}
                    >
                      {showText && (
                        <div>
                          {showText === "error"
                            ? "Email Already present"
                            : "Sign Up Successful"}
                        </div>
                      )}
                    </Badge>
                    <br />
                    <FormGroup>
                      <Button onClick={this.handleSubmit}>Submit</Button>
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

export default SignUpPage;
