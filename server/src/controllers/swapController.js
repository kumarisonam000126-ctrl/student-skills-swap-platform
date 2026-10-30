const store = require('../data/mockStore');

exports.createRequest = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id, offered_skill, wanted_skill, message } = req.body;

    if (!receiver_id || !offered_skill || !wanted_skill) {
      return res.status(400).json({
        success: false,
        message: 'Please provide receiver ID, offered skill, and wanted skill.'
      });
    }

    const swapRequest = store.createSwapRequest({
      sender_id,
      receiver_id,
      offered_skill,
      wanted_skill,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Skill swap request sent successfully!',
      request: swapRequest
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Error creating swap request.' });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { incoming, outgoing } = store.getSwapRequestsForUser(userId);

    res.status(200).json({
      success: true,
      incoming,
      outgoing,
      stats: {
        pendingIncoming: incoming.filter(r => r.status === 'pending').length,
        pendingOutgoing: outgoing.filter(r => r.status === 'pending').length,
        totalAccepted: incoming.filter(r => r.status === 'accepted').length + outgoing.filter(r => r.status === 'accepted').length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve swap requests.' });
  }
};

exports.respondToRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: "Status must be 'accepted' or 'rejected'." });
    }

    const updated = store.updateSwapRequestStatus(id, status, userId);

    res.status(200).json({
      success: true,
      message: status === 'accepted' ? 'Skill swap request accepted! You are now connected.' : 'Skill swap request declined.',
      request: updated
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Error updating swap request.' });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updated = store.updateSwapRequestStatus(id, 'cancelled', userId);

    res.status(200).json({
      success: true,
      message: 'Swap request cancelled.',
      request: updated
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Error cancelling swap request.' });
  }
};
