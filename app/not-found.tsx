import Header from "@/components/header";
import Providers from "@/app/(main)/providers";

export default function Page() {
  return (
    <body className="flex min-h-full flex-col bg-gray-100 text-gray-900 antialiased">
      <Providers>


        <div className="flex grow flex-col">
          <Header />
          <div className="flex grow items-center justify-center">
            <h2 className="text-3xl">404 | Not Found</h2>
          </div>
        </div>
      </Providers>
    </body>


  );
}
