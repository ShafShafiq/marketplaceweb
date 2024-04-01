const express= require('express');
const router = express.Router();
const {addItem,getAllItems,getUserItems,deleteItem,updateItem , searchItems} = require('../controllers/itemcontroller');
const auth = require('../middleware/authmiddleware');
const sellerauth = require('../middleware/sellerAuth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dr6pm7eyl', 
    api_key: '752458116893527', 
    api_secret: 'eXCzO7AAFTw-XjOscdWX6Fgxff0' 
  });

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'testfolder',
        format: async (req, file) => 'png', // or 'jpeg', 'jpg' etc.
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

// Configure multer
const upload = multer({ storage: storage });

// Use multer middleware in your route
router.post('/addItem',auth, upload.single('itemImage'), addItem);
// router.post('/addItem',addItem);
router.get('/items', getAllItems);
router.get('/userItems',auth,getUserItems);
router.delete('/deleteItem/:id',auth,deleteItem);
router.put('/updateItem/:id',auth,updateItem);
router.get('/searchItems',searchItems);
module.exports = router; 