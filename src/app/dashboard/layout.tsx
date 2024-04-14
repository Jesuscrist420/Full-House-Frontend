import SideNav from '@/app/components/molecules/sideNav/sidenav';
import styles from '@/app/home.module.scss';
import classNames from 'classnames';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  const rightPanelStyles = classNames(styles.noScrollbar, "flex-grow p-6 md:overflow-y-auto md:p-6");

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className={rightPanelStyles}>{children}</div>
    </div>
  );
}