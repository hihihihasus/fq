import { Howl } from 'howler';

// Classe para gerenciar os sons do jogo
class AudioService {
  private readonly discovery: Howl;
  private readonly victory: Howl;
  private readonly click: Howl;
  private _muted: boolean = false;
  
  constructor() {
    // Som quando descobre uma liga metálica
    this.discovery = new Howl({
      src: ['/alloy_discovery.mp3'],
      volume: 0.7,
      preload: true
    });
    
    // Som de vitória quando completar todas as ligas
    this.victory = new Howl({
      src: ['/victory.mp3'],
      volume: 0.7,
      preload: true
    });
    
    // Som de clique para feedback de interação
    this.click = new Howl({
      src: ['/click.mp3'],
      volume: 0.6,
      preload: true
    });
    
    // Restaurar o estado do áudio do localStorage
    const storedMuted = localStorage.getItem('audio_muted');
    if (storedMuted !== null) {
      this._muted = storedMuted === 'true';
    }
  }
  
  // Tocar som de descoberta de liga
  playDiscovery() {
    if (!this._muted) {
      this.discovery.play();
    }
  }
  
  // Tocar som de vitória
  playVictory() {
    if (!this._muted) {
      this.victory.play();
    }
  }
  
  // Tocar som de clique
  playClick() {
    if (!this._muted) {
      this.click.play();
    }
  }
  
  // Ativar/desativar som
  toggleMute() {
    this._muted = !this._muted;
    localStorage.setItem('audio_muted', this._muted.toString());
    return this._muted;
  }
  
  // Verificar se o som está desativado
  get muted() {
    return this._muted;
  }
  
  // Definir estado do mute
  set muted(value: boolean) {
    this._muted = value;
    localStorage.setItem('audio_muted', this._muted.toString());
  }
}

// Singleton para usar em toda a aplicação
export const audioService = new AudioService();