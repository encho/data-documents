import "./App.css";
import { Previewer } from "pagedjs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { srcery } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useLayoutEffect, ReactNode } from "react";
import { range } from "lodash";

function MyTitle({ title }: { title: string }) {
  return (
    <div
      className={`TitleToRemoveFromFlow font-inter font-light text-3xl tracking-tight`}
    >
      {/* <span className="font-semibold">{title}</span> */}
      {title}
    </div>
  );
}

function MyLogo({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white" : "text-[#222]";
  return (
    <div
      className={`LogoToRemoveFromFlow ${color} font-inter font-light text-3xl tracking-tight`}
    >
      lorenzo<span className="font-semibold">bertolini</span>
    </div>
  );
}

function MyPageNumber({ current, total }: { current: number; total: number }) {
  return (
    <div
      className={`PageNumberToRemoveFromFlow font-inter font-light text-3xl tracking-tight`}
    >
      {current} / {total}
    </div>
  );
}

const List = ({ children }: { children: ReactNode }) => {
  return <ul className="flex w-full flex-col gap-10">{children}</ul>;
};

const ListItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="flex w-full gap-8 text-6xl items-top font-inter font-normal leading-[1.3]">
      <div className="-mt-0.5">•</div>
      <div>{children}</div>
    </li>
  );
};

function App() {
  useLayoutEffect(() => {
    (document.querySelector("#preview") as Element).innerHTML = "";

    const previewer = new Previewer();
    previewer
      .preview(
        (document.querySelector("#root") as Element).innerHTML,
        ["pagedjs-styles.css"],
        document.querySelector("#preview")
      )
      .then((flow: any) => {
        console.log("preview rendered, total pages", flow.total, { flow });
      });
    return () => {
      document.head
        .querySelectorAll("[data-pagedjs-inserted-styles]")
        .forEach((e) => e.parentNode?.removeChild(e));
    };
  }, []);

  return (
    <div>
      <div>
        <div className="FrontPage">
          <MyLogo />
          <MyTitle title="Data Visualization with SVG & React.js – The Circle" />
          <MyPageNumber current={1} total={3} />
          <div className="flex justify-center items-center h-[1200px] bg-orange-500xxx rounded-sm overflow-hidden">
            <div className="flex flex-col gap-20 -mt-48">
              <div className="text-4xl font-inter font-normal uppercase text-center leading-snug">
                Data Visualization with SVG & React.js
              </div>
              <div className="flex flex-col gap-0 items-center">
                <div className="text-7xl border-[#222] border-4 p-2 rounded-full w-28 h-28 font-inter font-semibold text-center leading-snug flex justify-center items-center">
                  1
                </div>
                <div className="text-[170px] font-inter font-semibold text-center leading-snug">
                  {"The Circle"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TitledPage title="Introduction" currentPageNr={2} totalPagesNr={4}>
        <div className="h-full w-full flex items-center">
          <List>
            {[
              "SVG (Scalable Vector Graphics) is a language for describing 2D graphics in XML format.",
              "SVG allows us to create dynamic and scalable graphics that can be easily customized.",
              "Circle is one of the basic shapes that can be created using SVG.",
            ].map((content, i) => (
              <ListItem key={i}>{content}</ListItem>
            ))}
          </List>
        </div>
      </TitledPage>

      <TitledPage
        title="Example 1: JSX Code"
        currentPageNr={3}
        totalPagesNr={4}
      >
        <div className="h-full flex items-center justify-center">
          <CircleCode />
        </div>
      </TitledPage>
      <TitledPage title="Example 1: Result" currentPageNr={4} totalPagesNr={5}>
        <svg width={1200} height={1000} style={{ backgroundColor: "#f0f0f0" }}>
          <circle cx={600} cy={500} r={100} fill="#222222" />
        </svg>
      </TitledPage>
    </div>
  );
}

export default App;

const TitledPage = ({
  children,
  title,
  currentPageNr,
  totalPagesNr,
}: {
  children: ReactNode;
  title: string;
  currentPageNr: number;
  totalPagesNr: number;
}) => {
  return (
    <div style={{ breakBefore: "page" }}>
      <div className="NumberedPage">
        <MyPageNumber current={currentPageNr} total={totalPagesNr} />
        <div className="flex items-center h-[1200px] rounded-sm overflow-hidden">
          <div className="flex flex-col h-full w-full justify-center">
            <div className="font-inter pb-8 flex items-end text-8xl font-semibold h-[100px]xxx bg-yellow-500xxx">
              {title}
            </div>
            <div className="h-[1000px] bg-orange-300xxx">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CircleCode = () => {
  const codeString = `
  <svg
    width={1200}
    height={1000}
    style={{backgroundColor: "#f0f0f0"}}
  >
    <circle cx={600} cy={500} r={100} fill="#222222" />
  </svg>
  `;
  return (
    <div className="rounded-md overflow-hidden">
      <SyntaxHighlighter
        language="javascript"
        style={srcery}
        customStyle={{ fontSize: "26px" }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
