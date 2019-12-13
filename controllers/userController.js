import routes from "../routes";
import User from "../models/User";
import passport from "passport"
import { declareTypeAlias } from "babel-types";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = async(req, res, next) => {
    const { body: { name, email, password, password2}} = req;
    if(password!==password2){
        res.status(400);
        res.render("join", { pageTitle: "Join"})
    } else{
        try{const user =await User({
            name,
            email
        })
        await User.register(user, password)
        next();}
        catch(error){
            console.log(error)
            res.redirect(routes.home)
        }
    }
}
export const getLogin = (req, res) => res.render("login");
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect:routes.home
})

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (accesstoken, refreshToken,profile,cb) =>{
    const { _json: {id, avatar_url:avatarUrl, name, email}} = profile;
    try{
        const user = await User.findOne({email})
        if(user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarUrl
            });
            return cb(null, newUser);
        
        console.log(user);
    }catch(error){
        return cb(error);
    }
};

export const postGithubLogin = (req, res) =>{
    res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const {_json: {id, name, email}}=profile;
    try{
        const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
        return cb(null, newUser);
    }catch(error){
        return cb(error);
    }

    console.log(accessToken, refreshToken, profile, cb)
}
export const postFacebookLogin = (req, res)=> {
    res.redirect(routes.home);
}
export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}



export const editProfile = (req, res) => res.render("editProfile");
export const getMe = (req, res) => res.render("userDetail", {pageTitle: `${req.user.name} Detail`, user:req.user});

export const userDetail = async(req, res) =>{
    const {
        params: {id}
    } =req;
    try{
        const user = await User.findById(id);
        res.render("userDetail", {pageTitle: `User Detail`,user})
    }catch(error){
        res.redirect(routes.home);
    }
}
