import { ConfigProvider } from "antd";

import "react-toastify/dist/ReactToastify.min.css";
import ptBR from "antd/lib/locale/pt_BR";
import Routes from "./routes";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Routes />
    </ConfigProvider>
  );
}

export default App;
