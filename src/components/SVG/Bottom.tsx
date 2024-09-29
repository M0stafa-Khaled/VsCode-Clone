import { svgStyle } from "../../styles";

const BottomArrowIcon = () => {
  return (
    <svg
      style={svgStyle}
      className="mr-0.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        className="text-gray-500"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
export default BottomArrowIcon;
