import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const METADATA_COLLECTION = "metadata";
const TEAM_CONFIG_DOC = "teamConfig";

const DEFAULT_TEAMS = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"];

/**
 * Fetches the dynamic list of teams from Firestore.
 * If no configuration exists, returns the default teams list.
 */
export async function fetchTeams() {
  try {
    const docRef = doc(db, METADATA_COLLECTION, TEAM_CONFIG_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().teams) {
      return docSnap.data().teams;
    }
    
    return DEFAULT_TEAMS;
  } catch (error) {
    console.error("Error fetching teams config:", error);
    return DEFAULT_TEAMS;
  }
}

/**
 * Saves the updated list of teams to Firestore.
 */
export async function saveTeams(teamsArray) {
  try {
    const docRef = doc(db, METADATA_COLLECTION, TEAM_CONFIG_DOC);
    await setDoc(docRef, {
      teams: teamsArray,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving teams config:", error);
    throw error;
  }
}

/**
 * Listens to the dynamic list of teams in real-time.
 */
export function listenToTeams(callback) {
  const docRef = doc(db, METADATA_COLLECTION, TEAM_CONFIG_DOC);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists() && docSnap.data().teams) {
      callback(docSnap.data().teams);
    } else {
      callback(DEFAULT_TEAMS);
    }
  });
}
