// @ts-ignore
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "mongodb://127.0.0.1:27017/mi_app",
  },
});