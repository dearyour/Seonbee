import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BACK;

function calDday(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();

  var diff = today.getTime() - date.getTime();
  diff = Math.ceil(diff / (1000 * 3600 * 24));

  return diff - 1;
}

export { calDday };
