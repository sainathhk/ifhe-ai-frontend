import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq1TnkR9hT6PBsSrPGBxvkqDn1goraqjU",
  authDomain: "icfai-ai-assistant.firebaseapp.com",
  projectId: "icfai-ai-assistant",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
