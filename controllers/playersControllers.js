const express = require("express");
const router = express.Router();

//  Add Player Model  //
const PlayerModel = require("../models").Player;
const TeamModel = require("../models").Team;
const PokemonModel = require("../models").Pokemon;

//   Get All Players - Index  //   
router.get("/", (req, res) => {
    res.render("players/index.ejs");
});

    // SIGNUP //
router.get("/signup", (req, res) => {
    res.render("players/signup.ejs");
});


    // POST SIGN UP - INDEX //
// router.post("/", (req, res) => {
//     players.push(req.body);
//     res.redirect(`/players/profile/${players.length -1}`);
//   });

//   POST SIGN UP - SEQUELIZE  //
router.post("/", (req, res) => {
    PlayerModel.create(req.body).then((newPlayer) => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    });
});

    // USER LOGIN FORM //
router.get("/login", (req, res) => {
    res.render("players/login.ejs")
});

   // USER POST REQUEST LOGIN // 
// router.post("/login", (req, res) => {
//     let index = players.findIndex(
//         (player) =>
//           player.username === req.body.username && player.password === req.body.password
//       );
//     res.redirect(`/players/profile/${index}`);
// });

//      USER POST REQUEST - SEQUELIZE  //
router.post("/login", (req, res) => {
    PlayerModel.findOne({ where: {username: req.body.username, password: req.body.password,
    } }).then((logInPlayers) => {
        res.redirect(`/players/profile/${logInPlayers.id}`);
    })
    .catch((err) => {
        res.redirect("/players");
    });
});

    // USER PROFILE GET ROUTE - INDEX //
// router.get("/profile/:index", (req, res) => {
//     let playerProfile = players[req.params.index];
//     res.render("players/profile.ejs", {
//        player: playerProfile,
//        index: req.params.index,
//     });
// });

//  USER PROFILE GET - SEQUELIZE   //
// router.get("/profile/:id", (req, res) => {
//     PlayerModel.findByPk((req.params.id), {
//         include: [TeamModel],
//     }).then((singlePlayer) => {
//         console.log(singlePlayer);
//       res.render("players/profile.ejs", {
//         player: singlePlayer,
//       });
//     });
//   });
//   USER PROFILE GET - Associations  //
router.get("/profile/:id", (req, res) => {
  PlayerModel.findByPk(req.params.id, {
        include: [ { model: TeamModel }, { model: PokemonModel } ],
    }).then((singlePlayer) => {
       TeamModel.findAll().then((allTeams) => {
           console.log("This is a single Player", singlePlayer);
            console.log("This is all Teams", allTeams);
        res.render("players/profile.ejs", {
            player: singlePlayer,
            teams: allTeams,
          });
       });
    });
  });

    // UPDATE PROFILE .PUT - INDEX //
// router.put("/profile/:index", (req, res) => {
//     users[req.params.index] = req.body;
//     res.redirect(`/players/profile/${req.params.index}`);
// });

//    EDIT / UPDATE PROFILE .PUT - SEQUELIZE  //
// router.put("/profile/:id", (req, res) => {
//     PlayerModel.update(req.body, {
//         where: { id: req.params.id },
//         returning: true,
//         plain: true,
//     }).then((updatePlayer) => {
//         res.redirect(`/players/profile/${req.params.id}`);
//     });
// });

    // DELETE USER ROUTE/PROFILE //
// router.delete("/:index", (req, res) => {
//     players.splice(req.params.index, 1);
//     res.redirect("/players");
// });

//  DELETE USER - SEQUELIZE  //
router.delete("/:id", (req, res) => {
    PlayerModel.destroy( { where: { id: req.params.id } })
    .then(() => {
    res.redirect("/players");
    });
})


module.exports = router;