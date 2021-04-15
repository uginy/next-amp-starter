import React from "react";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, useTheme } from "@material-ui/core";

const ErrorPage: NextPage = () => {
  const { t } = useTranslation("errors");
  const theme = useTheme();

  return (
    <Box
      color={theme.palette.error.main}
      display={"flex"}
      justifyContent={"center"}
    >
      404 | {t("not_found")}
    </Box>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["errors"])),
    },
  };
};
export default ErrorPage;
