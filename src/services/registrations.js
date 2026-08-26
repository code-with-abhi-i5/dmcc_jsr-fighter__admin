import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const REGISTRATIONS_COLLECTION = "registrations";
const PAGE_SIZE = 20;

/**
 * Fetches registrations with pagination support.
 * Returns { registrations, lastDoc, hasMore }
 */
export async function fetchRegistrations(lastDocument = null) {
  let q;

  if (lastDocument) {
    q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      orderBy("createdAt", "desc"),
      startAfter(lastDocument),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );
  }

  const snapshot = await getDocs(q);
  const registrations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
  }));

  const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
  const hasMore = snapshot.docs.length === PAGE_SIZE;

  return { registrations, lastDoc, hasMore };
}

/**
 * Fetches ALL registrations (for dashboard counts and client-side filtering).
 */
export async function fetchAllRegistrations() {
  const q = query(
    collection(db, REGISTRATIONS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
  }));
}

/**
 * Updates registration status.
 */
export async function updateRegistrationStatus(docId, status) {
  const docRef = doc(db, REGISTRATIONS_COLLECTION, docId);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Updates admin mark for a registration.
 */
export async function updateAdminMark(docId, adminMark) {
  const docRef = doc(db, REGISTRATIONS_COLLECTION, docId);
  await updateDoc(docRef, {
    adminMark,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Soft deletes a registration document by setting isDeleted to true.
 */
export async function deleteRegistration(docId) {
  const docRef = doc(db, REGISTRATIONS_COLLECTION, docId);
  await updateDoc(docRef, {
    isDeleted: true,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Updates team for a registration.
 */
export async function updatePlayerTeam(docId, team) {
  const docRef = doc(db, REGISTRATIONS_COLLECTION, docId);
  await updateDoc(docRef, {
    team,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Updates the registration ID (Serial Number).
 */
export async function updateRegistrationId(docId, newId) {
  const docRef = doc(db, REGISTRATIONS_COLLECTION, docId);
  await updateDoc(docRef, {
    registrationId: newId,
    updatedAt: serverTimestamp(),
  });
}
