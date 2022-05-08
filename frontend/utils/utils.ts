import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BACK;

function calDday(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();

  var diff = today.getTime() - date.getTime();
  console.log("diff 전", diff);
  diff = Math.ceil(diff / (1000 * 3600 * 24));
  console.log("diff 후", diff);

  return diff - 1;
}

export { calDday };
