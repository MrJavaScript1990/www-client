/*
  This component is responsible for communication to server and with valid credentials
  it can retrieve all the transactions from server
*/

//imports
import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";

/*
  this function calls the API and give the feed back
*/
import {transactionRequest} from '../actions/transactions'

/*
  two imports below are used for a third-part module which
  is responsible to show a spinner to user
*/
import {css} from '@emotion/core';
import {RingLoader} from 'react-spinners';

/*
  library to format the date
*/
import moment from 'moment';

//spinner CSS
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Transactions extends Component {
    state = {transactions: '', spinner: true}

    //helper function to handle Retrieving data from API
    retrieveTransactions() {
        const transactionData = {
            srcEmail: this.props.auth.user.email,
            Uid:this.props.auth.user.uid,
        };
        this.props.transactionRequest(transactionData);
    }

    //if user is not logged in redirect it to home
    //if user is  logged in  try to get transactions
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        } else {
            this.retrieveTransactions();
        }
        if (this.props.transactions) {
            this.setState({transactions: this.props.transactions});
        }
    }

    //if user is not logged in redirect it to home
    //if user is  logged in  and we have the result from API, disappear Spinner .
    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.transactions) {
            this.setState({transactions: nextProps.transactions, spinner: false});
        }

    }

    render() {
        let TableData = '';
        let Error='';
        if (this.state.transactions && this.state.transactions.errText) {
            Error=this.state.transactions.errText;
        }

        /*
            Map the results in to JSX and show them to user as a Table
        */
        if (this.state.transactions) {
            let arr = [...this.state.transactions];
            arr = arr.reverse();
            TableData = arr.map((item, index) =>

                <tr className="border-bottom border-dark">
                    <th className="table-info text-center">{item.srcEmail}</th>
                    <th className="table-danger text-center">{item.srcUid}</th>
                    <th className="table-info text-center">{item.dstEmail}</th>
                    <th className="table-danger text-center">{item.dstUid}</th>
                    <th className="table-info text-center">{item.amount}</th>
                    <th className="table-danger text-center">{item.currencyType === 'B' ? 'Bitcoin' : 'Ethereum'}</th>
                    <th className="table-info text-center">{moment(Date(item.timeStampCreated)).format('MM/DD hh:mm:ss')}</th>
                    <th className="table-danger text-center">{moment(Date(item.timeStampProcessed)).format('MM/DD hh:mm:ss')}</th>
                    <th className="table-info text-center">{item.state}</th>
                    <th className="table-danger text-center">{item.errMessage}</th>
                </tr>
            );
        }

        /*
          Check if we should show the spinner to user or show them the table
        */
        if (this.state.spinner) {
            return (
                <div style={{marginTop:50}}>
                    <RingLoader
                        css={override}
                        sizeUnit={"px"}
                        size={50}
                        color={'#123abc'}
                        loading={this.state.spinner}

                    />
                </div>);
        }
        else {
            return (
                <div style={{marginLeft:100,marginRight:100}}>
                    <table>
                        <tr>
                            <th className="table-info text-center">Sender Email</th>
                            <th className="table-danger text-center">Sender Uid</th>
                            <th className="table-info text-center">Receiver Email</th>
                            <th className="table-danger text-center">Receiver Uid</th>
                            <th className="table-info text-center">Amount</th>
                            <th className="table-danger text-center">Currency Type</th>
                            <th className="table-info text-center">Time Stamp Created</th>
                            <th className="table-danger text-center">Time Stamp Processed</th>
                            <th className="table-info text-center">State</th>
                            <th className="table-danger text-center">Error Message</th>
                        </tr>
                        {TableData}
                        {Error && <h6 style={{color:'red'}}>{Error}</h6>}
                    </table>
                </div>
            );
        }
    }
}

/*
  All we need from the container
*/
Transactions.propTypes = {
    transactionRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
};

/*
  All we need from the container
*/
const mapStateToProps = (state) => ({
    auth: state.auth,
    transactions: state.transactions,
});

/*
  Connect to the container and retrieve the state
*/
export default connect(mapStateToProps, {transactionRequest})(withRouter(Transactions));


