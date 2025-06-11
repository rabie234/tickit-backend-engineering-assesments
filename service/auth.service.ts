import bcrypt from "bcryptjs";
import User, { IUser } from "../model/user.model";
import { config } from "../config/auth.config";
import { signAccessToken } from "../lib/token";

interface LoginData {
  identifier: string;
  password: string;
}

interface LoginResponse {
  user: Partial<IUser>;
  accessToken: {
    token: string;
  };
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const { identifier, password } = data;

  let user: IUser | null = null;

  user = await User.findOne({ username: identifier }).select("+password");

  if (!user) {
    throw new Error(config.errors.wrongCredentials.key);
  }

  const accessToken = signAccessToken({
    id: user._id,
  });

  // Remove password before returning
  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    user: userWithoutPassword,
    accessToken,
  };
};
