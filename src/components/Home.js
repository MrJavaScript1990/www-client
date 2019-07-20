/*

Home Component is responsible for showing user the transfer page and if user is not logged
ask user to sign in.

*/

// Normal imports

import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import classnames from "classnames";
import PropTypes from 'prop-types';


/*
  two imports below are used for a third-part module which
  is responsible to show a spinner to user
*/
import {css} from '@emotion/core';
import {RingLoader} from 'react-spinners';


/*

helper function import . this function is used to to transfer
funds between users

*/

import {newTransfer} from "../actions/transfer";

//spinner CSS
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            srcUser: '',                        //Source User Email
            dstUser: '',                        //Destination User Email
            amount: '',
            currencyType: '',
            spinner:false,
            errors: {},
            transfer:{},                        //Data that will back from props and indicates if transfer was successful
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({spinner:true});
        const transferData = {
            srcUser: this.state.srcUser,
            dstUser: this.state.dstUser,
            amount: this.state.amount,
            currencyType: this.state.currencyType,
        };
        this.props.newTransfer(transferData, this.props.history);
    }

    componentWillReceiveProps(nextProps) {

        //get the new  props from container and put them into component state.
        this.setState({spinner:false});
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.transfer) {
            this.setState({
                transfer: nextProps.transfer
            });
        }
    }

    componentDidMount() {

        //if user is logged in write the Sender email into state

        if (this.props && this.props.auth && this.props.auth.user && this.props.auth.user.email) {
            this.setState({srcUser: this.props.auth.user.email});
        }
    }

    render() {

        //get user login situation from container
        const {isAuthenticated} = this.props.auth;

        //get the errors and transfer results
        const {errors,transfer} = this.state;

        // if user is not logged in we show him this
        const notAuthenticated =
            <div>
                <h1 style={{margin:20}}>Please Use Sign in button to login</h1>
            </div>

        // if user is logged in we show him this
        const Authenticated =
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <div class="row" style={{margin:0}}>
                    <h2 style={{marginBottom: '40px'}}>Transfer</h2>
                    <div style={{marginLeft:10}}>
                    <RingLoader
                        css={override}
                        sizeUnit={"px"}
                        size={40}
                        color={'#123abc'}
                        loading={this.state.spinner}

                    />
                    </div>
                </div>
                {/*
                some error and success message implementation to show to user
                */}
                {errors.errText && (<h6 style={{marginBottom:15,color:'red'}}>{errors.errText}</h6>)}
                {transfer.message && (<h6 style={{marginBottom:15,color:'green'}}>{transfer.message}</h6>)}
                {errors.errText && (<h6 style={{marginBottom:15,color:'red'}}>{'Transaction reference : '+ errors.refNumber}</h6>)}
                {transfer.message && (<h6 style={{marginBottom:15,color:'green'}}>{'Transaction reference : ' + transfer.ref}</h6>)}

                {/*
                form to get the data from user
                */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            disabled={true}
                            type="text"
                            maxLength={100}
                            placeholder="Sender e-mail"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.srcUser
                            })}
                            name="srcUser"
                            onChange={this.handleInputChange}
                            value={this.state.srcUser}
                        />
                        {errors.srcUser && (<div className="invalid-feedback">{errors.srcUser}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            maxLength={100}
                            placeholder="Receiver e-mail"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.dstUser
                            })}
                            name="dstUser"
                            onChange={this.handleInputChange}
                            value={this.state.dstUser}
                        />
                        {errors.dstUser && (<div className="invalid-feedback">{errors.dstUser}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            maxLength={50}
                            placeholder="Amount"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.amount
                            })}
                            name="amount"
                            onChange={this.handleInputChange}
                            value={this.state.amount}
                        />
                        {errors.amount && (<div className="invalid-feedback">{errors.amount}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            maxLength={1}
                            placeholder="Wallet Type , 'B' for Bitcoin and 'E' for Ethereum"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.currencyType
                            })}
                            name="currencyType"
                            onChange={this.handleInputChange}
                            value={this.state.currencyType}
                        />
                        {errors.currencyType && (<div className="invalid-feedback">{errors.currencyType}</div>)}
                    </div>
                    <div className="form-group">
                        <button disabled={this.state.spinner} type="submit" className="btn btn-primary">
                            Transfer
                        </button>

                    </div>
                </form>
            </div>
        /*
           Show user the correct screen
        */
        if (isAuthenticated) {
            {
                return Authenticated
            }
        } else {
            {
                return notAuthenticated
            }
        }
    }
}

Home.propTypes = {
    newTransfer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    transfer:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transfer:state.transfer
});

export default connect(mapStateToProps,{newTransfer})(withRouter(Home));
