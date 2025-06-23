import { useMemo, Dispatch} from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>;
}

export default function ActivityList ({activities, dispatch}: ActivityListProps) {
    
    const categoriName = useMemo(() =>
        (category: Activity["category"]) => categories.map( cat => cat.id === category ? cat.name : "")
    , [activities])

    return(
        <>
        <h2 className="text-4xl fond-bold text-slate-600 text-center">
            Resumenes
        </h2>
        {activities.map(activity => (
            <div key={activity.id} className="px-5 py-10 bg-white m-5 flex justify-between">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                    ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"} `}>
                        {categoriName(+activity.category)}
                    </p>
                    <p className="text-2xl font-bold pt-5"> {activity.name} </p>
                    <p className="text-lime-500 font-black text-4xl">
                        {activity.calorias} {""}
                        <span >placa</span>
                    </p>
                </div>
                <div>
                <button
                    onClick={ () => dispatch ({ type: "set-activeId", payload: {id: activity.id}}) }
                >
                    <PencilSquareIcon
                    className="h-8 w-8 text-gray-800"
                    />
                </button>
                </div>
            </div>
            
        ))}
    </>
    )
}