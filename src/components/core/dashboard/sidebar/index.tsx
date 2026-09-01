'use client';

import { Box, Drawer, IconButton, Portal } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import SidebarContent from '@/components/core/dashboard/sidebar-content';
import { tKeys } from '@/localization/tKeys';
import type { Role } from '@/types/Role';

interface SidebarProps {
  email?: string | null;
  fullName?: string;
  role: Role | null;
}

export default function Sidebar({ email, fullName, role }: SidebarProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        w="240px"
        flexShrink={0}
        borderRightWidth="1px"
        h="100vh"
        position="sticky"
        top={0}
      >
        <SidebarContent email={email} fullName={fullName} role={role} />
      </Box>

      <Box display={{ base: 'flex', md: 'none' }} borderBottomWidth="1px" p={2}>
        <IconButton
          aria-label={t(tKeys.sidebar.menu)}
          variant="ghost"
          onClick={() => setIsOpen(true)}
        >
          <LuMenu />
        </IconButton>
      </Box>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content maxW="240px">
              <SidebarContent
                email={email}
                fullName={fullName}
                role={role}
                onNavigate={() => setIsOpen(false)}
              />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
