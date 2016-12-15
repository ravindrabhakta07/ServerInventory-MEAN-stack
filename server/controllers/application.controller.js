import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Application from '../models/application.model';


/**
 * Load application and append to req.
 */
function load(req, res, next, id) {
  Application.get(id)
    .then((application) => {
      req.application = application; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get application
 * @returns {Application}
 */
function get(req, res) {
  return res.json(req.application);
}

/**
 * Create new application
 * @property {string} req.body.applicationName - The name of application.
 * @property {string} req.body.applicationURL - The URL of application.
 * @property {string} req.body.tierType - The tier type of application.
 * @property {string} req.body.serviceOwner - The service owner of application.
 * @property {string} req.body.onCallTeam - The onCallTeam of application.
 * @property {string} req.body.database - The database type of application.
 * @returns {Application}
 */
function create(req, res, next) {
  const application = new Application({
    applicationName: req.body.applicationName,
    applicationURL: req.body.applicationURL,
    tierType: req.body.tierType,
    serviceOwner: req.body.serviceOwner,
    onCallTeam: req.body.onCallTeam,
    database: req.body.database
  });

  Application.findOne({ applicationName: req.body.applicationName })
    .exec()
    .then((foundApplication) => {
      if (foundApplication) {
        return next(new APIError('Application name must be unique!', httpStatus.CONFLICT));
      }
      return application.save()
        .then(savedApplication => res.json(savedApplication))
        .catch(e => next(new APIError(e.message, httpStatus.CONFLICT)));
    });
}

/**
 * Update existing application
 * @property {string} req.body.applicationName - The name of application.
 * @property {string} req.body.applicationURL - The URL of application.
 * @property {string} req.body.tierType - The tier type of application.
 * @property {string} req.body.serviceOwner - The service owner of application.
 * @property {string} req.body.onCallTeam - The onCallTeam of application.
 * @property {string} req.body.database - The database type of application.
 * @returns {Application}
 */
function update(req, res, next) {
  const application = req.application;
  application.applicationName = req.body.applicationName;
  application.applicationURL = req.body.applicationURL;
  application.tierType = req.body.tierType;
  application.serviceOwner = req.body.serviceOwner;
  application.onCallTeam = req.body.onCallTeam;
  application.database = req.body.database;

  application.save()
    .then(savedApplication => res.json(savedApplication))
    .catch(e => next(new APIError(e.message, httpStatus.CONFLICT)));
}

/**
 * Get application list.
 * @returns {Application[]}
 */
function list(req, res, next) {
  Application.list()
    .then(applications => res.json(applications))
    .catch(e => next(e));
}

/**
 * Delete application.
 * @returns {Application}
 */
function remove(req, res, next) {
  const application = req.application;
  application.remove()
    .then(deletedApplication => res.json(deletedApplication))
    .catch(e => next(new APIError(e.message, httpStatus.CONFLICT)));
}

export default { load, get, create, update, list, remove };
