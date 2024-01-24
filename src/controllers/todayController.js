const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Create a new user
async function createToday(req, res) {
  console.log("createToday");
  console.log(req.body);
  try {
    const newToday = await prisma.today.create({
      data: {
        userId: parseInt(req.body.userId),
        question: req.body.question,
        answer: req.body.answer,
        todayDate: req.body.todayDate,
      },
    });

    return res.status(201).json(newToday);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create Today" });
  }
}

async function findUserToday(req,res){
  console.log("findUserToday");
  console.log(req.query);
  try{
    const todays = await prisma.today.findMany({
      where:{
        userId: parseInt(req.query.userId)
      },
    });
    return res.status(201).json(todays);
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Failed to find Today" });
  }
}

async function findToday(req,res){
  console.log("findToday");
  console.log(req.query);
  try{
    const today = await prisma.today.findFirst({
      where:{
        userId: parseInt(req.query.userId),
        todayDate: req.query.todayDate,
      },
    });
    if(!today){
      return res.status(201).json({success: false});
    }
    return res.status(201).json({success:true, today:today});
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Failed to find Today" });
  }
}

async function findOneToday(req,res){
  console.log("findOneToday");
  console.log(req.query);
  try{
    const today = await prisma.today.findUnique({
      where:{
        id: parseInt(req.query.todayId)
      },
    });
    return res.status(201).json(today);
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Failed to find Today" });
  }

}

module.exports = {
  createToday,
  findUserToday,
  findToday,
  findOneToday
};