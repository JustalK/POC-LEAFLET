import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Rectangle,
  Circle,
} from "react-leaflet";

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
    [51.53, -0.12],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
    [51.55, -0.09],
    [51.5, -0.09],
  ],
];

function Poc() {
  return (
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
      <Circle
        center={[51.49, -0.15]}
        pathOptions={{ fillColor: "blue" }}
        radius={200}
      >
        <Tooltip>Tooltip for Circle</Tooltip>
      </Circle>
      <Circle
        center={[51.48, -0.15]}
        pathOptions={{ fillColor: "yellow", color: "purple" }}
        radius={500}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </Circle>
      <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon}>
        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
      </Polygon>
      <Rectangle
        bounds={[
          [51.49, -0.08],
          [51.5, -0.06],
        ]}
        pathOptions={{ color: "black" }}
      >
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
          permanent Tooltip for Rectangle
        </Tooltip>
      </Rectangle>
    </MapContainer>
  );
}

export default Poc;
