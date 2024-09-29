import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFilesBar from "./OpenedFilesBar";
import { RootState } from "../app/store";
import WelcomeTab from "./WelcomeTab";

const Preview = () => {
  const { clickedFile, openedFiles } = useSelector(
    (state: RootState) => state.fileTree
  );
  return (
    <>
      {openedFiles.length ? (
        <>
          <OpenedFilesBar />
          <FileSyntaxHighlighter content={clickedFile.fileContent} />
        </>
      ) : (
        <WelcomeTab />
      )}
    </>
  );
};
export default Preview;
