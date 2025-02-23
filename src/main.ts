import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import pgSession = require('connect-pg-simple');
import pg = require('pg');
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const pgPool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  });

  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: process.env.ALLOWED_URL,
  //   credentials: true,
  // });

  app.enableCors({
    origin: process.env.ALLOWED_URL, // Assurez-vous de spécifier l'URL d'origine correcte
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    exposedHeaders: 'Content-Disposition',
  });

  app.set('trust proxy', 1);

  app.use(
    session({
      store: new (pgSession(session))({
        pool: pgPool,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // domain: '.lesjardinsdelalandette.fr',
        domain: null,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Jardins De Lalandette API')
    .setDescription("API pour l'eshop des Jardins de Lalandette")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
