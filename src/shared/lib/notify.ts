import { toast } from 'react-toastify'

export const notify = (text: string) => toast(text)
export const notifySuccess = (text: string) => toast.success(text, { theme: 'colored' })
export const notifyError = (text: string) => toast.error(text, { theme: 'colored' })
