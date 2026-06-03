/**
 * Authentication Controller
 * Handles user registration, login, token refresh
 */

import { User } from '../models/index.js';
import { hashPassword, comparePassword, createLoginResponse, validatePasswordStrength } from '../services/authService.js';

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, role, phoneNumber } = req.validatedBody;

    // Check password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'Weak Password',
        message: 'Password does not meet requirements',
        details: passwordValidation.errors,
        statusCode: 400
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already registered',
        statusCode: 409
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: role || 'SPECTATOR',
      phoneNumber
    });

    // Generate tokens
    const response = createLoginResponse(user);

    res.status(201).json({
      message: 'User registered successfully',
      statusCode: 201,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password',
        statusCode: 401
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Account is deactivated',
        statusCode: 403
      });
    }

    // Verify password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password',
        statusCode: 401
      });
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate tokens
    const response = createLoginResponse(user);

    res.status(200).json({
      message: 'Login successful',
      statusCode: 200,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
        statusCode: 404
      });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      statusCode: 200,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/auth/me
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.validatedBody;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
        statusCode: 404
      });
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,\n      phoneNumber: phoneNumber || user.phoneNumber\n    });\n\n    res.status(200).json({\n      message: 'Profile updated successfully',\n      statusCode: 200,\n      data: user\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexport default {\n  register,\n  login,\n  getProfile,\n  updateProfile\n};
