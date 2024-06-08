const { PrismaClient } = require('@prisma/client')


const db = new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

module.exports = db