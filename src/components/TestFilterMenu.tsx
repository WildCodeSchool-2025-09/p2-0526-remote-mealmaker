import { Menu } from "lucide-react";


function FilterMenu() {

    return (
        <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost">
                <Menu />
            </button>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 p-4 shadow"
            >
                <li>
                    <label className="label cursor-pointer">
                        <span>Vegan</span>
                        <input type="checkbox" className="checkbox" />
                    </label>
                </li>




                <li>
                    <select className="select select-bordered w-full">
                        <option>Regime</option>
                        <option>Vegetarian</option>
                        <option>Gluten free</option>
                    </select>
                </li>


            </ul>
        </div>
    );
}

export default FilterMenu;