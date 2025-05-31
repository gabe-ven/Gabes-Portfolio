import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-xl m-3 md:m-8 z-50 w-full space-y-8 border rounded-xl border-gray-700/50 p-5 sm:p-10 backdrop-blur-xl bg-black/80">
        <Link href="/">
          <Button
            variant="ghost"
            className="hover:bg-black hover:text-white rounded-full duration-300 mb-5 cursor-pointer"
          >
            Back <BsArrowLeft className="ml-2" />
          </Button>
        </Link>
        <div className="space-y-6">
          <h1 className="text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500">
            About Me
          </h1>
          <div className="space-y-4 text-neutral-200 text-pretty trracking-tight">
            <p>
              I am a passionate computer science student based in California,
              USA. I am currently a junior pursuing my studies at the University
              of California, Davis, where I am honing my skills in software
              development and computer science.
            </p>
            <p>
              I have a keen interest in web development, artificial
              intelligence, and machine learning. My journey in the tech world
              has been fueled by a desire to create innovative solutions that
              make a difference.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400  to-blue-500">
              Education
            </h2>
            <div className="space-y-2">
              <p className="font-medium">
                Bachelor of Science in Computer Science
              </p>
              <p className="text-neutral-500">
                University of California, Davis
                <br />
                Expected Graduation: June 2027
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400  to-blue-500">
              Experience
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Research Intern</p>
                <p className="text-neutral-500">
                  NASA Jet Propulsion Laboratory (JPL)
                  <br />
                  Feb 2025 - Jun 2025
                </p>
              </div>
              <div>
                <p className="font-medium">Math Instructor</p>
                <p className="text-neutral-500">
                  Mathnasium
                  <br />
                  Aug 2022 - Aug 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default page;
