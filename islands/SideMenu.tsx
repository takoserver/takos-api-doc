import { useSignal, useComputed } from "@preact/signals";
import { VNode, ComponentChild } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import * as React from "preact/compat";
import { useEffect } from "preact/hooks";

function HangerContent({ routes }: { routes: unknown }) {
  useEffect(() => {
    const handleFolderClick = (event: { target: any; }) => {
      const target = event.target;
      if (target.classList.contains("folder")) {
        target.classList.toggle("open");
        const ul = target.nextElementSibling;
        if (ul) {
          ul.style.display = ul.style.display === "none" ? "block" : "none";
        }
      }
    };

    const folders = document.querySelectorAll(".folder");
    folders.forEach((folder) => {
      const ul = folder.nextElementSibling;
      if (ul) {
        ul.style.display = "none"; // 初期状態で非表示
      }
    });

    document.addEventListener("click", handleFolderClick);

    return () => {
      document.removeEventListener("click", handleFolderClick);
    };
  }, []);

    return (
        <div class="flex-shrink-0 hidden lg:block lg:px-4">
        <div class="fixed top-24 bottom-24 w-[17rem] flex overflow-hidden dark:bg-[#242424] rounded-xl">
          <div class="flex-1 h-[calc(100vh_-_6rem)] overflow-y-auto pb-8 p-2">
            <ul class="list-inside font-semibold nested ml-2.5 file-tree">
            {renderSidebar(routes, "/")}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default HangerContent;

type FileTitleProps = {
  href: string;
  children: React.ReactNode;
};

const FileTitle = ({ href, children }: FileTitleProps) => (
  <li>
    <a href={href} className="file">
      {children}
    </a>
  </li>
);

const DirTitle = ({ children }: { children: React.ReactNode }) => <span className="folder">{children}</span>;

function renderSidebar(routes: unknown, path = "") {
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
          return (
            <li key={key}>
              <DirTitle>{key}</DirTitle>
              <ul style={{ display: "none" }}>
                {renderSidebar(value, `${path}${key}/`)}
              </ul>
            </li>
          );
        }
      })}
    </ul>
  );
}