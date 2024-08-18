import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://gauravkingdom2013@gmail.com:${process.env.DATABASE_PASSWORD}@cluster0.5yymuvg.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0`,
    );

    if (connection) {
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
