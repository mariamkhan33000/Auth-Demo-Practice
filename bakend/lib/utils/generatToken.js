import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Prevents client-side access to the cookie
            sameSite: "strict", // Protects against CSRF
            secure: process.env.NODE_ENV !== "development" // Only set secure flag in production
        });
    } catch (error) {
        console.error("Error generating token or setting cookie:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
