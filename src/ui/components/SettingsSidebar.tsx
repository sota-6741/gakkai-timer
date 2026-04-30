import { useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";
import { TimeInput } from "./TimeInput";
import { FormatHelpTooltip } from "./FormatHelpTooltip";
import type { BellConfig } from "../../domain/bellConfig";
import type { Participant } from "../../domain/participant";

interface SettingsSidebarProps {
  onClose: () => void;
  bellConfig: BellConfig;
  onBellConfigChange: (config: BellConfig) => void;
  participants: Participant[];
  onImport: (content: string) => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-[0.08em] mb-5">
      {children}
    </h3>
  );
}

export function SettingsSidebar({
  onClose,
  bellConfig,
  onBellConfigChange,
  participants,
  onImport,
}: SettingsSidebarProps) {
  // ローカルでの編集用ステート。バリデーションエラー中でも入力を妨げない。
  const [localConfig, setLocalConfig] = useState<BellConfig>(bellConfig);
  const [error, setError] = useState<string | null>(null);

  // プロップが変更された場合にステートを同期する（レンダー中の調整）
  const [prevBellConfig, setPrevBellConfig] = useState<BellConfig>(bellConfig);
  if (bellConfig !== prevBellConfig) {
    setPrevBellConfig(bellConfig);
    setLocalConfig(bellConfig);
    setError(null);
  }

  /**
   * 入力中の更新（ローカルステートのみ）
   */
  const handleLocalChange = <K extends keyof BellConfig>(
    key: K,
    val: BellConfig[K],
  ) => {
    setLocalConfig({ ...localConfig, [key]: val });
  };

  /**
   * 確定時の更新（Application層の呼び出し）
   */
  const commitChange = () => {
    try {
      onBellConfigChange(localConfig);
      setError(null); // 成功したらエラーを消す
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message); // 失敗したらエラーメッセージを表示
      }
    }
  };

  const commitToggleChange = (newConfig: BellConfig) => {
    try {
      onBellConfigChange(newConfig);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImport(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-all duration-300">
        <header className="px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg text-gray-900 font-medium tracking-tight">設定</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-6 sm:px-7 sm:py-7 space-y-8 sm:space-y-9 text-black">
            <section>
              <SectionHeading>タイマー設定 (経過時間)</SectionHeading>
              
              {/* エラー表示 */}
              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-md flex items-start gap-2 text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span className="text-xs font-medium leading-relaxed">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <TimeInput
                      label="1st Bell"
                      value={localConfig.first}
                      onChange={(val) => handleLocalChange("first", val)}
                      onBlur={commitChange}
                    />
                  </div>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      checked={localConfig.firstEnabled}
                      onChange={(e) => {
                        const newConfig = {
                          ...localConfig,
                          firstEnabled: e.target.checked,
                        };
                        setLocalConfig(newConfig);
                        commitToggleChange(newConfig);
                      }}
                    />
                    <span className="text-xs font-medium text-gray-600">有効</span>
                  </label>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <TimeInput
                      label="2nd Bell"
                      value={localConfig.second}
                      onChange={(val) => handleLocalChange("second", val)}
                      onBlur={commitChange}
                    />
                  </div>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      checked={localConfig.secondEnabled}
                      onChange={(e) => {
                        const newConfig = {
                          ...localConfig,
                          secondEnabled: e.target.checked,
                        };
                        setLocalConfig(newConfig);
                        commitToggleChange(newConfig);
                      }}
                    />
                    <span className="text-xs font-medium text-gray-600">有効</span>
                  </label>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <TimeInput
                      label="3rd Bell"
                      value={localConfig.third}
                      onChange={(val) => handleLocalChange("third", val)}
                      onBlur={commitChange}
                    />
                  </div>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      checked={localConfig.thirdEnabled}
                      onChange={(e) => {
                        const newConfig = {
                          ...localConfig,
                          thirdEnabled: e.target.checked,
                        };
                        setLocalConfig(newConfig);
                        commitToggleChange(newConfig);
                      }}
                    />
                    <span className="text-xs font-medium text-gray-600">有効</span>
                  </label>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <SectionHeading>登壇者リスト</SectionHeading>
                <div className="flex items-center gap-2">
                  <FormatHelpTooltip />
                  <label
                    className="px-3.5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium tracking-wide"
                  >
                    <Upload size={14} />
                    <span>インポート</span>
                    <input
                      type="file"
                      accept=".toml,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {participants.length === 0 ? (
                <p className="text-gray-500 text-center py-12 text-sm font-medium">登壇者がいません</p>
              ) : (
                <ul className="space-y-2.5">
                  {participants.map((speaker, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="text-xs text-gray-500 mb-1.5 font-mono tracking-widest uppercase">
                        #{String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-900 mb-1 font-semibold tracking-tight">
                        {speaker.name}
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed font-medium">{speaker.title}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}
