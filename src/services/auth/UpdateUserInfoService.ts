import { doc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

class UpdateUserInfoService {
  async execute(email: string, field: string, value: string): Promise<boolean> {
    
    const updateTime: number = new Date().getTime();

    const docRef = doc(db, "users", email);

    try {
      await updateDoc(docRef, {
        [field]: value,
        updatedAt: updateTime
      });

      return true;
    } catch {
      return false;
    }
  }
}

export { UpdateUserInfoService };
