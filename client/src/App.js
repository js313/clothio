import Container from '@mui/material/Container';
import { useState } from 'react';
import './App.css';
import ClothCount from './components/ClothCount';
import ListClothes from './components/ListClothes';

function App() {
  const [clothStatus, setClothStatus] = useState('')
  return (
    <Container maxWidth="xs" sx={{ pt: 2, pb: 2, mt: 5 }}>
      <ClothCount clothStatus={clothStatus} setClothStatus={setClothStatus} />
      <ListClothes clothStatus={clothStatus} />
    </Container>
  );
}

export default App;
