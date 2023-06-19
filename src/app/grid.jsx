import React, { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';
import axios from 'axios';
const GET_LATEST_LAUNCH_URL = 'https://api.spacexdata.com/v5/launches/latest';
const GET_ONE_ROCKET_URL = 'https://api.spacexdata.com/v4/rockets/';
const GET_ONE_CREW_MEMBER_URL = 'https://api.spacexdata.com/v4/crew/';

const Grid = () => {
  const [launch, setLaunch] = useState({});
  const [rocket, setRocket] = useState({});
  const [tripulation, setTripulation] = useState([]);

  useEffect(() => {
    axios
      .get(GET_LATEST_LAUNCH_URL)
      .then(setLaunch)
      .catch((r) => console.log('fetch data error', r));
  }, []);

  const getTripulation = useCallback(async () => {
    if (launch && launch.data) {
      let promises = launch.data.crew.map((person) => {
        return axios.get(GET_ONE_CREW_MEMBER_URL + `${person.crew}`);
      });
      const tripulation = await Promise.all(promises);
      setTripulation(tripulation);
    }
  }, [launch]);

  useEffect(() => {
    if (launch.data) {
      axios
        .get(GET_ONE_ROCKET_URL + `${launch.data.rocket}`)
        .then(setRocket)
        .catch((e) => console.log('error fetichng rocket data', e));
    }
    getTripulation();
  }, [launch]);

  return (
    <div className={styles.grid}>
      <a
        href={launch.data && launch.data.links.webcast}
        className={styles.card}
        target='_blank'
        rel='noopener noreferrer'
      >
        <h2>
          Crew Name <span>-&gt;</span>
        </h2>
        <p>{launch.data && launch.data.name}.</p>
      </a>

      <a className={styles.card} target='_blank' rel='noopener noreferrer'>
        <h2>
          Flight Number <span>-&gt;</span>
        </h2>
        <p>{launch.data && launch.data.flight_number}</p>
      </a>

      <a className={styles.card} target='_blank' rel='noopener noreferrer'>
        <h2>
          Tripulation <span>-&gt;</span>
        </h2>
        <div className='d-flex'>
          {tripulation &&
            tripulation.map((person, key) => {
              return <p key={key}>{person.data.name}</p>;
            })}
        </div>
      </a>
      <a
        href={rocket.data && rocket.data.flickr_images[0]}
        className={styles.card}
        target='_blank'
        rel='noopener noreferrer'
      >
        <h2>
          Rocket <span>-&gt;</span>
        </h2>
        <p>{rocket.data && rocket.data.name}</p>
      </a>
    </div>
  );
};
export default Grid;
