
import { useReducer } from "react";
import Form from "./complements/Form";
import {activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./complements/ActivityList";

function App() {
  const [ state, dispatch] = useReducer(activityReducer, initialState)
  return (
    <>
      <header className="bg-gray-800 py-3 ">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Estacionamiento
          </h1>
        </div>
      </header>
      <section className="bg-gray-700 py-20 px-5">
        <div className="max-w-4xl mx-auto">
            <Form 
            dispatch={dispatch}
            state={state}
            />
          </div>
        </section >
        <section className="p-10" mx-auto max-w-4xl>
            <ActivityList
            activities = { state.activities}
            dispatch={dispatch}
            />
        </section>
    </>
  )
}

export default App
