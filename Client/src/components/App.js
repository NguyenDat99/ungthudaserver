import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import EditAcc from './EditAcc'
import AddAcccount from './AddAcccount'
import Login from './Login'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
  <div>
    <Route path="/" exact component={Login}/>
    <Route path="/home"exact  component={Header}/>
    <Route path="/home" exact component={Body}/>
    <Route path="/home/EditAcc" exact component={EditAcc}/>
    <Route path="/home/AddAcccount"exact component={AddAcccount}/>
    <Route path="/home" exact component={Footer}/>
  </div>
  </Router>
  );
}

export default App;
