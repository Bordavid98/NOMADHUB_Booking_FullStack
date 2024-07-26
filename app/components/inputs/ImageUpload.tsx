"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	onChange,
	value
}) => {
	const [transformedUrl, setTransformedUrl] = useState(value);

	const handleUpload = useCallback((result: any) => {
		const secureUrl = result.info.secure_url;
		onChange(secureUrl);

		// Create a Cloudinary instance
		const cld = new Cloudinary({ cloud: { cloudName: 'nomadhubworldwide' } });
		
		// Transform the uploaded image
		const img = cld
			.image(secureUrl)
			.format('auto')
			.quality('auto')
			.resize(auto().gravity(autoGravity()).width(500).height(500));

		// Update the transformed URL
		setTransformedUrl(img.toURL());
	}, [onChange]);

	useEffect(() => {
		if (value) {
			const cld = new Cloudinary({ cloud: { cloudName: 'nomadhubworldwide' } });
			const img = cld
				.image(value)
				.format('auto')
				.quality('auto')
				.resize(auto().gravity(autoGravity()).width(500).height(500));

			setTransformedUrl(img.toURL());
		}
	}, [value]);

	return ( 
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="nomads44"
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="
							relative
							cursor-pointer
							hover:opacity-70
							transition
							border-dashed
							border-2
							p-20
							border-neutral-300
							flex
							flex-col
							justify-center
							items-center
							gap-4
							text-neutral-600
						"
					>
						<TbPhotoPlus size={50}/>
						<div className="font-bold text-lg">
							Click to upload
						</div>
						{transformedUrl && (
							<div
								className="absolute inset-0 w-full h-full"
							>	
								<Image
									alt="Upload"
									fill
									style={{ objectFit: "cover" }}
									src={transformedUrl}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	 );
}
 
export default ImageUpload;
