import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous que les styles sont bien inclus

// Fonction pour afficher un toast de succès
export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-right', // Utilisation directe de la chaîne
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Fonction pour afficher un toast d'erreur
export const showError = (message) => {
  toast.error(message, {
    position: 'top-right', // Utilisation directe de la chaîne
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Fonction pour afficher un toast d'information
export const showInfo = (message) => {
  toast.info(message, {
    position: 'top-right', // Utilisation directe de la chaîne
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Fonction pour afficher un toast d'avertissement
export const showWarning = (message) => {
  toast.warn(message, {
    position: 'top-right', // Utilisation directe de la chaîne
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
