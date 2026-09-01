import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/core/dashboard/sidebar';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { getUserRole } from '@/lib/supabase/role';
import { getUserMetadata } from '@/lib/supabase/user-metadata';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const role = getUserRole(user);
  const { firstName, lastName } = getUserMetadata(user);
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || undefined;

  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Sidebar email={user?.email} fullName={fullName} role={role} />
      <Box flex="1" p={6}>
        {children}
      </Box>
    </Flex>
  );
}
