import ApiProcess from "./processes/api.process";
import AppProcess from "./processes/app.process";

const Bootstrap = async () => {
  const app = await AppProcess.getInstance();
  const api = await ApiProcess.getInstance();
}
Bootstrap();