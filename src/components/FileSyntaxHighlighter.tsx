import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IProps {
  content: string | undefined;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={atomOneDark}
      showLineNumbers
      customStyle={{
        backgroundColor: "transparent",
        width: "100%",
        maxHeight: "100%",
        overflow: "auto",
        minHeight: "calc(100vh - 51px)",
      }}
    >
      {String(content)}
    </SyntaxHighlighter>
  );
};
export default FileSyntaxHighlighter;
