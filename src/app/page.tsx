"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [showFrame, setShowFrame] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowFrame(window.innerWidth > 1279);
    });
  }, []);

  return (
    <main className="px-20">
      <Navbar />
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-20">
          <p className="text-violet-300 text-xl">Curiosities Unveiled</p>
          <h1 className="text-6xl font-bold mb-10">
            Discover unpredictable <br />
            stories in countless
            <br /> Genres
          </h1>
          <Button
            onClick={() => router.push("/chat")}
            variant="started"
            size="xl"
          >
            Get Started <ArrowCircleRightIcon />
          </Button>
        </div>
        {showFrame && (
          <div className="relative">
            <div className="h-[610px] w-[500px] absolute top-[-3rem] right-[4%]">
              <iframe
                src="https://my.spline.design/untitled-afeefe6d434c87df9ad5d4ca574b1473/"
                loading="lazy"
                className="relative w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      {/* <footer className="fixed bottom-2 left-[45%] text-gray-500 font-medium">
        Created by{" "}
        <Link
          href="https://github.com/vaibhav041/"
          className="text-white font-serif underline"
        >
          Vaibhav
        </Link>
      </footer> */}
    </main>
  );
}
