const express = require('express');
const PORT = 3030;

const { bookRouter, libraryRouter, userRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use("/book", bookRouter)
app.use("/library", libraryRouter)
app.use("/user", userRouter)

app.use((req,res,next) => {
    console.log(`Call made to resource ${req.url} with method ${ req.method}`)
    next();
})


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});