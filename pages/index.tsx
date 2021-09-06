import React from "react";
import {observer} from "mobx-react-lite";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Rank from './rank';

const Home = () => {
  return (
    <Rank/>
  );
};

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
export default observer(Home);
