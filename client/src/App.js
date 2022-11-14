import Container from '@mui/material/Container';
import { useState } from 'react';
import './App.css';
import ClothCount from './components/ClothCount';
import ListClothes from './components/ListClothes';
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  new Cloudinary({
    cloud: {
      cloudName: 'dixj9zn09'
    }
  })

  const [clothStatus, setClothStatus] = useState('')
  const [counts, setCounts] = useState(undefined)

  function resetClothesCount() {
    setCounts(undefined)
  }

  return (
    <Container maxWidth="xs" sx={{ pb: 2, mt: 2 }}>
      <ClothCount clothStatus={clothStatus} setClothStatus={setClothStatus} counts={counts} setCounts={setCounts} />
      <ListClothes clothStatus={clothStatus} resetClothesCount={resetClothesCount} />
    </Container>
  );
}

export default App;
