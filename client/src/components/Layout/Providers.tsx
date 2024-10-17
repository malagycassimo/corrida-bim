import Header from "./Header";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
