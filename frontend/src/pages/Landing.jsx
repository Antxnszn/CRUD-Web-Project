import { ReactTyped } from "react-typed";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="bg-gradient-to-t from-[#49A4CA] to-[#183C4B] overflow-y-hidden h-[100vh]">
      <div className="flex items-center justify-center relative isolate px-6 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90BED4] to-[#DDE4E7] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="py-32 sm:py-48 lg:py-56">
          
          <div className="flex flex-col justify-center items-center">
          <h2 className="text-[#C8C8C8] text-[5.5rem] text-center font-semibold">
          {" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l to-[#E6E9EA] from-[#73ADC8]">
            <ReactTyped
              strings={[
                "Proyecto Web",
                "Gestión Carreras",
                "Gestión Alumnos",
                "Flask API",
                "React-TaillwindCSS",
              ]}
              typeSpeed={50}
              backSpeed={100}
              loop></ReactTyped>
          </span>
        </h2>
            <div className="mt-14 flex flex-row items-center justify-center gap-14">
              <Link
                to="/carreras"
                className="rounded-md bg-[#005E82] px-[1em] py-[.8em] text-2xl font-semibold text-white shadow-sm hover:bg-[#1E2024]"
              >
                Carreras
              </Link>
              <Link
                to="/alumnos"
                className="rounded-md bg-[#4197BA] px-[1em] py-[.8em] text-2xl font-semibold text-white shadow-sm hover:bg-[#183C4B]"
              >
                Alumnos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>



    );
}

export default Landing;