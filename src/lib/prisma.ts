import {
  PrismaVectorStore,
  PrismaSqlFilter,
  ModelColumns,
} from '@langchain/community/vectorstores/prisma';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Embedding, Prisma, PrismaClient } from '@prisma/client';

declare const globalThis: {
  prismaGlobal: PrismaClient;
  vectorStoreGlobal: PrismaVectorStore<
    Embedding,
    'Embedding',
    ModelColumns<Embedding>,
    PrismaSqlFilter<Embedding>
  >;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? new PrismaClient();
export const vectorStore =
  globalThis.vectorStoreGlobal ??
  PrismaVectorStore.withModel(prisma).create(new OpenAIEmbeddings(), {
    prisma: Prisma,
    tableName: 'Embedding',
    vectorColumnName: 'embedding',
    columns: {
      id: true,
      type: true,
      name: true,
      description: true,
      serialized: true,
    },
  });

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
if (process.env.NODE_ENV !== 'production') globalThis.vectorStoreGlobal = vectorStore;
