import {ReactElement} from 'react';
import {configure} from "mobx"
import PrimeReact from 'primereact/api';
import {ContextProps, initStore} from '../stores';
import {StoreContext} from '../stores';
import {appWithTranslation} from 'next-i18next'

import '../styles/globals.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

PrimeReact.ripple = true;

configure({
    useProxies: "never"
})

export const StoreProvider = ({store, children}: ContextProps): ReactElement => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const App = ({Component, pageProps}) => {
    const store = initStore();
    return (
        <StoreProvider store={store}>
            <Component {...pageProps} />
        </StoreProvider>
    )
}

export default appWithTranslation(App);
