import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = { errors: []}
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user && !this.props.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .then()
        .catch(res => { 
            const errors = res.graphQLErrors.map(e => e.message);
            this.setState({ errors })
         });
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm 
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)} 
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);
