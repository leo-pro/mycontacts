export enum ToastType {
  DANGER = 'danger',
  DEFAULT = 'default',
  SUCCESS = 'success'
}

export interface ToastMessages{
  id?: number
  type: ToastType,
  text: string,
  duration?: number
}
