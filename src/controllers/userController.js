// src/controllers/itemController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    console.log(existingUser)
    if (!existingUser) {
      console.log('아이디가 존재하지 않습니다.')
      return res.status(400).json({ error: '아이디가 존재하지 않습니다.' });
    }

    // check existing user's password is correct
    if (existingUser.password !== password) {
      console.log('비밀번호가 일치하지 않습니다.')
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    res.status(201).json(existingUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// Create a new user
async function signupUser(req, res) {
  console.log('signupUser')
  try {
    const { loginId, nickname, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (existingUser) {
      return res.status(400).json({ error: '이미 존재하는 유저입니다.' });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        loginId,
        password,
        nickname,
      },
    });

    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function checkId(req, res) {
  console.log('checkId')
  try {
    const { loginId } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (existingUser) {
      return res.status(400).json({ isDuplicated: true });
    }

    res.status(201).json({ isDuplicated: false });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
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

    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

module.exports = {
  signupUser,
  loginUser,
};