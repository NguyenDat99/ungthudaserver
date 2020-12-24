
function Header() {
  return (
      <nav className = "navbar navbar-inverse">
        <div className ="container-fluid" >
          <a className="navbar-brand">Danh Mục</a>
          <ul className="nav navbar-nav">
            <li className="active">
                <a >Trang chủ</a>
            </li>
            <li>
                <a >Thông Tin</a>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Header;
