import Joi from 'joi';

const bodies = {
  userBody: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string()
  },
  applicationBody: {
    applicationName: Joi.string().required(),
    applicationURL: Joi.string().required(),
    tierType: Joi.string().required(),
    serviceOwner: Joi.string().required(),
    onCallTeam: Joi.string().required(),
    database: Joi.string().required()
  },
  serverBody: {
    applicationId: Joi.string().hex().required(),
    serverName: Joi.string().required(),
    dbName: Joi.string().required(),
    dc: Joi.string().required(),
    cpu: Joi.string().required(),
    memory: Joi.string().required(),
    os: Joi.string().required(),
    mac: Joi.string().required(),
    ipv4: Joi.string().required(),
    ipv6: Joi.string().required(),
    secZone: Joi.string().required(),
    entityType: Joi.string().required(),
    vlan: Joi.string().required(),
    secVul: Joi.string().required(),
  }
};

export default {
  // POST /api/users
  createUser: {
    body: bodies.userBody
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/servers
  createServer: {
    body: bodies.serverBody
  },

  // UPDATE /api/servers/:serverId
  updateServer: {
    body: bodies.serverBody,
    params: {
      serverId: Joi.string().hex().required()
    }
  },

  // POST /api/applications
  createApplication: {
    body: bodies.applicationBody
  },

  // UPDATE /api/applications/:applicationId
  updateApplication: {
    body: bodies.applicationBody,
    params: {
      applicationId: Joi.string().hex().required()
    }
  },
};
