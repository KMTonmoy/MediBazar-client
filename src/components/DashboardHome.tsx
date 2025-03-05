'use client'
import React from "react";

const DashboardHome = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Dashboard Home</h2>

            {/* Section with Full Text and Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Section 1: New Users Update */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center mt-auto">
                        <h3 className="text-lg font-semibold text-gray-700">New Users Registered</h3>
                        <p className="text-gray-500 text-sm mt-2">
                            We’ve recently seen a surge in user sign-ups with over 1,200 new accounts created this month. This reflects a 15% increase in user engagement compared to last month.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            This increase highlights the growing interest in our platform, and we’re excited to welcome all our new users. We continue to improve the user experience to keep this momentum going.
                        </p>
                    </div>
                </div>

                {/* Section 2: Monthly Sales Update */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center mt-auto">
                        <h3 className="text-lg font-semibold text-gray-700">Monthly Sales Report</h3>
                        <p className="text-gray-500 text-sm mt-2">
                            This month, we've seen impressive sales figures reaching $24,560, marking a 20% increase compared to the previous month. This is a significant milestone for us.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Our team is working tirelessly to ensure we meet customer demands, and with the increasing number of orders, we are focusing on enhancing product availability and timely deliveries.
                        </p>
                    </div>
                </div>

                {/* Section 3: System Updates */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center mt-auto">
                        <h3 className="text-lg font-semibold text-gray-700">System Maintenance and Updates</h3>
                        <p className="text-gray-500 text-sm mt-2">
                            The development team is working on an upcoming system upgrade that will improve performance, security, and user experience. The update will include new features and some bug fixes.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            The planned maintenance will take place over the weekend, and we encourage all users to log out before the scheduled time to avoid any disruptions. We appreciate your understanding and cooperation.
                        </p>
                    </div>
                </div>

                {/* Section 4: User Feedback */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center mt-auto">
                        <h3 className="text-lg font-semibold text-gray-700">User Feedback</h3>
                        <p className="text-gray-500 text-sm mt-2">
                            We value the feedback of our users, and this month we’ve received some great insights into improving user experience. Our team is reviewing all suggestions and will be incorporating the most impactful ones in future updates.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Users have highlighted the importance of faster load times and improved search functionality. We are actively working on these areas to provide an even better experience.
                        </p>
                    </div>
                </div>

                {/* Section 5: Upcoming Features */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center mt-auto">
                        <h3 className="text-lg font-semibold text-gray-700">Upcoming Features</h3>
                        <p className="text-gray-500 text-sm mt-2">
                            We're excited to announce a few new features coming soon! These will include improved user profiles, expanded reporting tools, and better integration with third-party platforms.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Our goal is to make the platform even more powerful and user-friendly, so stay tuned for these updates in the upcoming weeks!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;
