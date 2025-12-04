import dotenv from 'dotenv';
import connectDB from '../../config/db.js';
import User from '../../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not set in environment. Set it in .env and retry.');
      process.exit(1);
    }

    await connectDB();

    const adminData = {
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'password123',
      role: 'admin',
    };

    const existing = await User.findOne({ email: adminData.email });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const user = new User(adminData);
    await user.save();

    console.log('Admin user created:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
