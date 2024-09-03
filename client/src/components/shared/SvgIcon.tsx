import React from "react";

interface SvgIconProps {
  path: string[];
  width?: string;
  height?: string;
  viewbox: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ path, width, height, viewbox }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox={viewbox}
      width={width}
      height={height}
      fillRule="evenodd"
      clipRule="evenodd"
    >
      {path.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
};

export default SvgIcon;
