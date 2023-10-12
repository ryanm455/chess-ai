"use client";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Moon, Sun } from "react-feather";

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const toggle = () =>
    setColorScheme(colorScheme === "light" ? "dark" : "light");

  return (
    <ActionIcon
      aria-label="Toggle theme"
      variant="default"
      size={40}
      children={
        colorScheme === "dark" ? (
          <Sun height={20} width={20} />
        ) : (
          <Moon height={20} width={20} />
        )
      }
      onClick={toggle}
    />
  );
};

export default ThemeToggle;
