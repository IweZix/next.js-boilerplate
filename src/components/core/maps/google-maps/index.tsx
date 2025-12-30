import React from 'react';
import { GoogleMapsProps } from './props';

const GoogleMaps = ({ address, width = '100%', height = 450 }: GoogleMapsProps) => {
  return (
    <iframe
      width={width}
      height={height}
      loading="lazy"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(address)}`}
    ></iframe>
  );
};

export default GoogleMaps;
