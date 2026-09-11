'use client';

import { Badge, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import {
  LuLayoutDashboard,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuSettings,
  LuUsers,
} from 'react-icons/lu';
import LogoutButton from '@/components/core/auth/logout-button';
import { Tooltip } from '@/components/ui/tooltip';
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
    href: '/dashboard/settings',
    icon: LuSettings,
    implemented: false,
    allowedRoles: [Role.ADMIN],
  },
];

interface SidebarContentProps {
  email?: string | null;
  fullName?: string;
  role: Role | null;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

export default function SidebarContent({
  email,
  fullName,
  role,
  isCollapsed = false,
  onToggleCollapse,
  onNavigate,
}: SidebarContentProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Flex direction="column" h="full" justify="space-between">
      <Stack gap={1} p={4}>
        <Flex align="center" justify="space-between" mb={2}>
          {!isCollapsed && (
            <Text fontWeight="bold">{t(tKeys.sidebar.menu)}</Text>
          )}
          {onToggleCollapse && (
            <IconButton
              aria-label={t(
                isCollapsed ? tKeys.sidebar.expand : tKeys.sidebar.collapse,
              )}
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              mx={isCollapsed ? 'auto' : undefined}
            >
              {isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
            </IconButton>
          )}
        </Flex>

        {NAV_ITEMS.filter(
          (item) => role !== null && item.allowedRoles.includes(role),
        ).map((item) => {
          const Icon = item.icon;
          const label = t(tKeys.sidebar.nav[item.key]);

          if (!item.implemented) {
            return (
              <Tooltip
                key={item.key}
                content={label}
                disabled={!isCollapsed}
                positioning={{ placement: 'right' }}
              >
                <Flex
                  align="center"
                  justify={isCollapsed ? 'center' : 'flex-start'}
                  gap={2}
                  px={3}
                  py={2}
                  rounded="md"
                  color="fg.muted"
                  cursor="not-allowed"
                  opacity={0.5}
                >
                  <Icon />
                  {!isCollapsed && (
                    <>
                      <Text flex="1">{label}</Text>
                      <Badge size="sm" colorPalette="gray">
                        {t(tKeys.sidebar.comingSoon)}
                      </Badge>
                    </>
                  )}
                </Flex>
              </Tooltip>
            );
          }

          const href = `/${locale}${item.href}`;
          const isActive = pathname === href;

          return (
            <Tooltip
              key={item.key}
              content={label}
              disabled={!isCollapsed}
              positioning={{ placement: 'right' }}
            >
              <Link href={href} onClick={onNavigate}>
                <Flex
                  align="center"
                  justify={isCollapsed ? 'center' : 'flex-start'}
                  gap={2}
                  px={3}
                  py={2}
                  rounded="md"
                  bg={isActive ? 'bg.emphasized' : 'transparent'}
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  _hover={{ bg: 'bg.muted' }}
                >
                  <Icon />
                  {!isCollapsed && <Text>{label}</Text>}
                </Flex>
              </Link>
            </Tooltip>
          );
        })}
      </Stack>

      {!isCollapsed && (
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
      )}
    </Flex>
  );
}
