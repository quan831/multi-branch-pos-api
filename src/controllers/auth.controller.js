const authService = require("../services/auth.service");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;



        const result = await authService.login(
            username,
            password
        );

        if (!result) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            ...result
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const logout = async (req, res) => {
    return res.status(200).json({
        message: "Logout successful"
    });
};

module.exports = {
    login,
    getProfile,
    logout
};