import axios from 'axios';
import React, { Component } from 'react';
import './css/Edit.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

var request = {
  updatePatient:{
    method: 'put',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/updatePatient"
  },
  updateDoctor:{
    method: 'put',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/updateDoctor"
  },
  updateAdmin:{
    method: 'put',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/updateAdmin"
  },
  deletePatients:{
    method: 'delete',
    url:"https://webadminbackend-pchohu4vcq-as.a.run.app/api/removePatient",
    data:{}
  },
  deleteDoctor:{
    method: 'delete',
    url:"https://webadminbackend-pchohu4vcq-as.a.run.app/api/removeDoctor",
    data:{}
  }
  ,
  deleteAdmin:{
    method: 'delete',
    url:"https://webadminbackend-pchohu4vcq-as.a.run.app/api/removeAdmin",
    data:{}
  },
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



export default class EditAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key :"",
      name:"",
      birth:"",
      email:"",
      pass:"",
      phone:"",
      role:"",
      oldRole:"",
      currentPage:""
    };
    this.guiDuLieu = this.guiDuLieu.bind(this);
    this.daSuaDuLieu = this.daSuaDuLieu.bind(this);
    this.quayVe = this.quayVe.bind(this);
  };
  //event
  componentDidMount() {
    this.luuDuLieuChuyenQua();
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


  luuDuLieuChuyenQua(){
    try {
      var account = this.props.history.location.state.account
      var currentPage = this.props.history.location.state.currentPage

      if(account.key !== undefined)
      this.setState({ key: account.key });
      if(account.name !== undefined)
      this.setState({ name: account.name });
      if(account.birth !== undefined)
      this.setState({ birth: account.birth });
      if(account.email !== undefined)
      this.setState({ email: account.email });
      if(account.pass !== undefined)
      this.setState({ pass: account.pass });
      if(account.phone !== undefined)
      this.setState({ phone: account.phone });
      if(account.role !== undefined)
      {
        this.setState({ role: account.role });
        this.setState({ oldRole: account.role });
      }
      if(currentPage !== undefined)
      this.setState({ currentPage: currentPage });
    } catch (e) {
      console.log("reload error");
      let path = `/`;
      this.props.history.push(path);
    }
  }
  quayVe()
  {
    let path = `/home`;
    this.props.history.push(path);
  }
  daSuaDuLieu(event)
  {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({[name]: value});
  }
  guiDuLieu()
  {
    var newPromise = ""
    var data = {
      "Profile": {
        "key":this.state.key,
        "Email":this.state.email,
        "Name":this.state.name,
        "Birth":this.state.birth,
        "Pass":this.state.pass,
        "Phone":this.state.phone
      }
    }
    var requestUrl = ""
    if(this.state.role == "Bác sĩ" && this.state.role == this.state.oldRole)
    {
      requestUrl = request.updateDoctor;
      requestUrl.data = data;
      newPromise = axios(requestUrl)
      // console.log(requestUrl);
      axios(newPromise).then(res => {
        console.log(res);
      }).catch(error => console.log(error));
    }
    else if (this.state.role == "Bệnh nhân" && this.state.role == this.state.oldRole)
    {
      requestUrl = request.updatePatient;
      requestUrl.data = data;
      newPromise = axios(requestUrl)
      // console.log(requestUrl);
      axios(newPromise).then(res => {
        console.log(res);
      }).catch(error => console.log(error));
    }
    else if (this.state.role == "Quản trị viên" && this.state.role == this.state.oldRole)
    {
      requestUrl = request.updateAdmin;
      requestUrl.data = data;
      newPromise = axios(requestUrl)
      // console.log(requestUrl);
      axios(newPromise).then(res => {
        console.log(res);
      }).catch(error => console.log(error));
    }
    else if(this.state.oldRole == "Bác sĩ" && this.state.role != this.state.oldRole)
    {
      if(this.state.role == "Bệnh nhân")
      {
        //tao benh nhan
        requestUrl = request.createPatient;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa bac si
        requestUrl = request.deleteDoctor;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
      else if(this.state.role == "Quản trị viên") {
        //tao quan tri vien
        requestUrl = request.createAdmin;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa bac si
        requestUrl = request.deleteDoctor;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
    }
    else if (this.state.oldRole == "Bệnh nhân" && this.state.role != this.state.oldRole) {
      if(this.state.role == "Bác sĩ")
      {
        //tao bac si
        requestUrl = request.createDoctor;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa benh nhan
        requestUrl = request.deletePatients;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
      else if(this.state.role == "Quản trị viên") {
        // tao quan tri vien
        requestUrl = request.createAdmin;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa benh nhan
        requestUrl = request.deletePatients;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
    }
    else if (this.state.oldRole == "Quản trị viên" && this.state.role != this.state.oldRole) {
      if(this.state.role == "Bệnh nhân")
      {
        // tao benh nhan
        requestUrl = request.createPatient;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa quan tri vien
        requestUrl = request.deleteAdmin;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
      else if(this.state.role == "Bác sĩ") {
        //tao bac si
        requestUrl = request.createDoctor;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
        //xoa quan tri vien
        requestUrl = request.deleteAdmin;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
        axios(newPromise).then(res => {
          console.log(res);
        }).catch(error => console.log(error));
      }
    }
    //
    let path = `/home`;
    this.props.history.push(path,{currentPage:this.state.currentPage});
  }
  render() {
    return (
      <div className="container contact-form">
        <div className="contact-image">
          <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
        </div>
        <form onSubmit={this.guiDuLieu}>
          <h3>Chỉnh sửa thông tin</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Họ và tên " defaultValue ={this.state.name} onChange={this.daSuaDuLieu} />
              </div>
              <div className="form-group">
                <input type="text"  name="birth" className="form-control" placeholder="Ngày sinh" defaultValue ={this.state.birth} onChange={this.daSuaDuLieu}/>
              </div>
              <div className="form-group">
                <input type="text"  name="email" className="form-control" placeholder="Email" defaultValue ={this.state.email} onChange={this.daSuaDuLieu}/>
              </div>
              <div className="form-group">
                <input type="text" name="pass" className="form-control" placeholder="Mật khẩu" defaultValue ={this.state.pass} onChange={this.daSuaDuLieu}/>
              </div>
              <div className="form-group">
                <input type="text" name="phone" className="form-control" placeholder="Số điện thoại" defaultValue ={this.state.phone}onChange={this.daSuaDuLieu} />
              </div>
              <div className="form-group">
                <select class="form-control" id="sel1" name ="role" value ={this.state.role} onChange={this.daSuaDuLieu}>
                  <option>Bệnh nhân</option>
                  <option>Bác sĩ</option>
                  <option>Quản trị viên</option>
                </select>
              </div>
              <div className="form-group">
                <input type="submit" name="btnSubmit" id="btnGui"className="btnContact" defaultValue="Gửi"  onClick={this.guiDuLieu}/>
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
