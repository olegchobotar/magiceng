import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
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
            password_confirm: this.state.password_confirm
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
            <div className="container" style={{ marginTop: '50px', width: '600px'}}>
                <h2 style={{marginBottom: '40px', textAlign: 'center'}}>Sign Up</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <TextField
                            type="text"
                            label="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={ this.handleInputChange }
                            value={ this.state.name }
                            variant="outlined"
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <TextField
                            type="email"
                            label="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
                            variant="outlined"
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <TextField
                            type="password"
                            label="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                            variant="outlined"
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <TextField
                            type="password"
                            label="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                            variant="outlined"
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <Button
                            variant="contained"
                            style={{width: '100%', height: '50px'}}
                            color="primary"
                            type="submit"
                            className="btn btn-primary">
                            Sign Up
                        </Button>
                    </div>
                    <div className="form-group" style={{textAlign: 'center'}}>
                        <span> Already have an account? </span>
                        <span><Link to="/login">Log In</Link></span>
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
