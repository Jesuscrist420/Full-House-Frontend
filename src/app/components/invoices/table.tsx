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

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white shadow-md overflow-hidden">
          <div className="max-h-96 overflow-y-auto"> {/* Contenedor scrollable */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de apertura</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de cierre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.table_id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${account.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{account.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.comment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateToLocal(account.opening_timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateToLocal(account.closing_timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(account.total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className={styles.buttonsContainer}>
                        <button className={styles.editButton} onClick={() => handleEdit(account)}>
                          <FaPencilAlt />Editar
                        </button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(account)}>
                          <MdClose />  Cerrar
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
