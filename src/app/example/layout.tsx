import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto p-4 bg-black text-white">
            <h1>Layout</h1>
            {children}
        </div>
    );
}