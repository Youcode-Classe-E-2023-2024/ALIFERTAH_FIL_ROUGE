import Image from "next/image";
import { Inter } from "next/font/google";
import Primary from "@/components/buttons/primary";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col justify-center">
      <section className="bg-[#EEEEEE] flex flex-col items-center my-8">
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
                              <div className="flex justify-center"><button className="py-2 px-8  bg-[#346751] text-white font-semibold">Search</button></div>
                        </div>
                    </div>
                </div>
        </div>
      </section>

      <section className="flex px-20 mx-20 my-8"> 
        <div className="px-8">
          <Image src="/icons/dollar.svg" width={50} height={50}/>
          <p className="font-thin text-[#346751]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          </p>
        </div>
        <div className="px-8">
          <Image src="/icons/dollar.svg" width={50} height={50}/>
          <p className="font-thin text-[#346751]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          </p>
        </div>
        <div className="px-8">
          <Image src="/icons/dollar.svg" width={50} height={50}/>
          <p className="font-thin text-[#346751]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          </p>
        </div>
      </section>

      <section className="bg-[#346751] py-8">
        <div className="mx-24 px-24">
        <h1 className="text-3xl font-semibold  pt-8 text-white">Trouver votre prochaine destination</h1>
        <h4 className="text-[#D7D7D7] py-2 text-white mb-4">Indiquer dans la barre ci-dessous votre itinéraire</h4>
          <div className="flex justify-around">
            <div className="bg-[#F5F5F5] flex px-12 py-4 rounded space-x-8">
              <div className="flex space-x-2">
                <span>Paris</span>
                <Image src="/icons/right.svg" width={10} height={10}/>
                <span>Lyon</span>
              </div>
              <p className="text-[#346751] font-semibold">
                11 D
              </p>
            </div>
            <div className="bg-[#F5F5F5] flex px-12 py-4 rounded space-x-8">
              <div className="flex space-x-2">
                <span>Paris</span>
                <Image src="/icons/right.svg" width={10} height={10}/>
                <span>Lyon</span>
              </div>
              <p className="text-[#346751] font-semibold">
                11 D
              </p>
            </div>
            <div className="bg-[#F5F5F5] flex px-12 py-4 rounded space-x-8">
              <div className="flex space-x-2">
                <span>Paris</span>
                <Image src="/icons/right.svg" width={10} height={10}/>
                <span>Lyon</span>
              </div>
              <p className="text-[#346751] font-semibold">
                11 D
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-4 flex px-20 mx-20 space-x-40">
        <Image className="rounded" src="/imgs/drive.png" width={400} height={400}/>
        <article className="space-y-8">
          <h1 className="text-3xl font-semibold  pt-8 text-left">Faite des économies sur votre plein !</h1>
          <p className="tex-left">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
          </p>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
          </p>
          <Primary text="Publier un trajet"/>
        </article>
      </section>
    </main>
  );
}
