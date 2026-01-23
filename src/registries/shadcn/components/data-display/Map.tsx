'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';

export const Map = ({ element, children }: ComponentRenderProps) => {
  const {
    center,
    zoom = 13,
    markers,
    width = '100%',
    height = 400,
    provider = 'openstreetmap',
    apiKey,
    interactive = true,
    showControls = true,
    style,
  } = element.props;

  const centerCoords = center as { lat: number; lng: number } | undefined;
  const markersArray = markers as Array<{ lat: number; lng: number; title?: string; popup?: string }>;

  // OpenStreetMap embed URL
  const getOpenStreetMapUrl = () => {
    if (!centerCoords) return '';
    const bbox = calculateBbox(centerCoords.lat, centerCoords.lng, zoom as number);
    let url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

    if (markersArray?.length === 1) {
      url += `&marker=${markersArray[0].lat}%2C${markersArray[0].lng}`;
    } else if (centerCoords) {
      url += `&marker=${centerCoords.lat}%2C${centerCoords.lng}`;
    }

    return url;
  };

  // Google Maps embed URL
  const getGoogleMapsUrl = () => {
    if (!centerCoords) return '';
    let url = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${centerCoords.lat},${centerCoords.lng}&zoom=${zoom}`;

    if (markersArray?.length) {
      url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${markersArray[0].lat},${markersArray[0].lng}`;
    }

    return url;
  };

  const calculateBbox = (lat: number, lng: number, zoomLevel: number) => {
    const offset = 360 / Math.pow(2, zoomLevel);
    const minLng = lng - offset;
    const maxLng = lng + offset;
    const minLat = lat - offset / 2;
    const maxLat = lat + offset / 2;
    return `${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}`;
  };

  if (!centerCoords && !markersArray?.length) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-muted rounded-lg p-8"
        style={{ width: width as string | number, height: height as number, ...style as React.CSSProperties }}
      >
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          No location data provided. Set center coordinates or markers.
        </p>
      </div>
    );
  }

  const mapUrl = provider === 'google' ? getGoogleMapsUrl() : getOpenStreetMapUrl();

  return (
    <div
      className="relative overflow-hidden rounded-lg border"
      style={{ width: width as string | number, height: height as number, ...style as React.CSSProperties }}
    >
      <iframe
        src={mapUrl}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={interactive as boolean}
        title="Map"
      />

      {/* Simple fallback marker overlay for visualization */}
      {markersArray && markersArray.length > 1 && (
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-sm shadow-lg max-h-32 overflow-auto">
          <p className="font-medium text-xs text-muted-foreground mb-1">
            {markersArray.length} locations
          </p>
          {markersArray.slice(0, 5).map((marker, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3 text-red-500" />
              <span className="truncate">{marker.title || `Location ${idx + 1}`}</span>
            </div>
          ))}
          {markersArray.length > 5 && (
            <p className="text-xs text-muted-foreground">+{markersArray.length - 5} more</p>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
