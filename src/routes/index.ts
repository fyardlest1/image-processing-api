import express from 'express';
import images from './api/resize-images';
const routes = express.Router();

routes.get(`/`, (req, res) => {
	res.send('main api route')
})

routes.use(`/resizeimages`, images);

export default routes
