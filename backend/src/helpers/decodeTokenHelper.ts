import jwt from 'jsonwebtoken';

interface IToken {
  userId: string;
}

export const decodeTokenHelper = (token: string): any => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    const { userId } = decodedToken as IToken;

    return userId;
  } catch (error) {
    return error;
  }
};
