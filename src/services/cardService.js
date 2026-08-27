import { doc, setDoc, getDocs, collection, serverTimestamp, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const TEAM_CARDS_COLLECTION = "teamCards";

/**
 * Uploads a generated card to ImgBB and saves the URL in Firestore.
 * @param {string} teamName - The name of the team
 * @param {string} dataUrl - The base64 data URL of the generated card image
 */
export async function saveTeamCard(teamName, cardData) {
  try {
    if (!teamName || !cardData) throw new Error("Team name and card data are required.");

    // Clean team name for Firestore document ID
    const safeTeamName = teamName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

    // Save the entire card configuration JSON to Firestore in the teamCards collection
    const cardDocRef = doc(db, TEAM_CARDS_COLLECTION, safeTeamName);
    await setDoc(cardDocRef, {
      ...cardData,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error saving team card:", error);
    throw error;
  }
}

/**
 * Fetches all saved team cards (JSON config).
 * @returns {Promise<Object>} An object mapping team names to their card data object.
 */
export async function fetchTeamCards() {
  try {
    const cardsSnapshot = await getDocs(collection(db, TEAM_CARDS_COLLECTION));
    const cards = {};
    cardsSnapshot.forEach((doc) => {
      const data = doc.data();
      cards[data.teamName] = data; // store the whole object, not just cardUrl
    });
    return cards;
  } catch (error) {
    console.error("Error fetching team cards:", error);
    return {};
  }
}

/**
 * Listens to all saved team cards in real-time.
 */
export function listenToTeamCards(callback) {
  return onSnapshot(collection(db, TEAM_CARDS_COLLECTION), (snapshot) => {
    const cards = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.teamName) {
        cards[data.teamName] = data;
      }
    });
    callback(cards);
  });
}

/**
 * Deletes a team card from Firestore.
 * @param {string} teamName - The name of the team whose card should be deleted
 */
export async function deleteTeamCard(teamName) {
  try {
    if (!teamName) throw new Error("Team name is required to delete.");
    
    // Clean team name for Firestore document ID (same logic as save)
    const safeTeamName = teamName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    
    const cardDocRef = doc(db, TEAM_CARDS_COLLECTION, safeTeamName);
    await deleteDoc(cardDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting team card:", error);
    throw error;
  }
}
