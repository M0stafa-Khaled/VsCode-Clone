import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import {
  setClickedFile,
  setOpenedFiles,
  setTabIdToRemove,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFilesTabItem = ({ file }: IProps) => {
  const dispatch = useDispatch();

  // ** Handlers
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFile({ fileName: name, fileContent: content, activeTabID: id })
    );
  };
  const { clickedFile, openedFiles } = useSelector(
    (state: RootState) => state.fileTree
  );

  const onRemove = (TabID: string) => {
    const filtered = openedFiles.filter((file) => file.id !== TabID);
    dispatch(setOpenedFiles(filtered));
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFiles([]));
      dispatch(
        setClickedFile({ fileName: "", fileContent: "", activeTabID: null })
      );
      return;
    }
    const { id, name, content } = lastTab;
    dispatch(setOpenedFiles(filtered));
    dispatch(
      setClickedFile({
        activeTabID: id,
        fileName: name,
        fileContent: content,
      })
    );
  };

  return (
    <div
      className={`flex items-center border-r border-gray-900 cursor-pointer p-3 hover:bg-[#161616] transition-all flex-shrink-0 
          ${
            file.id === clickedFile.activeTabID
              ? "border-t-2 border-t-[#f1fa8c]"
              : "border-t-2 border-t-transparent"
          }`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemove(file.id));
      }}
    >
      <span className="flex items-center">
        <RenderFileIcon fileName={file.name} />
      </span>
      <span className="pl-1 text-sm overflow-hidden">{file.name}</span>
      <span
        className="w-5 h-5 ml-2 rounded-md flex items-center justify-center hover:bg-[#2e2e2e] transition-all"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};
export default OpenedFilesTabItem;
