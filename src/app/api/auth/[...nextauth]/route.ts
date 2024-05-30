import { saveNewUser } from "@/apis/userApi";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account.provider === "google") {
                const newUser = {
                    email: user.email,
                    googleId: user.id,
                    avatar: user.image,
                    name: user.name
                };
                try {
                    const savedUser = await saveNewUser(newUser);
                    user.id = savedUser.message._id;
                } catch (error) {
                    console.error('Error saving user data to external API:', error);
                }
            }
            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.id = token.id;
            return session;
        },
        async redirect({ url, baseUrl }: any) {
            const urlNew = baseUrl + '/vi/boards'
            return urlNew;
        },
    },
    secret: process.env.GOOGLE_CLIENT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

