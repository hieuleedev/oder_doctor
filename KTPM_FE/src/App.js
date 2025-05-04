
import "./App.css"
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import ChatBot from "./components/chat-bot/ChatBot";
function App() {
  return (
    <Router>
       {/* <ChatBot /> */}
      <div className="App">
     
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.Component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
