import express from "express"
import dotenv from "dotenv"
import { sql, initDB } from "./Config/db.js"
import ratelimiter from "./middleware/Ratelimiter.js"
import transactionsRoute from "./Routes/transactionRoutes.js"

dotenv.config()
const app = express()


app.use(express.json())
app.use(ratelimiter)

const PORT = process.env.PORT || 5001



app.get("/", (req, res) => {
    res.send("SERVER IS UP ON 5001 PORT 👍")
})

app.use("/api/transactions", transactionsRoute)


console.log("PORT:", PORT)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Up on ${PORT} 👍👍`)
    });
})