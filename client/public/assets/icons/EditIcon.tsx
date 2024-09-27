type EditIconProps = {
  height: string;
  width: string;
  className: string;
}

const EditIcon = ({ height, width, className }: EditIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 -0.5 21 21"
      className={className}
    >
      <g
        id="Dribbble-Light-Preview"
        transform="translate(-59.000000, -400.000000)"
        fill="currentColor"
      >
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <path
            d="M3,260 L24,260 L24,258.010742 L3,258.010742 L3,260 Z M13.3341,254.032226 L9.3,254.032226 L9.3,249.950269 L19.63095,240 L24,244.115775 L13.3341,254.032226 Z"
            id="edit_fill-[#1480]"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default EditIcon;
