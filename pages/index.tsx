import React from "react";
import { observer } from "mobx-react-lite";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import { useTranslation } from "next-i18next";

export const config = { amp: "hybrid" };

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className={styles.title}>{t("welcome")}!</h1>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
export default observer(Home);
