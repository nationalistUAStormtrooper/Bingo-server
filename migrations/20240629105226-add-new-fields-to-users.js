const mongoose = require('mongoose');
const User = require('D:/Artem/Bingo-back-end/server.js'); // Обновите путь к модели пользователя

async function migrate() {
  try {
    // Подключение к базе данных
    await mongoose.connect('mongodb+srv://djenkinsbo6:PXgw5CJ4Rn4zZiUq@bingo-cluster.z0hzwwa.mongodb.net/bingo_db?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Starting migration...'); // Лог перед началом миграции

    // Обновление всех существующих документов пользователей
    await User.updateMany(
        {}, // Условие для обновления всех документов
        {
          $set: {
            lastLogin: null,
            isOnline: false
          }
        }
    );

    console.log('Migration completed.');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Закрытие соединения с базой данных
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

migrate();
