import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Application from './application.model';

/**
 * Server Schema
 */
const ServerSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  serverName: {
    type: String,
    required: true
  },
  dbName: {
    type: String,
    required: true
  },
  dc: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: false
  },
  memory: {
    type: String,
    required: false
  },
  os: {
    type: String,
    required: false
  },
  mac: {
    type: String,
    required: false
  },
  ipv4: {
    type: String,
    required: false
  },
  ipv6: {
    type: String,
    required: false
  },
  secZone: {
    type: String,
    required: false
  },
  entityType: {
    type: String,
    required: false
  },
  vlan: {
    type: String,
    required: false
  },
  secVul: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * - pre-post-save hooks
 * - validations
 * - virtuals
 */
ServerSchema.post('save', (server) => {
  console.log(`ServerObject: ${server}`);
  Application.findOneAndUpdate(
    server.application,
    { $push: { servers: server._id } },
    { upsert: true })
    .exec()
    .then((err, data) => {
      if (err) {
        return console.log(`There was error saving ${server._id} server to ${server.application} application`);
      }

      return console.log(`${server._id} server was added to ${data._id} application`);
    });
});

/**
 * Methods
 */
ServerSchema.method({});

/**
 * Statics
 */
ServerSchema.statics = {
  /**
   * Get server
   * @param {ObjectId} id - The objectId of server.
   * @returns {Promise<Server, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('application')
      .exec()
      .then((server) => {
        if (server) {
          return server;
        }
        const err = new APIError('No such server exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List servers and populate application details to wich the server belongs to.
   * @returns {Promise<Server[]>}
   */
  list() {
    return this.find()
      .populate('application')
      .exec();
  },

  /**
   * List servers in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of servers to be skipped.
   * @param {number} limit - Limit number of servers to be returned.
   * @returns {Promise<Server[]>}
   */
  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('application')
      .exec();
  }
};

/**
 * @typedef Server
 */
export default mongoose.model('Server', ServerSchema);
