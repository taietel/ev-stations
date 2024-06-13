const DatabaseConfig = () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE || false,
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  retryAttempts: 2,
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default DatabaseConfig;
