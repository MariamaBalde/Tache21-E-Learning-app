import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebaseConfig';

const useFetchDomains = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDomains = async () => {
    console.log('Récupération des domaines depuis Firestore...');
    try {
      const querySnapshot = await getDocs(collection(db, 'domaines'));
      console.log('Résultat brut Firestore :', querySnapshot);

      if (!querySnapshot.empty) {
        const fetchedDomains = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Domaines récupérés :', fetchedDomains);
        setDomains(fetchedDomains);
      } else {
        console.log('Aucun document trouvé dans la collection "domaines".');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des domaines :', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []); // Se lance une seule fois lors du montage du composant

  return { domains, loading, error, fetchDomains };
};

export default useFetchDomains;
