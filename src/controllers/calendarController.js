const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
async function getUserCalendar(req, res) {
  console.log('getUserCalendar');
  const userId = req.query.userId;
  try {
    // Mood와 Chat 데이터를 검색합니다.
    const moods = await prisma.mood.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { moodDate: 'asc' }, // 날짜별로 정렬
    });
    
    console.log(moods)

    // const chats = await prisma.chat.findMany({
    //   where: { userId: userId },
    //   orderBy: { chatDate: 'asc' }, // 날짜별로 정렬
    // });

    // 여기에서 moods와 chats를 적절히 결합하거나 형식을 지정하여 반환할 수 있습니다.
    // 예를 들어, 모든 데이터를 하나의 배열로 결합할 수 있습니다.
    return res.status(201).json(moods);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to get user calendar' });
  }
}

async function createCalendar(req,res){
  console.log("createCalendar")

  const { userId, moodDate, mood, content } = req.body;
  try {
    const newMood = await prisma.mood.create({
      data: {
        userId: userId,
        moodDate: moodDate,
        mood: mood,
        content: content,
      },
    });
    return res.status(201).json(newMood);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to create mood' });
  }
}

async function getCalendar(req,res){
  console.log("getCalendar")

  const userId = req.query.userId;
  const moodDate = req.query.moodDate;

  try {
    const Mood = await prisma.mood.findUnique({
      where: {
        userId: userId,
        moodDate: moodDate,
      },
    });
    return res.status(201).json(Mood);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to create mood' });
  }
}

async function deleteCalendar(req,res){
  console.log("deleteCalendar")

  const userId = req.query.userId;
  const moodDate = req.query.moodDate;

  try {
    const Mood = await prisma.mood.update({
      where: {
        userId: userId,
        moodDate: moodDate,
      },
      data: {
        content: null,
      },
    });
    return res.status(201).json(Mood);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to create mood' });
  }
}

module.exports = {
  getUserCalendar,
  createCalendar,
  getCalendar,
  deleteCalendar,
};