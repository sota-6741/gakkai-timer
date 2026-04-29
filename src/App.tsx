import { useState } from "react";
import { Menu } from "lucide-react";
import { useTimerActions } from "./application/timerService";
import { useParticipantActions } from "./application/participantService";
import {
  useTimerStorage,
  useParticipantStorage,
  useBellConfigStorage,
} from "./service/storageAdapter";
import { useTimerTicker } from "./ui/hooks/useTimerTicker";
import { TimerDisplay } from "./ui/components/TimerDisplay";
import { ControlButtons } from "./ui/components/ControlButtons";
import { BellProgressBar } from "./ui/components/BellProgressBar";
import { SettingsSidebar } from "./ui/components/SettingsSidebar";
import { TimerStatus } from "./domain/timerStatus";

import "./index.css";

function App() {
  const { timer } = useTimerStorage();
  const { participants, currentIndex } = useParticipantStorage();
  const { bellConfig } = useBellConfigStorage();

  const { startTimer, pauseTimer, resetTimer, updateBellConfig } = useTimerActions();
  const {
    importParticipants,
    nextParticipant,
    prevParticipant,
  } = useParticipantActions();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Drive the timer ticker
  useTimerTicker();

  const currentSpeaker = participants[currentIndex] || {
    name: "登壇者が登録されていません",
    title: "設定から名簿をインポートしてください",
  };

  const isRunning = timer.timerStatus === TimerStatus.RUNNING;

  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className="size-full flex flex-col bg-[#2a2a2a] overflow-hidden relative font-sans">
      {/* Settings Toggle - Floating */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 hover:bg-white/5 rounded-lg transition-colors z-30 text-gray-400 hover:text-white cursor-pointer outline-none"
        aria-label="設定を開く"
      >
        <Menu size={24} className="sm:w-7 sm:h-7" />
      </button>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-between px-6 py-12 sm:px-24 sm:py-24">
        
        {/* Background Timer - Centered in inset */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <TimerDisplay timeRemaining={timer.remainingSeconds} />
        </div>

        {/* Top Header - Speaker Info (Above Timer) */}
        <header className="relative z-10 text-center max-w-full">
          <h1 className="text-2xl sm:text-4xl text-white mb-2 sm:mb-4 tracking-tight font-semibold line-clamp-2">
            {currentSpeaker.name}
          </h1>
          <p className="text-lg sm:text-2xl text-gray-400 tracking-wide font-medium line-clamp-3">
            {currentSpeaker.title}
          </p>
        </header>

        {/* Bottom Area - Controls and Progress (Above Timer) */}
        <footer className="relative z-10 w-full flex flex-col items-center gap-8 sm:gap-16">
          <div className="w-full max-w-6xl flex justify-center px-4 sm:px-0">
            <BellProgressBar
              totalTime={bellConfig.third}
              currentTime={timer.remainingSeconds}
              bell1Time={bellConfig.first}
              bell2Time={bellConfig.second}
              bell3Time={bellConfig.third}
            />
          </div>

          <ControlButtons
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onReset={resetTimer}
            onNext={nextParticipant}
            onPrevious={prevParticipant}
          />
        </footer>
      </main>

      {/* Sidebar - Controlled through Application layer for config updates */}
      {isSidebarOpen && (
        <SettingsSidebar
          onClose={() => setIsSidebarOpen(false)}
          bellConfig={bellConfig}
          onBellConfigChange={(newConfig) => updateBellConfig(newConfig.first, newConfig.second, newConfig.third)}
          participants={participants}
          onImport={importParticipants}
        />
      )}
    </div>
  );
}

export default App;
