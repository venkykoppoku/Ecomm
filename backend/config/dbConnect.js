import mongoose from "mongoose";

export const connectDatabase = () => {
  const env = process.env.NODE_ENV;
  let DB_URI = process.env[`DB_${env}_URI`];

  mongoose.connect(DB_URI).then((con) => {
    console.log(
      `MongoDB database connected with hostname on ${con.connection.host}`
    );
  });
};
