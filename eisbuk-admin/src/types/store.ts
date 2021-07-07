import { FirebaseReducer } from "react-redux-firebase";
// import { Timestamp } from "@google-cloud/firestore";
import { DateTime } from "luxon";

import { store } from "@/store";

import { NotifVariant } from "@/enums/Redux";

import {
  FirestoreStatusEntry,
  FirestoreData,
  FirestoreOrdered,
  Customer,
  Slot,
} from "@/types/mFirestore";

/**** Region Store Types *****/
export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
/**** End Region Store Types *****/

/**** Region App *****/
interface App {
  notifications: Notification[];
  calendarDay: DateTime;
  newSlotTime: DateTime;
}
/**** End Region App *****/

/**** Region Copy Paste *****/
export interface SlotDay {
  [slotId: string]: Slot<"id">;
}

export interface SlotWeek {
  weekStart: DateTime;
  slots: Slot<"id">[];
}

interface CopyPaste {
  day: SlotDay;
  week: SlotWeek;
}
/**** End Region Copy Paste *****/

/**** Region Notification *****/
export interface Notification {
  key?: number;
  message: string;
  options: {
    variant?: NotifVariant;
    action?: (key: number) => JSX.Element;
  };
}
/**** End Region Notifiaction *****/

/**** Region Firebase Reducer *****/
interface ProfileType {}
interface Schema {}
/**** End Region Firebase Reducer *****/

/***** Region Firestore *****/
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
/***** Region Firestore *****/

/***** Region Auth Info *****/
interface AuthInfoEisbuk {
  amIAdmin: boolean;
  myUserId: string;
}
/***** End Region Auth Info *****/

/***** Region Full Store *****/
export interface LocalStore {
  firebase: FirebaseReducer.Reducer<ProfileType, Schema>;
  firestore: FirestoreRedux;
  app: App;
  copyPaste: CopyPaste;
  authInfoEisbuk: AuthInfoEisbuk;
}
/***** End Region Full Store *****/

/***** Region Other *****/
export type CustomerInStore = Pick<Customer, "id"> &
  Pick<Customer, "name"> &
  Pick<Customer, "surname">;
/***** End Region Other *****/
