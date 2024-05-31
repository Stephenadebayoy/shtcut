'use client';


import { Logo } from '../logo';
import { buttonVariants, cn } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { isEmpty, isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import MenuIcon from '@shtcut/asset/icons/MenuIcon';
import {  Drawer, DrawerContent, DrawerTrigger } from '@shtcut-ui/react';
import { FeatureMenu } from './component';
import RouteLink from '../nav-link/route-link';
import { useMediaQuery } from 'react-responsive';

export const HomeNavbar = () => {
    const mobile = useMediaQuery({ query: '(max-width: 840px' });
    const { authData } = useAuth();
    const workspace = authData?.workspaces[0]?.slug;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="">
            <nav className="max-w-screen-xl mx-auto fixed left-0 right-0 z-50 px-4 top-10 ">
                <section className="flex justify-between items-center border border-gray-100 rounded-full bg-white shadow px-4">
                    <section className="flex items-center space-x-4">
                        <RouteLink
                            href="/"
                            isDisabled={true}
                            className="flex gap-2 font-handwriting text-xl lowercase [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
                        >
                            <Logo />
                        </RouteLink>
                    </section>
                    <div className={` space-x-4 ${mobile ? 'hidden' : 'flex'}  items-center`}>
                        <FeatureMenu />
                    </div>
                    <section>
                        <section className={`${mobile ? 'flex' : 'hidden'} `}>
                            <Drawer>
                                <DrawerTrigger>
                                    <MenuIcon />
                                </DrawerTrigger>
                                {/* <DrawerContent style={{ width: '100%', height: '100%' }}>Navabr</DrawerContent> */}
                            </Drawer>
                        </section>

                        <div className={` ${mobile ? 'hidden' : 'flex'}  flex-1 justify-end gap-2`}>
                            {!isEmpty(authData) && !isUndefined(authData) ? (
                                <>
                                    <RouteLink
                                        isDisabled={true}
                                        href={`/url/${workspace}/overview`}
                                        className={cn(
                                            buttonVariants(),
                                            'bg-blue-600 h-8 rounded-full px-3  transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                                        )}
                                    >
                                        Dashboard
                                    </RouteLink>
                                </>
                            ) : (
                                <>
                                    <section className="md:flex hidden items-center gap-4">
                                        <RouteLink
                                            href="/auth/sign-in"
                                            isDisabled={true}
                                            className={cn(
                                                buttonVariants({ variant: 'outline' }),
                                                'h-8 rounded-full px-5  transition-all duration-200 border-none shadow-none '
                                            )}
                                        >
                                            Log In
                                        </RouteLink>

                                        <RouteLink
                                            href="/auth/sign-up"
                                            isDisabled={true}
                                            className={cn(
                                                buttonVariants(),
                                                'bg-blue-600 h-8 rounded-full px-3 font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                                            )}
                                        >
                                            Create an account
                                        </RouteLink>
                                    </section>
                                </>
                            )}
                        </div>
                    </section>
                </section>
            </nav>
        </header>
    );
};
