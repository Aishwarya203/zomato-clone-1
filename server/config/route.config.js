import { Router } from "express";
import JwtPassport from "passport-jwt";
import { UserModel } from "../database/allModels";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

// Authorization: "Bearer someTokenString"

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp",
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done)=>{
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null, false)
                return done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        })
    )
}