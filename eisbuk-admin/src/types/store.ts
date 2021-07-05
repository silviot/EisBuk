import { DateTime } from "luxon";
import { FirebaseReducer } from "react-redux-firebase";

import { NotifVariant } from "@/enums/Redux";

import { store } from "@/store";

export interface Notification {
  key?: number;
  message: string;
  options: {
    variant?: NotifVariant;
    action?: (key: number) => JSX.Element;
    key?: number /** @TEMP */;
  };
}

interface ProfileType {}
interface Schema {}

export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;

// const firestore = {
//   status: {
//     requesting: {},
//     requested: {},
//     timestamps: {},
//   },
//   data: {},
//   ordered: {},
//   listeners: {
//     byId: {},
//     allIds: [],
//   },
//   errors: {
//     byQuery: {},
//     allIds: [],
//   },
//   queries: {},
// };

interface App {
  notifications: Notification[];
  calendarDay: DateTime;
  newSlotTime: unknown;
}

interface CopyPaste {
  day: unknown;
  week: unknown;
}

interface AuthInofEisbuk {
  amIAdmin: boolean;
  myUserId: string;
}

export interface LocalStore {
  firebase: FirebaseReducer.Reducer<ProfileType, Schema>;
  firestore: unknown;
  app: App;
  copyPaste: CopyPaste;
  authInfoEisbuk: AuthInofEisbuk;
}

export interface Slot {
  id: string;
  categories: unknown[] /** @TEMP */;
  type: unknown /** @TEMP */;
  durations: unknown /** @TEMP */;
  notes: unknown /** @TEMP */;
  date: unknown /** @TEMP */;
}

export interface User {
  id: string;
}

export interface Customer {
  id: string;
  name: string;
  surname: string;
}
