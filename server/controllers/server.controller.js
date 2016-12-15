import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Server from '../models/server.model';
import Application from '../models/application.model';

/**
 * Load server and append to req.
 */
function load(req, res, next, id) {
  Server.get(id)
    .then((server) => {
      req.server = server; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get server
 * @returns {Server}
 */
function get(req, res) {
  return res.json(req.server);
}

/**
 * Create new server
 * @property {string} req.body.applicationId - The application id of server that it belongs to.
 * @property {string} req.body.serverName - The name of server.
 * @property {string} req.body.dbName - The database name of server.
 * @property {string} req.body.dc- The dc of server.
 * @property {string} req.body.cpu - The cpu details of server.
 * @property {string} req.body.memory - The memory of server.
 * @property {string} req.body.os - The operating system of server.
 * @property {string} req.body.mac - The mac address of server.
 * @property {string} req.body.ipv4 - The ipv4 info of server.
 * @property {string} req.body.ipv6 - The ipv6 info of server.
 * @property {string} req.body.secZone - The secZone of server.
 * @property {string} req.body.entityType - The entity type of server.
 * @property {string} req.body.vlan - The vlan of server.
 * @property {string} req.body.secVul - The sec vul of server.
 * @returns {Server}
 */
function create(req, res, next) {
  const server = new Server({
    application: req.body.applicationId,
    serverName: req.body.serverName,
    dbName: req.body.dbName,
    dc: req.body.dc,
    cpu: req.body.cpu,
    memory: req.body.memory,
    os: req.body.os,
    mac: req.body.mac,
    ipv4: req.body.ipv4,
    ipv6: req.body.ipv6,
    secZone: req.body.secZone,
    entityType: req.body.entityType,
    vlan: req.body.vlan,
    secVul: req.body.secVul,
  });

  Application.get(req.body.applicationId)
    .then((application) => {
      Server.findOne({ serverName: req.body.serverName, application: application._id })
        .exec()
        .then((foundServer) => {
          console.log(foundServer);
          if (foundServer) {
            return next(new APIError('serverName must be unique in an application', httpStatus.CONFLICT));
          }
          return server.save();
        })
        .then(savedServer => {
          savedServer.application = application;
          return res.json(savedServer)
        })
        .catch(e => next(new APIError(e.message, httpStatus.CONFLICT)));
    })
    .catch(e => next(e));
}

/**
 * Update existing server
 * @property {string} req.body.applicationId - The application id of server that it belongs to.
 * @property {string} req.body.serverName - The name of server.
 * @property {string} req.body.dbName - The database name of server.
 * @property {string} req.body.dc- The dc of server.
 * @property {string} req.body.cpu - The cpu details of server.
 * @property {string} req.body.memory - The memory of server.
 * @property {string} req.body.os - The operating system of server.
 * @property {string} req.body.mac - The mac address of server.
 * @property {string} req.body.ipv4 - The ipv4 info of server.
 * @property {string} req.body.ipv6 - The ipv6 info of server.
 * @property {string} req.body.secZone - The secZone of server.
 * @property {string} req.body.entityType - The entity type of server.
 * @property {string} req.body.vlan - The vlan of server.
 * @property {string} req.body.secVul - The sec vul of server.
 * @returns {Server}
 */
function update(req, res, next) {
  const server = req.server;
  server.application = req.body.applicationId;
  server.serverName = req.body.serverName;
  server.dbName = req.body.dbName;
  server.dc = req.body.dc;
  server.cpu = req.body.cpu;
  server.memory = req.body.memory;
  server.os = req.body.os;
  server.mac = req.body.mac;
  server.ipv4 = req.body.ipv4;
  server.ipv6 = req.body.ipv6;
  server.secZone = req.body.secZone;
  server.entityType = req.body.entityType;
  server.vlan = req.body.vlan;
  server.secVul = req.body.secVul;

  server.save()
    .then(savedServer => res.json(savedServer))
    .catch(e => next(new APIError(e.message, httpStatus.CONFLICT)));
}

/**
 * Get server list.
 * @returns {Server[]}
 */
function list(req, res, next) {
  Server.list()
    .then(servers => res.json(servers))
    .catch(e => next(e));
}

/**
 * Delete server.
 * @returns {Server}
 */
function remove(req, res, next) {
  const server = req.server;
  server.remove()
    .then(deletedServer => res.json(deletedServer))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
