import axios from 'axios';
import React, { Component } from 'react';
import './css/Edit.css';
import { withRouter } from 'react-router-dom';

var request = {
  updatePatient:{
    method: 'put',
    url: "http://0.0.0.0:4000/api/updatePatient"
  },
  updateDoctor:{
    method: 'put',
    url: "http://0.0.0.0:4000/api/updateDoctor"
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
      currentPage:""
    };
    this.guiDuLieu = this.guiDuLieu.bind(this);
    this.daSuaDuLieu = this.daSuaDuLieu.bind(this);
    this.quayVe = this.quayVe.bind(this);
  };
//event
componentDidMount() {
  this.luuDuLieuChuyenQua();
}
luuDuLieuChuyenQua(){
  var account = this.props.history.location.state.account
  var currentPage = this.props.history.location.state.currentPage
  try {
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
      this.setState({ role: account.role });
    if(currentPage !== undefined)
        this.setState({ currentPage: currentPage });
  } catch (e) {
    console.log("reload error");
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
    if(this.state.role == "Bác sĩ")
    {
      requestUrl = request.updateDoctor;
      requestUrl.data = data;
      newPromise = axios(requestUrl)
    }
    else if (this.state.role == "Bệnh nhân" )
    {
      requestUrl = request.updatePatient;
      requestUrl.data = data;
      newPromise = axios(requestUrl)
    }
    // console.log(requestUrl);
    axios(newPromise).then(res => {
      console.log(res);
    }).catch(error => console.log(error));
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
