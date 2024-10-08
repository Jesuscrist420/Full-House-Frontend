import clsx from 'clsx';
import classNames from 'classnames';
import styles from './latestInvoices.module.scss';

export interface Invoice {
  id: number;
  closing_timestamp: string;
  comment: string;
  opening_timestamp: string;
  restaurant_id: number;
  status: string;
  table_id: number;
  total: number;
  user_id: number;
}

export default async function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: Invoice[];
}) {
  let currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const bgStyles = classNames("flex grow flex-col justify-between rounded-xl p-4", styles.default);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl font-semibold`}>
        Ultimas Facturas
      </h2>
      <div className={bgStyles}>
        <div className="bg-white px-6 rounded-xl">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      Factura # {invoice.id}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.comment}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base text-green-600`}
                >
                  {currency.format(invoice.total).replace('US$', '$')}
                </p>
              </div>
            );
          })}
        </div>
        {/* <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div> */}
      </div>
    </div>
  );
}
