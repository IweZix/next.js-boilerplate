export interface BaseCarouselProps {
  items: CarouselItemProps[];
}

export interface CarouselItemProps {
  item: React.ReactNode;
}

/**
Exemple:
    const carouselItems = [
        {
        item: (
            <CustomText
            text="test1"
            font={FONTS.alumniSans['20px'].normal}
            fontColor={COLORS.default.black}
            />
        ),
        },
        {
        item: (
            <CustomText
            text="test2"
            font={FONTS.alumniSans['20px'].normal}
            fontColor={COLORS.default.black}
            />
        ),
        },
        {
        item: (
            <CustomText
            text="test3"
            font={FONTS.alumniSans['20px'].normal}
            fontColor={COLORS.default.black}
            />
        ),
        },
        {
        item: (
            <CustomText
            text="test3"
            font={FONTS.alumniSans['20px'].normal}
            fontColor={COLORS.default.black}
            />
        ),
        },
    ];

    <BaseSpacingCarousel items={carouselItems} />
 */
