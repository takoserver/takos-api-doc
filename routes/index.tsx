// deno-lint-ignore-file
import { useSignal } from "@preact/signals";
import { FreshContext } from "$fresh/server.ts";
import FileTree from "../islands/FileTree.tsx";
import Markdown from "preact-markdown";
import { Page } from "../islands/Page.tsx";
import { Partial } from "$fresh/runtime.ts";
import Hanger from "../islands/Button.tsx";
import HangerContent from "../islands/HangerContent.tsx";
let routes: FileStructure | undefined;
export const handler = {
  async GET(_req: Request, ctx: FreshContext) {
    if (!routes) {
      routes = await getDirectoryStructure("./markdowns");
    }
    const markdown = await Deno.readTextFile("./markdowns/Welcome.md");
    return ctx.render({ url: "", markdown });
  },
};
type FileStructure = {
  files: string[];
  [directory: string]: FileStructure | string[];
};

// function to get directory structure
async function getDirectoryStructure(path: string): Promise<FileStructure> {
  const structure: FileStructure = { files: [] };

  for await (const entry of Deno.readDir(path)) {
    if (entry.isFile) {
      structure.files.push(entry.name.split(".").slice(0, -1).join("."));
    } else if (entry.isDirectory) {
      structure[entry.name] = await getDirectoryStructure(
        `${path}/${entry.name}`,
      );
    }
  }

  return structure;
}

// 型定義
// ファイルタイトルコンポーネント
const FileTitle = ({ href, children }: { href: string; children: any }) => (
  <li>
    <a href={href} className="file">
      {children}
    </a>
  </li>
);

// ディレクトリタイトルコンポーネント
const DirTitle = ({ children }: { children: any }) => (
  <span className="folder">
    {children}
  </span>
);

// サイドバーをレンダリングする関数
function renderSidebar(routes: FileStructure | undefined, path = "") {
  if (!routes) {
    return null;
  }

  const entries = Object.entries(routes);

  return (
    <ul>
      {entries.map(([key, value]) => {
        if (key === "files" && Array.isArray(value)) {
          return value.map((file) => (
            <FileTitle key={file} href={`${path}${file}`}>
              {file}
            </FileTitle>
          ));
        } else {
          const isOpen = useSignal(false);
          return (
            <li key={key}>
              <DirTitle>{key}</DirTitle>
              {renderSidebar(value as FileStructure, `${path}${key}/`)}
            </li>
          );
        }
      })}
    </ul>
  );
}
export default function Home(
  { data }: { data: { url: string; markdown: string } },
) {
  const isShow = useSignal(false);
  return (
    <>
<<<<<<< HEAD
      <div class="bg-[#181818] text-black hidden-scrollbar">
=======
      <head>
        <script src="/a.js"></script>
        <link
          rel="stylesheet"
          href="https://sindresorhus.com/github-markdown-css/github-markdown.css"
        />
      </head>
      <div class="bg-[#181818] hidden-scrollbar text-white">
>>>>>>> 45818fb24fc10b0b472e121b3cec8b350078b053
        <header class="h-[56px] fixed w-full bg-[#1f1f1f] flex">
          <div class="w-1/3 h-full block">
            <Hanger isShow={isShow}></Hanger>
          </div>
          <div class="m-auto flex gap-8">
            <a
              href="/"
              class="font-semibold text-neutral-100 text-md bg-clip-text"
            >
              home
            </a>
            <a
              href=""
              class="font-semibold text-neutral-100 text-md bg-clip-text"
            >
              news
            </a>
            <a
              href="https://takos.jp"
              class="font-semibold text-neutral-100 text-md bg-clip-text"
            >
              takos
            </a>
          </div>
          <div class="w-1/3 h-full block">
            <div class="h-full flex justify-end items-center pt-1">
              <div class="h-full flex pr-2 my-auto">
                <a href="https://github.com/takoserver">
                  <img src="/github.svg" alt="" class="h-4/6 m-auto" />
                </a>
              </div>
            </div>
          </div>
        </header>
        <HangerContent isShow={isShow} routes={routes}></HangerContent>
        <div class="pt-[56px] flex">
          {/*side bar */}
          <div class="flex-shrink-0 hidden lg:block lg:px-4">
            <div class="fixed top-24 bottom-24 w-[17rem] flex overflow-hidden bg-[#242424] rounded-xl">
              <div class="flex-1 h-[calc(100vh_-_6rem)] overflow-y-auto pb-8 p-2">
                <ul class="list-inside font-semibold nested ml-2.5 file-tree">
                  {renderSidebar(routes, "/")}
                </ul>
              </div>
            </div>
          </div>
          {/*content */}
          <Partial name="body">
            <div
              class="w-full min-w-0 text-white h-screen overflow-y-hidden flex"
              id="md"
            >
              <div class="lg:ml-[18rem] mt-4 min-w-0 flex w-full">
                <div class="w-2/3 lg:w-1/2 mx-auto">
                  <div
                    class="markdown-body"
                    style={{ backgroundColor: "#181818" }}
                  >
                    <Page doc={data.markdown} />
                  </div>
                </div>
              </div>
            </div>
          </Partial>
        </div>
      </div>
    </>
  );
}
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export function parseMarkdown(markdown: string) {
  return md.render(markdown);
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  const htmlContent = parseMarkdown(content);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
