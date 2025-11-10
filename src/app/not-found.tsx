import React from "react";

const Page404: React.FC = () => (
  <div className="page404 w-full">
    <div className="container relative py-16 lg:py-20 mx-auto">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-7">
        <h2 className="text-7xl md:text-8xl">🪔</h2>
        <h1 className="text-8xl md:text-9xl font-semibold tracking-widest">
          404
        </h1>
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {`СТРАНИЦА НЕ НАЙДЕНА.`}
        </span>
      </div>
    </div>
  </div>
);

export default Page404;
