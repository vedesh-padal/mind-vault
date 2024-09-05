import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Banner from "../../../public/appBanner.png";
import { CLIENTS } from "@/lib/constants";

const HomePage = () => {
  return (
    <>
      <section className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
        <div className="mt-6 rounded-xl bg-white bg-gradient-to-r from-green-400 to-brand-primaryBlue p-[2px] sm:w-[300px]">
          <Button
            variant="secondary"
            className="w-full rounded-[10px] p-6 text-2xl bg-background"
          >
            Get MindVault Free
          </Button>
        </div>
        <div className="md:mt-[-90px] sm:w-full w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px]">
          <Image src={Banner} alt="Application Banner" />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className="relative">
        <div className="overflow-hidden flex after:content[''] after:dark:from-brand-dark after:to-transparent after:from-background after:bg-gradient-to-l after:right-0 after:bottom-0 after:w-20 after:absolute after:z-10
          before:content[''] before:dark:from-brand-dark before:to-transparent before:from-background before:bg-gradient-to-r before:left-0 before:bottom-0 before:w-20 before:z-10 before:absolute
        ">{[...Array(2)].map((arr) => <div key={arr} className="flex flex-nowrap animate-slide"></div>)}

          {CLIENTS.map((client) => (
            <div
              key={client.alt}
              className="relative w-[200px] m-20 shrink-0 flex items-center"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={200}
              />
            </div>
          ))}

        </div>
      </section>
    </>
  );
};

export default HomePage;
