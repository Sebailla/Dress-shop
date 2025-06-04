import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (

            <main className="bg-white p-5 sm:p-0">
                <TopMenu />
                <Sidebar/>

                <div className="px-1 md:px-10 mt-24 mb-24">
                    {children}
                </div>
                
                <Footer/>
            </main>

    );
}