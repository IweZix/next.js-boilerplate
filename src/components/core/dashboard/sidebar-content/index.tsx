'use client';

import { Badge, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { LuLayoutDashboard, LuSettings, LuUsers } from 'react-icons/lu';
import LogoutButton from '@/components/core/auth/logout-button';
import { tKeys } from '@/localization/tKeys';
import { Role } from '@/types/Role';

interface NavItem {
  key: 'dashboard' | 'users' | 'settings';
  href: string;
  icon: IconType;
  /** Whether the page behind this link actually exists yet. */
  implemented: boolean;
  /** Roles allowed to see this item at all — checked before `implemented`. */
  allowedRoles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    href: '/dashboard',
    icon: LuLayoutDashboard,
    implemented: true,
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    key: 'users',
    href: '/dashboard/users',
    icon: LuUsers,
    implemented: true,
    allowedRoles: [Role.ADMIN],
  },
  {
    key: 'settings',
    href: '/settings',
    icon: LuSettings,
    implemented: false,
    allowedRoles: [Role.ADMIN],
  },
];

interface SidebarContentProps {
  email?: string | null;
  fullName?: string;
  role: Role | null;
  onNavigate?: () => void;
}

export default function SidebarContent({
  email,
  fullName,
  role,
  onNavigate,
}: SidebarContentProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Flex direction="column" h="full" justify="space-between">
      <Stack gap={1} p={4}>
        <Text fontWeight="bold" mb={2}>
          {t(tKeys.sidebar.menu)}
        </Text>

        {NAV_ITEMS.filter(
          (item) => role !== null && item.allowedRoles.includes(role),
        ).map((item) => {
          const Icon = item.icon;

          if (!item.implemented) {
            return (
              <Flex
                key={item.key}
                align="center"
                gap={2}
                px={3}
                py={2}
                rounded="md"
                color="fg.muted"
                cursor="not-allowed"
                opacity={0.5}
              >
                <Icon />
                <Text flex="1">{t(tKeys.sidebar.nav[item.key])}</Text>
                <Badge size="sm" colorPalette="gray">
                  {t(tKeys.sidebar.comingSoon)}
                </Badge>
              </Flex>
            );
          }

          const href = `/${locale}${item.href}`;
          const isActive = pathname === href;

          return (
            <Link key={item.key} href={href} onClick={onNavigate}>
              <Flex
                align="center"
                gap={2}
                px={3}
                py={2}
                rounded="md"
                bg={isActive ? 'bg.emphasized' : 'transparent'}
                fontWeight={isActive ? 'semibold' : 'normal'}
                _hover={{ bg: 'bg.muted' }}
              >
                <Icon />
                <Text>{t(tKeys.sidebar.nav[item.key])}</Text>
              </Flex>
            </Link>
          );
        })}
      </Stack>

      <Stack gap={2} p={4} borderTopWidth="1px">
        <Text fontSize="sm" color="fg.muted" truncate>
          {fullName ?? email}
        </Text>
        {role && (
          <Badge alignSelf="flex-start" colorPalette="blue">
            {t(tKeys.dashboard.role, { role })}
          </Badge>
        )}
        <LogoutButton />
      </Stack>
    </Flex>
  );
}
