// app/components/MapFunction.tsx
"use client";
import dynamic from 'next/dynamic';
import { LatLngTuple, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { FaBuildingShield } from 'react-icons/fa6';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading Map...</div>,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Custom icon component using react-icons with dynamic color
const CustomIcon = ({ color }: { color: string }) => (
  <FaBuildingShield
    className={`w-8 h-8`}
    style={{ color, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
  />
);

// Define multiple locations in London
const locations: { position: LatLngTuple; name: string; description: string; color: string }[] = [
  {
    position: [17.5366, 78.4845],
    name: "Kompally Sarvor Towers",
    description: "Soaring 50 floors above the vibrant High Street, our project stands as a testament to luxury and sophistication.",
    color: "#1000f3",
  },
  {
    position: [17.4169, 78.4387],
    name: "Banjara Hills Silent valley",
    description: "Ashoka City view is one of the venture of Ashoka Developers & Builders",
    color: "#1000f3", 
  },
  {
    position: [17.3993, 78.4627],
    name: "Lakadikapul Amber residency",
    description: "This is the most exquisitely designed residential complex located at Vidyanagar,",
    color: "#1000f3", 
  },
];

export default function MapFunction() {
  const center: LatLngTuple = [17.3993, 78.4627];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Residency Locations 
        </h1>
        <div className="relative w-full h-[500px] rounded-md overflow-hidden shadow-md">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                icon={divIcon({
                  html: renderToString(<CustomIcon color={location.color} />),
                  className: 'custom-icon',
                  iconSize: [32, 32],
                  iconAnchor: [16, 32],
                  popupAnchor: [0, -32],
                })}
              >
                <Popup>
                  <div className="p-3 max-w-xs">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {location.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {location.description}
                    </p>
                    <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Learn More
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Custom CSS for the icon */}
      <style jsx>{`
        .custom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease-in-out;
        }
        .custom-icon:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}