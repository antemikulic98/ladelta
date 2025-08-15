import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Import models
import User from '../models/User';
import Order from '../models/Order';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://info:<db_password>@ladelta.sb7z37g.mongodb.net/?retryWrites=true&w=majority&appName=LaDelta';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function seedUsers() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@ladelta.com' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('change-this-password', 12);

      const adminUser = new User({
        email: 'admin@ladelta.com',
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@ladelta.com');
      console.log('🔑 Password: change-this-password');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Check if Jakov user already exists
    const existingJakov = await User.findOne({ email: 'jakov@ladelta.hr' });

    if (!existingJakov) {
      const hashedJakovPassword = await bcrypt.hash('123Jakov!', 12);

      const jakovUser = new User({
        email: 'jakov@ladelta.hr',
        password: hashedJakovPassword,
        role: 'admin',
      });

      await jakovUser.save();
      console.log('✅ Jakov user created successfully');
      console.log('📧 Email: jakov@ladelta.hr');
      console.log('🔑 Password: 123Jakov!');
    } else {
      console.log('ℹ️  Jakov user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating users:', error);
  }
}

async function seedOrders() {
  try {
    // Check if orders already exist
    const existingOrders = await Order.countDocuments();

    if (existingOrders === 0) {
      const sampleOrders = [
        {
          customerName: 'Ana Marić',
          customerEmail: 'ana.maric@email.com',
          customerPhone: '+385 91 123 4567',
          deliveryDate: new Date('2024-01-15'),
          deliveryTime: '14:00',
          deliveryAddress: 'Ilica 15, Zagreb',
          items: [
            {
              name: 'Čokoladna torta',
              quantity: 1,
              price: 25.0,
              notes: 'Sa srećnim rođendanom',
            },
            {
              name: 'Mini kolačići',
              quantity: 12,
              price: 2.5,
              notes: 'Mješavina okusa',
            },
          ],
          totalAmount: 55.0,
          status: 'pending',
          notes: 'Molim pozovite dan prije dostave',
        },
        {
          customerName: 'Marko Petrović',
          customerEmail: 'marko.petrovic@email.com',
          customerPhone: '+385 92 987 6543',
          deliveryDate: new Date('2024-01-16'),
          deliveryTime: '16:30',
          items: [
            {
              name: 'Voćna torta',
              quantity: 1,
              price: 30.0,
              notes: 'Sa jagodama i kiwi',
            },
          ],
          totalAmount: 30.0,
          status: 'confirmed',
          notes: 'Preuzimanje u poslovnici',
        },
        {
          customerName: 'Petra Horvat',
          customerEmail: 'petra.horvat@email.com',
          customerPhone: '+385 95 555 1234',
          deliveryDate: new Date('2024-01-17'),
          deliveryTime: '10:00',
          deliveryAddress: 'Savska cesta 25, Zagreb',
          items: [
            {
              name: 'Svečana torta',
              quantity: 1,
              price: 45.0,
              notes: 'Za vjenčanje, 2 kata',
            },
            {
              name: 'Cupcakes',
              quantity: 24,
              price: 3.0,
              notes: 'Vanilija i čokolada',
            },
          ],
          totalAmount: 117.0,
          status: 'in-progress',
          notes: 'VIP narudžba - pozor na rok!',
        },
        {
          customerName: 'Ivan Kovač',
          customerEmail: 'ivan.kovac@email.com',
          customerPhone: '+385 98 777 8888',
          deliveryDate: new Date('2024-01-14'),
          deliveryTime: '12:00',
          items: [
            {
              name: 'Cheesecake',
              quantity: 1,
              price: 20.0,
              notes: 'New York style',
            },
          ],
          totalAmount: 20.0,
          status: 'delivered',
          notes: 'Uspješno dostavljeno',
        },
      ];

      await Order.insertMany(sampleOrders);
      console.log('✅ Sample orders created successfully');
    } else {
      console.log('ℹ️  Orders already exist in database');
    }
  } catch (error) {
    console.error('❌ Error creating sample orders:', error);
  }
}

async function seed() {
  console.log('🌱 Starting database seeding...');

  await connectDB();
  await seedUsers();
  await seedOrders();

  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('🔗 You can now:');
  console.log('1. Visit http://localhost:3000/login to access the admin panel');
  console.log('2. Use either of these credentials:');
  console.log('   👤 Admin: admin@ladelta.com / change-this-password');
  console.log('   👤 Jakov: jakov@ladelta.hr / 123Jakov!');
  console.log('3. View the dashboard at http://localhost:3000/dashboard');

  await mongoose.disconnect();
  console.log('📡 Disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
