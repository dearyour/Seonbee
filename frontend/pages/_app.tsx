import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/join/sign.css";
import "../styles/cards/card.css";
import "../styles/cards/longCard.css";
import "../styles/shop/style.css";
import type { AppProps } from "next/app";
import { createStore } from "redux";
import wrapper, { persistedReducer } from "store/index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "components/commons/bars/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#64543e",
      },
      secondary: {
        main: "#e9e5e1",
      },
      warning: {
        main: "#ff6464",
      },
    },
  });

  return (
    // PersistGate : state를 조회한 후 리덕스에 저장할 때까지 웹 어플리케이션의 UI가 렌더링되는 것을 지연시킴
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
