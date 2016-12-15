import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Application Schema
 */
const ApplicationSchema = new mongoose.Schema({
  applicationName: {
    type: String,
    required: true
  },
  applicationURL: {
    type: String,
    required: false
  },
  tierType: {
    type: String,
    required: false
  },
  serviceOwner: {
    type: String,
    required: false
  },
  onCallTeam: {
    type: String,
    required: false
  },
  database: {
    type: String,
    required: false
  },
  servers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Server'
  }],
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
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ApplicationSchema.method({});

/**
 * Statics
 */
ApplicationSchema.statics = {
  /**
   * Get application
   * @param {ObjectId} id - The objectId of application.
   * @returns {Promise<Application, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('servers')
      .exec()
      .then((application) => {
        if (application) {
          return application;
        }
        const err = new APIError('No such application exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * @returns {Promise<Application[]>}
   */
  list() {
    return this.find()
      .exec();
  },

  /**
   * List applications in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of applications to be skipped.
   * @param {number} limit - Limit number of applications to be returned.
   * @returns {Promise<Application[]>}
   */
  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Application
 */
export default mongoose.model('Application', ApplicationSchema);
