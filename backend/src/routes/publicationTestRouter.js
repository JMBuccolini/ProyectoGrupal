const { Router } = require('express');
const upload = require('../../multer');
const publicationTestController = require('../controllers/publicationTestController');

const publicationTestRouter = Router();

publicationTestRouter.post('/', publicationTestController.postPublicationTest);
publicationTestRouter.delete('/:id', publicationTestController.deletePublicationTest);
publicationTestRouter.get('/', publicationTestController.getAllPublicationTest);
publicationTestRouter.get('/:id', publicationTestController.getPublicationTestID);
publicationTestRouter.post('/upload-image', upload.single('image'), publicationTestController.postImages);
module.exports = publicationTestRouter;
