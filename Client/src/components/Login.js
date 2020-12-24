import axios from 'axios';
import React, { Component } from 'react';
import './css/Login.css';
export default class Login extends Component {

  render() {
    return (
      <div className="container" id="LoginContainer">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Đăng nhập</h3>
                </div>
                <div className="panel-body">
                  <form acceptCharset="UTF-8" role="form">
                    <fieldset>
                      <div className="form-group" id="Loginform-group0">
                        <input className="form-control" placeholder="Email" name="email" type="text" />
                      </div>
                      <div className="form-group" id="Loginform-group1">
                        <input className="form-control" placeholder="Mật khẩu" name="password" type="password"  />
                      </div>
                      <input className="btn btn-lg btn-success btn-block" type="submit" defaultValue="Login" />
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
