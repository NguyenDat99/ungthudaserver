import './css/Body.css';
import axios from 'axios';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router-dom';

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
    url: "http://0.0.0.0:4000/api/getPatients"
  },
  getDoctors:{
    method: 'post',
    url: "http://0.0.0.0:4000/api/getDoctors"
  },
  deletePatients:{
    method: 'delete',
    url:"http://0.0.0.0:4000/api/removePatient",
    data:{}
  },
  deleteDoctor:{
    method: 'delete',
    url:"http://0.0.0.0:4000/api/removeDoctor",
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
    this.themTaiKhoan = this.themTaiKhoan.bind(this);
    try {
    this.getAccounts();
    } catch (e) {

    }

  }
  //  xu ly  event
  componentDidMount() {
    this.getAccounts();
  }
  componentWillMount() {
    // this.getAccounts();
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
    let newPromise = axios(request.getPatients)
    let newPromise1 = axios(request.getDoctors)
    axiosArray.push(newPromise)
    axiosArray.push(newPromise1)
    axios.all(axiosArray).then(axios.spread((...responses) => {
      // const responseOne = responses[0]
      // const responseTwo = responses[1]
      responses[1].data.data.map(function(item, i){
        var acc = new account(item.key,i+1,item.name,item.birth,item.email,item.pass,item.phone,"Bác sĩ")
        data.push(acc)
      })
      var doctorlength = data.length +1
      responses[0].data.data.map(function(item, i){
        var acc = new account(item.key,i+doctorlength,item.name,item.birth,item.email,item.pass,item.phone,"Bệnh nhân")
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
      // console.log(requestUrl);
      axios(newPromise).then(res => {
        console.log(res);
      }).catch(error => console.log(error));

    }
    const { accounts, currentPage, accountsPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    const currentAccount = accounts.slice(indexOfFirstAccount, indexOfLastAccount);
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(accounts.length / accountsPerPage); i++) {
      pageNumbers.push(i);
//tim kiem
    if(this.state.search!="")
    {

    }
//
    }
    return (

      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-5"><h2><b>Danh sách tài khoản</b></h2></div>

                <div className="col-sm-5">
                  <div className="search-box">
                    <i className="material-icons"></i>
                    <input type="text" className="form-control" placeholder="Tìm kiếm…" />
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

  );
}
}

// <div class="clearfix">
// <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
// <ul class="pagination">
// {
//     pageNumbers.map((number) =>
//     <li class="page-item"><a href="#" class="page-link"
//     key={number}
//     id={number}
//     onClick={this.handleClick}>{number}</a></li>
//   )
// }
// </ul>
// </div>




// <div class="clearfix">
// <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
// <ul class="pagination">
// <li class="page-item disabled"><a href="#">Đầu</a></li>
// <li class="page-item active"><a href="#" class="page-link">1</a></li>
// <li class="page-item"><a href="#" class="page-link">2</a></li>
// <li class="page-item"><a href="#" class="page-link">3</a></li>
// <li class="page-item"><a href="#" class="page-link">Cuối</a></li>
// </ul>
// </div>
