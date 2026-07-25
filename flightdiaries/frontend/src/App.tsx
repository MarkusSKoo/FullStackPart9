import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import type { Entry, ErrorProps } from './types';
import entryService from './services/entryService';
import type { Weather, Visibility } from './types';

const Error = ( { error }: ErrorProps) => {
  if (!error) {
    return null
  }

  return(
    <div className="error">
      {error}
    </div>
  )
}

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    entryService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  const entryCreation = async (event: React.SyntheticEvent) => {    
    event.preventDefault()

    try {
      const returnedEntry = await entryService.create({ 
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    })
    
    setEntries(entries.concat(returnedEntry))

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        setError(error.response?.data.error[0].message)

        setTimeout(() => {
          setError('');
        }, 5000);
      } else {
        console.log(error)
      }
    }
  };

  return (
    <div>
      <Error error={error} />
      <form onSubmit={entryCreation}>
        <h2>Add new entry</h2>

        <div>
          Date:{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type='date'
            required
          />
        </div>

        <div>
          Visibility:{" "}
          <label>
            <input type='radio' name='visibility' value='great' checked={visibility === "great"} onChange={(event) => setVisibility(event.target.value)} />
            great
          </label>

          <label>
            <input type='radio' name='visibility' value='good' checked={visibility === "good"} onChange={(event) => setVisibility(event.target.value)} />
            good
          </label>

          <label>
            <input type='radio' name='visibility' value='ok' checked={visibility === "ok"} onChange={(event) => setVisibility(event.target.value)} />
            ok
          </label>

          <label>
            <input type='radio' name='visibility' value='poor' checked={visibility === "poor"} onChange={(event) => setVisibility(event.target.value)} />
            poor
          </label>
        </div>

        <div>
          Weather:{" "}
          <label>
            <input type='radio' name='weather' value='sunny' checked={weather === "sunny"} onChange={(event) => setWeather(event.target.value)} />
            sunny
          </label>

          <label>
            <input type='radio' name='weather' value='rainy' checked={weather === "rainy"} onChange={(event) => setWeather(event.target.value)} />
            rainy
          </label>

          <label>
            <input type='radio' name='weather' value='cloudy' checked={weather === "cloudy"} onChange={(event) => setWeather(event.target.value)} />
            cloudy
          </label>

          <label>
            <input type='radio' name='weather' value='stormy' checked={weather === "stormy"} onChange={(event) => setWeather(event.target.value)} />
            stormy
          </label>

          <label>
            <input type='radio' name='weather' value='windy' checked={weather === "windy"} onChange={(event) => setWeather(event.target.value)} />
            windy
          </label>
        </div>

        <div>
          Comment:{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {entries.map(entry =>
          <li key={entry.id}>
            <h4>Date: {entry.date}</h4>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
