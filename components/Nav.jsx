"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import avatar from "@/public/assets/images/userAvatar.png";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  

	useEffect(() => {
		const setProvider = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProvider();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3 py-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="logo"
					width={40}
					height={40}
					className="object-contain"
				/>
				<p className="logo_text">The Prompt !!!</p>
			</Link>

			{/* web navigation */}
			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							type="button"
							onClick={signOut}
							className="outline_btn"
						>
							{" "}
							sign out
						</button>
						<Link href="/profile">
							<Image
								width={37}
								height={37}
								className="rounded-full"
								alt=""
								src={avatar}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									{" "}
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* mobile navigation */}
			<div className="sm:hidden flex relative">
				{isUserLoggedIn ? (
					<div className="flex">
						<Image
							width={37}
							height={37}
							className="rounded-full"
							alt=""
							src={avatar}
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
                <button type="button" onClick={()=>{
                  setToggleDropdown(false)
                  signOut()
                }} className="mt-5 w-full black_btn ">
                  Sign Out
                </button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((prvider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
