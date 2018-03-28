import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    openContactDialog,
    deleteContact,
    setContactsOrder,
    setContactsSearch
} from '../../store/contacts/actions';

import Contact from '../../types/Contact';

import { Table, TableBody, TableHeader, AutoComplete, FontIcon, IconButton } from 'material-ui';

import ContactsListTableRow from './ContactsListTableRow';
import ContactsListTableHeader from './ContactsListTableHeader';

export interface Props {
    contacts: Contact[];
    autocompleteDs: string[];
    openEditDialog: (contact: Contact) => void;
    handleDeleteContact: (contactId: number) => void;
    contactsSearch: (search: string) => void;
}

const ContactsListTable = ({
    contacts,
    openEditDialog,
    handleDeleteContact,
    contactsSearch,
    autocompleteDs
}: Props) => {
    return (
        <React.Fragment>
            <AutoComplete
                style={{ marginLeft: '30px' }}
                hintText={'Search'}
                dataSource={autocompleteDs}
                floatingLabelText={'Search'}
                onUpdateInput={(value: any) => contactsSearch(value)}
            />
            <IconButton style={{ bottom: '-10px' }} iconClassName="material-icons">
                search
            </IconButton>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <ContactsListTableHeader />
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                    {contacts.length &&
                        contacts.map(contact => (
                            <ContactsListTableRow
                                key={contact.id}
                                contact={contact}
                                onEdit={openEditDialog}
                                onDelete={handleDeleteContact}
                            />
                        ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    contacts: state.contacts.contactsList,
    autocompleteDs: state.contacts.autocomplete
});

const mapDispatchToProps = dispatch => ({
    openEditDialog: (contact: Contact) => dispatch(openContactDialog(contact)),
    handleDeleteContact: (contactId: number) => dispatch(deleteContact(contactId)),
    changeSortOrder: (fieldname: string) => dispatch(setContactsOrder(fieldname)),
    contactsSearch: (search: string) => dispatch(setContactsSearch(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListTable);
