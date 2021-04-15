import React from 'react'
import {NextPage} from 'next'
import {useTranslation} from 'react-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const ErrorPage: NextPage = () => {
    const {t} = useTranslation(['errors'])
    return (
        <div>
            404 | {t('not_found')}
        </div>
    )
}

export const getStaticProps = async ({locale}) => {
    return {
        props: {
            ...await serverSideTranslations(locale, ['errors']),
        }
    }
}
export default ErrorPage
