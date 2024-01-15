import jwt from 'jsonwebtoken';

export const generateAuthToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET ?? '', {
    expiresIn: '8h',
  });

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET ?? '',
    {
      expiresIn: '15d',
    },
  );

  return { token, refreshToken };
};
