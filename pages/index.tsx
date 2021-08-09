import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import { useTranslation } from "next-i18next";
import UniForms from "../components/Forms";
import useStore from "../hooks/useStore";
import { IFormFieldOptions, IFormLayout } from "../components/Forms/interface";

const Home = () => {
  const { t } = useTranslation();
  const { dataStore } = useStore();
  const [modelForm, setModelForm] = useState({});

  const fetchProfile = async () => await dataStore.fetchData();

  const formModelChangeHandler = () => {
    setModelForm({ ...modelForm });
  };

  const layout: IFormLayout[] = [
    {
      className: "row",
      items: [{ id: "first_name" }, { id: "last_name" }],
    },
    {
      title: "Job",
      className: "row",
      items: [
        { id: "job.type", className: "col" },
        { id: "job.salary", className: "col" },
      ],
    },
    {
      title: "Contacts",
      className: "row",
      items: [
        {
          id: "contacts.address",
          className: "col",
        },
        {
          id: "contacts.city",
          className: "col",
        },
      ],
    },
    {
      title: "Phones",
      className: "row",
      items: [
        {
          id: "contacts.phone.home",
          className: "col",
        },
        {
          id: "contacts.phone.job",
          className: "col",
        },
      ],
    },
  ];

  const formFields: IFormFieldOptions[] = [
    {
      id: "first_name",
      label: "First Name",
      type: "text",
    },
    {
      id: "last_name",
      label: "Last Name",
      type: "text",
    },
    {
      id: "employed",
      label: "Employed",
      type: "checkbox",
    },
    {
      id: "job.type",
      label: "Job Type",
      type: "select",
      options: [
        { key: "administrator", value: "admin", selected: true },
        { key: "worker", value: "worker" },
        { key: "reception", value: "reception" },
      ],
    },
    {
      id: "contacts.address",
      label: "Address",
      type: "text",
    },
    {
      id: "contacts.city",
      label: "City",
      type: "text",
    },
    {
      id: "contacts.phone.home",
      label: "Home Phone",
      type: "text",
    },
    {
      id: "contacts.phone.job",
      label: "Job Phone",
      type: "text",
    },
  ];

  useEffect(() => {
    fetchProfile().then((items) => setModelForm(items));
  }, []);

  return (
    <>
      <pre style={{ fontSize: "10px" }}>
        {JSON.stringify(modelForm, null, 5)}
      </pre>
      <h1 className={styles.title}>{t("welcome")}!</h1>
      <UniForms
        fields={formFields}
        model={modelForm}
        layout={layout}
        onModelChange={formModelChangeHandler}
      />
      <button type="button" onClick={() => console.log(modelForm)}>
        Submit
      </button>
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
