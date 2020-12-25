import './css/Footer.css';
function Footer() {
  return (
    <div>
         <section>
           <h1 class = "textFooter">Thông tin nhóm phát triển</h1>
           <h3 class = "textFooter">Di chuyển chuột xuống vòng tròn bên dưới</h3>
         </section>
         <div className="footer">
           <div id="button" />
           <div id="container">
             <div id="cont">
               <div className="footer_center">
                 <h3 id="textNhomPhatTrien" class = "textFooter">Nhóm phát triển: Đạt-Long</h3>
               </div>
             </div>
           </div>
         </div>
       </div>
  );
}

export default Footer;
