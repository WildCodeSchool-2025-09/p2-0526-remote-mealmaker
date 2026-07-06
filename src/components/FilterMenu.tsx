import { Menu } from "lucide-react";

function FilterMenu() {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn">
                <Menu />
            </div>
            <ul onClick={(e) => e.stopPropagation()} tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 p-4 shadow">
                <li>
                    <label className="label cursor-pointer">
                        <span> Vegan </span>
                        <input type='checkbox' className="checkbox"></input>
                    </label>
                </li>
                <li>
                    <label className="label cursor-pointer">
                        <span> Healthy </span>
                        <input type='checkbox' className="checkbox"></input>
                    </label>
                </li>
                <li>
                    <label className="label cursor-pointer">
                        <span> Sport </span>
                        <input type='checkbox' className="checkbox"></input>
                    </label>
                </li>
                <li>
                    <select onClick={(e) => e.stopPropagation()} className="select select-bordered w-full">
                        <option>Regime</option>
                        <option>Vegetarian</option>
                        <option>Gluten free</option>
                    </select>
                </li>
                <li>
                    <select className="select select-bordered w-full">
                        <option>Allergy</option>
                        <option>Lactose</option>
                    </select>
                </li>
            </ul>

        </div >
    )
}
export default FilterMenu;