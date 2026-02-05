import { toast, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function useNotification() {
  const notifySuccess = (message: string = "Added to cart!") => {
    const options: ToastOptions = {
      type: "default",
      autoClose: 500,
      hideProgressBar: true,
      transition: "zoom",
      position: "bottom-right",
    };

    toast(message, options);
  };

  const notifyError = (message: string) => {
    toast(message, { type: "error", autoClose: 2000 });
  };

  return {
    notifySuccess,
    notifyError
  };
}