import React, { HTMLAttributes } from "react";

interface IImage {
  src: string;
}

export const Image: React.FC<HTMLAttributes<HTMLImageElement> & IImage> = (
  props
) => {
  return (
    <>
      <img {...props} />
    </>
  );
};

export default Image;
