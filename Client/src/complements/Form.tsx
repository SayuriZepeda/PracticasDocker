import { ChangeEvent, useState, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuid4 } from "uuid"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
};

const initialState: Activity = {
    id: uuid4(),
    category: 1,
    name: "",
    calorias : 0
};

export default function Form({ dispatch , state}: FormProps) {
    
    const [activity, setActivity] = useState<Activity>(initialState)
    
    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
                setActivity(selectActivity);
            }
    }, [state.activeId])

    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;


        setActivity(prevActivity => ({
            ...prevActivity,
            [id]:value
        }));
    };

    const isValidActivity = () => {
    const { name, calorias } = activity;
    return name.trim() !== "" && Number(calorias) > 0;
};

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidActivity()) {
            setError("Todos los campos son obligatorios y las calorías deben ser mayores a 0");
            return;
        }

        dispatch({ type: "save-activity", payload: { newActivity: activity } });
        setActivity({
            ...initialState,
            id: uuid4()
        }) // Genera un nuevo ID para la próxima actividad;
        setError(""); // Borra el mensaje de error si la validación pasa
        console.log("Actividad guardada:", activity);
    };

    const isFoodCategory = activity.category === 1;
    const buttonText = isFoodCategory ? "Guardar lugar" : "registrar autolavado";

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 font-bold">{error}</p>}

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoría:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Auto</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Civic, Nissan, Volkswagen, etc."
                    value={activity.name}
                    onChange={handleChange}
                />

                <label htmlFor="calorias" className="font-bold">Placas</label>
                <input
                    id="calorias"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej.ABC-1234"
                    value={activity.calorias}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-30"
                    value={buttonText}
                    disabled={!isValidActivity()}
                />
            </div>
        </form>
    );
}
