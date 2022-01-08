import React from "react";
import "./table.css";



let data;
const table = (props)=> {
// data from the App component 
    data = props.dataValues;
    return (
      <table>
        <tbody>
          <tr>
            <th>Info</th>
            <th>Data</th>
          </tr>
          <tr>
            <td>Vehicle name with the largest sum</td>
            <td>{data[0]}</td>
          </tr>
          <tr>
            <td>related home planets and their respective population</td>
            <td>{data[1]}</td>
          </tr>
          <tr>
            <td>Related pilots name</td>
            <td>{data[2]}</td>
          </tr>
        </tbody>
      </table>
    );
  }

export default table;