import React from "react";

interface SvgIconProps {
  path: string[];
  width?: string;
  height?: string;
  viewbox: string;
  fill?: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ path, width, height, viewbox, fill, className }) => {
  return (
    <svg
      fill={fill || `currentColor`}
      viewBox={viewbox}
      width={width}
      height={height}
      fillRule="evenodd"
      clipRule="evenodd"
      className={className}
    >
      {path.map((d, index) => (
        <path key={index} d={d} strokeWidth="1.5" />
      ))}
    </svg>
  );
};

export default SvgIcon;
