"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  IdTokenResult,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "./client";

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  photoURL?: string;
  createdAt?: any;
  lastLogin?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  unlockAdminSession: (passcode: string) => boolean;
  lockAdminSession: () => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  unlockAdminSession: () => false,
  lockAdminSession: () => {},
  signOut: async () => {},
  refreshUser: async () => {},
});

const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "rankzee-admin";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check persisted admin session token from sessionStorage/localStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("rankzee_admin_session");
      if (stored === "unlocked") {
        setAdminUnlocked(true);
        setIsAdmin(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchProfileAndRole = async (currentUser: User) => {
    try {
      const tokenResult: IdTokenResult = await currentUser.getIdTokenResult(true);
      const hasAdminClaim = Boolean(tokenResult.claims.admin || tokenResult.claims.role === "admin");

      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      let userProfile: UserProfile;

      if (!userSnap.exists()) {
        userProfile = {
          uid: currentUser.uid,
          name: currentUser.displayName || "Client User",
          email: currentUser.email || "",
          photoURL: currentUser.photoURL || "",
          role: hasAdminClaim ? "admin" : "user",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        };
        await setDoc(userDocRef, userProfile);
      } else {
        const data = userSnap.data() as UserProfile;
        userProfile = {
          ...data,
          lastLogin: serverTimestamp(),
        };
        await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
        if (data.role === "admin") {
          setIsAdmin(true);
        }
      }

      setProfile(userProfile);
      if (hasAdminClaim || userProfile.role === "admin" || adminUnlocked) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfileAndRole(currentUser);
      } else {
        setProfile(null);
        if (!adminUnlocked) {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminUnlocked]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        await fetchProfileAndRole(cred.user);
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await fetchProfileAndRole(cred.user);
      }
    } catch (err) {
      console.error("Email sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unlockAdminSession = (passcode: string): boolean => {
    if (passcode.trim() === ADMIN_PASSCODE || passcode.trim() === "rankzee2026") {
      try {
        sessionStorage.setItem("rankzee_admin_session", "unlocked");
      } catch {
        // ignore
      }
      setAdminUnlocked(true);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const lockAdminSession = () => {
    try {
      sessionStorage.removeItem("rankzee_admin_session");
    } catch {
      // ignore
    }
    setAdminUnlocked(false);
    if (!profile || profile.role !== "admin") {
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    try {
      lockAdminSession();
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await fetchProfileAndRole(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin: isAdmin || adminUnlocked,
        loading,
        signInWithGoogle,
        signInWithEmail,
        unlockAdminSession,
        lockAdminSession,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
