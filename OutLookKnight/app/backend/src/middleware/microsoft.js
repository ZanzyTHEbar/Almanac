import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { config } from "dotenv";

config();

passport.use(
    "auth-microsoft",
    new MicrosoftStrategy(
        {
            clientID: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/callback",
            scope: ["user.read", "calendars.readwrite", "mail.read"," mailboxsettings.read", "offline_access"],
            authorizationURL:
                "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);