import styled from 'styled-components';

// Datos de niveles
const levels = [
  { name: 'Oro', image: '/path/to/oro-image.png' },
  { name: 'Diamante', image: '/path/to/diamante-image.png' },
  { name: 'Plata', image: '/path/to/plata-image.png' },
  { name: 'Bronce', image: '/path/to/bronce-image.png' },
  { name: 'Hierro', image: '/path/to/hierro-image.png' }
];

// Estilos con styled-components
const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const LevelsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const LevelCard = styled.div`
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const LevelImage = styled.img`
  height: 150px;
  width: auto;
  margin-bottom: 1rem;
`;

const LevelTitle = styled.h2`
  margin: 0;
`;

// Componente Levels
const Levels = () => {
  return (
    <Root>
      <h1>Niveles</h1>
      <LevelsWrapper>
        {levels.map((level, index) => (
          <LevelCard key={index}>
            <LevelImage src={level.image} alt={level.name} />
            <LevelTitle>{level.name}</LevelTitle>
          </LevelCard>
        ))}
      </LevelsWrapper>
    </Root>
  );
};

export default Levels;
