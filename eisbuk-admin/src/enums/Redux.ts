/**
 * All redux actions are contained here
 */
export enum Action {
  EnqueueSnackbar = "@@Eisbuk/ENQUEUE_SNACKBAR",
  CloseSnackbar = "@@Eisbuk/CLOSE_SNACKBAR",
  RemoveSnackbar = "@@Eisbuk/REMOVE_SNACKBAR",

  ChangeDay = "@@Eisbuk/CHANGE_DAY",

  CopySlotDay = "@@Eisbuk/COPY_SLOT_DAY",
  CopySlotWeek = "@@Eisbuk/COPY_SLOT_WEEK",

  SetSlotTime = "@@Eisbuk/SET_SLOT_TIME",

  IsAdminReceived = "@@Eisbuk/IS_ADMIN_RECEIVED",
}

// notification options
export enum NotifVariant {
  Success = "success",
  Error = "error",
}