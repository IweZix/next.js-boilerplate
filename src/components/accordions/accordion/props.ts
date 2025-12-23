import { Font } from '@/assets/fonts';

export interface AccordionProps {
  items: BaseAccordionItem[];
  titleFont: Font;
  contentFont: Font;
  maxWidth?: string;
}

export interface BaseAccordionItem {
  value: string;
  icon?: React.ReactNode;
  title: string;
  content: string;
}

/**
  Exemple:
    const accordionItems = [
        {
        value: 'info',
        icon: null,
        title: 'Information',
        content: 'This is the information content.',
        },
        {
        value: 'details',
        icon: null,
        title: 'Details',
        content: 'These are the details.',
        },
        {
        value: 'more',
        icon: null,
        title: 'More Info',
        content: 'Here is some more information.',
        },
    ];

    <BaseAccordion
        items={accordionItems}
        titleFont={FONTS.alumniSans['20px'].bold}
        contentFont={FONTS.spaceGrotesk['10px'].normal}
    />
*/
