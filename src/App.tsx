import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";
import ResizablePanel from "./components/ResizablePanel";
import Preview from "./components/Preview";

function App() {
  return (
    <div className="flex">
      <ResizablePanel
        showLeftPanel
        defaultLayout={[33, 67]}
        leftPanel={
          <div className="p-5 px-2 bg-[#0e0e0e] min-h-screen h-full">
            <RecursiveComponent fileTree={fileTree} />
          </div>
        }
        rightPanel={<Preview />}
      />
    </div>
  );
}

export default App;
