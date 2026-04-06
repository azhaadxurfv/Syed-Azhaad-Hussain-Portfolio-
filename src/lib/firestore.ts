// src/lib/firestore.ts
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Types for data
export interface UserData {
  id?: string;
  name: string;
  email: string;
  message?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Collection name
const COLLECTION_NAME = 'userData';

// Add data
export const addData = async (data: Omit<UserData, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// Get all data
export const getData = async (constraints: QueryConstraint[] = []): Promise<UserData[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt;
      const updatedAt = data.updatedAt;

      return {
        id: doc.id,
        ...data,
        createdAt: createdAt && typeof (createdAt as any).toDate === 'function' ? (createdAt as any).toDate() : createdAt,
        updatedAt: updatedAt && typeof (updatedAt as any).toDate === 'function' ? (updatedAt as any).toDate() : updatedAt,
      } as UserData;
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Update data
export const updateData = async (id: string, updates: Partial<UserData>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// Delete data
export const deleteData = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

// Real-time listener
export const subscribeToData = (
  callback: (data: UserData[]) => void,
  constraints: QueryConstraint[] = []
): (() => void) => {
  const q = query(collection(db, COLLECTION_NAME), ...constraints);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map(doc => {
      const docData = doc.data();
      const createdAt = docData.createdAt;
      const updatedAt = docData.updatedAt;

      return {
        id: doc.id,
        ...docData,
        createdAt: createdAt && typeof (createdAt as any).toDate === 'function' ? (createdAt as any).toDate() : createdAt,
        updatedAt: updatedAt && typeof (updatedAt as any).toDate === 'function' ? (updatedAt as any).toDate() : updatedAt,
      } as UserData;
    });
    callback(data);
  }, (error) => {
    console.error('Error in real-time listener: ', error);
  });

  return unsubscribe;
};

// Example usage functions
export const getAllData = () => getData([orderBy('createdAt', 'desc')]);

export const getDataByEmail = (email: string) => getData([where('email', '==', email)]);