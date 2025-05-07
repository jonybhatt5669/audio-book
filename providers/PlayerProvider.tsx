import dummyBooks from "@/utils/dummyBooks";
import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { createContext, PropsWithChildren, useContext } from "react";

type PlayerContextType = {
  player: AudioPlayer;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: PropsWithChildren) {
  const item = dummyBooks[0];
  const player = useAudioPlayer({ uri: item.audio_url });

  return (
    <PlayerContext.Provider value={{ player }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
