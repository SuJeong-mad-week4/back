const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new user
async function getUserCalendar(req, res) {
  console.log("getUserCalendar");
  const userId = req.query.userId;
  try {
    // Mood와 Chat 데이터를 검색합니다.
    const moods = await prisma.mood.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { moodDate: "asc" }, // 날짜별로 정렬
    });

    console.log(moods);

    return res.status(201).json(moods);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to get user calendar" });
  }
}

async function createCalendar(req, res) {
  console.log("createCalendar");

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
    console.log(error);
    return res.status(500).json({ error: "Failed to create mood" });
  }
}

async function getCalendar(req, res) {
  console.log("getCalendar");

  const userId = req.query.userId;
  const moodDate = req.query.moodDate;

  try {
    const Mood = await prisma.mood.findFirst({
      where: {
        userId: parseInt(userId),
        moodDate: moodDate,
      },
    });
    return res.status(201).json(Mood);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create mood" });
  }
}

async function deleteCalendar(req, res) {
  console.log("deleteCalendar");

  const userId = req.body.userId;
  const moodDate = req.body.moodDate;

  try {
    // 먼저 레코드 찾기
    const existingMood = await prisma.mood.findFirst({
      where: {
        userId: userId,
        moodDate: moodDate,
      },
    });

    // 레코드가 존재한다면 업데이트
    if (existingMood) {
      const updatedMood = await prisma.mood.update({
        where: {
          id: existingMood.id,
        },
        data: {
          content: null,
        },
      });
    }

    return res.status(201).json(existingMood);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create mood" });
  }
}

// Assuming you have imported and initialized Prisma as `prisma`
async function summarizeCalendar(req, res) {
  console.log("summarizeCalendar");
  const userId = req.query.userId;
  const moodDate = req.query.moodDate;

  try {
    const moodData = await prisma.mood.findMany({
      where: {
        userId: parseInt(userId), // Replace with the desired userId
        moodDate: {
          startsWith: moodDate,
        },
      },
    });

    // Calculate the counts of "happy" and "sad" moods
    const happyCount = moodData.filter((entry) => entry.mood === "행복").length;
    const annoyingCount = moodData.filter(
      (entry) => entry.mood === "짜증"
    ).length;
    const angryCount = moodData.filter((entry) => entry.mood === "분노").length;
    const fearCount = moodData.filter(
      (entry) => entry.mood === "두려움"
    ).length;
    const sadCount = moodData.filter((entry) => entry.mood === "슬픔").length;
    const depressedCount = moodData.filter(
      (entry) => entry.mood === "우울"
    ).length;

    // Calculate the percentage
    const totalMoodCount = moodData.length;
    const happyPercentage = Number(((happyCount / totalMoodCount) * 100).toFixed(1));
    const annoyingPercentage = Number(((annoyingCount / totalMoodCount) * 100).toFixed(1));
    const angryPercentage = Number(((angryCount / totalMoodCount) * 100).toFixed(1));
    const fearPercentage = Number(((fearCount / totalMoodCount) * 100).toFixed(1));
    const sadPercentage = Number(((sadCount / totalMoodCount) * 100).toFixed(1));
    const depressedPercentage = Number(((depressedCount / totalMoodCount) * 100).toFixed(1));
    
    // Create a response object
    const response = [
      { mood: "행복", percentage: happyPercentage },
      { mood: "짜증", percentage: annoyingPercentage },
      { mood: "분노", percentage: angryPercentage },
      { mood: "두려움", percentage: fearPercentage },
      { mood: "슬픔", percentage: sadPercentage },
      { mood: "우울", percentage: depressedPercentage },
    ];
    

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get mood data" });
  }
}

module.exports = {
  getUserCalendar,
  createCalendar,
  getCalendar,
  deleteCalendar,
  summarizeCalendar,
};
