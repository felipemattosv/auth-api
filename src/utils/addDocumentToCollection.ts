import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";


export async function addDocumentToCollection(collectionName: string, docId: string, docInfo: {}): Promise<boolean> {
    
  const collectionRef = collection(db, collectionName);
  const docRef = doc(collectionRef, docId);

  try {
    
    await setDoc(docRef, docInfo);
    return true;
  } catch {
    return false;
  }
}
