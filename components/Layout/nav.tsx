import { Box, Link } from "@material-ui/core";
import React from "react";
import NextLink from "next/link";

export const TopNav = () => {
  return (
    <Box display="flex" alignItems={"center"}>
      <Link component={NextLink} href="/">
        Main
      </Link>
      &nbsp;|&nbsp;
      <Link component={NextLink} href={"/about"}>
        About
      </Link>
    </Box>
  );
};
