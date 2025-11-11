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
    request.onerror = () => {
      const err = request.error;
      reject(
        new Error(
          `IndexedDB Error [${err?.name ?? "Unknown"}]: ${
            err?.message ?? "Unknown"
          }`
        )
      );
    };
  });
};

export const saveAudioToDB = async (blob: Blob) => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readwrite");
  const store = tx.objectStore("audios");
  const audioId = `recording-${new Date().toISOString()}`;
  store.put({ id: audioId, blob });

  return new Promise<string | null>((resolve, reject) => {
    tx.oncomplete = () => resolve(audioId);
    tx.onerror = () => {
      reject(
        new Error(`Transaction Error: ${tx.error?.message || "unknown error"}`)
      );
    };
  });
};

export const loadAllAudiosFormDB = async (): Promise<
  { id: string; blob: Blob }[]
> => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readonly");
  const store = tx.objectStore("audios");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => {
      const err = request.error;
      reject(
        new Error(
          `IndexedDB Error [${err?.name ?? "Unknown"}]: ${
            err?.message ?? "Unknown"
          }`
        )
      );
    };
  });
};

export const loadAudioFromDB = async (
  id: string
): Promise<{ id: string; blob: Blob } | null> => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readonly");
  const store = tx.objectStore("audios");
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      const err = request.error;
      reject(
        new Error(
          `IndexedDB Error [${err?.name ?? "Unknown"}]: ${
            err?.message ?? "Unknown"
          }`
        )
      );
    };
  });
};

export const deleteAudioFromDB = async (id: string) => {
  const db = await openVoiceDB();
  const tx = db.transaction("audios", "readwrite");
  const store = tx.objectStore("audios");

  store.delete(id);

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => {
      reject(
        new Error(`Transaction Error: ${tx.error?.message || "unknown error"}`)
      );
    };
  });
};
