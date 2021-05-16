import React from "react";
import PrimeHeader from "../prime-header/prime-header";
import Slider from "../slider/slider";
import Services from "../services/services";
import Departments from "../departments/departments";
import PrimeFooter from "../prime-footer/prime-footer";

const App = () => {
  return (
    <React.Fragment>
      <PrimeHeader />
      <main>
        <h1 className="visually-hidden">Кредит и ипотека в Лига банке</h1>
        <Slider />
        <Services />
        <Departments />
      </main>
      <PrimeFooter />
    </React.Fragment>
  );
};

App.propTypes = {};

export default App;
