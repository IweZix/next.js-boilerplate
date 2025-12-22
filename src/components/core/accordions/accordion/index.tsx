import React from 'react';
import { AccordionProps } from './props';
import { Accordion, Heading, Stack } from '@chakra-ui/react';
import CustomText from '../../texts/text';
import COLORS from '@/assets/colors';

const BaseAccordion = ({ items, titleFont, contentFont, maxWidth = '800px' }: AccordionProps) => {
  return (
    <Stack width="full" maxW={maxWidth}>
      <Heading size="md">Product details</Heading>
      <Accordion.Root collapsible defaultValue={['info']}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              {item.icon && <span>{item.icon}</span>}
              <Stack flex={1}>
                <CustomText text={item.title} font={titleFont} fontColor={COLORS.default.black} />
              </Stack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <CustomText
                  text={item.content}
                  font={contentFont}
                  fontColor={COLORS.default.gray[800]}
                />
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  );
};

export default BaseAccordion;
