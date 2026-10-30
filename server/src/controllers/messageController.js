const store = require('../data/mockStore');

exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { connectionId } = req.params;

    const messages = store.getMessagesForConnection(connectionId, userId);

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to retrieve messages.' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { connectionId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty.' });
    }

    const message = store.sendMessage({
      connectionId,
      sender_id,
      content: content.trim()
    });

    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to send message.' });
  }
};
