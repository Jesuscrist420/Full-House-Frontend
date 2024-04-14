import SideNav from '@/app/components/molecules/sideNav/sidenav';
import styles from '@/app/home.module.scss';
import classNames from 'classnames';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  const rightPanelStyles = classNames(styles.noScrollbar, styles.body,  "flex-grow pb-4 pl-4 pr-4 overflow-auto");

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className={rightPanelStyles}>{children}</div>
    </div>
  );
}