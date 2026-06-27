import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import PhotoAlbum from '../components/PhotoAlbum';

const welcomePhoto = require('../../assets/photos/welcome.jpg');

export default function HomeScreen() {
  const [showSlideshow, setShowSlideshow] = useState(false);

  const handleYes = () => {
    console.log('Clicou SIM!');
    setShowSlideshow(true);
  };

  if (showSlideshow) {
    return <PhotoAlbum onBack={() => setShowSlideshow(false)} />;
  }

  return (
    <WelcomeScreen
      onYes={handleYes}
      onNo={() => {}}
      photoUri={welcomePhoto}
    />
  );
}