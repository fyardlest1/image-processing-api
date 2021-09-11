import express from 'express';
import resizeImages from "./api/resize-images";
const routes = express.Router();

routes.get(`/`, (req, res) => {
	res.send('main api route')
})

routes.use(`/resizeimages`, resizeImages);

export default routes
