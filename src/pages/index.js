import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="bg-[#EEEEEE] flex flex-col items-center my-8">
        <h1 className="text-3xl font-semibold  pt-8">Trouver votre prochaine destination</h1>
        <h4 className="text-[#7E7E7E] py-2">Indiquer dans la barre ci-dessous votre itinéraire</h4>
        <div className="b">
            <div className="">
                    <div className="flex bg-white my-4 rounded-full items-center overflow-hidden">
                        <div className="flex p-2 rounded">
                            
                            <div className="flex items-center">
                              <Image src="/icons/location.svg" height={15} width={15} />
                                <input type="text" placeholder="Enter text here..."
                                       className="border-r mr-4 ml-2 max-w-full focus:outline-none text-dark"/>
                            </div>
                            <div className="flex items-center">
                              <Image src="/icons/calendar.svg" height={15} width={15} />
                                <input type="text" placeholder="Enter text here..."
                                       className="border-r mr-4 ml-2 max-w-full focus:outline-none text-dark"/>
                            </div>
                            <div className="flex items-center">
                              <Image src="/icons/user.svg" height={15} width={15} />
                                <input type="text" placeholder="Enter text here..."
                                       className=" mr-4 ml-2 max-w-full focus:outline-none text-dark"/>
                            </div>
                        </div>
                        <div className="">
                              <div className="flex justify-center"><button className="py-2 px-8  bg-[#346751] text-white">Search</button></div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </main>
  );
}
