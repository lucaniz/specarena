import { PsiChallenge } from "../_challenges/psi";

export interface Challenge {
  id: string;
  name: string;
  createdAt: number;
  challengeType: string;
  invites: string[];
  instance: PsiChallenge;
}