import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useFindAndModify:false
});

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = () => console.log(`X Error on DB connection${error}`)
db.once("open", handleOpen)
db.on("error", handleError)

/*export const videos = [
    {
        id: 324393,
        title: "Video awesome1",
        description: "This is something I love",
        views: 24,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp",
        creator:{
            id: 121212,
            name: "Nicolas",
            email: "nico@gma.com"
        }

    },
    {
        id: 324373,
        title: "Video Perfect",
        description: "This is something I love",
        views: 24,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp",
        creator:{
            id: 121212,
            name: "Nicolas",
            email: "nico@gma.com"
        }

    },
    {
        id: 324383,
        title: "Video Nice",
        description: "This is something I love",
        views: 24,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp",
        creator:{
            id: 121212,
            name: "Nicolas",
            email: "nico@gma.com"
        }

    }
]*/