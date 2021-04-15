import useStore from "../../hooks/useStore";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import React from "react";
import { TopNav } from "./nav";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const LayoutContainer = ({ children }) => {
  const { uiStore } = useStore();
  const router = useRouter();
  const classes = useStyles();

  const handleChange = async (event) => {
    uiStore.setLang(event.target.value);
    await router.push("./", "./", { locale: event.target.value });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TopNav />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={uiStore?.cLang}
            onChange={handleChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="he">Hebrew</MenuItem>
          </Select>
        </FormControl>
      </header>
      <main className={styles.main}>
        <article>{children}</article>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
};
