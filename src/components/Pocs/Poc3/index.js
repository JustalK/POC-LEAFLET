import { useMemo, useState, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

const greenIcon = L.icon({
  iconUrl: "./m.png",
  iconSize: [30, 45],
});

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const C = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return ((R * C) / 1000).toFixed(1);
};

function Poc() {
  const [positionMarker1, setPositionMarker1] = useState([51.51, -0.14]);
  const [positionMarker2, setPositionMarker2] = useState([51.5, -0.05]);
  const markerRef1 = useRef(null);
  const markerRef2 = useRef(null);

  const saveMarkerPosition = useCallback((markerRef, save) => {
    if (markerRef?.current) {
      const marker = markerRef.current;
      const pos = marker.getLatLng();
      save([pos.lat.toFixed(2), pos.lng.toFixed(2)]);
    }
  }, []);

  const handleMarkers = useMemo(
    () => ({
      dragend() {
        saveMarkerPosition(markerRef1, setPositionMarker1);
        saveMarkerPosition(markerRef2, setPositionMarker2);
      },
    }),
    [saveMarkerPosition]
  );

  return (
    <>
      <div className="legend">
        <div>
          Marker1: {positionMarker1[0]},{positionMarker1[1]}
        </div>
        <div>
          Marker2: {positionMarker2[0]},{positionMarker2[1]}
        </div>
        <div>
          Distance:{" "}
          {haversine(
            positionMarker1[0],
            positionMarker1[1],
            positionMarker2[0],
            positionMarker2[1]
          )}{" "}
          Kms
        </div>
      </div>
      <MapContainer
        className="map"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={positionMarker1}
          ref={markerRef1}
          icon={greenIcon}
          draggable={true}
          eventHandlers={handleMarkers}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polyline
          pathOptions={{ color: "black" }}
          positions={[positionMarker1, positionMarker2]}
        />
        <Marker
          position={positionMarker2}
          ref={markerRef2}
          icon={greenIcon}
          draggable={true}
          eventHandlers={handleMarkers}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Poc;
