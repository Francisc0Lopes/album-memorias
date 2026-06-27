import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
// Importar as 46 fotos
const photo1 = require('../../assets/photos/photo1.jpg');
const photo2 = require('../../assets/photos/photo2.jpg');
const photo3 = require('../../assets/photos/photo3.jpg');
const photo4 = require('../../assets/photos/photo4.jpg');
const photo5 = require('../../assets/photos/photo5.jpg');
const photo6 = require('../../assets/photos/photo6.jpg');
const photo7 = require('../../assets/photos/photo7.jpg');
const photo8 = require('../../assets/photos/photo8.jpg');
const photo9 = require('../../assets/photos/photo9.jpg');
const photo10 = require('../../assets/photos/photo10.jpg');
const photo11 = require('../../assets/photos/photo11.jpg');
const photo12 = require('../../assets/photos/photo12.jpg');
const photo13 = require('../../assets/photos/photo13.jpg');
const photo14 = require('../../assets/photos/photo14.jpg');
const photo15 = require('../../assets/photos/photo15.jpg');
const photo16 = require('../../assets/photos/photo16.jpg');
const photo17 = require('../../assets/photos/photo17.jpg');
const photo18 = require('../../assets/photos/photo18.jpg');
const photo19 = require('../../assets/photos/photo19.jpg');
const photo20 = require('../../assets/photos/photo20.jpg');
const photo21 = require('../../assets/photos/photo21.jpg');
const photo22 = require('../../assets/photos/photo22.jpg');
const photo23 = require('../../assets/photos/photo23.jpg');
const photo24 = require('../../assets/photos/photo24.jpg');
const photo25 = require('../../assets/photos/photo25.jpg');
const photo26 = require('../../assets/photos/photo26.jpg');
const photo27 = require('../../assets/photos/photo27.jpg');
const photo28 = require('../../assets/photos/photo28.jpg');
const photo29 = require('../../assets/photos/photo29.jpg');
const photo30 = require('../../assets/photos/photo30.jpg');
const photo31 = require('../../assets/photos/photo31.jpg');
const photo32 = require('../../assets/photos/photo32.jpg');
const photo33 = require('../../assets/photos/photo33.jpg');
const photo34 = require('../../assets/photos/photo34.jpg');
const photo35 = require('../../assets/photos/photo35.jpg');
const photo38 = require('../../assets/photos/photo38.jpg');
const photo39 = require('../../assets/photos/photo39.jpg');
const photo40 = require('../../assets/photos/photo40.jpg');
const photo41 = require('../../assets/photos/photo41.jpg');
const photo42 = require('../../assets/photos/photo42.jpg');
const photo43 = require('../../assets/photos/photo43.jpg');
const photo44 = require('../../assets/photos/photo44.jpg');
const photo45 = require('../../assets/photos/photo45.jpg');
const photo46 = require('../../assets/photos/photo46.jpg');

const musicFile = require('../../assets/music/music.mp3');

const initialPhotos = [
  photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10,
  photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20,
  photo21, photo22, photo23, photo24, photo25, photo26, photo27, photo28, photo29, photo30,
  photo31, photo32, photo33, photo34, photo35, photo38, photo39, photo40,
  photo41, photo42, photo43, photo44, photo45, photo46,
];

const { width, height } = Dimensions.get('window');

interface PhotoAlbumProps {
  onBack?: () => void;
}

export default function PhotoAlbum({ onBack }: PhotoAlbumProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [musicUrl, setMusicUrl] = useState<string | null>(musicFile);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideSpeed, setSlideSpeed] = useState(3);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const heartAnimation = useSharedValue(0);

  useEffect(() => {
    heartAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );

    // Auto-play slideshow
    const interval = setInterval(() => {
      if (photos.length > 0) {
        setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
      }
    }, slideSpeed * 1000);

    return () => clearInterval(interval);
  }, [slideSpeed, photos.length]);

  // Auto-play música quando inicia
  useEffect(() => {
    if (musicUrl && !isPlaying && sound === null) {
      toggleMusic();
    }
  }, [musicUrl]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultiple: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, ...result.assets.map(asset => asset.uri)]);
      setShowSettings(false);
      Alert.alert('Sucesso!', 'Fotos adicionadas! 📸');
    }
  };

  const pickMusic = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.type === 'success') {
        setMusicUrl(result.uri);
        setShowSettings(false);
        Alert.alert('Sucesso!', 'Música adicionada! 🎵');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não consegui carregar a música');
    }
  };

  const toggleMusic = async () => {
    try {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: musicUrl! }
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      } else if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não consegui tocar a música');
    }
  };

  const heartAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      heartAnimation.value,
      [0, 0.5, 1],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      heartAnimation.value,
      [0, 1],
      [0.5, 1.5],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  // Settings Menu Modal
  const renderSettings = () => (
    <Modal
      transparent
      visible={showSettings}
      animationType="slide"
      onRequestClose={() => setShowSettings(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.settingsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>⚙️ Definições</Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.settingsContent}>
            {/* Adicionar Fotos */}
            <TouchableOpacity
              style={styles.settingButton}
              onPress={pickImages}
            >
              <Text style={styles.settingButtonIcon}>📸</Text>
              <View style={styles.settingButtonText}>
                <Text style={styles.settingButtonTitle}>Adicionar Fotos</Text>
                <Text style={styles.settingButtonSubtitle}>
                  {photos.length} fotos adicionadas
                </Text>
              </View>
            </TouchableOpacity>

            {/* Adicionar Música */}
            <TouchableOpacity
              style={styles.settingButton}
              onPress={pickMusic}
            >
              <Text style={styles.settingButtonIcon}>🎵</Text>
              <View style={styles.settingButtonText}>
                <Text style={styles.settingButtonTitle}>Adicionar Música</Text>
                <Text style={styles.settingButtonSubtitle}>
                  {musicUrl ? '✅ Música carregada' : 'Nenhuma música'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Velocidade do Slideshow */}
            <View style={styles.settingButton}>
              <Text style={styles.settingButtonIcon}>⏱️</Text>
              <View style={styles.settingButtonText}>
                <Text style={styles.settingButtonTitle}>Velocidade</Text>
                <Text style={styles.settingButtonSubtitle}>
                  {slideSpeed}s por foto
                </Text>
                <View style={styles.speedSlider}>
                  <TouchableOpacity
                    style={styles.speedMinusBtn}
                    onPress={() => slideSpeed > 1 && setSlideSpeed(slideSpeed - 1)}
                  >
                    <Text style={styles.speedBtnText}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.speedPlusBtn}
                    onPress={() => slideSpeed < 10 && setSlideSpeed(slideSpeed + 1)}
                  >
                    <Text style={styles.speedBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Música Controls */}
            {musicUrl && (
              <TouchableOpacity
                style={styles.settingButton}
                onPress={toggleMusic}
              >
                <Text style={styles.settingButtonIcon}>
                  {isPlaying ? '⏸️' : '▶️'}
                </Text>
                <View style={styles.settingButtonText}>
                  <Text style={styles.settingButtonTitle}>
                    {isPlaying ? 'Pausar Música' : 'Tocar Música'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* About */}
            <TouchableOpacity
              style={styles.settingButton}
              onPress={() => {
                setShowSettings(false);
                setShowAbout(true);
              }}
            >
              <Text style={styles.settingButtonIcon}>ℹ️</Text>
              <View style={styles.settingButtonText}>
                <Text style={styles.settingButtonTitle}>Sobre</Text>
                <Text style={styles.settingButtonSubtitle}>
                  Sobre esta aplicação
                </Text>
              </View>
            </TouchableOpacity>

            {/* Voltar */}
            {onBack && (
              <TouchableOpacity
                style={[styles.settingButton, styles.backButton]}
                onPress={() => {
                  setShowSettings(false);
                  onBack();
                }}
              >
                <Text style={styles.settingButtonIcon}>←</Text>
                <View style={styles.settingButtonText}>
                  <Text style={styles.settingButtonTitle}>Voltar</Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // About Modal
  const renderAbout = () => (
    <Modal
      transparent
      visible={showAbout}
      animationType="fade"
      onRequestClose={() => setShowAbout(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.aboutModal}>
          <TouchableOpacity
            style={styles.closeButtonAbout}
            onPress={() => setShowAbout(false)}
          >
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.aboutTitle}>💕 Album de Memórias 💕</Text>

          <ScrollView style={styles.aboutContent}>
            <Text style={styles.aboutText}>
              Olá Beatriz!! Queria fazer uma coisa gira com aquilo que sei. E Lembrei-me de o albúm de fotos mas em aplicação.
              És o amor da minha vida, quero estar contigo para sempre e fazer a minha vida contigo. Espero que gostes minha baby do meu coração. ÉS MESMO MUITO ESPECIAL PARA MIM ESPOSA FOFA!!!
            </Text>

           

            <Text style={styles.aboutSubtitle}>💭 Criado com</Text>
            <Text style={styles.aboutText}>
              A minha mente a pensar em ti amor da minha vida
            </Text>

            <Text style={styles.aboutVersion}>v1.0.0</Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.aboutCloseButton}
            onPress={() => setShowAbout(false)}
          >
            <Text style={styles.aboutCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (photos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>📸 Nenhuma foto adicionada</Text>
        <Text style={styles.emptySubtitle}>
          Vai às definições e adiciona fotos para começar!
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsButtonText}>⚙️ Abrir Definições</Text>
        </TouchableOpacity>

        {renderSettings()}
        {renderAbout()}
      </View>
    );
  }

  return (
    <View style={styles.slideshowContainer}>
      {/* Imagem principal */}
        <Image
        source={
          typeof photos[currentPhotoIndex] === 'string' 
            ? { uri: photos[currentPhotoIndex] } 
            : photos[currentPhotoIndex]
        }
        style={styles.slideshowImage}
        resizeMode="contain"
      />

  

      {/* Settings Button (canto superior direito) */}
      <TouchableOpacity
        style={styles.settingsButtonCorner}
        onPress={() => setShowSettings(true)}
      >
        <Text style={styles.settingsButtonCornerText}>⚙️</Text>
      </TouchableOpacity>

      {/* Contador de fotos */}
      <View style={styles.photoInfo}>
        <Text style={styles.photoCount}>
          {currentPhotoIndex + 1} / {photos.length}
        </Text>
      </View>

      {/* Controles */}
      <View style={styles.slideshowControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length)
          }
        >
          <Text style={styles.controlButtonText}>← Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            setCurrentPhotoIndex(prev => (prev + 1) % photos.length)
          }
        >
          <Text style={styles.controlButtonText}>Próxima →</Text>
        </TouchableOpacity>
      </View>

      {renderSettings()}
      {renderAbout()}
    </View>
  );
}

const styles = StyleSheet.create({
  slideshowContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideshowImage: {
    width: width,
    height: height,
  },
  heart: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.4,
  },
  heartText: {
    fontSize: 80,
  },
  photoInfo: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  photoCount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButtonCorner: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 105, 180, 0.8)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonCornerText: {
    fontSize: 24,
  },
  slideshowControls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 105, 180, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  controlButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  settingsModal: {
    backgroundColor: '#FFF5F7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  closeButton: {
    fontSize: 28,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  settingsContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingButtonIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  settingButtonText: {
    flex: 1,
  },
  settingButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  settingButtonSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  speedSlider: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  speedMinusBtn: {
    backgroundColor: '#FFB6D9',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedPlusBtn: {
    backgroundColor: '#FF69B4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedBtnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFE0EC',
  },
  // About Modal
  aboutModal: {
    backgroundColor: '#FFF5F7',
    borderRadius: 30,
    margin: 20,
    padding: 25,
    maxHeight: height * 0.8,
  },
  closeButtonAbout: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 20,
  },
  aboutContent: {
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  aboutSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginTop: 15,
    marginBottom: 10,
  },
  aboutVersion: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  aboutCloseButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
  aboutCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  settingsButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  settingsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});