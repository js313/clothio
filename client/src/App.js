import Container from '@mui/material/Container';
import './App.css';
import ClothCount from './components/ClothCount';
import ListClothes from './components/ListClothes';

function App() {
  return (
    <Container maxWidth="xs" sx={{ pt: 2, pb: 2, mt: 5 }}>
      <ClothCount />
      <ListClothes />
    </Container>
  );
}

export default App;