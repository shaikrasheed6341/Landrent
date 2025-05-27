"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Property = {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    status: string;
    image: string;
    
};

export default function Projectscard() {
    const [properties, setProperties] = useState<Property[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/propartiescard');
            const data = await response.json();
            setProperties(data);
        };
        fetchProperties();
    }, []);

    const handleViewDetails = (propertyId: string) => {
        router.push(`/projectcard/${propertyId}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-zinc-900">Featured Projects For Rent & Sale</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                        <div className="relative h-64 w-full">
                            <Image 
                                src={property.image} 
                                alt={property.title} 
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{property.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                                    {property.status}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-500 mb-4">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{property.location}</span>
                            </div>
                            <button 
                                onClick={() => handleViewDetails(property.id)}
                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-lg"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}