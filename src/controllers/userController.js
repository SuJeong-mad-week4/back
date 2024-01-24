const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Create a new user
async function loginUser(req, res) {
  console.log('loginUser');
  try {
    const { loginId, password } = req.body;
    console.log(req.body)

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { loginId: loginId },
    });

    if (!existingUser) {
      console.log('아이디가 존재하지 않습니다.')
      return res.status(400).json({ error: '아이디가 존재하지 않습니다.' });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword, existingUser.password)
    // check existing user's password is correct
    if (!await bcrypt.compare(password, existingUser.password)) {
      console.log('비밀번호 불일치');
      return res.status(400).json({ error: '잘못된 비밀번호입니다.' });
    }

    console.log(existingUser)
    return res.status(201).json({
      id: existingUser.id,
      loginId: existingUser.loginId,
      nickname: existingUser.nickname,
      profile: existingUser.profile,
      currentPet: existingUser.currentPet,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

// Create a new user
async function signupUser(req, res) {
  console.log('signupUser')
  try {
    const { loginId, nickname, password } = req.body;
    console.log(req.body)

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (existingUser) {
      return res.status(400).json({ error: '이미 존재하는 유저입니다.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        loginId,
        password: hashedPassword,
        nickname,
        currentPet: null,
      },
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

// edit user
async function editUser(req, res) {
  console.log('editUser')
  try {
    const { loginId, nickname, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (!existingUser) {
      return res.status(400).json({ error: '존재하지 않는 유저입니다.' });
    }

    // Create the new user
    const newUser = await prisma.user.update({
      where: { loginId },
      data: {
        loginId,
        password,
        nickname,
      },
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

module.exports = {
  signupUser,
  loginUser,
};