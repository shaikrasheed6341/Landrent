export default function Milestonecard() {
    return (
        <div className="bg-[#F5F5F5] py-8 sm:py-12 w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center text-gray-900">
                    Our mission is to redefine real estate <br /><span className="hidden sm:inline">in the customer&apos;s favor.</span>
                </h2>
                <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col space-y-4">
                            <p className="text-4xl font-bold text-orange-600">2.5M+</p>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Active Listings</h3>
                            <p className="text-gray-600">Browse through millions of verified property listings nationwide</p>
                        </div>
                    </div>
                    <div className="relative bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col space-y-4">
                            <p className="text-4xl font-bold text-orange-600">50k+</p>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Licensed Agents</h3>
                            <p className="text-gray-600">Connect with thousands of experienced real estate professionals</p>
                        </div>
                    </div>
                    <div className="relative bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col space-y-4">
                            <p className="text-4xl font-bold text-orange-600">98%</p>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Client Satisfaction</h3>
                            <p className="text-gray-600">Consistently rated excellent by our satisfied customers</p>
                        </div>
                    </div>
                    <div className="relative bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col space-y-4">
                            <p className="text-4xl font-bold text-orange-600">15+</p>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Years Experience</h3>
                            <p className="text-gray-600">Trusted industry leader since 2008 with proven expertise</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}