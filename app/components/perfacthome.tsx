import Image from "next/image";
import { FaHome, FaSearch, FaHandshake } from "react-icons/fa";

export default function Perfacthome() {
    return (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-zinc-900">
                    How It Works? Find Your Perfect Home
                </h1>
                <p className="text-center text-gray-900 text-base md:text-lg mb-20 max-w-2xl mx-auto">
                    Follow these simple steps to find your dream property
                </p>

                <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
                    <div className="w-full md:w-1/2 h-full">
                        <div className="h-full">
                            <Image 
                                src={"https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//h31.jpg%20(1).png"} 
                                alt="How It Works" 
                                width={600} 
                                height={400}
                                className="rounded-3xl object-cover w-full h-full"
                            />     
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-8">
                        <div className="p-4">
                            <div className="text-zinc-900 text-4xl mb-4">
                                <FaSearch className="mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Search Properties</h2>
                            <p className="text-gray-600 text-center">
                                Browse through our extensive collection of premium properties tailored to your preferences.
                            </p>
                        </div>

                        <div className="p-4">
                            <div className="text-zinc-900 text-4xl mb-4">
                                <FaHome className="mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Choose Your Home</h2>
                            <p className="text-gray-600 text-center">
                                Select from carefully curated properties that match your lifestyle and requirements.
                            </p>
                        </div>

                        <div className="p-4">
                            <div className="text-zinc-900 text-4xl mb-4">
                                <FaHandshake className="mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Close the Deal</h2>
                            <p className="text-gray-600 text-center">
                                Our expert team will guide you through the entire process until you get your dream home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}