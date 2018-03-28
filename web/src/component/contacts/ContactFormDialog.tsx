import * as React from 'react';

import { Dialog } from 'material-ui';
import { connect, Dispatch } from 'react-redux';
import { closeContactDialog } from '../../store/contacts/actions';
import ContactForm from './ContactForm';

export interface Props {
    show?: boolean;
    contact?: object;
    closeDialog?: (save?: boolean, contact?: object) => void;
}

const ContactFormDialog = ({ show, contact, closeDialog }: Props) => (
    <Dialog
        title={contact ? 'Contact name' : 'New contact'}
        open={show}
        onRequestClose={() => {
            closeDialog(false);
        }}
    >
        <ContactForm
            handleCancel={() => closeDialog(false)}
            initialValues={contact}
            onSubmit={values => closeDialog(true, values)}
        />
    </Dialog>
);

const mapStateToProps = state => ({
    show: state.contacts.dialog.show,
    contact: state.contacts.dialog.contact
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    closeDialog: (save?: boolean, contact?: object) => dispatch(closeContactDialog(save, contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormDialog);
