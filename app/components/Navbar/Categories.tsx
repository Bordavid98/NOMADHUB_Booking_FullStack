'use client';

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
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
import { FaHouseChimney } from "react-icons/fa6";
import { FaSkiing} from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
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
		icon: GiCastle,
		description: 'This property is a mansion!'
	},

	{
		label: 'Coliving',
		icon: GiCactus,
		description: 'This property has coliving with other nomads!'
	},
	{
		label: 'Apartmnets',
		icon: MdOutlineVilla,
		description: 'This property is entire flats!'
	},
	{
		label: 'Rooms',
		icon: TbMountain,
		description: 'In this property you have your own room!'
	},
	{
		label: 'Coworking',
		icon: TbPool,
		description: 'This property is coworking space!'
	},
	{
		label: 'Yoga',
		icon: GiIsland,
		description: 'This is a yoga retreat!'
	},
	{
		label: 'Gyms',
		icon: GiBoatFishing,
		description: 'This is a gym!'
	},
	{
		label: 'Surfing',
		icon: FaSkiing,
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