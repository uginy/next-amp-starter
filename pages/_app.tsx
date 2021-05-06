import { ReactElement, useEffect, useState } from "react";
import { configure } from "mobx";
import { ContextProps, initStore } from "../stores";
import { StoreContext } from "../stores";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "../styles/globals.css";
import theme from "../lib/theme";
import { LayoutContainer } from "../components/Layout";

configure({
  useProxies: "never",
});

export const StoreProvider = ({
  store,
  children,
}: ContextProps): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const App = ({ Component, pageProps }) => {
  const store = initStore();
  const [comp, setComp] = useState(null);

  useEffect(() => {
    const ff = async () => {
      const res = await fetch("http://localhost:8060/ada-api/main/components");
      const result = await res.json();
      const data = ["/", ...result];
      setComp(data);
    };
    ff();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <LayoutContainer components={comp}>
          <Component {...pageProps} />
        </LayoutContainer>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
