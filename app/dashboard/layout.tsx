import SideNav from '@/app/ui/dashboard/sidenav';
import { getUserdata } from '@/auth';
import clsx from 'clsx';
import { Metadata } from 'next';
import React, { cloneElement } from 'react';
import { isValidElement } from 'react';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const userData: any = await getUserdata();
  let backgroundImage;
  
  switch (userData?.department) {
    case 'fire':
      backgroundImage = 'bg-help-app-background-fire';
      break;
    case 'hospital':
      backgroundImage = 'bg-help-app-background-hospital';
      break;
    case 'police':
      backgroundImage = 'bg-help-app-background-police';
      break;
    case 'MDRRMO':
      backgroundImage = 'bg-help-app-background-mdrrmo';
      break;
    case 'PCG':
      backgroundImage = 'bg-help-app-background-pcg';
      break;
    default:
      backgroundImage = 'bg-help-app-background-default';
  }

  const modifiedChildren = React.Children.map(children, (child) => {
    if (isValidElement<any>(child)) {
      const clonedEl = cloneElement(child, { userData });
      // Clone the child and add new props
      return clonedEl;
    }
    
    return child;
  });

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav userData={userData}/>
      </div>
      <div className={clsx(backgroundImage, 'bg-cover bg-center h-screen flex-grow p-6 md:overflow-y-auto md:p-12')}>{modifiedChildren}</div>
    </div>
  );
}