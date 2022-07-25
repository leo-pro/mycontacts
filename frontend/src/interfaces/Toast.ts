export enum ToastType {
  DANGER = 'danger',
  DEFAULT = 'default',
  SUCCESS = 'success'
}

export interface ToastMessages{
  id?: string | number
  type: ToastType,
  text: string
}
