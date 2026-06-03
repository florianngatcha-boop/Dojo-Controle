/**
 * Category Service
 * Handles IJF weight category management and validation
 */

import { WEIGHT_CATEGORIES, AGE_DIVISIONS, TIME_REGULATIONS } from '../constants/IJF_DATA.js';

/**
 * Get all categories for a specific age group and gender
 * @param {string} ageGroup - 'SENIOR', 'JUNIOR', 'CADET'
 * @param {string} gender - 'MEN', 'WOMEN'
 * @returns {Array} - Array of categories
 */
export const getCategoriesByAgeAndGender = (ageGroup, gender) => {
  const ageGroupUpper = ageGroup.toUpperCase();
  const genderUpper = gender.toUpperCase();

  if (!WEIGHT_CATEGORIES[ageGroupUpper]?.[genderUpper]) {
    return [];
  }

  return WEIGHT_CATEGORIES[ageGroupUpper][genderUpper];
};

/**
 * Find appropriate weight category for an athlete
 * @param {number} weight - Weight in kg
 * @param {string} ageGroup - 'SENIOR', 'JUNIOR', 'CADET'
 * @param {string} gender - 'MEN', 'WOMEN'
 * @returns {Object} - Category object or null
 */
export const findCategoryByWeight = (weight, ageGroup, gender) => {
  const categories = getCategoriesByAgeAndGender(ageGroup, gender);
  return categories.find(cat => weight <= cat.max) || null;
};

/**
 * Calculate age division from birth date
 * @param {Date} dateOfBirth
 * @returns {string} - Age group name
 */
export const calculateAgeDivision = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Map age to IJF division
  if (age >= 4 && age <= 5) return 'BABY_JUDO';
  if (age >= 6 && age <= 7) return 'EVEIL_JUDO';
  if (age >= 8 && age <= 9) return 'POUSSINS';
  if (age >= 10 && age <= 11) return 'BENJAMINS';
  if (age >= 12 && age <= 13) return 'MINIMES';
  if (age >= 15 && age <= 17) return 'CADETS';
  if (age >= 18 && age <= 20) return 'JUNIORS';
  if (age >= 21 && age <= 29) return 'SENIORS';
  if (age >= 30 && age <= 34) return 'VETERANS_M1';
  if (age >= 35 && age <= 39) return 'VETERANS_M2';
  if (age >= 40 && age <= 44) return 'VETERANS_M3';
  if (age >= 45 && age <= 49) return 'VETERANS_M4';
  if (age >= 50) return 'VETERANS_M5';

  return null;
};

/**
 * Get regulation time for a category
 * @param {string} ageGroup - Age group name
 * @returns {number} - Time in seconds
 */
export const getRegulationTime = (ageGroup) => {
  const ageGroupUpper = ageGroup.toUpperCase();

  if (ageGroupUpper.includes('MINIMES')) return TIME_REGULATIONS.MINIMES.regulationTime;
  if (ageGroupUpper.includes('CADET')) return TIME_REGULATIONS.CADETS.regulationTime;
  if (ageGroupUpper.includes('JUNIOR')) return TIME_REGULATIONS.JUNIORS.regulationTime;
  if (ageGroupUpper.includes('VETERAN')) return TIME_REGULATIONS.VETERANS.regulationTime;

  return TIME_REGULATIONS.SENIORS.regulationTime;
};

/**
 * Validate if athlete can compete in a category
 * @param {Object} athlete - { dateOfBirth, weight, gender }
 * @param {Object} category - { minWeight, maxWeight, ageGroup }
 * @returns {Object} - { isValid, errors }
 */
export const validateAthleteForCategory = (athlete, category) => {
  const errors = [];
  const ageGroup = calculateAgeDivision(athlete.dateOfBirth);

  // Check weight
  if (athlete.weight < category.minWeight || athlete.weight > category.maxWeight) {
    errors.push(`Weight ${athlete.weight}kg not in ${category.minWeight}-${category.maxWeight}kg range`);
  }

  // Check age group (if specified)
  if (category.ageGroup && ageGroup !== category.ageGroup) {
    errors.push(`Athlete age group ${ageGroup} does not match category ${category.ageGroup}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    ageGroup
  };
};

/**
 * Get all available categories (flattened list)
 * @returns {Array} - All IJF categories
 */
export const getAllCategories = () => {
  const allCategories = [];

  Object.entries(WEIGHT_CATEGORIES).forEach(([ageGroup, genders]) => {
    Object.entries(genders).forEach(([gender, categories]) => {
      categories.forEach(cat => {
        allCategories.push({
          ...cat,
          ageGroup: ageGroup.toLowerCase(),
          gender: gender.toLowerCase()
        });
      });
    });
  });

  return allCategories;
};

export default {
  getCategoriesByAgeAndGender,
  findCategoryByWeight,
  calculateAgeDivision,
  getRegulationTime,
  validateAthleteForCategory,
  getAllCategories
};