import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/join/sign.css";
import type { AppProps } from "next/app";
import wrapper from "store/index";
import Navbar from "components/commons/bars/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
