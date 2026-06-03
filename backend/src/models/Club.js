import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Club Model
 * Represents judo clubs participating in competitions
 */
const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  abbreviation: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 5]
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'Cameroon'
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: DataTypes.STRING,
  president: DataTypes.STRING,
  coach: DataTypes.STRING,
  logo: DataTypes.TEXT, // Base64 encoded logo
  registrationNumber: DataTypes.STRING,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'clubs',
  indexes: [
    { fields: ['abbreviation'] },
    { fields: ['city'] },
    { fields: ['isActive'] }
  ]
});

export default Club;