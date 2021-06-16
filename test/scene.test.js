/**
 * @jest-environment jsdom
 */

import BattleScene from '../src/Scene/BattleScene';
import InputScene from '../src/Scene/InputScene';
import BootScene from '../src/Scene/BootScene';
import PreloaderScene from '../src/Scene/PreloadScene';
import TitleScene from '../src/Scene/TitleScene';
import OptionsScene from '../src/Scene/OptionsScene';
import CreditsScene from '../src/Scene/CreditsScene';
import LeaderboardScene from '../src/Scene/LeaderBoard';
import worldScene from '../src/Scene/worldScene';

describe('Testing Scenes Constructors', () => {
  it('Game scene is a function constructor', () => {
    expect(typeof BattleScene).toBe('function');
  });

  it('InstructionsScene is a function constructor', () => {
    expect(typeof LeaderboardScene).toBe('function');
  });

  it(' OverScene is a function constructor', () => {
    expect(typeof worldScene).toBe('function');
  });

  it('OptionsScene is a function constructor', () => {
    expect(typeof OptionsScene).toBe('function');
  });

  it(' Boot is a function constructor', () => {
    expect(typeof BootScene).toBe('function');
  });

  it(' Title scene is a function constructor', () => {
    expect(typeof TitleScene).toBe('function');
  });

  it('Preloader scene is a function constructor', () => {
    expect(typeof PreloaderScene).toBe('function');
  });

  it('CreditScene scene is a function constructor', () => {
    expect(typeof CreditsScene).toBe('function');
  });

  it('SubmitScore scene is a function constructor', () => {
    expect(typeof InputScene).toBe('function');
  });
});