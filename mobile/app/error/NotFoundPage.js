import React, { Component } from 'react';
import Page from '../components/Page';


class NotFoundPage extends Component {
    render() {
        return (
            <Page title="404 - Not Found">Whoops, could not find the page</Page>
        );
    }
}

export default NotFoundPage;