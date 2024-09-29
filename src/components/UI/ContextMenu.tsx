import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFile,
  setOpenedFiles,
} from "../../app/features/fileTreeSlice";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (showMenu: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}

const ContextMenu = ({ positions: { x, y }, setShowMenu }: IProps) => {
  const dispatch = useDispatch();
  const { tabIdToRemove, openedFiles } = useSelector(
    ({ fileTree }: RootState) => fileTree
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  // ** Handlers
  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);
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
    setShowMenu(false);
  };
  const onCloseAll = () => {
    dispatch(setOpenedFiles([]));
    setShowMenu(false);
  };

  return (
    <div ref={menuRef}>
      <ul
        className="bg-gray-400 text-gray-900 font-medium w-fit px-1 py-2 rounded-md shadow-lg"
        style={{ position: "absolute", top: y, left: x }}
      >
        <li
          className="px-7 hover:bg-gray-500 hover:text-gray-900 transition-all rounded-md mb-1 cursor-pointer font-medium"
          onClick={onClose}
        >
          Close
        </li>
        <li className="px-7 hover:bg-gray-500 hover:text-gray-900 transition-all rounded-md mb-1 cursor-pointer font-medium">
          Close Others
        </li>
        <li className="px-7 hover:bg-gray-500 hover:text-gray-900 transition-all rounded-md mb-1 cursor-pointer font-medium">
          Close to the Right
        </li>
        <li className="px-7 hover:bg-gray-500 hover:text-gray-900 transition-all rounded-md mb-1 cursor-pointer font-medium">
          Close Saved
        </li>
        <li
          className="px-7 hover:bg-gray-500 hover:text-gray-900 transition-all rounded-md mb-1 cursor-pointer font-medium"
          onClick={onCloseAll}
        >
          Close All
        </li>
      </ul>
    </div>
  );
};
export default ContextMenu;
