const app = require("./index");

const connect = require("./configs/db")

app.listen(4999, async() => {
    try {
        await connect();
        console.log("i am in port no 4999");
    } catch (err) {
        console.error(err.message)
    }
})