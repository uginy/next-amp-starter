import {makeAutoObservable, autorun} from "mobx"
import {RootStore} from './index';
import {i18n} from 'next-i18next';

export class UiStore {
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        autorun(() => {
            i18n?.language && this.setLang(i18n?.language);
        })
        makeAutoObservable(this)
    }

    lang = 'en'

    setLang(lang: string): void {
        this.lang = lang;
    }

    get cLang(): string {
        return this.lang
    }
}
