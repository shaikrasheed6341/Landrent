"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | null;
  location: string;
  status: string;
  image: string;
  paragraph?: string;
  createdAt: string;
};

export default function Projectcard() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const propertyId = params?.id as string;
        if (!propertyId) {
          setError("Property ID is required");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/propartiescard?id=${propertyId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Property not found");
          } else {
            setError("Failed to fetch property details");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (!data || !data.id) {
          setError("Property data is invalid");
          setLoading(false);
          return;
        }

        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Failed to load property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const id = searchParams.get("id");
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    const price = searchParams.get("price");
    const location = searchParams.get("location");
    const status = searchParams.get("status");
    const image = searchParams.get("image");
    const paragraph = searchParams.get("paragraph") || undefined;
    const createdAt = searchParams.get("createdAt");

    if (id && title && description && location && status && image && createdAt) {
      setProperty({
        id,
        title,
        description,
        price: price ? parseFloat(price) : null,
        location,
        status,
        image,
        paragraph,
        createdAt,
      });
      setLoading(false);
    } else {
      fetchProperty();
    }
  }, [params?.id, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 rounded-lg bg-white shadow-md">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-base font-medium">Loading Property Details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="p-8 rounded-lg bg-white shadow-md text-center max-w-md">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
          >
            <span className="text-sm font-medium">Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="p-8 rounded-lg bg-white shadow-md text-center max-w-md">
          <div className="text-yellow-600 text-xl font-semibold mb-4">Property not found</div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
          >
            <span className="text-sm font-medium">Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Back to Listings</span>
            </Link>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2 text-sm text-gray-500">(Premium Property)</span>
                </div>
                {property.price && (
                  <div className="text-2xl font-semibold text-gray-900 mb-4">
                    ₹{property.price.toLocaleString("en-IN")}
                  </div>
                )}
                <div className="flex gap-4 mb-6">
                  <button className="flex-1 bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-200 text-sm font-medium">
                    Book a Visit Now
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-200 text-sm font-medium">
                    Add to Favorites
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Location:</span> {property.location}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {property.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Property Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>

            {property.paragraph && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Project Details</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{property.paragraph}</p>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", label: "Gym" },
                  { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Swimming Pool" },
                  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Club House" },
                  { icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Children's Play Area" },
                  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "24/7 Security" },
                  { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", label: "Power Backup" },
                ].map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={facility.icon} />
                    </svg>
                    <span className="text-gray-700 text-sm font-medium">{facility.label}</span>
                  </div>
                ))}
              </div>
            </div>
<div> <p className="font-semibold  text-2xl my-6 text-center">  2D View</p></div>
            <div className="flex justify-center mt-8">
              
              <Image
                src="https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//2d%20view.png"
                alt={`${property.title} 2D View`}
                width={300}
                height={75}
                className="rounded-md"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200 text-sm font-medium">
              Contact Agent
            </button>
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-all duration-200 text-sm font-medium">
              Book a Visit Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}