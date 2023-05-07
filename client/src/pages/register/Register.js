import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";

import loginImage from "../../assets/registerImage.svg";

import { registerUser } from "../../actions/register.js";
import hasToken from "../../services/authService";
import { toast } from "react-toastify";

const Register = (props) => {
  const [state, setState] = useState({firstname:'', lastname:'', email: '', password: '', role:'admin'} )

  const changeCred = (event) => {
  
    setState({ ...state, [event.target.name]: event.target.value })
    
  }

  const doRegister = (event) => {
    event.preventDefault();
//     let re = new RegExp("^(?=.*([A-Z]){1,})(?=.*[!@#$&*%^()_+]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{6,30}$");
// if (!re.test(state.password)) {
//     alert('Password should be 8 to 30 character long : at least 1 Caps, 1 special char, 1 number')
//     return
// }
    if (!state.firstname || !state.email || !state.password || !state.lastname) {
      toast.error("Please fill all the fields")
      return
    }

      props.dispatch(registerUser({
        creds: state,
        history: props.history,
      }))
    

    
  }

  const { from } = props.location.state || { from: { pathname: '/' } }

  if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
    return (
      <Redirect to={from} />
    );
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Sign Up</p>
                <div className="logo-block">
                <i className={`eva eva-email`}></i>
                  <p className="mb-0">H.M.S</p>
                </div>
              </div>
              {/* <div className="auth-info my-2">
                <p>This is a real app with Node.js backend - use <b>"admin@demo.com / 123456"</b> to login!</p>
              </div> */}
              <form onSubmit={(event => doRegister(event))}>
                <FormGroup className="my-3">
                  <FormText>First Name</FormText>
                  <Input
                    id="name"
                    className="input-transparent pl-3"
                    value={state.name}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required
                    name="firstname"
                    placeholder="First name..."
                  />
                </FormGroup>

                <FormGroup className="my-3">
                  <FormText>Last Name</FormText>
                  <Input
                    id="businessname"
                    className="input-transparent pl-3"
                    value={state.businessname}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required
                    name="lastname"
                    placeholder="Last name..."
                  />
                </FormGroup>
               

                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCred(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="example@example.com"
                  />
                </FormGroup>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    {/* <Link to="/error">Forgot password?</Link> */}
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event => changeCred(event))}
                    type="password"
                    required
                    name="password"
                    placeholder="password here..."
                  />
                </FormGroup>

               
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Sign Up</Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                
                <Link to="/login">Enter the account</Link>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
