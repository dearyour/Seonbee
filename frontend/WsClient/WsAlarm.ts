import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:8000/api/ws",
  debug: function (str) {
    // console.log(str);
  },
  reconnectDelay: 500000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  // console.log("hello");
};
// export const sendtest = () => {
//   client.publish({
//     destination: "/topic/general",
//     body: "Hello world",
//   });
// };

client.onStompError = function (frame) {
  // console.log("Broker reported error: " + frame.headers["message"]);
  // console.log("Additional details: " + frame.body);
};

export default client;
