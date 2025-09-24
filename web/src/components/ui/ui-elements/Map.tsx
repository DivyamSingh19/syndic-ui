import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Loader2 } from "lucide-react";

// Fix for default marker icon, only on client-side
if (typeof window !== "undefined") {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

interface MapComponentProps {
  position: [number, number] | null;
  isGeocoding: boolean;
  onMapClick: (lat: number, lng: number) => void;
  mapRef: React.RefObject<any>;
}

const MapEvents = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapUpdater = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

const MapComponent = ({
  position,
  isGeocoding,
  onMapClick,
  mapRef,
}: MapComponentProps) => {
  return (
    <div className="relative w-full h-full">
      {isGeocoding && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}
      <MapContainer
        center={position || [0, 0]} // Default to [0,0] if no position
        zoom={2} // Use a low zoom level when there's no position
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} />}
        <MapEvents onMapClick={onMapClick} />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
