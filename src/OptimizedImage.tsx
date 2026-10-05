import type { ImgHTMLAttributes } from 'react';

export interface OptimizedImageSource {
  type?: string;
  srcSet: string;
  sizes?: string;
  media?: string;
}

export function createAvifSource(
  src: string,
  sizes?: string,
  widths?: number[],
  baseWidth?: number,
): OptimizedImageSource {
  const imageBase = src.replace(/\.[^/.]+$/, '').replace(/ /g, '%20');
  const srcSet = widths
    ? widths
        .map((width) => {
          const imagePath = width === baseWidth
            ? `${imageBase}.avif`
            : `${imageBase}-${width}.avif`;
          return `${imagePath} ${width}w`;
        })
        .join(', ')
    : `${imageBase}.avif`;

  return { type: 'image/avif', srcSet, sizes };
}

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  sources?: OptimizedImageSource[];
  pictureClassName?: string;
}

export default function OptimizedImage({
  sources = [],
  pictureClassName,
  ...imageProps
}: OptimizedImageProps) {
  return (
    <picture className={pictureClassName}>
      {sources.map((source, index) => (
        <source key={index} {...source} />
      ))}
      <img {...imageProps} />
    </picture>
  );
}
