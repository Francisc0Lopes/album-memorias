import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Mantemos o tamanho controlado da foto para não desformatar o ecrã
const IMAGE_SIZE = Math.min(width * 0.8, 350); 

interface WelcomeScreenProps {
  onYes: () => void;
  onNo: () => void;
  photoUri: any;
}

export default function WelcomeScreen({ onYes, onNo, photoUri }: WelcomeScreenProps) {
  const [showPleaseMessage, setShowPleaseMessage] = useState(false);

  // Ecrã do "Please" - Agora a única saída é o "Claro que sim" que leva para as fotos!
  if (showPleaseMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.pleaseText}>PLEASE PLEASE PLEASE 😭💔</Text>
        <TouchableOpacity 
          style={[styles.button, styles.yesButton]} // Usa o rosa forte do botão Sim
          onPress={onYes} // Executa diretamente a entrada no Slideshow!
        >
          <Text style={styles.buttonText}>Claro que sim 🥰</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Foto */}
      <Image
        source={photoUri}
        style={styles.photo}
      />

      {/* Pergunta */}
      <Text style={styles.question}>
        Olá meu amor,{'\n'}queres ser a minha nota 100?
      </Text>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={onYes}
        >
          <Text style={styles.buttonText}>Sim 💕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => setShowPleaseMessage(true)}
        >
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  photo: {
    width: IMAGE_SIZE, 
    height: IMAGE_SIZE,
    borderRadius: 30,
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#FFB6D9',
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#FF1493',
  },
  noButton: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pleaseText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
    textAlign: 'center',
    marginBottom: 50,
  },
  retryButton: {
    backgroundColor: '#FFB6D9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});