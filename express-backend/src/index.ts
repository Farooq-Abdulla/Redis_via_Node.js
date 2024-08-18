import express from 'express';
import { createClient } from 'redis';

const app = express()
app.use(express.json());

const client = createClient();
client.connect();

app.get('/', (req, res) => {
  res.send("Hello")
})


app.post('/submit', async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  //push this to DB , prisma.submissions.create()

  try {
    await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }))
    res.json({ message: "Submission received" })
  } catch (e) {
    res.json({ message: "Submission failed" })
  }
})

app.listen(8080, () => {
  console.log("Server is listening");
})
