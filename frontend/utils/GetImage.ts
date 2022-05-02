const GetImage = (data: string) => {
  return "data:image/png;base64," + data
}

export default GetImage

// import axios from "axios"
// import baseurl from 'baseurl'

// const GetImage = (data: string) => {
//   console.log(data)
//   const byteimg = base64ToArrayBuffer(data)
//   return "data:image/png;base64," + btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(byteimg))))
// }
// function base64ToArrayBuffer(base64: any) {
//   console.log(base64)
//   const binaryString = window.atob(base64); // Comment this if not using base64
//   const bytes = new Uint8Array(binaryString.length);
//   return bytes.map((byte, i) => binaryString.charCodeAt(i));
// }




// const GetImage = (id: number) => {
//   axios({
//     method: 'get',
//     url: baseurl + 'member/image/' + String(id),
//   })
//     .then((res) => {
//       const byteimg = base64ToArrayBuffer(res.data)
//       return "data:image/png;base64," + btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(byteimg))))
//     })
// }