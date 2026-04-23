// src/context/SocketContext.tsx
import { createContext, useEffect } from "react";
import { socket } from "@utils/socket";

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
