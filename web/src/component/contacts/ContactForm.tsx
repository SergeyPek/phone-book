import * as React from 'react';

import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField, DatePicker } from 'redux-form-material-ui';

interface Props {
    handleCancel?: () => void;
    handleSubmit?: () => void;
    submitting?: boolean;
    pristine?: boolean;
}

const ContactForm = ({ handleCancel, handleSubmit, pristine, submitting }: Props) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="firstname"
            component={TextField}
            fullWidth={true}
            hintText="First name"
            floatingLabelText="First name"
        />

        <Field
            name="lastname"
            component={TextField}
            fullWidth={true}
            hintText="Last name"
            floatingLabelText="Last name"
        />

        <Field
            name="phone"
            component={TextField}
            fullWidth={true}
            hintText="Phone number"
            floatingLabelText="Phone number"
        />

        <Field
            name="dob"
            component={DatePicker}
            format={(date) => date ? new Date(date) : null}
            formatDate={(date) => new Date(date).toLocaleDateString()}
            fullWidth={true}
            hintText="Date of Birth"
            floatingLabelText="Date of Birth"
        />

        <RaisedButton
            className="contact-dialog-form-buttons"
            disabled={pristine || submitting}
            onClick={() => handleSubmit()}
        >
            Save
        </RaisedButton>

        <RaisedButton className="contact-dialog-form-buttons" onClick={() => handleCancel()}>
            Cancel
        </RaisedButton>
    </form>
);

const validate = values => {
    const errors = {};

    const requiredFields = ['firstname', 'lastname', 'phone', 'dob'];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    return errors;
};

export default reduxForm({
    form: 'ContactForm',
    validate
})(ContactForm);
