'use strict';

/**
 * Module dependencies
 */
var Sequelize = require('sequelize');
  
const db = new Sequelize('Seq', 'klantadmin', 'klantmodel.123', {
  host: 'klantmodelserver.database.windows.net',
  //host: '<mydb>.database.windows.net',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    }
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


/**
 * User Schema
 */
var User = db.define('User', {

  audits: {
    type: Sequelize.TEXT,
    get() {
      return this.getDataValue('audits')

    },
    set(val) {
      this.setDataValue('audits', Array.isArray(val) ? val.join(',') : val);

    }
  },
  firstName: {
    type: Sequelize.STRING,
    trim: true,
    defaultValue: ''
  },
  lastName: {
    type: Sequelize.STRING,
    trim: true,
    defaultValue: ''
  },
  displayName: {
    type: Sequelize.STRING,
    trim: true
  },
  email: {
    type: Sequelize.STRING,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    defaultValue: '',
    //validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  username: {
    type: Sequelize.STRING,
    unique: 'Username already exists',
    lowercase: true,
    trim: true
  },
  password: {
    type: Sequelize.STRING,
    default: ''
  },
  salt: {
    type: Sequelize.STRING
  },
  profileImageURL: {
    type: Sequelize.STRING,
    default: 'modules/users/client/img/profile/default.png'
  },
  provider: {
    type: Sequelize.STRING,
    required: 'Provider is required'
  },
  providerData: {
    type: Sequelize.STRING,
    get: function () {
      if (this.getDataValue('providerData') != null)
        return JSON.parse(this.getDataValue("providerData"));
    },
    set: function (value) {
      return this.setDataValue("providerData", JSON.stringify(value));
    }
  },
  additionalProvidersData: {
    type: Sequelize.STRING,
    get: function () {
      if (this.getDataValue('additionalProvidersData') != null)
        return JSON.parse(this.getDataValue("additionalProvidersData"));
    },
    set: function (value) {
      return this.setDataValue("additionalProvidersData", JSON.stringify(value));
    }
  },
  roles: {
    type: Sequelize.STRING,
    get() {
      if (this.getDataValue('roles') != null)
        return this.getDataValue('roles').split(';')
    },
    set(val) {
      this.setDataValue('roles', Array.isArray(val) ? val.join(',') : val);

    },
    // type: [{
    //   //type: Sequelize.STRING,
    //   enum: Sequelize.ENUM('user', 'prospect', 'admin')
    // }],
    default: Sequelize.ENUM('user'),
    required: 'Please provide at least one role'
  },
  vipLevel: {
    type: Sequelize.STRING,
    get() {
      if (this.getDataValue('vipLevel') != null)
        return this.getDataValue('vipLevel').split(';')
    },
    set(val) {
      this.setDataValue('vipLevel', Array.isArray(val) ? val.join(',') : val);

    },
    // [{
    //   type: Sequelize.ENUM,
    //   values: ['bronze', 'silver', 'gold', 'platinum', 'diamond']
    // }],
    default: Sequelize.ENUM('bronze')
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  updated: {
    type: Sequelize.DATE
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Date.now
  },
  forcePassword: {
    type: Sequelize.BOOLEAN
  },
  /* For reset password */
  resetPasswordToken: {
    type: Sequelize.STRING
  },
  resetPasswordExpires: {
    type: Sequelize.DATE
  },
  isFull: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false,
 
}

);


module.exports = User;

