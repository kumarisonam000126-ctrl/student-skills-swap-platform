const store = require('../data/mockStore');

exports.getSmartMatches = async (req, res) => {
  try {
    const userId = req.user.id;
    const matches = store.getMatchesForUser(userId);

    res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to compute skill matches.' });
  }
};
