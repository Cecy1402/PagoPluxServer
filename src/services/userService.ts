import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

class UserService {
  /**
   * Registers a new user with the provided name, email, status, and password
   *
   * @param {string} name - The name of the user
   * @param {string} email - The email address of the user
   * @param {boolean} status - The status of the user
   * @param {string} password - The password of the user
   * @returns {Promise<User>} A promise that resolves to the newly registered user
   */
  public async registerUser(
    name: string,
    email: string,
    status: boolean,
    password: string
  ) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, status, password: hashedPassword });
    await user.save();
    return user;
  }

  /**
   * Authenticates a user with the provided email and password
   *
   * @param {string} email - The email address of the user
   * @param {string} password - The password of the user
   * @returns {Promise<{token: string, user: User}>} A promise that resolves to an object containing the token and user
   */
  public async authenticateUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { token, user };
  }
}
export default UserService;
