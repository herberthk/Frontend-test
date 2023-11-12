import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { FC } from "react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DHIS2 Frontend Task",
  description:
    "React application that fetches and renders the list of dashboards available to a DHIS2 user",
};

type Props = {
  children: React.ReactNode;
};
const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
