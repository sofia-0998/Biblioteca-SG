import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import type { Libro } from "../../data/libros";
import { getLibros } from "../../data/libros";

export default function ConsultarLibros() {
  const router = useRouter();
  const [libros] = useState<Libro[]>(() => getLibros());
  const [busqueda, setBusqueda] = useState("");

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Container>
      <Header>
        <Titulo>Libros</Titulo>
      </Header>

      <Buscador
        placeholder="Buscar por título..."
        value={busqueda}
        onChangeText={setBusqueda}
        autoCapitalize="none"
      />

      <FlatList
        data={librosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 4 }}
        renderItem={({ item }) => (
          <Card activeOpacity={0.7}>
            <Portada source={{ uri: item.portada }} resizeMode="cover" />
            <Info>
              <TituloLibro numberOfLines={2}>{item.titulo}</TituloLibro>
              <Dato>Autor: {item.autor}</Dato>
              <Dato>Editorial: {item.editorial}</Dato>
              <Dato>Estado: {item.estado}</Dato>
            </Info>
          </Card>
        )}
      />
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

const Buscador = styled.TextInput`
  background-color: #fff;
  border-width: 1px;
  border-color: #d7e0e6;
  border-radius: 10px;
  margin: 16px 20px 8px 20px;
  padding: 10px 14px;
  font-size: 15px;
`;

const Card = styled.TouchableOpacity`
  flex-direction: row;
  border-width: 2px;
  border-color: #2e9ad1;
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #fff;
`;

const Portada = styled.Image`
  width: 70px;
  height: 96px;
  border-radius: 6px;
`;

const Info = styled.View`
  flex: 1;
  margin-left: 14px;
  justify-content: center;
`;

const TituloLibro = styled.Text`
  color: #1b6fa8;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Dato = styled.Text`
  color: #5b7085;
  font-size: 13px;
`;
