
const userRepository = require('../../repositories/user.repository');
const asyncHandler = require('../../utils/async-handler');
const bcrypt = require('bcrypt');
const behavioralAnalysisService = require('../../services/behavioral-analysis.service');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.findAll();
  res.status(200).json(users);
});

exports.getUserBehavior = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const behavior = await behavioralAnalysisService.analyzeUserBehavior(id);
  res.json(behavior);
});

exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, role, password } = req.body;
  
  // Hash password if provided, else use default
  const passwordHash = await bcrypt.hash(password || 'password123', 10);
  
  const user = await userRepository.create({
    username,
    email,
    role: role || 'employee',
    password_hash: passwordHash,
    created_at: new Date(),
    updated_at: new Date()
  });

  res.status(201).json(user);
});
