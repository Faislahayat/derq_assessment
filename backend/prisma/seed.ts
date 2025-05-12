import { PrismaClient, VehicleType } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

const countries = [
  { country: 'United States', cities: ['New York', 'Los Angeles', 'Chicago'] },
  { country: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham'] },
  { country: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg'] },
  { country: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto'] },
  { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane'] }
];

const vehicleTypes = Object.values(VehicleType);
const directions = ['north', 'south', 'east', 'west'];

function generateRandomTrafficData(
  country: string,
  city: string,
  timestamp: Date
) {
  const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  
  return {
    country,
    city,
    location: `${city} Main Street`,
    timestamp,
    vehicleType,
    count: Math.floor(Math.random() * 100) + 1, // 1-100 vehicles
    speed: Math.random() * (70 - 20) + 20, // 20-70 speed
    direction
  };
}

async function seed() {
  // Clear existing data
  await prisma.trafficData.deleteMany();

  // Generate data for the last 7 days, every 3 hours
  const trafficData: {
    country: string;
    city: string;
    location: string;
    timestamp: Date;
    vehicleType: VehicleType;
    count: number;
    speed: number;
    direction: string;
  }[] = [];
  const startDate = add(new Date(), { days: -7 });

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour += 3) {
      const timestamp = add(startDate, { days: day, hours: hour });
      
      // Generate data for each country and city
      for (const { country, cities } of countries) {
        for (const city of cities) {
          // Generate 1-3 entries per timeframe per city
          const entriesCount = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < entriesCount; i++) {
            trafficData.push(generateRandomTrafficData(country, city, timestamp));
          }
        }
      }
    }
  }

  // Insert all data
  await prisma.trafficData.createMany({
    data: trafficData
  });

  console.log(`Seeded ${trafficData.length} traffic records`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 