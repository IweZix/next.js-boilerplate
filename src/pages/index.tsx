import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  // Router
  const router = useRouter();

  // useEffect
  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <Stack>
      <Text>
        This is the index.tsx page
      </Text>
    </Stack>
  );
}
