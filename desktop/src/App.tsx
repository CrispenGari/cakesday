import React from "react";
import { RefreshTokenProvider } from "./providers";
import Routes from "./routes";

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <div className="app">
      <RefreshTokenProvider>
        <Routes />
      </RefreshTokenProvider>
    </div>
  );
};

export default App;
