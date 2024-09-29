import { extensionPathIcons } from "../constant";
import IconImg from "./IconImg";
import FileIcon from "./SVG/FileIcon";
import FolderCloseIcon from "./SVG/FolderCloseIcon";
import FolderOpenIcon from "./SVG/FolderOpenIcon";

interface IProps {
  fileName: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ fileName, isFolder, isOpen }: IProps) => {
  const fileExtension = fileName.split(".").pop();

  // * Check if file extension is in the extensions path icons object
  if (
    fileExtension &&
    Object.prototype.hasOwnProperty.call(extensionPathIcons, fileExtension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionPathIcons[fileExtension]}-open.svg`
        : `${extensionPathIcons[fileExtension]}.svg`
      : `${extensionPathIcons[fileExtension]}.svg`;
    return <IconImg src={iconPath} />;
  }
  // * If no icon found, return default file icon
  return isFolder ? (
    isOpen ? (
      <FolderOpenIcon />
    ) : (
      <FolderCloseIcon />
    )
  ) : (
    <FileIcon />
  );
};
export default RenderFileIcon;
