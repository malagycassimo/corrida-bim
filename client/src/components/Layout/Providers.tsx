import Footer from "./Footer";
import Header from "./Header";
import { RegistrationProvider } from "@/components/common/RegistrationClosedModal";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <RegistrationProvider>
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        </RegistrationProvider>
    );
}
