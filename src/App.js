import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Composants/ApprenantsComposants/Dashboard';
import Cours from './Composants/ApprenantsComposants/CoursApp';
import Taches from './Composants/ApprenantsComposants/Taches';
import Livraisons from './Composants/ApprenantsComposants/Livraisons';
import Parametres from './Composants/ApprenantsComposants/Parametres';
import Layout from './Composants/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/cours" element={<Layout><Cours /></Layout>} />
        <Route path="/taches" element={<Layout><Taches /></Layout>} />
        <Route path="/livraisons" element={<Layout><Livraisons /></Layout>} />
        <Route path="/parametres" element={<Layout><Parametres /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
