const router = require("express").Router();
const Contract = require("../model/contractModel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Contract.find()
    .then((contractor) => res.json(contractor))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Contract.findById(req.params.id)
    .then((contractor) => res.json(contractor))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", auth, (req, res) => {
  const newContract = new Contract({
    contNum:req.body.contNum,
    name: req.body.name,
    date: req.body.date,
    phone: req.body.phone,
    month:req.body.month,
    addedBy: req.body.addedBy,
  });

  newContract
    .save()
    .then((contractor) => res.json("New Data Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", auth, (req, res) => {
  Contract.findByIdAndDelete(req.params.id)
    .then(() => res.json("data deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", auth, (req, res) => {
  Contract.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("data updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
