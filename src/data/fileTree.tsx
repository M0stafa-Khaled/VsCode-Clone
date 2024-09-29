import { IFile } from "../interfaces";
import { v4 as uuid } from "uuid";
export const fileTree: IFile = {
  id: uuid(),
  name: "Vs Code Clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "react",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.js",
              isFolder: false,
              content: `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
`,
            },
            {
              id: uuid(),
              name: "index.js.map",
              isFolder: false,
              content: "index.js.map file content",
            },
          ],
        },
        {
          id: uuid(),
          name: "react-dom",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.js",
              isFolder: false,
              content: "index.js file content",
            },
            {
              id: uuid(),
              name: "index.js.map",
              isFolder: false,
              content: "index.js.map file content",
            },
          ],
        },
      ],
    },
    {
      id: uuid(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "icons",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "folder-components-open.svg",
              isFolder: false,
              content: "folder-components-open.svg file content",
            },
            {
              id: uuid(),
              name: "folder-components.svg",
              isFolder: false,
              content: "folder-components.svg file content",
            },
            {
              id: uuid(),
              name: "folder-node-open.svg",
              isFolder: false,
              content: "folder-node-open.svg file content",
            },
            {
              id: uuid(),
              name: "folder-node.svg",
              isFolder: false,
              content: "folder-node.svg file content",
            },
            {
              id: uuid(),
              name: "folder-public-open.svg",
              isFolder: false,
              content: "folder-public-open.svg file content",
            },
            {
              id: uuid(),
              name: "folder-public.svg",
              isFolder: false,
              content: "folder-public.svg file content",
            },
          ],
        },
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
        },
      ],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "RecursiveComponent.tsx",
              isFolder: false,
              content: `import { useState } from "react";
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
`,
            },
            {
              id: uuid(),
              name: "Button.jsx",
              isFolder: false,
              content: "Button.jsx file content",
            },
          ],
        },
        {
          id: uuid(),
          name: "App.tsx",
          isFolder: false,
          content: `import RecursiveComponent from "./components/RecursiveComponent";
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

`,
        },
        {
          id: uuid(),
          name: "main.tsx",
          isFolder: false,
          content: `import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
`,
        },
        {
          id: uuid(),
          name: "index.css",
          isFolder: false,
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #151515;
  color: white;
  font-family: Arial, sans-serif;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: #0e0e0e;
}

::-webkit-scrollbar-thumb {
  background: #886616;
  border-radius: 20px;
}
`,
        },
        {
          id: uuid(),
          name: "interfaces",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.ts",
              isFolder: false,
              content: `export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}`,
            },
          ],
        },
      ],
    },
    {
      id: uuid(),
      name: "package.json",
      isFolder: false,
      content: `{
  "name": "vs-code-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "react-syntax-highlighter": "^15.5.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/react-syntax-highlighter": "^15.5.13",
    "@types/uuid": "^10.0.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.12",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}
`,
    },
    {
      id: uuid(),
      name: "README.md",
      isFolder: false,
      content: `# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level \`parserOptions\` property like this:

\`\`\`js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
\`\`\`

- Replace \`tseslint.configs.recommended\` to \`tseslint.configs.recommendedTypeChecked\` or \`tseslint.configs.strictTypeChecked\`
- Optionally add \`...tseslint.configs.stylisticTypeChecked\`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

\`\`\`js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
\`\`\`
`,
    },
    {
      id: uuid(),
      name: "tailwind.config.js",
      isFolder: false,
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [],
}
`,
    },
    {
      id: uuid(),
      name: "tsconfig.json",
      isFolder: false,
      content: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
`,
    },
    {
      id: uuid(),
      name: ".gitignore",
      isFolder: false,
      content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`,
    },
  ],
};
