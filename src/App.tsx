import "./App.css";
import { Previewer } from "pagedjs";
import { useLayoutEffect } from "react";
import { range } from "lodash";

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
      {/* logo will be removed from document flow */}
      <MyLogo />
      {/*  */}
      <div style={{ breakBefore: "page" }}>
        <div className="flex justify-center items-center h-[1200px] bg-orange-500 rounded-sm overflow-hidden">
          <div className="flex flex-col gap-8">
            <div className="text-6xl font-inter font-semibold text-center leading-snug">
              The Web Data Visualization Series
            </div>
            <div className="text-9xl font-inter font-semibold text-center leading-snug">
              {"<circle />"}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div style={{ breakBefore: "page" }}>
        <div className="flex justify-center items-center h-[1200px] bg-orange-500 rounded-sm overflow-hidden">
          <svg width={1200} height={1200} className="bg-orange-500">
            <circle cx={600} cy={600} r={100} fill="yellow" />
          </svg>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default App;
