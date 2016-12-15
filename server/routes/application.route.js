import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import applicationCtrl from '../controllers/application.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/applications - Get list of applications */
  .get(applicationCtrl.list)

  /** POST /api/applications - Create new application */
  .post(validate(paramValidation.createApplication), applicationCtrl.create);

router.route('/:applicationId')
/** GET /api/applications/:applicationId - Get application */
  .get(applicationCtrl.get)

  /** PUT /api/applications/:applicationId - Update application */
  .put(validate(paramValidation.updateApplication), applicationCtrl.update)

  /** DELETE /api/applications/:applicationId - Delete application */
  .delete(applicationCtrl.remove);

/** Load application when API with applicationId route parameter is hit */
router.param('applicationId', applicationCtrl.load);

export default router;
