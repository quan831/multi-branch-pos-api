const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const login = async (username, password) => {
    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        return null;
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
            branchId: user.branchId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    };
};

module.exports = {
    login
};