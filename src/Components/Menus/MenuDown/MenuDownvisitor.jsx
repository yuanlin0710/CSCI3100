/**
 * MenuDown.js
 *
 * Description: This file defines the MenuDown component, which represents a dropdown menu at the bottom of the page.
 * Dependencies:
 * - React: Library for building user interfaces.
 * - MenuDownItem: Component for rendering menu items in the dropdown menu.
 * - ListOptionsMenuDown: Array of options for the dropdown menu.
 * - MenuActiveProvider: Context provider for managing active menu tab.
 * 
 * Example Usage:
 * import MenuDown from './MenuDown';
 * <MenuDown />
 * 
 */

import MenuDownItem from './MenuDownItem/MenuDownItem'
import { ListOptionsMenuDown } from './ListMenuDown'

import MenuActiveProvider from '../../../Context/menuActive'

import CreateIcon from '@mui/icons-material/Create'

import './MenuDown.scss'

const MenuDown = () => {
	return (
		<div className="menuDown__container">
			<nav>
				<MenuActiveProvider value={null}>
					<ul>
						<div className="container__items">
							{ListOptionsMenuDown?.map((option, index) => {
								return (
									<MenuDownItem key={index} option={option}/>
								)
							})}
						</div>
					</ul>
				</MenuActiveProvider>
			</nav>
			<div className="containet__btnTweetDown">
				<label type="button" className="btnTweetDown__icon"><CreateIcon fontSize='large'/></label>
			</div>
		</div>
	)
}

export default MenuDown
