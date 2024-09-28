import { createContext } from 'react';
import { appStore } from '@/stores/app.store';
import { mapStore } from '@/stores/map.store';
import { authStore } from '@/stores/auth.store';
import { chatStore } from '@/stores/chat.store';
import { lossesStore } from '@/stores/losses.store';
import { reportStore } from '@/stores/report.store';
import { consoleStore } from '@/stores/console.store';
import { productStore } from '@/stores/product.store';
import { embeddedStore } from '@/stores/embedded.store';
import { settingsStore } from '@/stores/settings.store';
import { equipmentStore } from '@/stores/equipment.store';
import { maintinanceStore } from '@/stores/maintinance.store';
import { notificationStore } from '@/stores/notification.store';

const StoreContext = createContext({
  app: appStore,
  auth: authStore,
  report: reportStore,
  bottomConsole: consoleStore,
  equipmentStore: equipmentStore,
  maintinanceStore: maintinanceStore,
  notificationStore: notificationStore,
  chat: chatStore,
  product: productStore,
  embedded: embeddedStore,
  settings: settingsStore,
  map: mapStore,
  loss: lossesStore,
});

const StoreContextProvider = ({ children }) => (
  <StoreContext.Provider>{children}</StoreContext.Provider>
);
export { StoreContext, StoreContextProvider };
