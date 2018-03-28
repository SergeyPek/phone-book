import * as React from 'react';

import Contacts from './Contacts';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Contacts />
            </MuiThemeProvider>
        );
    }
}

export default App;
