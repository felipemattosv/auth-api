import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export async function listCollection(collectionName: string): Promise<DocumentData[]> {
  
  const collectionRef = collection(db, collectionName);

  try {
    
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    
    return null;
  }
}
