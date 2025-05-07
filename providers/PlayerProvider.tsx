import { IBook } from "@/utils/interfaces/IBook";
import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type PlayerContextType = {
  player: AudioPlayer;
  book: IBook | null;
  setBook: (book: IBook) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: PropsWithChildren) {
  const [book, setBook] = useState<IBook | null>(null);

  const player = useAudioPlayer({ uri: book?.audio_url });

  return (
    <PlayerContext.Provider value={{ player, book, setBook }}>
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
