import React from "react";
import Utama from "./Components/Utama";
import {Link} from "react-router-dom";

class App extends React.Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/"        >Beranda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list"    >List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart"    >Cart</Link>
              </li>
            </ul>
          </div>
          <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Cari Sesuatu..." aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        <Utama />
      </div>
    )
  }
}

export default App;