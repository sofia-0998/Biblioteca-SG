import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components/native";
import type { Estado } from "../../data/libros";
import { addLibro } from "../../data/libros";

const GENEROS = ["Educativo", "Divulgación", "Idiomas", "Ciencia", "Ficción"];
const ESTADOS: Estado[] = ["Disponible", "Prestado"];

export default function RegistrarLibro() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [copias, setCopias] = useState("");
  const [genero, setGenero] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado | null>(null);

  function limpiarFormulario() {
    setTitulo("");
    setAutor("");
    setEditorial("");
    setCopias("");
    setGenero(null);
    setEstado(null);
  }

  function handleRegistrar() {
    if (
      !titulo.trim() ||
      !autor.trim() ||
      !editorial.trim() ||
      !copias.trim()
    ) {
      Alert.alert("Faltan datos", "Completá todos los campos del libro.");
      return;
    }
    if (!genero) {
      Alert.alert("Faltan datos", "Seleccioná un género.");
      return;
    }
    if (!estado) {
      Alert.alert("Faltan datos", "Seleccioná el estado del libro.");
      return;
    }
    if (isNaN(Number(copias)) || Number(copias) < 0) {
      Alert.alert(
        "Dato inválido",
        "La cantidad de copias debe ser un número válido.",
      );
      return;
    }

    addLibro({
      titulo: titulo.trim(),
      autor: autor.trim(),
      editorial: editorial.trim(),
      genero,
      estado,
      copias: Number(copias),
      portada: {
        uri: `https://placehold.co/200x280/2E9AD1/ffffff?text=${encodeURIComponent(
          titulo.trim().slice(0, 10),
        )}`,
      },
    });

    Alert.alert("¡Listo!", "El libro se registró con éxito!", [
      {
        text: "Entendido",
        onPress: () => {
          limpiarFormulario();
          router.back();
        },
      },
    ]);
  }

  return (
    <Container>
      <Header>
        <Titulo>Registrar Libro</Titulo>
      </Header>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Etiqueta>Título</Etiqueta>
        <Input
          placeholder="Ej: Lengua y Literatura"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Etiqueta>Género</Etiqueta>
        <ChipsRow>
          {GENEROS.map((g) => (
            <Chip
              key={g}
              selected={genero === g}
              onPress={() => setGenero(g)}
              activeOpacity={0.7}
            >
              <ChipTexto selected={genero === g}>{g}</ChipTexto>
            </Chip>
          ))}
        </ChipsRow>

        <Etiqueta>Autor</Etiqueta>
        <Input
          placeholder="Ej: Edgar A.P."
          value={autor}
          onChangeText={setAutor}
        />

        <Etiqueta>Editorial</Etiqueta>
        <Input
          placeholder="Ej: Santillana"
          value={editorial}
          onChangeText={setEditorial}
        />

        <Etiqueta>Cantidad de Copias</Etiqueta>
        <Input
          placeholder="Ej: 2"
          value={copias}
          onChangeText={setCopias}
          keyboardType="numeric"
        />

        <Etiqueta>Estado</Etiqueta>
        <ChipsRow>
          {ESTADOS.map((e) => (
            <Chip
              key={e}
              selected={estado === e}
              onPress={() => setEstado(e)}
              activeOpacity={0.7}
            >
              <ChipTexto selected={estado === e}>{e}</ChipTexto>
            </Chip>
          ))}
        </ChipsRow>

        <Botones>
          <BotonRegistrar onPress={handleRegistrar} activeOpacity={0.8}>
            <TextoBoton>Registrar</TextoBoton>
          </BotonRegistrar>
          <BotonCancelar onPress={() => router.back()} activeOpacity={0.8}>
            <TextoBoton>Cancelar</TextoBoton>
          </BotonCancelar>
        </Botones>
      </ScrollView>
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

const Etiqueta = styled.Text`
  color: #5b7085;
  font-size: 13px;
  margin-top: 14px;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  background-color: #fff;
  border-width: 1px;
  border-color: #d7e0e6;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 15px;
  color: #12314d;
`;

const ChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Chip = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: #2e9ad1;
  background-color: ${(props: any) => (props.selected ? "#2e9ad1" : "#fff")};
  margin-right: 8px;
  margin-bottom: 8px;
`;

const ChipTexto = styled.Text<{ selected: boolean }>`
  color: ${(props: any) => (props.selected ? "#fff" : "#1b6fa8")};
  font-weight: bold;
  font-size: 13px;
`;

const Botones = styled.View`
  flex-direction: row;
  gap: 14px;
  margin-top: 30px;
`;

const BotonRegistrar = styled.TouchableOpacity`
  flex: 1;
  background-color: #2e9ad1;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
`;

const BotonCancelar = styled.TouchableOpacity`
  flex: 1;
  background-color: #ff7a45;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
`;

const TextoBoton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
