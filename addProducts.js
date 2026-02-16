// Скрипт для добавления товаров в MockAPI

// Вставь сюда массив товаров от ChatGPT

const products = [
  // Mountain Bikes (4 products)
  {
    titleEn: "Mountain Bike X100",
    titleRu: "Горный велосипед X100",
    titleKg: "Тоо велосипеди X100",
    price: 799.99,
    category: "mountain",
    material: "aluminum",
    color: "red",
    ratingAvg: 4.5,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Lightweight and durable mountain bike for extreme trail lovers.",
    descriptionRu: "Легкий и прочный горный велосипед для любителей экстремальных трасс.",
    descriptionKg: "Экстремалдык тректерди жактыргандар үчүн жеңил жана берик горный велосипед.",
  },
  {
    titleEn: "Trail Blazer 2000",
    titleRu: "Трековый велосипед 2000",
    titleKg: "Трек велосипеди 2000",
    price: 899.50,
    category: "mountain",
    material: "carbon",
    color: "black",
    ratingAvg: 4.7,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Professional mountain bike with carbon frame for maximum performance.",
    descriptionRu: "Профессиональный горный велосипед с карбоновой рамой для максимальной производительности.",
    descriptionKg: "Максималдуу өнүмдүүлүк үчүн карбон рамасы бар профессионалдык горный велосипед.",
  },
  {
    titleEn: "Peak Climber 500",
    titleRu: "Велосипед для покорения вершин 500",
    titleKg: "Чокуну жеңүүчү велосипед 500",
    price: 649.99,
    category: "mountain",
    material: "aluminum",
    color: "blue",
    ratingAvg: 4.3,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Affordable mountain bike perfect for beginners and casual riders.",
    descriptionRu: "Доступный горный велосипед, идеальный для новичков и любителей.",
    descriptionKg: "Жаңычылар жана жактыргандар үчүн идеалдуу арзан горный велосипед.",
  },
  {
    titleEn: "Summit Pro X",
    titleRu: "Профессиональный велосипед Summit X",
    titleKg: "Профессионалдык Summit X велосипеди",
    price: 1199.99,
    category: "mountain",
    material: "carbon",
    color: "green",
    ratingAvg: 4.9,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Top-tier mountain bike with full suspension for extreme downhill riding.",
    descriptionRu: "Элитный горный велосипед с полной подвеской для экстремального спуска.",
    descriptionKg: "Экстремалдык төмөн жүрүү үчүн толук подвескасы бар элит горный велосипеди.",
  },

  // Road Bikes (4 products)
  {
    titleEn: "Road Racer Pro",
    titleRu: "Шоссейный велосипед Pro",
    titleKg: "Шоссе велосипеди Pro",
    price: 1200.0,
    category: "road",
    material: "carbon",
    color: "black",
    ratingAvg: 4.8,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "High-performance road bike for professionals and speed lovers.",
    descriptionRu: "Высокопроизводительный шоссейный велосипед для профессионалов и любителей скорости.",
    descriptionKg: "Профессионалдар жана ылдамдык жактыргандар үчүн жогорку өнүмдүүлүктүү шоссе велосипеди.",
  },
  {
    titleEn: "Speed Demon 3000",
    titleRu: "Скоростной велосипед 3000",
    titleKg: "Ылдам велосипед 3000",
    price: 950.0,
    category: "road",
    material: "aluminum",
    color: "red",
    ratingAvg: 4.6,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Lightweight aluminum road bike for competitive racing.",
    descriptionRu: "Легкий алюминиевый шоссейный велосипед для соревновательных гонок.",
    descriptionKg: "Байкыш үчүн жеңил алюминий шоссе велосипеди.",
  },
  {
    titleEn: "Aero Speedster",
    titleRu: "Аэродинамический велосипед Speedster",
    titleKg: "Аэродинамикалык Speedster велосипеди",
    price: 1350.0,
    category: "road",
    material: "carbon",
    color: "white",
    ratingAvg: 4.9,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Aerodynamic carbon road bike designed for maximum speed.",
    descriptionRu: "Аэродинамический карбоновый шоссейный велосипед, созданный для максимальной скорости.",
    descriptionKg: "Максималдуу ылдамдык үчүн иштелип чыккан аэродинамикалык карбон шоссе велосипеди.",
  },
  {
    titleEn: "Endurance Plus",
    titleRu: "Выносливый велосипед Plus",
    titleKg: "Төзүмдүү Plus велосипеди",
    price: 750.0,
    category: "road",
    material: "aluminum",
    color: "blue",
    ratingAvg: 4.4,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Comfortable road bike designed for long-distance riding.",
    descriptionRu: "Удобный шоссейный велосипед, созданный для длительных поездок.",
    descriptionKg: "Узак саякаттар үчүн иштелип чыккан ыңгайлуу шоссе велосипеди.",
  },

  // City Bikes (4 products)
  {
    titleEn: "City Cruiser 3000",
    titleRu: "Городской круизер 3000",
    titleKg: "Шаар круизери 3000",
    price: 499.5,
    category: "city",
    material: "steel",
    color: "white",
    ratingAvg: 4.0,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Comfortable city bike for daily commuting and urban rides.",
    descriptionRu: "Удобный городской велосипед для ежедневных поездок и поездок по городу.",
    descriptionKg: "Күн сайын жүрүү жана шаардагы саякаттар үчүн ыңгайлуу шаар велосипеди.",
  },
  {
    titleEn: "Urban Explorer",
    titleRu: "Городской исследователь",
    titleKg: "Шаар изилдөөчүсү",
    price: 599.99,
    category: "city",
    material: "aluminum",
    color: "black",
    ratingAvg: 4.2,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Versatile city bike with multiple gears for various urban terrains.",
    descriptionRu: "Универсальный городской велосипед с несколькими передачами для различных городских рельефов.",
    descriptionKg: "Ар түрдүү шаар рельефтери үчүн бир нече ылдамдыктары бар көп маңызды шаар велосипеди.",
  },
  {
    titleEn: "Commuter Pro",
    titleRu: "Профессиональный велосипед для поездок на работу",
    titleKg: "Жумушка жүрүү үчүн профессионалдык велосипед",
    price: 450.0,
    category: "city",
    material: "steel",
    color: "blue",
    ratingAvg: 4.1,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Durable commuter bike with fenders and rack for work transportation.",
    descriptionRu: "Прочный велосипед для поездок на работу с крыльями и багажником.",
    descriptionKg: "Жумушка жүрүү үчүн камзолдору жана курчыгы бар берик велосипед.",
  },
  {
    titleEn: "City Lite",
    titleRu: "Легкий городской велосипед",
    titleKg: "Жеңил шаар велосипеди",
    price: 399.99,
    category: "city",
    material: "aluminum",
    color: "red",
    ratingAvg: 3.9,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Lightweight and affordable city bike for casual riders.",
    descriptionRu: "Легкий и доступный городской велосипед для любителей.",
    descriptionKg: "Жактыргандар үчүн арзан жана жеңил шаар велосипеди.",
  },

  // Electric Bikes (4 products)
  {
    titleEn: "Electric Thunder",
    titleRu: "Электрический гром",
    titleKg: "Электр гром",
    price: 1899.99,
    category: "electric",
    material: "aluminum",
    color: "black",
    ratingAvg: 4.7,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Powerful electric bike with 500W motor and long-range battery.",
    descriptionRu: "Мощный электрический велосипед с двигателем 500 Вт и дальним аккумулятором.",
    descriptionKg: "500 Вт мотору жана узак батареясы бар күчтүү электр велосипед.",
  },
  {
    titleEn: "Eco Rider Pro",
    titleRu: "Эко-велосипед Профессиональный",
    titleKg: "Эко велосипед Профессионалдык",
    price: 1650.0,
    category: "electric",
    material: "carbon",
    color: "white",
    ratingAvg: 4.8,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Eco-friendly electric bike with regenerative braking system.",
    descriptionRu: "Экологичный электрический велосипед с системой рекуперативного торможения.",
    descriptionKg: "Рекуперативдүү токтотуу системасы бар экологиялык таза электр велосипед.",
  },
  {
    titleEn: "City E-Bike",
    titleRu: "Городской электровелосипед",
    titleKg: "Шаар электр велосипеди",
    price: 1200.0,
    category: "electric",
    material: "aluminum",
    color: "blue",
    ratingAvg: 4.5,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Perfect electric city bike for commuting with pedal assist.",
    descriptionRu: "Идеальный электрический городской велосипед для поездок на работу с педальной помощью.",
    descriptionKg: "Педаль жардамы менен жумушка жүрүү үчүн идеалдуу электр шаар велосипеди.",
  },
  {
    titleEn: "Mountain E-Pro",
    titleRu: "Горный электровелосипед Профессиональный",
    titleKg: "Горный электр велосипед Профессионалдык",
    price: 2100.0,
    category: "electric",
    material: "aluminum",
    color: "green",
    ratingAvg: 4.6,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Electric mountain bike for challenging terrains and steep hills.",
    descriptionRu: "Электрический горный велосипед для сложных рельефов и крутых холмов.",
    descriptionKg: "Кыйын рельефтер жана тик төбөлөр үчүн электр горный велосипеди.",
  },

  // Kids Bikes (4 products)
  {
    titleEn: "Kids Explorer 16\"",
    titleRu: "Детский исследователь 16\"",
    titleKg: "Балдар изилдөөчүсү 16\"",
    price: 149.99,
    category: "kids",
    material: "steel",
    color: "red",
    ratingAvg: 4.3,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Perfect first bike for children 6-10 years old with training wheels.",
    descriptionRu: "Идеальный первый велосипед для детей 6-10 лет с обучающими колесами.",
    descriptionKg: "6-10 жаштагы балдар үчүн обучающий колесолору бар идеалдуу биринчи велосипед.",
  },
  {
    titleEn: "Junior Speedster",
    titleRu: "Юный гонщик",
    titleKg: "Жаш жарышкыч",
    price: 199.5,
    category: "kids",
    material: "aluminum",
    color: "blue",
    ratingAvg: 4.5,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Lightweight aluminum bike for confident young riders 8-12 years.",
    descriptionRu: "Легкий алюминиевый велосипед для уверенных молодых велосипедистов 8-12 лет.",
    descriptionKg: "Ишенимдүү жаш велосипедчилер үчүн жеңил алюминий велосипед.",
  },
  {
    titleEn: "Kids Mountain Bike",
    titleRu: "Детский горный велосипед",
    titleKg: "Балдар горный велосипеди",
    price: 229.99,
    category: "kids",
    material: "steel",
    color: "green",
    ratingAvg: 4.4,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Durable kids mountain bike with 20\" wheels for adventure rides.",
    descriptionRu: "Прочный детский горный велосипед с 20-дюймовыми колесами для приключенческих поездок.",
    descriptionKg: "Маңыздар үчүн 20\" чыңгырлары бар берик балдар горный велосипеди.",
  },
  {
    titleEn: "Balance Bike Pro",
    titleRu: "Профессиональный велобегун",
    titleKg: "Профессионалдык велобегун",
    price: 89.99,
    category: "kids",
    material: "wood",
    color: "yellow",
    ratingAvg: 4.2,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Wooden balance bike for toddlers 2-4 years to learn balance and coordination.",
    descriptionRu: "Деревянный велобегун для малышей 2-4 лет для изучения равновесия и координации.",
    descriptionKg: "2-4 жаштагы чакылар үчүн баланс жана координацияны үйрөнүү үчүн жыгач велобегуну.",
  },

  // Accessories (4 products)
  {
    titleEn: "Bike Helmet Pro",
    titleRu: "Профессиональный велосипедный шлем",
    titleKg: "Профессионалдык велосипед шлеми",
    price: 79.99,
    category: "accessories",
    material: "plastic",
    color: "black",
    ratingAvg: 4.6,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "High-quality cycling helmet with MIPS technology and adjustable fit.",
    descriptionRu: "Высококачественный велосипедный шлем с технологией MIPS и регулируемой посадкой.",
    descriptionKg: "MIPS технологиясы жана ылайыкталуучу жайгашуусу бар жогорку сапаттуу велосипед шлеми.",
  },
  {
    titleEn: "Cycling Lights Set",
    titleRu: "Комплект велосипедных фар",
    titleKg: "Велосипед чырачтары комплекти",
    price: 45.5,
    category: "accessories",
    material: "plastic",
    color: "white",
    ratingAvg: 4.3,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "Set of front and rear LED lights for safe night cycling.",
    descriptionRu: "Комплект передних и задних светодиодных фонарей для безопасной ночного катания.",
    descriptionKg: "Коопсуз түнкү жүгүрүү үчүн алдыңкы жана арткы LED чырачтар комплектиси.",
  },
  {
    titleEn: "Bike Lock Security",
    titleRu: "Велосипедный замок безопасности",
    titleKg: "Велосипед коопсуздук кулпусу",
    price: 35.0,
    category: "accessories",
    material: "metal",
    color: "black",
    ratingAvg: 4.1,
    cover: "https://www.velodrive.ru/upload/medialibrary/fce/khardteyl.jpg",
    descriptionEn: "Durable steel U-lock for maximum bike security.",
    descriptionRu: "Прочный стальной U-образный замок для максимальной безопасности велосипеда.",
    descriptionKg: "Велосипеддин максималдуу коопсуздугу үчүн берик болот U-формалы кулп.",
  },
  {
    titleEn: "Cycling Water Bottle",
    titleRu: "Велосипедная бутылка для воды",
    titleKg: "Велосипед суюктуу бутылкасы",
    price: 12.99,
    category: "accessories",
    material: "plastic",
    color: "blue",
    ratingAvg: 4.0,
    cover: "https://www.mag-russia.ru/f/product/big_synqup_840210_s_00_1920x1920.jpg",
    descriptionEn: "BPA-free water bottle with leak-proof cap for cycling adventures.",
    descriptionRu: "Бутылка для воды без БПА с герметичной крышкой для велосипедных приключений.",
    descriptionKg: "Велосипед маңызы үчүн БПА-сыз жана тыгыз капталуучу суу бутылкасы.",
  }
];

const API_URL = "https://6985988b6964f10bf253c4da.mockapi.io/users/1/product";

// Функция для добавления всех товаров
async function addAllProducts() {
  if (products.length === 0) {
    console.log(
      "❌ Массив товаров пуст! Вставь товары от ChatGPT в переменную products",
    );
    return;
  }

  console.log(`🚀 Начинаю добавление ${products.length} товаров...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        successCount++;
        console.log(
          `✅ [${i + 1}/${products.length}] Добавлен: ${data.titleRu || data.titleEn}`,
        );
      } else {
        errorCount++;
        const errorText = await response.text();
        console.error(
          `❌ [${i + 1}/${products.length}] Ошибка для "${product.titleRu || product.titleEn}": ${errorText}`,
        );
      }

      // Задержка между запросами (чтобы не перегрузить API)
      if (i < products.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ [${i + 1}/${products.length}] Ошибка: ${error.message}`,
      );
    }
  }

  console.log(`\n🎉 Готово!`);
  console.log(`✅ Успешно добавлено: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);
}

// Запусти функцию
addAllProducts();
