import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "../styles/join/sign.css";
import type { AppProps } from "next/app";
import { createStore } from "redux";
import wrapper, { persistedReducer } from "store/index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "components/commons/bars/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return (
    // PersistGate : state를 조회한 후 리덕스에 저장할 때까지 웹 어플리케이션의 UI가 렌더링되는 것을 지연시킴
    <PersistGate persistor={persistor}>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
