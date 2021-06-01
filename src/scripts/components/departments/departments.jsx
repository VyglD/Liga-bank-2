import React from "react";
import {YMaps, Map, Placemark, ZoomControl} from "react-yandex-maps";
import {Breakpoint} from "../../constants";

import logo from "../../../images/mark.svg";

const LogoSize = {
  WIDTH: 29,
  HEIGHT: 33,
};

const MapProps = {
  MOBILE: {
    center: [58.159189, 76.759788],
    zoom: 4.5,
  },
  TABLET: {
    center: [58.218103, 68.523411],
    zoom: 4.7,
  },
  DESKTOP: {
    center: [57.144594, 60.840360],
    zoom: 5.2,
  },
};

const getPlacemark = (coords) => {
  const options = {
    iconLayout: `default#image`,
    iconImageHref: logo,
    iconImageSize: [LogoSize.WIDTH, LogoSize.HEIGHT],
    iconImageOffset: [(-1 * LogoSize.WIDTH) / 2, -1 * LogoSize.HEIGHT],
  };

  return (
    <Placemark geometry={coords} options={options}/>
  );
};

const Departments = () => {
  const [mapState, setMapState] = React.useState(MapProps.MOBILE);

  const changeMapState = React.useCallback(
      () => {
        if (window.innerWidth < Breakpoint.TABLET) {
          return setMapState(MapProps.MOBILE);
        }

        if (window.innerWidth >= Breakpoint.DESKTOP) {
          return setMapState(MapProps.DESKTOP);
        }

        return setMapState(MapProps.TABLET);
      },
      []
  );

  React.useEffect(
      () => {
        changeMapState();

        window.addEventListener(`resize`, changeMapState);

        return () => {
          window.removeEventListener(`resize`, changeMapState);
        };
      },
      [changeMapState]
  );

  return (
    <section className="departments" id="departments">
      <h2 className="departments__title">Отделения Лига Банка</h2>
      <YMaps>
        <Map
          className="departments__map"
          defaultState={{...mapState}}
        >
          {getPlacemark([61.253139, 73.394971])}
          {getPlacemark([54.991606, 73.371799])}
          {getPlacemark([55.031597, 82.925190])}
          {getPlacemark([56.836991, 60.596328])}
          {getPlacemark([57.152563, 65.542430])}
          {getPlacemark([55.752945, 37.626157])}
          {getPlacemark([51.529415, 46.023086])}
          {getPlacemark([55.791765, 49.112360])}
          <ZoomControl options={{position: {right: 20, top: 50}}} />
        </Map>
      </YMaps>
    </section>
  );
};

Departments.propTypes = {};

export default Departments;
