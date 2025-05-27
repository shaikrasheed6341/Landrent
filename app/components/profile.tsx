"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProfileData {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    description: string;
    paragraph: string;
    quatation: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!profile) {
        return <div className="text-center">No profile data available</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {profile.image && (
                        <div className="relative w-48 h-48">
                            <Image
                                src={profile.image}
                                alt={profile.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                        <div className="space-y-2">
                            <p className="text-gray-600">{profile.email}</p>
                            <p className="text-gray-600">{profile.phone}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 space-y-6">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700">{profile.description}</p>
                        <p className="text-gray-600">{profile.paragraph}</p>
                        <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 my-4">
                            {profile.quatation}
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}