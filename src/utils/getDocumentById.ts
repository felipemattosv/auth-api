import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export async function getDocumentById(collectionName: string, documentId: string): Promise<DocumentData> {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}
