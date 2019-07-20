import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import {transactionRequest} from '../actions/transactions'
import {css} from '@emotion/core';
import {RingLoader} from 'react-spinners';
import moment from 'moment';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Transactions extends Component {
    state = {transactions: '', spinner: true}

    retrieveTransactions() {
        const transactionData = {
            srcEmail: this.props.auth.user.email,
            Uid:this.props.auth.user.uid,
        };
        this.props.transactionRequest(transactionData);
    }

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

Transactions.propTypes = {
    transactionRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    transactions: state.transactions,
});

export default connect(mapStateToProps, {transactionRequest})(withRouter(Transactions));


