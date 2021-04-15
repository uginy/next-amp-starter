import {useContext} from 'react'
import {Index, StoreContext} from '../stores';

export const useStore = (): Index => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};

export default useStore
