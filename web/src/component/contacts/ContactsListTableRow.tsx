import * as React from 'react';

import { TableRow, TableRowColumn, FloatingActionButton, FontIcon } from 'material-ui';

import Contact from '../../types/Contact';

export interface Props {
    contact: Contact;
    onEdit?: (contact: Contact) => void;
    onDelete?: (contactId: number) => void;
}

const ContactsListTableRow = ({ contact, onEdit, onDelete }: Props) => (
    <TableRow key={contact.id}>
        <TableRowColumn>{contact.firstname}</TableRowColumn>
        <TableRowColumn>{contact.lastname}</TableRowColumn>
        <TableRowColumn>{contact.phone}</TableRowColumn>
        <TableRowColumn>{new Date(contact.dob).toLocaleDateString()}</TableRowColumn>
        <TableRowColumn>
            <FloatingActionButton className="contacts-table-action-icons" mini={true} onClick={() => onEdit(contact)}>
                <FontIcon className="material-icons">edit</FontIcon>
            </FloatingActionButton>
            <FloatingActionButton
                className="contacts-table-action-icons"
                mini={true}
                onClick={() => onDelete(contact.id)}
            >
                <FontIcon className="material-icons">delete_forever</FontIcon>
            </FloatingActionButton>
        </TableRowColumn>
    </TableRow>
);

export default ContactsListTableRow;
