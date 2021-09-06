import { Box } from "@material-ui/core";
import React from "react";
import Link from "next/link";

export const TopNav = () => {
  return (
    <Box display="flex" alignItems={"center"}>
      <Link as="/" href="/">
        Main
      </Link>
    </Box>
  );
};
