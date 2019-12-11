import {videos} from "../db"
import routes from "../routes";
import Video from "../models/Video"

export const home = async(req, res) =>{
 try{
    const videos = await Video.find({});
    res.render("home", { pageTitle : "Home", videos})
 }catch(error){
     console.log(error);
     res.render("home", { pageTitle : "Home", videos : []})
 }
};
export const search = (req, res) => {
    const {query: {term : searchingBy}} = req;
    res.render("search", { pageTitle : "Search", searchingBy, videos});
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle : "Upload"});
}

export const postUpload = (req, res) => {
    const {
        body: { file, title, description}
        } = req;
        //To do : upload and save video
        res.redirect(routes.videoDetail(324383));
    }


export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle : "Video Details", videos});
