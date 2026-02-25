const asyncHandler = require('../../utils/async-handler');
const caseRepository = require('../../repositories/case.repository');

exports.getCases = asyncHandler(async (req, res) => {
  const filters = req.query;
  const result = await caseRepository.findAll(filters);
  res.json(result);
});

exports.createCase = asyncHandler(async (req, res) => {
  const caseData = {
    ...req.body,
    creator_id: req.user.id
  };
  const newCase = await caseRepository.create(caseData);
  res.status(201).json(newCase);
});

exports.getCaseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const caseItem = await caseRepository.findById(id);
  if (!caseItem) {
    return res.status(404).json({ message: 'Case not found' });
  }
  res.json(caseItem);
});

exports.updateCase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCase = await caseRepository.update(id, req.body);
  if (!updatedCase) {
    return res.status(404).json({ message: 'Case not found' });
  }
  res.json(updatedCase);
});
