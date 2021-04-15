import styles from '../styles/Home.module.css'
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import useStore from '../hooks/useStore';
import {useRouter} from 'next/router';

// Prime React
import {Dropdown} from 'primereact/dropdown';

export const config = {amp: 'hybrid'}

const Home = () => {
    const languages = [
        {name: 'English', code: 'en'},
        {name: 'Hebrew', code: 'he'},
    ];
    const {uiStore} = useStore();
    const router = useRouter();
    const {t} = useTranslation();
    return (
        <div className={styles.container}>
            <header>
                <Dropdown
                    optionLabel="name"
                    optionValue="code"
                    id="lang"
                    options={languages}
                    value={uiStore?.cLang}
                    onChange={(e) => {
                        router.push('', '', {locale: e.value}).then(() => uiStore.setLang(e.value))
                    }}
                    placeholder="Select a Lang"/>
            </header>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {t('welcome')}! {uiStore.cLang}
                </h1>
            </main>
            <footer className={styles.footer}>
                footer
            </footer>
        </div>
    )
}

export const getStaticProps = async ({locale}) => {
    return {
        props: {
            ...await serverSideTranslations(locale, ['common']),
        }
    }
}
export default observer(Home)
