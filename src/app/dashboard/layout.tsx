import SideNav from '@/app/components/molecules/sideNav/sidenav';
import styles from '@/app/home.module.scss';
import classNames from 'classnames';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  const rightPanelStyles = classNames(styles.noScrollbar, styles.body, styles.pageContainer,"flex-grow pb-4 pl-4 pr-4 overflow-y-auto");

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden relative">
      <div className="w-full flex-none md:w-64 relative">
        <SideNav />
      </div>
      <div className={rightPanelStyles}>{children}</div>
    </div>
  );
}