import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Blog from "./components/Blog/Blog";
import { QueryClientProvider, QueryClient } from "react-query";

import Navbarcomp from "./components/Navbar/Navbarcomp";
import Techforumcomp from "./components/Home/Techforumcomp";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbarcomp />
      <Techforumcomp /> <br />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
