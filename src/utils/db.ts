import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PhotoDBSchema extends DBSchema {
  photos: {
    key: string;
    value: {
      id: string;
      data: string;
      timestamp: number;
    };
  };
}

class PhotoDatabase {
  private dbName = 'ShoePhotosDB';
  private version = 1;
  private db: Promise<IDBPDatabase<PhotoDBSchema>>;

  constructor() {
    this.db = this.initDB();
  }

  private async initDB() {
    return openDB<PhotoDBSchema>(this.dbName, this.version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
      },
    });
  }

  async savePhoto(photoData: string): Promise<string> {
    const db = await this.db;
    const id = crypto.randomUUID();
    const photo = {
      id,
      data: photoData,
      timestamp: Date.now(),
    };
    
    await db.add('photos', photo);
    return id;
  }

  async getPhoto(id: string) {
    const db = await this.db;
    return db.get('photos', id);
  }

  async getAllPhotos() {
    const db = await this.db;
    return db.getAll('photos');
  }

  async deletePhoto(id: string) {
    const db = await this.db;
    await db.delete('photos', id);
  }
}

export const photoDB = new PhotoDatabase();