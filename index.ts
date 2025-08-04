import { db } from "@config";
import app from "./app";
const PORT = 6969;
db.connect();
app.get("/", (_, res) => {
  res.send("Hello!, I am BharathSanjeevi aka GAY!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
