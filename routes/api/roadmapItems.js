const express = require('express');
const router = express.Router();

// RoadMap model

const Roadmap = require('../../models/roadmap');

// @route GET api/items
// @desc Get all roadmaps
// @access Public
router.get('/', (req, res) =>{
    Roadmap.find()
      .sort({date: -1})
      .then(maps => res.json(maps));
});

// @route Post api/items
// @desc Post one roadmap
// @access Public should be private for auth
router.post('/', (req, res) =>{
  const newRoadmap = new Roadmap({
    name: req.body.name,
  });
  newRoadmap.save().then(roadmap => res.json(roadmap))
});

// @route DELETE api/items/:id
// @desc destroy a roadmap
// @access Public should be private for auth
router.delete('/:id', (req, res) =>{
  Roadmap.findById(req.params.id)
    .then(roadmap => roadmap.remove()
      .then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
});



module.exports = router;