import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = { errors: []}
    }

    componentWillUpdate(nextProps) {
        // this.props // the old/current props
        // nextProps // next set of props
        if (!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => { 
            const errors = res.graphQLErrors.map(e => e.message);
            this.setState({ errors })
         });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)} 
                />
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);
