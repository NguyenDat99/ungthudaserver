import axios from 'axios';
import React, { Component } from 'react';
import './css/Edit.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

var request = {
  createPatient:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/createPatient"
  },
  createDoctor:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/createDoctor"
  },
  createAdmin:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/createAdmin"
  }
}



export default class AddAcccount extends Component {
  constructor() {
    super();
    this.state = {
      name:"",
      birth:"",
      email:"",
      pass:"",
      phone:"",
      role:"",
    };
    this.guiDuLieu = this.guiDuLieu.bind(this);
    this.daThemDuLieu = this.daThemDuLieu.bind(this);
    this.quayVe = this.quayVe.bind(this);
  };
  componentDidMount() {
    this.tuChoiQuyen();
  }
  tuChoiQuyen()
  {
    try {
      const cookies = new Cookies();
      cookies.get('isLogin')
      if(cookies.cookies.isLogin !== "true")
      {
        let path = `/`;
        this.props.history.push(path);
      }
    } catch (e) {
      let path = `/`;
      this.props.history.push(path);
    }
  }
  quayVe()
  {
    let path = `/home`;
    this.props.history.push(path);
  }
  daThemDuLieu(event)
  {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({[name]: value});
  }

  guiDuLieu(event)
  {
    if(this.state.name !== "" && this.state.birth !== "" && this.state.email !== ""
    && this.state.pass !== ""&& this.state.phone !== "")
    {
      if (this.state.phone.match(/^\d{10}$/g) !== null) {
        var newPromise = ""
        var data = {
          "Profile": {
            "Name":this.state.name,
            "Birth":this.state.birth,
            "Email":this.state.email,
            "Pass":this.state.pass,
            "Phone":this.state.phone,
          }
        }
        var requestUrl = ""
        var role = this.state.role;
        if(role === "")
        role = "Bệnh nhân"
        if(role === "Bệnh nhân")
        {
          requestUrl = request.createPatient;
          requestUrl.data = data;
          newPromise = axios(requestUrl)
        }
        else if (role === "Bác sĩ") {
          requestUrl = request.createDoctor;
          requestUrl.data = data;
          newPromise = axios(requestUrl)
        }
        else if (role === "Quản trị viên") {
          requestUrl = request.createAdmin;
          requestUrl.data = data;
          newPromise = axios(requestUrl)
        }
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //
        let path = `/home`;
        this.props.history.push(path);
      }
      else {
        alert("Số điện thoại không đúng")
      }
    }
    else {
      alert("thiếu thông tin")
    }
  }
  render() {
    return (

      <div className="container contact-form">
        <div className="contact-image">
          <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
        </div>
        <form onSubmit={this.guiDuLieu}>
          <h3>Tạo tài khoản </h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Họ và tên "  onChange={this.daThemDuLieu}/>
              </div>
              <div className="form-group">
                <input type="text" type="date"  name="birth" className="form-control" placeholder="Ngày sinh" onChange={this.daThemDuLieu} />
              </div>
              <div className="form-group">
                <input type="text" type="email" name="email" className="form-control" placeholder="Email" onChange={this.daThemDuLieu} />
              </div>
              <div className="form-group">
                <input type="text" name="pass" className="form-control" placeholder="Mật khẩu"  onChange={this.daThemDuLieu}/>
              </div>
              <div className="form-group">
                <input type="text" name="phone" className="form-control" placeholder="Số điện thoại" onChange={this.daThemDuLieu} />
              </div>
              <div className="form-group">
                <select class="form-control" id="sel1" name ="role" onChange={this.daThemDuLieu}>
                  <option>Bệnh nhân</option>
                  <option>Bác sĩ</option>
                  <option>Quản trị viên</option>
                </select>
              </div>
              <div className="form-group">
                <input type="submit" name="btnSubmit" id="btnGui"className="btnContact" defaultValue="Gửi" />
                <input name="btnSubmit" type="button" id="btnHuy" className="btnContact" defaultValue="Hủy" onClick={this.quayVe}/>
              </div>
            </div>
            <div className="col-md-6">
              <img src="https://www.anphatpc.com.vn/media/lib/32653_1a61f789975b6c05354a.jpg" alt="rocket_contact" style={{width: '135%', height: '100%'}} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}




// <div className="container contact-form">
//   <div className="contact-image">
//     <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
//   </div>
//   <form method="post">
//     <h3>Tạo tài khoản </h3>
//     <div className="row">
//       <div className="col-md-6">
//         <div className="form-group">
//           <input type="text" name="txtName" className="form-control" placeholder="Họ và tên "  />
//         </div>
//         <div className="form-group">
//           <input type="text" name="txtEmail" className="form-control" placeholder="Ngày sinh"  />
//         </div>
//         <div className="form-group">
//           <input type="text" name="txtEmail" className="form-control" placeholder="Email"  />
//         </div>
//         <div className="form-group">
//           <input type="text" name="txtEmail" className="form-control" placeholder="Mật khẩu"  />
//         </div>
//         <div className="form-group">
//           <input type="text" name="txtPhone" className="form-control" placeholder="Số điện thoại"  />
//         </div>
//         <div className="form-group">
//           <select class="form-control" id="sel1">
//             <option>Bệnh nhân</option>
//             <option>Bác sĩ</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <input type="submit" name="btnSubmit" className="btnContact" defaultValue="Gửi" />
//         </div>
//       </div>
//       <div className="col-md-6">
//           <img src="https://www.anphatpc.com.vn/media/lib/32653_1a61f789975b6c05354a.jpg" alt="rocket_contact" style={{width: '135%', height: '100%'}} />
//       </div>
//     </div>
//   </form>
// </div>
//
