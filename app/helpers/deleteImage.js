const fs = require("fs");
const path = require("path");

function deleteImage(filename) {
    try {
        const filePath = path.join(__dirname, '../../images', filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error removing file:', err);
                return res.status(500).send('Error removing file');
            }

            console.log('Image removed successfully');
        });
    } catch (error) {
        console.error(`Image ${filename} not deleted`, error)
    }
}

module.exports = deleteImage