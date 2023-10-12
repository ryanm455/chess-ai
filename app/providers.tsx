"use client";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    ActionIcon: {
      defaultProps: {
        size: 40,
      },
    },
  },
});

const Providers = ({ children }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

export default Providers;
