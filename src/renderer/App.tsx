import ThemeProvider from 'context/ThemeProvider';
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
// import './App.css';
import createRoutes from './routers';
// import ScreenCapture from './screenCapture';
// import Stopwatch from './Stopwatch';
// import WorkDiary from './WorkDiary';

export default function App() {
  const content = createRoutes();
  return <ThemeProvider>{content}</ThemeProvider>;
  // <Router>
  //   <Routes>
  //     {/* <Route path="/" element={<Stopwatch />} /> */}
  //     <Route path="/" element={<ScreenCapture />} />
  //     <Route path="/work-diary" element={<WorkDiary />} />
  //   </Routes>
  // </Router>
}
