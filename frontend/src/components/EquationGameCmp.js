import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import gameConfig from '../phaser/scenes/equationGameScenes/gameConfig';

const EquationGameCmp = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game(gameConfig);
    gameRef.current = game;

    return () => {
      game.destroy(true); // Clean up when component unmounts
    };
  }, []);
  

  return <div id="phaser-game" style={{ width: '100%', height: '100%' }} />;
};

export default EquationGameCmp;
