/*
  A simple Navbar component  that can redirect user or log him out
*/

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authentication';
import {withRouter} from 'react-router-dom';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        /*
          Links that we show to user when he is
          logged in
        */

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                         className="rounded-circle"
                         style={{width: '25px', marginRight: '5px'}}/>
                    Logout
                </a>
                <a href="" className="nav-link" onClick={()=>this.props.history.push('/transactions')}>
                    Transactions
                </a>
                <a href="" className="nav-link" onClick={()=>this.props.history.push('/')}>
                    Transfer
                </a>
            </ul>
        );

        /*
          Links that we show to user when he is
          a guest
        */
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg">
                <div id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

/*
  All we need from the container
*/
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

/*
  All we need from the container
*/
const mapStateToProps = (state) => ({
    auth: state.auth
})

/*
  Connect to  the container state
*/
export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));
