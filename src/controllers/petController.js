const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPet(req, res) {
  console.log("createPet");
  console.log(req.body)
  const type_list = ["망곰", "흰곰", "북극곰", "판다", "고양이", "강아지", "토끼", "햄스터", "고슴도치", "거북이", "앵무새", "물고기", "기타"]
  const random_type = type_list[Math.floor(Math.random() * type_list.length)];
  console.log(random_type)
  try{

    const newPet = await prisma.pet.create({
      data: {
        userId: parseInt(req.body.userId),
        nickname: req.body.nickname,
        exp: 0,
        type: "망곰"
      },
    });

    return res.status(201).json(newPet);
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ error: 'Failed to create pet' });
  }
}

async function growPet(req, res){
  console.log("growPet");
  console.log(req.body)
  try{
    const newPet = await prisma.pet.update({
      where: {
        id: parseInt(req.body.petId),
      },
      data: {
        exp: {
          increment: req.body.exp,
        },
      },
    });

    return res.status(201).json(newPet);
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ error: 'Failed to grow pet' });
  }
}

async function getPet(req, res) {
  console.log("getPet");
  console.log(req.query)
  try{
    const pet = await prisma.pet.findUnique({
      where: {
        id: parseInt(req.query.petId),
      },
    });

    return res.status(201).json(pet);
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ error: 'Failed to get pet' });
  }
}

async function getsPet(req, res) {
  console.log("getsPet");
  console.log(req.query)
  try{
    const pets = await prisma.pet.findMany({
      where: {
        userId: parseInt(req.query.userId),
      },
    });

    return res.status(201).json(pets);
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ error: 'Failed to get pets' });
  }
}

module.exports = {
  createPet,
  growPet,
  getPet,
  getsPet
};