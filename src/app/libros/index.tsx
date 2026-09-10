import { useRouter } from "expo-router";
import styled from "styled-components/native";

export default function LibrosMenu() {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Titulo>Libros</Titulo>
      </Header>

      <Content>
        <BotonPrimario
          onPress={() => router.push("/libros/registrar")}
          activeOpacity={0.8}
        >
          <TextoBoton>+ Registrar Libro</TextoBoton>
        </BotonPrimario>

        <BotonPrimario
          onPress={() => router.push("/libros/consultar")}
          activeOpacity={0.8}
        >
          <TextoBoton>Consultar Libros</TextoBoton>
        </BotonPrimario>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f8fa;
`;

const Header = styled.View`
  background-color: #2e9ad1;
  padding: 18px 12px;
  padding-top: 50px;
`;

const Titulo = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.View`
  padding: 30px 24px;
`;

const BotonPrimario = styled.TouchableOpacity`
  background-color: #2e9ad1;
  border-radius: 10px;
  padding: 18px;
  align-items: center;
  margin-bottom: 20px;
`;

const TextoBoton = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
