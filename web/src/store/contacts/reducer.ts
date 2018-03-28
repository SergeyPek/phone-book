import { success, error } from 'redux-saga-requests';

import { FETCH_CONTACTS, OPEN_CONTACT_DIALOG, CLOSE_CONTACT_DIALOG, CHANGE_FILTER } from './constants';

import { uniq, map } from 'lodash';

const initialState = {
    dialog: {
        show: false,
        contact: null
    },
    filter: {
        order: 'firstname DESC'
    },
    autocomplete: [],
    contactsList: []
};

export default (state = initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case success(FETCH_CONTACTS): {
            const autocomplete = uniq(map(action.payload.data, (item) => {
                return [item.firstname, item.lastname, item.phone];
            }).flatten());
            return { ...state, contactsList: action.payload.data, autocomplete };
        }

        case OPEN_CONTACT_DIALOG: {
            return { ...state, dialog: action.payload.dialog };
        }

        case CLOSE_CONTACT_DIALOG: {
            return { ...state, dialog: { show: false, contact: null } };
        }

        case CHANGE_FILTER: {
            return { ...state, filter: {...state.filter, ...action.payload} };
        }

        default: {
            return state;
        }
    }
};
