const express = require("express");
const app = express();
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(express.static("public"));

// app.use((req, res, next) => {
// //   // console.log('I run for all routes');
//   next();
// });

app.use("/pokemon", require("./controllers/pokemonControllers.js"));
app.use("/players", require("./controllers/playersControllers.js"));


app.listen(3000, () => {      // should be VERY LAST method!! //
    console.log("express is working");
});