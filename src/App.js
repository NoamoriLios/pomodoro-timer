import './css/App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import {useState} from "react";
import SettingsContext from "./SettingsContext";
import BackButton from "./buttons/BackButton";
import Player from "./Player";

function App() {

    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    return (
      <main>
          <SettingsContext.Provider value={{
              showSettings, setShowSettings,
              workMinutes, setWorkMinutes,
              breakMinutes,  setBreakMinutes
          }}>
              <div className='main'>
                  {showSettings
                      ? <div className='settings_page'>
                          <Settings/>
                          <div className='settings_buttons'>
                              <BackButton onClick={() => setShowSettings(false)}/>
                          </div>
                      </div>
                      : <div>
                          <Timer/>
                      </div>}
              </div>
          </SettingsContext.Provider>
          <footer>
              <Player/>
          </footer>
      </main>
  );
}

export default App;
