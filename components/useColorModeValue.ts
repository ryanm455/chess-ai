import { useComputedColorScheme } from "@mantine/core";

const useColorModeValue = (light: string, dark: string) => {
  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return colorScheme === "dark" ? dark : light;
};

export default useColorModeValue;

