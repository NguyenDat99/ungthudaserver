import axios from 'axios';
import React, { Component } from 'react';
import './css/Login.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

var titleName =
{
  name:"Họ và tên",
  birth:"Ngày sinh",
  email:"Email",
  pass: "Mật khẩu",
  phone:"Điện thoại",
  role:"Tài khoản"
}

var request = {
  login:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/login",
    data:{}
  }
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account:"",
      isLogin:false,
      email:"",
      password:""
    };
    this.xuLyDangNhap = this.xuLyDangNhap.bind(this);
    this.daNhapDuLieu = this.daNhapDuLieu.bind(this);
  }
  xuLyDangNhap(event){
    event.preventDefault();
    var data = {
      "Profile": {
        "Email":this.state.email,
        "Pass":this.state.password
      }
    }
    var requestUrl = request.login;
    requestUrl.data = data;
    var newPromise = axios(requestUrl)
    var axiosArray = []
    axiosArray.push(newPromise)
    axios.all(axiosArray).then(axios.spread((...responses) => {
      try {
        if(responses[0].data.message === "error"){
            alert("Sai tài khoản, mật khẩu!");
            window.location.reload();
        }
        else {
            const cookies = new Cookies();
            cookies.set('isLogin', 'true', { path: '/' });
          //
          this.setState({account: responses[0].data,isLogin: true});
          let path = `/home`;
          this.props.history.push(path,{isLogin:true});
        }
      } catch (e) {}
    })).catch(errors => {
      // react on errors.
    })
  }
  daNhapDuLieu(event)
  {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({[name]: value});
  }
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
                <form  acceptCharset="UTF-8"  onSubmit={this.xuLyDangNhap}>
                  <fieldset>
                    <div className="form-group" id="Loginform-group0">
                      <input className="form-control" placeholder="Email" name="email" type="text" onChange={this.daNhapDuLieu} />
                    </div>
                    <div className="form-group" id="Loginform-group1">
                      <input className="form-control" placeholder="Mật khẩu" name="password" type="password"  onChange={this.daNhapDuLieu}/>
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
