import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";


export async function removeDocumentFromCollection(collectionName: string, docId: string): Promise<boolean> {
    
  const collectionRef = collection(db, collectionName);
  const docRef = doc(collectionRef, docId);

  try {
    
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
}
