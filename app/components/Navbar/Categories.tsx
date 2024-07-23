'use client';

import Container from "../Container";
import { FaHouseChimney, FaPeopleRoof, FaVihara, FaBed } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { MdSurfing } from "react-icons/md";
import { TbBeach, TbMountain, TbPool, TbYoga } from "react-icons/tb";
import { 
	GiBarn,
	GiBoatFishing, 
	GiCactus,
	GiHouse,
	GiCastle, 
	GiCaveEntrance, 
	GiForestCamp, 
	GiIsland, 
	GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing} from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
	{
		label: 'Houses',
		icon: FaHouseChimney,
		description: 'This property is entire houses!'
	},

	{
		label: 'Villas',
		icon: FaVihara,
		description: 'This property is a mansion!'
	},

	{
		label: 'Coliving',
		icon: FaPeopleRoof,
		description: 'This property has coliving with other nomads!'
	},
	{
		label: 'Apartments',
		icon: MdOutlineVilla,
		description: 'This property is entire flats!'
	},
	{
		label: 'Rooms',
		icon: FaBed,
		description: 'In this property you have your own room!'
	},
	{
		label: 'Coworking',
		icon: BsPersonWorkspace,
		description: 'This property is coworking space!'
	},
	{
		label: 'Yoga',
		icon: TbYoga,
		description: 'This is a yoga retreat!'
	},
	{
		label: 'Gyms',
		icon: CgGym,
		description: 'This is a gym!'
	},
	{
		label: 'Surfing',
		icon: MdSurfing,
		description: 'This is a surfing retreat!'
	},
]

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();

	const isMainPage = pathname === '/';

	if (!isMainPage) {
		return null;
	}
	return ( 
		<Container>
			<div
				className='
					pt-4
					flex
					flex-row
					items-center
					justify-between
					overflow-x-auto
				'

			>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category == item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	 );
}
 
export default Categories;