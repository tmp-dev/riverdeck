import { App } from 'electron';

export default interface ProcessInterface {
  start(): Promise<void>;
}
