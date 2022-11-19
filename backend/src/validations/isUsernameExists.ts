import User from '../database/models/User';

const isUsernameAlreadyExists = async (username: string) => {
  const isUsernameExists = await User.findOne({ where: { username } });
  if (isUsernameExists) {
    const error = new Error('Username already exists');
    error.name = 'conflict';
    throw error;
  }
};

export default isUsernameAlreadyExists;