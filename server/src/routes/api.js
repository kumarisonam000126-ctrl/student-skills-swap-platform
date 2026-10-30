const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const swapController = require('../controllers/swapController');
const connectionController = require('../controllers/connectionController');
const messageController = require('../controllers/messageController');
const matchController = require('../controllers/matchController');
const store = require('../data/mockStore');

// 1. Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.getMe);
router.post('/auth/forgot-password', authController.forgotPassword);

// 2. Profile & Exploration Routes
router.get('/profiles', profileController.getAllProfiles);
router.get('/profiles/colleges', profileController.getColleges);
router.get('/profiles/skills', profileController.getSkillsCatalog);
router.get('/profiles/:id', profileController.getProfileById);
router.put('/profiles/me', authMiddleware, profileController.updateProfile);

// 3. Swap Requests Routes
router.post('/swaps', authMiddleware, swapController.createRequest);
router.get('/swaps/my', authMiddleware, swapController.getMyRequests);
router.put('/swaps/:id/status', authMiddleware, swapController.respondToRequest);
router.delete('/swaps/:id', authMiddleware, swapController.cancelRequest);

// 4. Connection Routes
router.get('/connections', authMiddleware, connectionController.getMyConnections);

// 5. Messaging Routes
router.get('/messages/:connectionId', authMiddleware, messageController.getMessages);
router.post('/messages/:connectionId', authMiddleware, messageController.sendMessage);

// 6. Intelligent Skill Matching
router.get('/matches', authMiddleware, matchController.getSmartMatches);

// 7. Platform Global Stats (for Landing Page & Dashboard)
router.get('/stats', (req, res) => {
  const totalStudents = store.profiles.length;
  const totalSwaps = store.swapRequests.length;
  const completedSwaps = store.swapRequests.filter(r => r.status === 'accepted').length;
  const totalSkills = store.skills.length;
  const totalConnections = store.connections.length;

  res.status(200).json({
    success: true,
    stats: {
      totalStudents: totalStudents + 120, // display aggregate startup metrics
      activeExchanges: totalSwaps + 85,
      completedSwaps: completedSwaps + 64,
      totalSkills: totalSkills,
      totalConnections: totalConnections + 48,
      satisfactionRate: '98%'
    }
  });
});

module.exports = router;
