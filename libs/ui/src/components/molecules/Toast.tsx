import { ToastContainer as ReactToastContainer, Slide, toast } from 'react-toastify';

const ToastContainer = () => {
  return (
    <ReactToastContainer transition={Slide} />
  )
};

export { ToastContainer, toast };
