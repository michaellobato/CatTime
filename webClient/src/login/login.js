import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import useApiRequest, { FETCHING, SUCCESS, ERROR } from "../customHooks/useApiRequest";
import setAuthenticated from '../utils/setAuthToken';

// TODO: lots of accessability concerns in here...
export default ({history}) => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [errors, updateErrors] = useState({});

  const [{ status, response }, sendLoginRequest] = useApiRequest(
    `http://localhost:5000/api/login`, // TODO: obviously we would want this not hard coded
    {
      verb: 'post',
      params: {
        email,
        password
      }
    }
  );

  if (status === ERROR && errors !== response) {
    updateErrors(response);
  }

  if(status === SUCCESS) {
    setAuthenticated();
    history.push('/home');
  }

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
            <form noValidate onSubmit={(e) => {
              e.preventDefault();
              if (status !== FETCHING)
                sendLoginRequest();
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
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <div className="red-text">{errors.error}</div>
              <button
                style={{
                  'min-width': "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                disabled={status === FETCHING}
              >
                {status === FETCHING ? 'Logging In' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
