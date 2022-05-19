import type { NextPage } from "next";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Slider,
} from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Asd: NextPage = () => {
  const [imgtest, setImageUrl] = useState<string>("");
  const [imgfile, setimgfile] = useState<any>();
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    // console.log(check);
  }, [check]);
  // const image = (id: number) => {
  //   axios({
  //     method: 'get',
  //     url: baseurl + 'member/image/' + String(id),
  //   })
  //     .then((res) => {
  //       const byteimg = base64ToArrayBuffer(res.data)
  //       setImageUrl("data:image/png;base64," + btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(byteimg)))))
  //     })
  // }

  const getimg = () => {
    axios({
      method: "get",
      // url: baseurl + 'member/image/3',
    }).then((res) => {
      setImageUrl(GetImage(res.data));
    });
  };
  function base64ToArrayBuffer(base64: any) {
    // console.log(base64);
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  function getImageFiles(e: any) {
    e.preventDefault();
    const files = e.currentTarget.files;
    setimgfile(files[0]);
  }

  const uploadImg = () => {
    let data = new FormData();
    data.append("image", imgfile);
    data.append("name", "test");
    axios({
      method: "POST",
      // url: baseurl + 'member/image/test',
      data: data,
    }).then((res) => {
      // console.log(res);
    });
  };

  const Test = styled.div`
    color: blue;
    margin: 10px;
  `;
  class fruit {
    name: string;
    id: number;

    constructor(data: any | Array<any>) {
      // console.log(typeof data)
      this.name = data.name || "";
      this.id = data.id || 0;
    }
  }
  const data = [
    { name: "사과", id: null },
    { name: "바나나", id: 2 },
  ];
  let f = new Array(new fruit(data));
  let fruits = data.map((now) => {
    return new fruit(now);
  });

  // console.log(f);

  return (
    <div className="m-5 rainbow">
      가나다라마바사
      <button onClick={getimg}>image</button>
      <img src={imgtest}></img>
      <Input id="contained-button-file" onChange={getImageFiles} type="file" />
      <Button variant="contained" onClick={uploadImg} component="span">
        Upload
      </Button>
      <img src={imgfile}></img>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="my-5">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      <div>zxcasdasd</div>
      {/* <div>{check ? "asd" : "zxc"}</div> */}
      <Button
        onClick={() => {
          // console.log(check);
          setCheck((check) => !check);
          // console.log(check);
        }}
      >
        체크체크
      </Button>
    </div>
  );
};

export default Asd;
