import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import styles from "../organisms/tablesAccordion/TablesAccordion.module.scss";
import { FaPencilAlt } from 'react-icons/fa';
import { MdClose, MdDelete } from 'react-icons/md';

export default function Table({
  accounts,
  handleEdit,
  handleDelete
}: {
  accounts: {
    id: number;
    table_id: number;
    status: string;
    restaurant_id: number;
    comment: string;
    opening_timestamp: string;
    closing_timestamp: string;
    total: number;
    user_id: number;
  }[];
  handleEdit: (account: {
    id: number;
    table_id: number;
    status: string;
    restaurant_id: number;
    comment: string;
    opening_timestamp: string;
    closing_timestamp: string;
    total: number;
    user_id: number;
  }) => void;
  handleDelete: (account: {
    id: number;
    table_id: number;
    status: string;
    restaurant_id: number;
    comment: string;
    opening_timestamp: string;
    closing_timestamp: string;
    total: number;
    user_id: number;
  }) => void;
}) {
  let currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white shadow-md overflow-hidden">
          <div className="max-h-96 overflow-y-auto"> {/* Contenedor scrollable */}
            <table className="min-w-full divide-y divide-gray-250">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID Mesa</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Comentario</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de apertura</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de cierre</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-250">
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">{account.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{account.table_id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-center font-medium ${account.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>{account.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{account.comment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{formatDateToLocal(account.opening_timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{account.closing_timestamp ? formatDateToLocal(account.closing_timestamp) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{currency.format(account.total).replace('US$', '$')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{account.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2
                      ">
                        <button className="flex items-center justify-center w-[40px] h-[40px] text-blue-500 hover:bg-blue-100 border-transparent bg-gray-100 rounded-md whitespace-nowrap gap-2" onClick={() => handleEdit(account)}>
                          <FaPencilAlt size={15} />
                        </button>
                        <button className="flex items-center justify-center w-[40px] h-[40px] text-red-500 hover:bg-red-100 border-transparent bg-gray-100 rounded-md whitespace-nowrap gap-2" onClick={() => handleDelete(account)}>
                          <MdClose size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> {/* Fin del contenedor scrollable */}
        </div>
      </div>
    </div>
  );
}
