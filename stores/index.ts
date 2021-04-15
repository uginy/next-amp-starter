import {enableStaticRendering} from 'mobx-react'
import {createContext, ReactElement} from 'react'
import ErrorStore from './error-store'
import {UiStore} from './ui-store';

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer)

export const StoreContext = createContext(null)

let store: RootStore = null

export type ContextProps = {
    store: RootStore
    children?: ReactElement
}

export class RootStore {
    uiStore: UiStore
    errorStore: ErrorStore

    constructor() {
        this.resetStores()
    }

    resetStores = (): void => {
        this.uiStore = new UiStore(this)
        this.errorStore = new ErrorStore()
    }
}

export const initStore = (): RootStore => {
    if (isServer) {
        return new RootStore()
    } else {
        if (!store) {
            store = new RootStore()
        }
        return store
    }
}
