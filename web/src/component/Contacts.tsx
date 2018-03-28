import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import Contact from '../types/Contact';

import ContactsListTable from './contacts/ContactsListTable';
import ContactFormDialog from './contacts/ContactFormDialog';

import { fetchContacts } from '../store/contacts/actions';

export interface Props {
    dispatch: Dispatch<any>;
}

class Contacts extends React.Component<Props, object> {
    componentDidMount() {
        this.props.dispatch(fetchContacts());
    }

    render() {
        return (
            <React.Fragment>
                <ContactFormDialog />
                <ContactsListTable />
            </React.Fragment>
        );
    }
}

export default connect(null)(Contacts);