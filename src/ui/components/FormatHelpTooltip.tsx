import { HelpCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { createPortal } from "react-dom";
import "react-tooltip/dist/react-tooltip.css";

export function FormatHelpTooltip() {
  const tooltipContent = (
    <Tooltip
      id="format-help-tooltip"
      place="left"
      clickable
      opacity={1}
      style={{
        backgroundColor: "#111827",
        color: "#fff",
        borderRadius: "8px",
        padding: "16px",
        zIndex: 9999,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        pointerEvents: "auto",
      }}
    >
      <div className="w-72 space-y-4 text-left">
        <section>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-700 pb-1">
            CSV / Excel
          </div>
          <p className="text-[11px] text-gray-300 mb-2">
            Excelで「名前」「タイトル」の2列を作成し、CSVで保存してインポートできます。
          </p>
          <code className="block p-2.5 bg-gray-800 rounded font-mono text-[11px] text-blue-300 leading-relaxed">
            名前,タイトル
            <br />
            名前1,タイトル1
            <br />
            名前2,タイトル2
          </code>
        </section>

        <section>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-700 pb-1">
            TOML
          </div>
          <code className="block p-2.5 bg-gray-800 rounded font-mono text-[11px] text-blue-300 leading-relaxed">
            [[speaker]]
            <br />
            name = "名前1"
            <br />
            title = "タイトル1"
            <br />
            <br />
            [[speaker]]
            <br />
            name = "名前2"
            <br />
            title = "タイトル2"
          </code>
        </section>
      </div>
    </Tooltip>
  );

  return (
    <>
      <button
        data-tooltip-id="format-help-tooltip"
        className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-help outline-none"
        aria-label="フォーマットの説明"
      >
        <HelpCircle size={16} />
      </button>
      {typeof document !== "undefined" &&
        createPortal(tooltipContent, document.body)}
    </>
  );
}
