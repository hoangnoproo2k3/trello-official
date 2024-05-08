import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import fetch from 'node-fetch'; // Import fetch để gửi HTTP requests từ máy chủ của bạn

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
                const { name, email } = user;
                console.log(user);
                try {
                    // Gửi thông tin người dùng tới API bên ngoài
                    const response = await fetch('https://your-external-api.com/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email }),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(responseData); // Log thông tin trả về từ API nếu cần
                    } else {
                        console.error('Failed to save user data to external API');
                        // Xử lý lỗi nếu cần
                    }
                } catch (error) {
                    console.error('Error saving user data to external API:', error);
                    // Xử lý lỗi nếu cần
                }
            }
            return true;
        }
    },
    secret: process.env.GOOGLE_CLIENT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
