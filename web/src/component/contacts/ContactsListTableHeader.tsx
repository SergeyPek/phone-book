import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { openContactDialog, setContactsOrder } from '../../store/contacts/actions';

import Contact from '../../types/Contact';

import {
    FontIcon,
    TableRow,
    TableHeaderColumn,
    FloatingActionButton,
    IconButton,
    FlatButton
} from 'material-ui';

export interface Props {
    openDialog?: () => void;
    changeSortOrder: (fieldname: string) => void;
}

const headerIconSize = { fontSize: '16px', bottom: '-4px' };

const ContactsListTableHeader = ({ openDialog, changeSortOrder }: Props) => (
    <React.Fragment>
        <TableRow>
            <TableHeaderColumn>
                <FlatButton
                    onClick={() => changeSortOrder('firstname')}
                    hoverColor={'transparent'}
                    disableTouchRipple={true}
                >
                    First Name<FontIcon className="material-icons" style={headerIconSize}>
                        swap_vert
                    </FontIcon>
                </FlatButton>
            </TableHeaderColumn>
            <TableHeaderColumn>
                <FlatButton
                    onClick={() => changeSortOrder('lastname')}
                    hoverColor={'transparent'}
                    disableTouchRipple={true}
                >
                    Last Name<FontIcon className="material-icons" style={headerIconSize}>
                        swap_vert
                    </FontIcon>
                </FlatButton>
            </TableHeaderColumn>
            <TableHeaderColumn>
                <FlatButton
                    onClick={() => changeSortOrder('phone')}
                    hoverColor={'transparent'}
                    disableTouchRipple={true}
                >
                    Phone number<FontIcon className="material-icons" style={headerIconSize}>
                        swap_vert
                    </FontIcon>
                </FlatButton>
            </TableHeaderColumn>
            <TableHeaderColumn>
                <FlatButton onClick={() => changeSortOrder('dob')} hoverColor={'transparent'} disableTouchRipple={true}>
                    Date of Birth<FontIcon className="material-icons" style={headerIconSize}>
                        swap_vert
                    </FontIcon>
                </FlatButton>
            </TableHeaderColumn>
            <TableHeaderColumn>
                <FloatingActionButton className="contacts-table-action-icons" mini={true} onClick={() => openDialog()}>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
            </TableHeaderColumn>
        </TableRow>
    </React.Fragment>
);

const mapStateToProps = null;
const mapPropsToState = (dispatch: Dispatch<any>) => ({
    openDialog: () => dispatch(openContactDialog()),
    changeSortOrder: (fieldname: string) => dispatch(setContactsOrder(fieldname))
});

export default connect(mapStateToProps, mapPropsToState)(ContactsListTableHeader);
