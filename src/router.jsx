import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Analyze from "./pages/Analyze";
import OperationsPage from "./pages/OperationsPage";
import Table from "./pages/Table";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/operations" element={<OperationsPage />} />
      <Route path="/table" element={<Table />} />

    </Routes>
  );
};

export default AppRouter;
