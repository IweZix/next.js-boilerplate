import { Card, SimpleGrid, Text } from '@chakra-ui/react';
import StatTile from '@/components/core/analytics/stat-tile';
import type { AnalyticsResult, VisitsCountTotals } from '@/types/Analytics';
import { formatPercentChange } from '@/utils/format';

interface AnalyticsStatHeaderProps {
  currentTotals: AnalyticsResult<VisitsCountTotals>;
  previousTotals: AnalyticsResult<VisitsCountTotals>;
  visitorsLabel: string;
  pageviewsLabel: string;
  previousPeriodCaption: string;
  errorLabel: string;
  locale: string;
}

export default function AnalyticsStatHeader({
  currentTotals,
  previousTotals,
  visitorsLabel,
  pageviewsLabel,
  previousPeriodCaption,
  errorLabel,
  locale,
}: AnalyticsStatHeaderProps) {
  if (currentTotals.status === 'error') {
    return (
      <Card.Root>
        <Card.Body>
          <Text color="fg.muted">{errorLabel}</Text>
        </Card.Body>
      </Card.Root>
    );
  }

  const previous =
    previousTotals.status === 'success' ? previousTotals.data : null;

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
      <StatTile
        label={visitorsLabel}
        value={currentTotals.data.visitors}
        locale={locale}
        deltaPercent={
          previous
            ? formatPercentChange(
                currentTotals.data.visitors,
                previous.visitors,
              )
            : null
        }
        previousPeriodCaption={previousPeriodCaption}
      />
      <StatTile
        label={pageviewsLabel}
        value={currentTotals.data.pageviews}
        locale={locale}
        deltaPercent={
          previous
            ? formatPercentChange(
                currentTotals.data.pageviews,
                previous.pageviews,
              )
            : null
        }
        previousPeriodCaption={previousPeriodCaption}
      />
    </SimpleGrid>
  );
}
