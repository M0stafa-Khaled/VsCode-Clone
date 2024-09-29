import { useState } from "react";
import { IFile } from "../interfaces";
import BottomArrowIcon from "./SVG/Bottom";
import RightArrowIcon from "./SVG/Right";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFile, setOpenedFiles } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doseFileObjExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ** Handlers
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onFileClicked = () => {
    const exists = doseFileObjExist(openedFiles, id);
    dispatch(
      setClickedFile({ fileName: name, fileContent: content, activeTabID: id })
    );
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  return (
    <div className="flex flex-col space-y-2 space-x-6">
      <div className="flex items-center cursor-pointer">
        {isFolder ? (
          <div
            className="flex items-center whitespace-nowrap overflow-hidden"
            onClick={toggleIsOpen}
          >
            <span className="mr-1">
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            </span>
            <RenderFileIcon
              fileName={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span className="ml-1 overflow-hidden text-ellipsis">{name}</span>
          </div>
        ) : (
          <div
            className="flex items-center whitespace-nowrap overflow-hidden"
            onClick={onFileClicked}
          >
            <RenderFileIcon fileName={name} />
            <span className="ml-1 overflow-hidden text-ellipsis">{name}</span>
          </div>
        )}
      </div>
      {isOpen &&
        children &&
        children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
