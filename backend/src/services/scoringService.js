/**
 * IJF Scoring Service
 * Implements all IJF 2024-2025 scoring rules and calculations
 */

import { SCORING, WIN_CONDITIONS, SHIDO_RULES } from '../constants/IJF_DATA.js';

/**
 * Calculate match winner based on current scores
 * @param {Object} scores - { ippon, wazaAri, yuko, shido } for both athletes
 * @returns {Object} - { winner: 'athlete1'|'athlete2'|null, condition: string, message: string }
 */
export const determineWinner = (athlete1Scores, athlete2Scores) => {
  // Check Ippon (immediate victory)
  if (athlete1Scores.ippon > 0) {
    return {
      winner: 'athlete1',
      condition: WIN_CONDITIONS.IPPON,
      message: 'Athlete 1 wins by IPPON'
    };
  }
  if (athlete2Scores.ippon > 0) {
    return {
      winner: 'athlete2',
      condition: WIN_CONDITIONS.IPPON,
      message: 'Athlete 2 wins by IPPON'
    };
  }

  // Check Shido disqualification (3 shido = loss)
  if (athlete1Scores.shido >= SHIDO_RULES.DISQUALIFICATION_AT) {
    return {
      winner: 'athlete2',
      condition: WIN_CONDITIONS.SHIDO_DISQUALIFICATION,
      message: `Athlete 2 wins - Athlete 1 disqualified (${athlete1Scores.shido} shido)`
    };
  }
  if (athlete2Scores.shido >= SHIDO_RULES.DISQUALIFICATION_AT) {
    return {
      winner: 'athlete1',
      condition: WIN_CONDITIONS.SHIDO_DISQUALIFICATION,
      message: `Athlete 1 wins - Athlete 2 disqualified (${athlete2Scores.shido} shido)`
    };
  }

  // No winner yet
  return {
    winner: null,
    condition: null,
    message: 'Match ongoing'
  };
};

/**
 * Check if two waza-ari equal one ippon
 * @param {number} wazaAriCount
 * @returns {boolean}
 */
export const wazaAriEqualsIppon = (wazaAriCount) => {
  return wazaAriCount >= 2;
};

/**
 * Calculate match score with IJF rules
 * Ippon = 10, Waza-ari = 5, Yuko = 2, Shido = penalty
 * @param {Object} athlete1, athlete2 - { ippon, wazaAri, yuko, shido }
 * @returns {Object} - comparison and winner
 */
export const calculateMatchScore = (athlete1Scores, athlete2Scores) => {
  // Calculate total points
  const score1 = (athlete1Scores.ippon * 10) + (athlete1Scores.wazaAri * 5) + (athlete1Scores.yuko * 2);
  const score2 = (athlete2Scores.ippon * 10) + (athlete2Scores.wazaAri * 5) + (athlete2Scores.yuko * 2);

  return {
    athlete1: {
      ...athlete1Scores,
      totalPoints: score1
    },
    athlete2: {
      ...athlete2Scores,
      totalPoints: score2
    },
    leader: score1 > score2 ? 'athlete1' : score2 > score1 ? 'athlete2' : 'tied',
    pointsDifference: Math.abs(score1 - score2)
  };
};

/**
 * Determine if athlete qualifies for weight category
 * @param {number} weight - Weight in kg
 * @param {Object} category - { minWeight, maxWeight }
 * @returns {boolean}
 */
export const isWeightValid = (weight, category) => {
  return weight >= category.minWeight && weight <= category.maxWeight;
};

/**
 * Apply penalty (Shido)
 * @param {number} currentShido
 * @returns {Object} - { newShido, isDisqualified }
 */
export const applyShido = (currentShido) => {
  const newShido = Math.min(currentShido + 1, SHIDO_RULES.DISQUALIFICATION_AT);
  return {
    newShido,
    isDisqualified: newShido >= SHIDO_RULES.DISQUALIFICATION_AT
  };
};

/**
 * Validate match score consistency
 * @param {Object} scores
 * @returns {Object} - { isValid, errors }
 */
export const validateScores = (scores) => {
  const errors = [];

  if (!scores.athlete1 || !scores.athlete2) {
    errors.push('Both athletes scores required');
  }

  // Check negative values
  if (scores.athlete1.ippon < 0) errors.push('Athlete 1 Ippon cannot be negative');
  if (scores.athlete1.wazaAri < 0) errors.push('Athlete 1 Waza-ari cannot be negative');
  if (scores.athlete1.shido < 0) errors.push('Athlete 1 Shido cannot be negative');
  if (scores.athlete1.shido > SHIDO_RULES.DISQUALIFICATION_AT) {
    errors.push(`Athlete 1 Shido cannot exceed ${SHIDO_RULES.DISQUALIFICATION_AT}`);
  }

  if (scores.athlete2.ippon < 0) errors.push('Athlete 2 Ippon cannot be negative');
  if (scores.athlete2.wazaAri < 0) errors.push('Athlete 2 Waza-ari cannot be negative');
  if (scores.athlete2.shido < 0) errors.push('Athlete 2 Shido cannot be negative');
  if (scores.athlete2.shido > SHIDO_RULES.DISQUALIFICATION_AT) {
    errors.push(`Athlete 2 Shido cannot exceed ${SHIDO_RULES.DISQUALIFICATION_AT}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  determineWinner,
  wazaAriEqualsIppon,
  calculateMatchScore,
  isWeightValid,
  applyShido,
  validateScores
};