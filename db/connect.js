import mongoose from "mongoose";
import Chat from "../models/chat.js";
const connect = (url) => {
  return mongoose
    .connect(url)
    .then(async () => {
      const groups = [
        {
          chatName: "HR",
        },
        {
          chatName: "Sales",
        },
        {
          chatName: "IT",
        },
      ];
      const chatData = await Chat.find();

      if (!chatData.length) {
        await Chat.insertMany(groups);
      }

      console.log(`Connection Established!😁`);
    })
    .catch((error) => console.log(`Connection Error ${error}`));
};

export default connect;
