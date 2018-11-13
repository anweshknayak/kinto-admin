/* @flow */
import type { SessionState, ServerHistoryEntry } from "../types";
import { ANONYMOUS_AUTH } from "../constants";

const HISTORY_KEY = "kinto-admin-server-history";
const SESSION_KEY = "kinto-admin-session";

export function loadHistory(): ServerHistoryEntry[] {
  const jsonHistory = sessionStorage.getItem(HISTORY_KEY);
  if (!jsonHistory) {
    return [];
  }
  try {
    const history = JSON.parse(jsonHistory);
    // Cope with legacy history which only stored the server as a string, without the authType.
    const withLegacyHistory = history.map(entry =>
      typeof entry === "string"
        ? { server: entry, authType: ANONYMOUS_AUTH }
        : entry
    );
    return withLegacyHistory;
  } catch (err) {
    return [];
  }
}

export function saveHistory(
  history: ServerHistoryEntry[]
): ServerHistoryEntry[] {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    // Not much to do here, let's fail silently
  }

  return history;
}

export function clearHistory(): ServerHistoryEntry[] {
  return saveHistory([]);
}

export function loadSession(): ?Object {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch (err) {
    return null;
  }
}

export function saveSession(sessionState: SessionState): Promise<any> {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      ...sessionState,
      buckets: [],
    })
  );
  return Promise.resolve();
}

export function clearSession(): Promise<any> {
  sessionStorage.removeItem(SESSION_KEY);
  return Promise.resolve();
}
