module.exports = app => {
  const fs = require("fs");
  const path = require("path");
  const express = require('express');

  var router = require("express").Router();

  app.use("/image", express.static("images"));

  app.post('/upload-image', (req, res) => {
    try {
      const base64Image = req.body.image;

      if (!base64Image) {
        return res.status(400).send('No image uploaded');
      }


      const filename = req.body.filename;
      const filePath = path.join(__dirname, 'images', filename);
      var base64Data = base64Image.replace(/^data:image\/([a-zA-Z]+);base64,/, "");


      fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
          console.error('Error saving file:', err);
          return res.status(500).send('Error saving file');
        }

        console.log('Image uploaded successfully');
        res.status(200).send('Image uploaded successfully');
      });
    } catch (error) {
      console.error('Error handling data:', error);
      res.status(500).send('Internal server error');
    }
  });


  app.use('/', router);
};