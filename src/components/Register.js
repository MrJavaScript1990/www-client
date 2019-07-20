import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import randomstring from 'randomstring'
class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            ethereumWalletId:randomstring.generate(42),
            bitcoinWalletId:randomstring.generate(32),
            bitcoinBalance:'',
            ethereumBalance:'',
            maxTransferLimit:'',
            description:'',
            errors: {}
        }
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
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            ethereumWalletId:this.state.ethereumWalletId,
            bitcoinWalletId:this.state.bitcoinWalletId,
            bitcoinBalance:this.state.bitcoinBalance,
            ethereumBalance:this.state.ethereumBalance,
            maxTransferLimit:this.state.maxTransferLimit,
            description:this.state.description,
        };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {

        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    maxLength={100}
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    maxLength={100}
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    maxLength={100}
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    maxLength={100}
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        maxLength={1023}
                        placeholder="Description"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.description
                        })}
                        name="description"
                        onChange={ this.handleInputChange }
                        value={ this.state.description }
                    />
                    {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                </div>
                <hr/>
                <hr/>
                <div className="form-group">
                    <h6>Bitcoin Wallet ID</h6>
                    <input
                        type="text"
                        maxLength={32}
                        placeholder="Bitcoin Wallet ID"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.bitcoinWalletId
                        })}
                        name="bitcoinWalletId"
                        onChange={ this.handleInputChange }
                        value={ this.state.bitcoinWalletId }
                    />
                    {errors.bitcoinWalletId && (<div className="invalid-feedback">{errors.bitcoinWalletId}</div>)}
                </div>
                <div className="form-group">
                    <h6>Ethereum Wallet ID</h6>
                    <input
                        type="text"
                        maxLength={42}
                        placeholder="Ethereum Wallet ID"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.ethereumWalletId
                        })}
                        name="ethereumWalletId"
                        onChange={ this.handleInputChange }
                        value={ this.state.ethereumWalletId }
                    />
                    {errors.ethereumWalletId && (<div className="invalid-feedback">{errors.ethereumWalletId}</div>)}
                </div>
                <hr/>
                <hr/>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Bitcoin Wallet Balance"
                        maxLength={50}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.bitcoinBalance
                        })}
                        name="bitcoinBalance"
                        onChange={ this.handleInputChange }
                        value={ this.state.bitcoinBalance }
                    />
                    {errors.bitcoinBalance && (<div className="invalid-feedback">{errors.bitcoinBalance}</div>)}
                </div>


                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Ethereum Wallet Balance"
                        maxLength={50}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.ethereumBalance
                        })}
                        name="ethereumBalance"
                        onChange={ this.handleInputChange }
                        value={ this.state.ethereumBalance }
                    />
                    {errors.ethereumBalance && (<div className="invalid-feedback">{errors.ethereumBalance}</div>)}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Max Transfer Limit"
                        maxLength={50}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.maxTransferLimit
                        })}
                        name="maxTransferLimit"
                        onChange={ this.handleInputChange }
                        value={ this.state.maxTransferLimit }
                    />
                    {errors.maxTransferLimit && (<div className="invalid-feedback">{errors.maxTransferLimit}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
