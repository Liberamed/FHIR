import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
//import { Patient } from './src/patient/entities/patient.entity'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: true,
  migrationsTransactionMode: 'each'
})
