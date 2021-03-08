import { deviceConfig } from '@riverdeck/common';
import ApiProcess from './processes/api.process';
import AppProcess from './processes/app.process';
import SetupProcess from './processes/setup.process';

const Bootstrap = async () => {
  const app = await AppProcess.getInstance();
  const deviceName = await deviceConfig.get('name');
  if (deviceName) {
    console.log(`Device name found: ${deviceName}`);
    const api = await ApiProcess.getInstance();
  } else {
    console.log(`Device name not found: ${deviceName}`);
    const setup = await SetupProcess.getInstance();
  }
};
Bootstrap();
