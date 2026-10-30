const store = require('../data/mockStore');

exports.getMyConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    const connections = store.getConnectionsForUser(userId);

    res.status(200).json({
      success: true,
      count: connections.length,
      connections
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve connections.' });
  }
};
