import clsx from "clsx";
import React from "react";

const Section = ({ children, className }) => {
  return (
    <section
      className={clsx(
        className,
        "xl:px-36 lg:px-24 md:px-16 sm:px-10 px-4 py-2"
      )}
    >
      {children}
    </section>
  );
};

export default Section;
