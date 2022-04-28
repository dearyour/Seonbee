import '../styles/globals.css'
import 'react-calendar/dist/Calendar.css';
import "../styles/join/sign.css";
import type { AppProps } from "next/app";
import wrapper from "store/index";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
