import { useSelector } from "react-redux";
import { IFile } from "../interfaces";
import OpenedFilesTabItem from "./OpenedFilesTabItem";
import { RootState } from "../app/store";
import { useState } from "react";
import DropContextMenu from "./UI/ContextMenu";

const OpenedFilesBar = () => {
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({ x: e.clientX, y: e.clientY });
      }}
    >
      <div className="overflow-x-auto bg-[#0e0e0e] w-full flex items-center border-b border-gray-900">
        {openedFiles.map((file: IFile) => (
          <OpenedFilesTabItem file={file} key={file.id} />
        ))}
      </div>
      {showMenu && (
        <DropContextMenu positions={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};
export default OpenedFilesBar;
