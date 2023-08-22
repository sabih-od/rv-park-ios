import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.kjonesllc.kjrvportal',
  appName: 'KJ RV Portal',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['alert', 'badge', 'sound'],
    },
    Keyboard: {
      resize: KeyboardResize.None,
    },

  },
};

export default config;
