import { svgStyle } from "../../styles";

const RightArrowIcon = () => {
  return (
    <svg
      style={svgStyle}
      className="mr-0.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        className="text-gray-500"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};
export default RightArrowIcon;
