import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 3; i++) {
    const folder = await createFolder({
      name: faker.word.noun(),
    });

    await seedFiles(folder.id);
  }
}

async function seedFiles(folderId) {
  for (let i = 0; i < 5; i++) {
    const name = faker.system.fileName() + i;
    const size = faker.number.int({ min: 1, max: 100 });
    const folder_id = folderId;

    await createFile({ name, size, folder_id });
  }
}
