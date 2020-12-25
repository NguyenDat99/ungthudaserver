import './css/Body.css';
import axios from 'axios';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
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
  getPatients:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/getPatients"
  },
  getDoctors:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/getDoctors"
  },
  getAdmins:{
    method: 'post',
    url: "https://webadminbackend-pchohu4vcq-as.a.run.app/api/getAdmins"
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
  }
}
class account {
  constructor(key,id,name,birth,email,pass,phone,role) {
    this.key=key
    this.id=id
    this.name= name
    this.birth= birth
    this.email= email
    this.pass= pass
    this.phone= phone
    this.role= role
  }
}
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts:[],
      currentPage: 1,
      accountsPerPage: 5,
      searchValue:""
    };
    this.suaDuLieu = this.suaDuLieu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.themTaiKhoan = this.themTaiKhoan.bind(this);
    this.dangXuat = this.dangXuat.bind(this)
    try {
      this.getAccounts();
    } catch (e) {}
    //
  }
  //  xu ly  event
  componentDidMount() {
    this.getAccounts();
  }
  componentWillMount() {
    this.tuChoiQuyen();
  }
  tuChoiQuyen()
  {
    try {
      const cookies = new Cookies();
      cookies.get('isLogin')
      var isLogin = this.props.history.location.state.isLogin
      if(isLogin === true || cookies.cookies.isLogin === "true")
      {
        //
      }
      else {
        let path = `/`;
        this.props.history.push(path);
      }
    } catch (e) {
      const cookies = new Cookies();
      cookies.get('isLogin')
      if(cookies.cookies.isLogin !== "true")
      {
        let path = `/`;
        this.props.history.push(path);
      }
    }
  }
  dangXuat()
  {
    try {
      const cookies = new Cookies();
      cookies.get('isLogin')
      cookies.set('isLogin', 'false', { path: '/' });
      let path = `/`;
      this.props.history.push(path);
    } catch (e) {
      let path = `/`;
      this.props.history.push(path);
    }
  }
  handleKeyDown(e){
    if (e.key === 'Enter') {
      this.setState({searchValue: e.target.value});
    }
  }
  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({currentPage: pageNumber});
  }
  suaDuLieu(account,currentPage) {
    let path = `/home/EditAcc`;
    this.props.history.push(path,{account:account,currentPage:currentPage});
  }
  themTaiKhoan(){
    let path = `/home/AddAcccount`;
    this.props.history.push(path);
  }
  // xu ly api
  //lay data
  getAccounts(){
    var data = []
    var axiosArray = []
    let newPromise = axios(request.getAdmins)
    let newPromise1 = axios(request.getDoctors)
    let newPromise2 = axios(request.getPatients)

    axiosArray.push(newPromise)
    axiosArray.push(newPromise1)
    axiosArray.push(newPromise2)
    axios.all(axiosArray).then(axios.spread((...responses) => {
      // const responseOne = responses[0]
      // const responseTwo = responses[1]
      responses[0].data.data.map(function(item, i){
        var acc = new account(item.key,i+1,item.name,item.birth,item.email,item.pass,item.phone,"Quản trị viên")
        data.push(acc)
      })
      responses[1].data.data.map(function(item, i){
        var acc = new account(item.key,i+data.length+1,item.name,item.birth,item.email,item.pass,item.phone,"Bác sĩ")
        data.push(acc)
      })
      responses[2].data.data.map(function(item, i){
        var acc = new account(item.key,i+data.length+1,item.name,item.birth,item.email,item.pass,item.phone,"Bệnh nhân")
        data.push(acc)
      })
      console.log(responses);
      // use/access the results
      this.setState({ accounts: data });
    })).catch(errors => {
      // react on errors.
    })
  }


  render() {
    //on Delete
    function deleteAccount(key,email,role)
    {
      var newPromise = ""
      var data = {
        "Profile": {
          "Email":email,
          "key":key
        }
      }
      var requestUrl = ""
      if(role == "Bác sĩ")
      {
        requestUrl = request.deleteDoctor;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
      }
      else if (role == "Bệnh nhân" )
      {
        requestUrl = request.deletePatients;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
      }
      else if (role == "Quản trị viên" )
      {
        requestUrl = request.deleteAdmin;
        requestUrl.data = data;
        newPromise = axios(requestUrl)
      }
      // console.log(requestUrl);
      axios(newPromise).then(res => {
        console.log(res);
      }).catch(error => console.log(error));
      window.location.reload();
    }
    const { accounts, currentPage, accountsPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    var currentAccount = accounts.slice(indexOfFirstAccount, indexOfLastAccount);
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(accounts.length / accountsPerPage); i++) {
      pageNumbers.push(i);
      //tim kiem
      if(this.state.searchValue!="" || this.state.searchValue!= undefined )
      {
        var searchAccounts = [];
        currentAccount.forEach((item, i) => {
          // console.log(this.state.searchValue);
          if(item.name.includes(this.state.searchValue))
          {
            searchAccounts.push(item)
          }
        });
        //
        currentAccount = searchAccounts;
      }
      //
    }
    return (
      <div>
        <nav id="scanfcode" className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" id="toogle-button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="glyphicon glyphicon-menu-hamburger" />
              </button>
              <a id="logo" className="navbar-brand" href="#">Quản lý</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul id="link" className="nav navbar-nav navbar-right">
                <li className="dropdown" id="first-link">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">Menu<span className="caret" /></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Liên hệ</a></li>
                    <li><a href="#" onClick={this.dangXuat}>Đăng xuất</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="container-lg">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5"><h2><b>Danh sách tài khoản</b></h2></div>

                  <div className="col-sm-5">
                    <div className="search-box">
                      <i className="material-icons"></i>
                      <input type="text" className="form-control" placeholder="Tìm kiếm…" onKeyDown={this.handleKeyDown} />
                    </div>
                  </div>


                  <div className="col-sm-2">
                    <button type="button" class="btn btn-info add-new" onClick={this.themTaiKhoan}>Thêm tài khoản</button>
                  </div>
                </div>
              </div>
              <table class="table table-bordered" >
                <thead>
                  <tr>
                    <th class="col-md-1">ID</th>
                    <th class="col-md-2">{titleName.name}</th>
                    <th class="col-md-2">{titleName.birth}</th>
                    <th class="col-md-6">{titleName.email}</th>
                    <th class="col-md-3">{titleName.pass}</th>
                    <th class="col-md-2">{titleName.phone}</th>
                    <th class="col-md-2">{titleName.role}</th>
                    <th class="col-md-2">Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentAccount.map((item,i) =>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.birth}</td>
                      <td>{item.email}</td>
                      <td>{item.pass}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td>
                        <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                        <a class="edit" title="Edit" data-toggle="tooltip"  onClick={this.suaDuLieu.bind(this,item,{currentPage})}><i class="material-icons">&#xE254;</i></a>
                        <a class="delete" title="Delete" data-toggle="tooltip" onClick={() => deleteAccount(item.key,item.email,item.role)}><i class="material-icons">&#xE872;</i></a>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>

            <div>
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
}



                // <li id="button-link"><a href="#" onClick={this.dangXuat}>Đăng xuất</a></li>
