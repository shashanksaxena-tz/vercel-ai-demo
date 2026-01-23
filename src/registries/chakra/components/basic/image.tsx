'use client';
import React from 'react';
import { Image as ChakraImage, Box, AspectRatio } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Image = ({ element }: ComponentRenderProps) => {
    const { src, alt, width, height, objectFit = 'cover', rounded, style, fallback } = element.props;

    return (
        <ChakraImage
            src={src as string}
            alt={(alt || '') as string}
            width={width as string | number}
            height={height as string | number}
            objectFit={objectFit as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'}
            borderRadius={rounded as string}
            style={style as React.CSSProperties}
        />
    );
};

export const AspectImage = ({ element }: ComponentRenderProps) => {
    const { src, alt, ratio = 16 / 9, objectFit = 'cover', rounded, style } = element.props;

    return (
        <AspectRatio ratio={ratio as number} style={style as React.CSSProperties}>
            <ChakraImage
                src={src as string}
                alt={(alt || '') as string}
                objectFit={objectFit as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'}
                borderRadius={rounded as string}
            />
        </AspectRatio>
    );
};

export const ImageGallery = ({ element }: ComponentRenderProps) => {
    const { images, columns = 3, gap = 4, style } = element.props;
    const imageList = images as Array<{ src: string; alt?: string }>;

    return (
        <Box
            display="grid"
            gridTemplateColumns={`repeat(${columns}, 1fr)`}
            gap={gap as number}
            style={style as React.CSSProperties}
        >
            {imageList?.map((image, index) => (
                <ChakraImage
                    key={index}
                    src={image.src}
                    alt={image.alt || ''}
                    objectFit="cover"
                    borderRadius="md"
                    width="100%"
                    aspectRatio="1"
                />
            ))}
        </Box>
    );
};

export const BackgroundImage = ({ element, children }: ComponentRenderProps) => {
    const { src, overlay = false, overlayColor = 'rgba(0,0,0,0.5)', height = '400px', style } = element.props;

    return (
        <Box
            position="relative"
            height={height as string}
            backgroundImage={`url(${src})`}
            backgroundSize="cover"
            backgroundPosition="center"
            style={style as React.CSSProperties}
        >
            {overlay && (
                <Box
                    position="absolute"
                    inset="0"
                    bg={overlayColor as string}
                />
            )}
            <Box position="relative" zIndex="1" height="100%">
                {children}
            </Box>
        </Box>
    );
};

export const Thumbnail = ({ element, onAction }: ComponentRenderProps) => {
    const { src, alt, size = 'md', action, style } = element.props;

    const sizeMap: Record<string, string> = {
        xs: '2rem',
        sm: '3rem',
        md: '4rem',
        lg: '6rem',
        xl: '8rem',
    };

    return (
        <Box
            as="button"
            onClick={() => action && onAction?.({ name: action as string })}
            width={sizeMap[size as string] || sizeMap.md}
            height={sizeMap[size as string] || sizeMap.md}
            borderRadius="md"
            overflow="hidden"
            cursor={action ? 'pointer' : 'default'}
            style={style as React.CSSProperties}
        >
            <ChakraImage
                src={src as string}
                alt={(alt || '') as string}
                width="100%"
                height="100%"
                objectFit="cover"
            />
        </Box>
    );
};
