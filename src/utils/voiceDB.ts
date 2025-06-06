export const openVoiceDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("VoiceRecorderDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("audios")) {
        db.createObjectStore("audios", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveAudioToDB = async (blob: Blob) => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readwrite");
  const store = tx.objectStore("audios");
  const audioId = `recording-${new Date().toISOString()}`;
  store.put({ id: audioId, blob });

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject();
  });
};

export const loadAllAudiosFormDB = async (): Promise<
  { id: string; blob: Blob }[]
> => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readonly");
  const store = tx.objectStore("audios");
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
};
