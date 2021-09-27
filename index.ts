import express from "express"
import routes from "./routes"
import dotenv from "dotenv"
import cors from "express";

dotenv.config();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const app = express();
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", '');
  next();
});
app.use(express.json())
app.use(routes)


app.get('/', function (req, res) {
    res.send({status: "ok", message: "app is running"})
})
   
  app.listen(3000, () => console.log("its running on port" + " 3000"))
