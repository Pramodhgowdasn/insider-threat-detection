exports.getEvents = (req, res) => {
  res.status(200).json({
    message: 'Events endpoint working',
    data: [],
  });
};
