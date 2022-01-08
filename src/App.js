//----------------------- imports ----------------------
import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/chart";
import Table from "./components/table";
//------------------- main function -------------------
function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  // Variables
  let maxVal = 0;
  let tempDataValues = [];
  let dataValues = [];
  let dataPlanets = [];
  //------------ temp array for the planets namewe need for part b ---------
  const planetsName = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  useEffect(() => {
    // Fetch the data from the API to the match Array
    fetchFunc("https://swapi.dev/api/people/?page=", setPeople);
    fetchFunc("https://swapi.dev/api/vehicles/?page=", setVehicles);
    fetchFunc("https://swapi.dev/api/planets/?page=", setPlanets);
    async function fetchFunc(url, func) {
      let data = [];
      let i = 1;
      // fetch the data from all the pages for each URL
      while ((await fetch(url + i)).ok) {
        let res = await fetch(url + i);
        data = data.concat((await res.json()).results);
        i++;
        if (validUrl(url + i) === 404) break;
      }
      func(data);
    }
    // check valid url
    function validUrl(url) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          return request.status;
        }
      };
    }
  }, []);

//--------------------------------- PART A ---------------------------------
// Check the data from the vehicles Array (get the name of each pilots first)
  vehicles.forEach((element) => {
    tempDataValues = maxPop(element, maxVal);

    if (tempDataValues !== maxVal) {
      maxVal = tempDataValues[3];
      dataValues = tempDataValues;
    }
  });

  function maxPop(vehicle, max) {
    let tempPilot = [];
    let pilot = [];
    let planetName = [];
    let tempPlanet = [];
    let tempSum = 0;
    //find the data of each pilots thats belong for this vehicle
    vehicle.pilots.forEach((element) => {
      for (let i = 0; i < people.length; i++) {
        if (element === people[i].url) {
          pilot.push(people[i]);
          break;
        }
      }
    });
    // calculate the sum of all the pilot home world population
    pilot.forEach((element) => {
      tempPilot.push(element.name + " ");
      for (let i = 0; i < planets.length; i++) {
        if (element.homeworld === planets[i].url) {
          tempPlanet.push(planets[i].name);
          tempPlanet.push(", " + planets[i].population + " ");
          tempSum += Number(planets[i].population);
          planetName.push(tempPlanet);
          break;
        }
      }
    });
    // return the max population sum 
    if (tempSum > maxVal) {
      return [vehicle.name, planetName, tempPilot, Number(tempSum)];
    }
    return maxVal;
  }

//--------------------------------- PART B---------------------------------
  planetsName.forEach((item) => {
    let temp = planets.find((x) => x.name === item);
    if (temp != null) {
      dataPlanets.push([temp.name, Number(temp.population)]);
    }
  });

  return (
    /*pass the data we collect from the Api to the table & chart Components*/ 
    <div className="root">
      <div className="cards">
      <div className="card"><h2>Part A</h2><Table dataValues={dataValues} /></div> 
      <div className="card"><h2>Part B</h2><Chart dataPlanets={dataPlanets} /></div>
      </div>
    </div>
  );
}

export default App;
