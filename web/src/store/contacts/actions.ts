import * as contactsConstants from './constants';

import { get } from 'lodash';
import config from '../../config';

// Fetch contacts
export const fetchContacts = () => (dispatch, getState) => {
    const { contacts: { filter } } = getState();
    dispatch({
        type: contactsConstants.FETCH_CONTACTS,
        payload: {
            request: {
                method: 'get',
                url: config.apiUrl + '/contacts?filter=' + JSON.stringify(filter)
            }
        }
    });
};

export const setContactsOrder = (fieldname: string) => async (dispatch, getState) => {
    const { contacts: { filter } } = getState();

    dispatch({
        type: contactsConstants.CHANGE_FILTER,
        payload: {
            order: fieldname + ' ' + (filter.order.search('DESC') === -1 ? 'DESC' : 'ASC')
        }
    });

    dispatch(fetchContacts());
};

export const setContactsSearch = (search: string) => async (dispatch, getState) => {
    let where = {};

    if (search !== '') {
        where = {
            or: [{ firstname: { like: search } }, { lastname: { like: search } }, { phone: { like: search } }]
        };
    }
    dispatch({
        type: contactsConstants.CHANGE_FILTER,
        payload: { where }
    });

    dispatch(fetchContacts());
};

// Open Create/Edit dialog
export const openContactDialog = (contact?: object) => ({
    type: contactsConstants.OPEN_CONTACT_DIALOG,
    payload: {
        dialog: {
            show: true,
            contact
        }
    }
});

// Create new or update existing contact
export const saveContact = (contact: object) => ({
    type: contactsConstants.SAVE_CONTACT,
    payload: {
        request: {
            method: get(contact, 'id', false) ? 'patch' : 'post',
            url: config.apiUrl + '/contacts',
            data: contact
        }
    },
    meta: {
        thunk: true
    }
});

export const deleteContact = (contactId: number) => async dispatch => {
    try {
        await dispatch({
            type: contactsConstants.DELETE_CONTACT,
            payload: {
                request: {
                    method: 'delete',
                    url: config.apiUrl + '/contacts/' + contactId
                }
            },
            meta: {
                thunk: true
            }
        });
    } catch (error) {
        throw new Error(error);
    } finally {
        dispatch(fetchContacts());
    }
};

// Close Create/Edit dialog
export const closeContactDialog = (save?: boolean, contact?: object) => async dispatch => {
    if (save) {
        try {
            await dispatch(saveContact(contact));
            dispatch(fetchContacts());
        } catch (error) {
            throw new Error(error);
        }
    }

    dispatch({
        type: contactsConstants.CLOSE_CONTACT_DIALOG,
        payload: {
            dialog: {
                show: false,
                contact: null
            }
        }
    });
};
