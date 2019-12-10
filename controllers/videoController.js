import {videos} from "../db"

export const home = (req, res) => res.render("home", { pageTitle : "Home", videos});
export const search = (req, res) => {
    const {query: {term : searchingBy}} = req;
    res.render("search", { pageTitle : "Search", searchingBy});
}