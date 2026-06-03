import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Athlete Model
 * Represents judo athletes with IJF weight category validation
 */
const Athlete = sequelize.define('Athlete', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE'),
    allowNull: false
  },
  // IJF Weight Categories
  registeredCategory: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'IJF weight category (e.g., M_73, F_57)'
  },
  // Weigh-in Data
  weightAtWeighIn: {
    type: DataTypes.DECIMAL(5, 2),
    comment: 'Weight in kg at official weigh-in'
  },
  finalCategory: {
    type: DataTypes.STRING,
    comment: 'Final category after weigh-in validation'
  },
  weighInStatus: {
    type: DataTypes.ENUM('PENDING', 'PASSED', 'FAILED', 'ABSENT'),
    defaultValue: 'PENDING'
  },
  // Athlete Details
  grade: {
    type: DataTypes.STRING,
    defaultValue: 'White Belt',
    comment: 'Judo belt level'
  },
  licenseNumber: DataTypes.STRING,
  imageUrl: DataTypes.TEXT,
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
  tableName: 'athletes',
  indexes: [
    { fields: ['clubId'] },
    { fields: ['registeredCategory'] },
    { fields: ['gender'] },
    { fields: ['weighInStatus'] }
  ]
});

export default Athlete;