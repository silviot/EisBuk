import { FirebaseReducer } from "react-redux-firebase";
// import { Timestamp } from "@google-cloud/firestore";

import { NotifVariant } from "@/enums/Redux";

import { store } from "@/store";
import { DateTime } from "luxon";
import {
  FirestoreStatusEntry,
  FirestoreData,
  FirestoreOrdered,
  Customer,
} from "./mFirestore";

export interface Notification {
  key?: number;
  message: string;
  options: {
    variant?: NotifVariant;
    action?: (key: number) => JSX.Element;
    key?: number /** @TEMP this might not be here */;
  };
}

interface ProfileType {}
interface Schema {}

export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;

/**
 * "firestore" entry in local store
 */
interface FirestoreRedux {
  status: {
    requesting: FirestoreStatusEntry<boolean>;
    requested: FirestoreStatusEntry<boolean>;
    timestamps: FirestoreStatusEntry<number>;
  };
  data: FirestoreData;
  ordered: FirestoreOrdered;
  listeners: {
    byId: {};
    allIds: [];
  };
  errors: {
    byQuery: {};
    allIds: [];
  };
  queries: {};
}

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
  firestore: FirestoreRedux;
  app: App;
  copyPaste: CopyPaste;
  authInfoEisbuk: AuthInofEisbuk;
}

export interface User {
  id: string;
}

export type CustomerInStore = Pick<Customer, "id"> &
  Pick<Customer, "name"> &
  Pick<Customer, "surname">;
