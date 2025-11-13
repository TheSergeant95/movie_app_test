import { NavBar } from "@/components/layout/NavBar";
import "./globals.css";
import { AppContextProvider } from "@/context/AuthContext";
import { TitleBlock } from "@/components/ui/TitleBlock";

export const metadata = {
    title: "Тестовое приложение",
    description: "Бронирование и покупка билетов на кино",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className="bg-[#000000] flex justify-center items-center min-h-dvh">
                <AppContextProvider>
                    <div className="w-full max-w-[944px]">
                        <TitleBlock />
                        <main className="text-base text-white border-2 border-white h-[629px] flex items-start gap-[64px]">
                            <div className="w-[172px] shrink-0 h-[80%] border-r-[1px] border-b-[1px] border-white">
                                <NavBar />
                            </div>
                            {children}
                        </main>
                    </div>
                </AppContextProvider>
            </body>
        </html>
    );
}