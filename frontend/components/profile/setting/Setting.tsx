import styled from '@emotion/styled';
import Btn from 'components/commons/Btn';
import React, { useEffect, useRef, useState } from 'react';
import useProfile from 'store/hook/profileHooks';
import axiosConnector from 'utils/axios-connector';
import GetImage from 'utils/GetImage';
import Image from 'next/image';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Box, Modal, Skeleton, TextField, Typography } from '@mui/material';
import seonbee from 'public/characters/hobee_face.png';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import Swal from 'sweetalert2';

type Props = {};

type keyType = {
  [key: string]: string;
};

class Data {
  memberId: number;
  birthday: string;
  email: string;
  nickname: string;
  gender: string;
  mbti: string;
  interest: string;
  likelist: string;
  banlist: string;
  isAdmin: boolean;
  isKakao: boolean;
  imageString: string;
  image?: File;
  verse: string;
  constructor(data: any) {
    this.banlist = data.banlist || '';
    this.birthday = data.birthday || '';
    this.email = data.email || '';
    this.gender = data.gender || '';
    this.imageString = data.imageString || '';
    this.interest = data.interest || '';
    this.likelist = data.likelist || '';
    this.memberId = data.memberId || 0;
    this.mbti = data.mbti || '';
    this.nickname = data.nickname || '';
    this.isAdmin = data.isAdmin || false;
    this.isKakao = data.isKakao || false;
    this.verse = data.verse || '';
    this.image = data.image;
  }
}

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const mbti = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];

const Setting = (props: Props) => {
  const [mydata, setMydata] = useState<Data>(new Data({}));
  const [viewimage, setViewImage] = useState<any>();
  const [originimage, setOriginImage] = useState();
  const [image, setImage] = useState<any>();
  const [showmodal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [reset, setReset] = useState<boolean>(false);
  const cropperRef = useRef<HTMLImageElement | null>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: any) => {
      const now = {
        ...mydata,
        image: new File([blob], 'profileimage.png'),
      };
      setMydata(now);
    });
    setImage(cropper.getCroppedCanvas().toDataURL());
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };
  const handleOpen = () => {
    if (originimage) {
      setShowModal(true);
    }
  };
  const handleClose = () => setShowModal(false);
  const { hostId } = useProfile();
  useEffect(() => {
    setIsLoading(true);
    axiosConnector({
      method: 'GET',
      url: 'profile/' + String(hostId),
    })
      .then((res) => {
        // console.log(res);
        setMydata(res.data.member);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setIsLoading(false);
  }, [reset]);
  useEffect(() => {
    if (!mydata.nickname) {
      setError('');
      return;
    }
    axiosConnector({
      method: 'get',
      url: 'profile/check/' + mydata.nickname,
    })
      .then((res) => {
        setError('');
      })
      .catch((err) => {
        setError('중복된 닉네임입니다.');
      });
  }, [mydata.nickname]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const now = {
      ...mydata,
      [name]: value,
    };
    setMydata(new Data(now));
  };
  const onChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    const now = {
      ...mydata,
      [name]: value,
    };
    setMydata(new Data(now));
  };
  const onChangeDate = (e: any) => {
    // console.log(e);
    const value = moment(e).format('YYYY.MM.DD');
    // const { value } = e.target;
    const now = {
      ...mydata,
      birthday: value,
    };
    setMydata(new Data(now));
  };

  // 이미지 input change
  const ImageChange = (e: any) => {
    const now = {
      ...mydata,
      image: e.currentTarget.files[0],
    };
    setMydata(now);

    getBase64(e.currentTarget.files[0], (imageUrl: any) => {
      setOriginImage(imageUrl);
      // console.log(originalImg)
    });
  };

  const EditRequest = () => {
    const data = new FormData();
    for (const key in mydata) {
      const now = (mydata as any)[key];
      if (now) {
        data.append(key, now);
      }
    }
    // data.append("password", "aaa123123");
    axiosConnector({
      method: 'POST',
      url: 'profile/update',
      data: data,
    })
      .then((res) => {
        // console.log(res);
        Swal.fire({
          icon: 'success',
          title: '성공적으로 처리되었습니다.',
        });
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {/* 이미지 편집 모달 */}
      <Modal
        open={showmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            프로필 편집
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="d-flex">
              <Cropper
                src={originimage}
                style={{ height: 400, width: '100%' }}
                // Cropper.js options
                aspectRatio={1 / 1}
                guides={true}
                ref={cropperRef}
              />
              <div className="d-flex flex-column ms-2">
                {image ? (
                  <Image
                    src={image}
                    width={160}
                    height={160}
                    alt="preview"
                    className="rounded-circle border border-2"
                  ></Image>
                ) : (
                  <Image
                    src={seonbee}
                    width={160}
                    height={160}
                    alt="preview"
                    className="rounded-circle border border-2"
                  ></Image>
                )}
                <Btn onClick={onCrop} className="my-3">
                  적용
                </Btn>
                <Btn
                  onClick={() => {
                    if (image) {
                      setViewImage(image);
                    }
                    setShowModal(false);
                  }}
                >
                  종료
                </Btn>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

      <SettingWrap className="w-100 h-100 d-flex flex-column">
        {/* 프로필 이미지, verse */}
        <div className="row my-2 w-100 ps-3">
          {viewimage ? (
            <Skeleton
              variant="rectangular"
              width={'80%'}
              height={'80%'}
              className="rounded-circle p-5fw-bold"
            ></Skeleton>
          ) : (
            <Image
              src={GetImage(mydata.imageString)}
              className="rounded-circle col"
              alt="profile"
              width={'100%'}
              height={'100%'}
            ></Image>
          )}
          <input
            type="text"
            className="form-control ms-5 col"
            name="verse"
            aria-describedby="basic-addon1"
            value={mydata?.verse}
            onChange={onChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            이미지 수정
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={ImageChange}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
            onClick={handleOpen}
          >
            편집
          </button>
        </div>
        {/* 이메일 - 수정 불가 */}
        <div className="d-flex my-2">
          <Btn className="me-2">이메일</Btn>
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon1"
            value={mydata?.email}
            disabled
          />
        </div>
        <div className="d-flex my-2 align-items-center">
          <Btn className="me-2">닉네임</Btn>
          <input
            type="text"
            name="nickname"
            className="form-control"
            aria-describedby="basic-addon1"
            value={mydata.nickname}
            onChange={onChange}
          />
        </div>
        <div className="mx-3 text-danger">{error}</div>
        <div className="d-flex my-2">
          <Btn className="me-2">성별</Btn>
          <select
            name="gender"
            value={mydata.gender}
            onChange={onChangeSelect}
            className="form-select"
            aria-describedby="basic-addon1"
          >
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>

        <div className="d-flex my-2">
          <Btn className="me-2">mbti</Btn>
          <select
            name="mbti"
            value={mydata.mbti}
            onChange={onChangeSelect}
            className="form-select"
            aria-describedby="basic-addon1"
          >
            {mbti.map((now, index) => {
              return (
                <option value={now} key={index}>
                  {now}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex my-2">
          <Btn className="me-2">관심</Btn>
          <input
            type="text"
            name="interest"
            value={mydata.interest}
            onChange={onChange}
            className="form-control"
            placeholder="ex) 운동, 캠핑"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-flex my-2">
          <Btn className="me-2">좋아</Btn>
          <input
            type="text"
            name="likelist"
            value={mydata.likelist}
            onChange={onChange}
            className="form-control"
            placeholder="ex) 커피, 꽃"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-flex my-2">
          <Btn className="me-2">싫어</Btn>
          <input
            type="text"
            name="banlist"
            value={mydata.banlist}
            onChange={onChange}
            className="form-control"
            placeholder="ex) 책, 핸드크림"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-flex my-2">
          <Btn className="me-2 my-auto">생일</Btn>
          {/* <input
            type="text"
            name="birthday"
            className="form-control"
            aria-describedby="basic-addon1"
            value={mydata.birthday}
            onChange={onChange}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="생년월일"
              inputFormat="yyyy.MM.dd"
              value={mydata.birthday}
              onChange={onChangeDate}
              renderInput={(params) => <TextField {...params} />}
              className="border"
            />
          </LocalizationProvider>
        </div>
        <EditBtn onClick={EditRequest}>수정</EditBtn>
      </SettingWrap>
    </>
  );
};

const SettingWrap = styled.div`
  width: 100%;
  padding-right: 20%;
  padding-left: 20%;
  overflow-y: scroll;
`;

const EditBtn = styled(Btn)`
  width: 30%;
  margin-left: auto;
  margin-right: auto;
`;

export default Setting;
