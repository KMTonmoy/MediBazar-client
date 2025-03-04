import "../../app/globals.css";
import Sidebar from "../../components/sidebar/sidebar";

export default function RootLayout({ children }) {
    return (
        <div className="flex w-full min-h-screen">
            <Sidebar />
            <main className="flex-grow w-full">{children}</main>
        </div>
    );
}
