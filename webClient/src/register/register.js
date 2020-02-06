import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import useApiRequest, { FETCHING, SUCCESS, ERROR } from "../customHooks/useApiRequest";

// TODO: lots of acceability concerns in here...
export default () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [password2, updatePassword2] = useState('');
  const [errors, updateErrors] = useState({});

  const [{ status, response }, sendRegisterRequest] = useApiRequest(
    `http://localhost:5000/api/register`, // TODO: obviously we would want this not hard coded
    {
      verb: 'put',
      params: {
        email,
        password,
        password2
      }
    }
  );

  if(status === ERROR && errors !== response) {
    updateErrors(response);
  }

  return (
    <div className="container">
    <div className="row">
      <div className="col s8 offset-s2">
      <Link to="/" className="btn-flat waves-effect">
        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <h4>
        <b>Register</b> below
        </h4>
        <p className="grey-text text-darken-1">
          {status === SUCCESS && 'Successfully Registered. Return to '}
          {status !== SUCCESS && 'Already have an account?'} 
          <Link to="/login">Log in</Link>
        </p>
      </div>
      {status !== SUCCESS && <form noValidate onSubmit={(e) => {
        e.preventDefault();
        // TODO: some client side validation would be good
        if(status !== FETCHING)
          sendRegisterRequest();
      }}>
        <div className="input-field col s12">
          <input
            onChange={(e) => updateEmail(e.target.value)}
            value={email}
            error={errors.email}
            id="email"
            type="email"
            autoComplete="on"
            className={classnames("", {
              invalid: errors.email
            })}
          />
          <label htmlFor="email">Email</label>
          <span className="red-text">{errors.email}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={(e) => updatePassword(e.target.value)}
            value={password}
            error={errors.password}
            id="password"
            type="password"
            autoComplete="off"
            className={classnames("", {
              invalid: errors.password
            })}
          />
          <label htmlFor="password">Password</label>
          <span className="red-text">{errors.password}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={(e) => updatePassword2(e.target.value)}
            value={password2}
            error={errors.password2}
            id="password2"
            type="password"
            autoComplete="off"
            className={classnames("", {
              invalid: errors.password2
            })}
          />
          <label htmlFor="password2">Confirm Password</label>
          <span className="red-text">{errors.password2}</span>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <div className="red-text">{errors.error}</div>
          <button
            style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            disabled={status === FETCHING}
          >
            {status === FETCHING ? 'Registering' : 'Sign up'}
          </button>
        </div>
      </form>}
      </div>
    </div>
    </div>
  );
}
  