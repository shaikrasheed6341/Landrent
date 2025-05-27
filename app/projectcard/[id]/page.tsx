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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="p-6 md:p-12 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl">
          <div className="animate-spin rounded-full h-16 md:h-24 w-16 md:w-24 border-4 border-emerald-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 md:mt-8 text-emerald-300 text-lg md:text-2xl font-medium animate-pulse">Loading luxury property...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black p-4">
        <div className="p-8 md:p-16 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl text-center max-w-xl">
          <div className="text-red-400 text-2xl md:text-4xl font-bold mb-6 md:mb-8">{error}</div>
          <Link href="/" className="group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl overflow-hidden transition-all duration-500 hover:from-emerald-600 hover:to-teal-600">
            <span className="relative text-base md:text-xl">Return to Homepage</span>
            <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black p-4">
        <div className="p-8 md:p-16 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl text-center max-w-xl">
          <div className="text-amber-400 text-2xl md:text-4xl font-bold mb-6 md:mb-8">Property not found</div>
          <Link href="/" className="group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl overflow-hidden transition-all duration-500 hover:from-amber-600 hover:to-orange-600">
            <span className="relative text-base md:text-xl">Return to Homepage</span>
            <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white py-12 md:py-24">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="sticky top-0 z-10 bg-gray-200 backdrop-blur-xl border-b border-white/5 p-6 md:p-10">
            <Link href="/" className="group inline-flex items-center space-x-2 md:space-x-4 text-emerald-4 transition-colors duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-xl md:text-2xl font-semibold">Back to Listings</span>
            </Link>
          </div>

          <div className="p-6 md:p-12">
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-zinc-900 mb-8 md:mb-12 leading-tight">
              {property.title}
            </h1>

            <div className="relative w-full h-[300px] md:h-[600px] mb-8 md:mb-16 rounded-xl md:rounded-[2rem] overflow-hidden group">
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                className="object-cover transform group-hover:scale-110 transition-transform duration-2000"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>

            <div className="p-6 md:p-12 rounded-xl md:rounded-[2rem] mb-4">
              <h1 className="text-zinc-900 text-xl md:text-2xl font-bold mb-3 md:mb-4">Description</h1>
              <p className="text-zinc-900 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="flex justify-center items-center">
              <Image 
                src="https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//2d%20view.png" 
                alt={property.title} 
                width={400} 
                height={100} 
              />
            </div>

            <div className="p-6 md:p-12 rounded-xl md:rounded-[2rem] mb-8">
              <h1 className="text-zinc-900 text-xl md:text-2xl font-bold mb-3 md:mb-4">Project Details</h1>
              <p className="text-zinc-900 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {property.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {property.price && (
                <div className="bg-gradient-to-br from-black/40 to-slate-900/40 p-6 md:p-12 rounded-xl md:rounded-[2rem] border border-emerald-900/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                  <div className="text-emerald-400 text-xl md:text-2xl font-semibold mb-4 md:mb-6 group-hover:text-emerald-300 transition-colors duration-300">Price</div>
                  <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                    ₹{property.price.toLocaleString("en-IN")}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 md:p-6 rounded-lg md:rounded-xl border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="text-emerald-600 text-base md:text-lg font-medium mb-2 md:mb-3 group-hover:text-emerald-500 transition-colors duration-300">Location</div>
                <div className="text-xl md:text-2xl font-semibold text-emerald-700">{property.location}</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 md:p-6 rounded-lg md:rounded-xl border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="text-emerald-600 text-base md:text-lg font-medium mb-2 md:mb-3 group-hover:text-emerald-500 transition-colors duration-300">Status</div>
                <div className="text-xl md:text-2xl font-semibold text-emerald-700">{property.status}</div>
              </div>

              <button className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg md:rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-1 group">
                Book a Visit Now
              </button>
            </div>

            <div className="p-6 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                  <span className="text-zinc-800 font-medium">Gym</span>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-zinc-800 font-medium">Swimming Pool</span>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-zinc-800 font-medium">Club House</span>
                </div>

            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-800 font-medium">Childrens Play Area</span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-zinc-800 font-medium">24/7 Security</span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-zinc-800 font-medium">Power Backup</span>
            </div>
          </div>
          </div>
          <div>
             
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}